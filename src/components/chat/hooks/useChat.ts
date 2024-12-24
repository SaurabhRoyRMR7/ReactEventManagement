import { useState } from 'react';
import { Message } from '../../../types/chat';
import { DEFAULT_AVATAR } from '../../dashboard/utils/constants';
import { sampleMessages, sampleChatRooms } from '../../../data/sampleChats';

export function useChat() {
  const [activeRoomId, setActiveRoomId] = useState(sampleChatRooms[0].id);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const currentUserId = 'user1';

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: 'John Doe',
      content,
      timestamp: new Date(),
      avatar: DEFAULT_AVATAR,
    };
    setMessages([...messages, newMessage]);
  };

  return {
    activeRoomId,
    setActiveRoomId,
    messages,
    currentUserId,
    handleSendMessage,
    rooms: sampleChatRooms,
  };
}