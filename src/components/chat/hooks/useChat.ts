import { useEffect, useState } from 'react';
import { Message } from '../../../types/chat';
import { DEFAULT_AVATAR } from '../../dashboard/utils/constants';
import { sampleMessages, sampleChatRooms } from '../../../data/sampleChats';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';
export function useChat() {

  const [messages, setMessages] = useState<Message[]>([]);
  const userId = localStorage.getItem('userId');
  const parsedUserId = parseInt(userId, 10);
  const currentUserId = parsedUserId;
  const [rooms, setRooms] = useState([]);
  const [activeRoomId, setActiveRoomId] = useState(0);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [usersInRoom, setUsersInRoom] = useState<any[]>([]);
  const [showUsers, setShowUsers] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    userId: 0,
    userRole: '',
    userROleId: 0,
  });
// Notifications state to track new messages for the bell component
const [notifications, setNotifications] = useState<{ [key: number]: number }>({});
 
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await fetch(`https://localhost:7060/api/Chat/GetChatRooms/${currentUserId}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data, 'chat room data');
          setRooms(data.$values); // Set the rooms once fetched
        } else {
          console.error('Error fetching chat rooms');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    

    fetchChatRooms();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  useEffect(() => {
    if (activeRoomId !== 0) {
      const fetchUsersInRoom = async () => {
        try {
          const response = await axios.get(`https://localhost:7060/api/Chat/GetUsersInRoom/${activeRoomId}`);
          if (response.status === 200) {
            setUsersInRoom(response.data.$values);  // Set the list of users in the room
          }
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetchUsersInRoom();
    }
  }, [activeRoomId]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7060/chatHub", {
        withCredentials: true, // This sends cookies (authentication tokens)
        skipNegotiation: true,  // skipNegotiation as we specify WebSockets
        transport: signalR.HttpTransportType.WebSockets  //
      })
      .build();

    newConnection
      .start()
      .then(() => {
        console.log('SignalR connection established');
        setConnection(newConnection);
        setIsConnected(true);
      })
      .catch((err) => {
        console.error('Error while starting connection: ', err);
        setIsConnected(false);
      });

    

    return () => {
      if (newConnection) {
        newConnection.stop().then(() => {
          setIsConnected(false);
          console.log('SignalR connection stopped');
        });
      }
    };
  }, []);

  // Listen for incoming messages
  useEffect(() => {
    if (connection) {
      connection.on('ReceiveMessage', (message: any) => {
        console.log(message,'received message')
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length + 1, senderId: message.senderId, sender: message.sender, content: message.content, timestamp: message.timestamp, avatar: message.avatar,senderName:message.senderName }
        ]);

        console.log('hiiiii');

        if (message.senderId !== currentUserId) {
          setNotifications(prev => ({
            ...prev,
            [activeRoomId]: (prev[activeRoomId] || 0) + 1
          }));
        }
       
      });
      
    }
  }, [connection, currentUserId]);


  // Fetch messages for the active room when `activeRoomId` changes
  useEffect(() => {
    if (activeRoomId !== 0) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`https://localhost:7060/api/Chat/GetMessagesByRoomId/${activeRoomId}`);
          if (response.ok) {
            const data = await response.json();
            console.log(data, 'data od chatrom messaahaha');
            setMessages(data.$values);
          } else {
            console.error('Error fetching messages');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchMessages();
    }
  }, [activeRoomId]);
  // Fetch messages whenever `activeRoomId` changes
  useEffect(() => {
    fetchUserProfile(currentUserId);
  }, [currentUserId]);



  const fetchUserProfile = async (userId) => {


    axios.get(`https://localhost:7060/api/User/${userId}`)
      .then(response => {
        setUser(response.data);
        console.log(response.data, 'user data');

      })
      .catch(error => {
        console.error('Error fetching user profile', error);
      });





  };


  useEffect(() => {
    if (activeRoomId !== 0 && connection) {
      connection.invoke("JoinRoom", activeRoomId);
    }
  }, [activeRoomId, connection]);

  useEffect(()=>{
    console.log(notifications,'notification');
  },[notifications]);


  const handleSendMessage = async (content: string, file: File) => {

    console.log(file,'filepath');

    try {
      // Send the message to the backend API
      const messageData = {
        ChatRoomId: activeRoomId,
        SenderId: currentUserId,
        Content: content,
        Timestamp: new Date(),
        Avatar: DEFAULT_AVATAR, // Assuming this is a default avatar
        SenderName:user.name
      }
      const formData = new FormData();
      formData.append('ChatRoomId', activeRoomId.toString());
      formData.append('SenderId', currentUserId.toString());
      formData.append('Content', content);
      formData.append('Timestamp', new Date().toISOString());
      formData.append('Avatar', DEFAULT_AVATAR);
      formData.append('SenderName', user.name);
      console.log(new Date().toISOString, 'date ')
      console.log(messageData, 'message data');
      // Send message to WebSocket
      if (file) {
        formData.append('File', file);
      }

      const response = await axios.post('https://localhost:7060/api/Chat/SendMessage', formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        
        // connection?.invoke("SendMessageToRoom",messageData );
      } else {
        console.error('Error sending message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }

  };


  return {
    activeRoomId,
    setActiveRoomId,
    messages,
    currentUserId,
    handleSendMessage,
    rooms: rooms,
    notifications,
    setNotifications,
    usersInRoom,
    setUsersInRoom,
    showUsers,
    setShowUsers

  };
}