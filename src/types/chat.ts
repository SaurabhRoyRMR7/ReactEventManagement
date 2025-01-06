export interface Message {
  id: number;
  senderId: number;
  senderName?:string;
  sender?: any;
  content: string;
  timestamp: Date;
  avatar?: string;
  fileDetails?: FileDetails; 
}
export interface FileDetails {
  fileType: number; // 1: Image, 2: Video, etc.
  fileData: string; // Base64 encoded file data
  fileName: string; // Name of the file
}

export interface ChatRoom {
  chatRoomId: number;
  name: string;
  eventId: string;
  participants: string[];
  lastMessage?: Message;
}