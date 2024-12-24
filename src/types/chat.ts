export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  avatar?: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  eventId: string;
  participants: string[];
  lastMessage?: Message;
}