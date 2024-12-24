import { ChatRoom, Message } from '../types/chat';

export const sampleMessages: Message[] = [
  {
    id: '1',
    senderId: 'user1',
    senderName: 'John Doe',
    content: 'Hello everyone! Looking forward to the event!',
    timestamp: new Date('2024-03-15T10:00:00'),
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '2',
    senderId: 'user2',
    senderName: 'Alice Smith',
    content: 'Hi John! Yes, it\'s going to be great!',
    timestamp: new Date('2024-03-15T10:01:00'),
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '3',
    senderId: 'user3',
    senderName: 'Bob Wilson',
    content: 'Does anyone know if we need to bring anything specific?',
    timestamp: new Date('2024-03-15T10:02:00'),
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export const sampleChatRooms: ChatRoom[] = [
  {
    id: '1',
    name: 'Tech Conference Chat',
    eventId: '1',
    participants: ['user1', 'user2', 'user3'],
    lastMessage: sampleMessages[2],
  },
  {
    id: '2',
    name: 'Startup Networking Chat',
    eventId: '2',
    participants: ['user1', 'user2'],
    lastMessage: {
      id: '4',
      senderId: 'user2',
      senderName: 'Alice Smith',
      content: 'Looking forward to meeting everyone!',
      timestamp: new Date('2024-03-14T15:30:00'),
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
];