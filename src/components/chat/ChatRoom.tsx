import React from 'react';
import { Message } from '../../types/chat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface ChatRoomProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  currentUserId: string;
}

export function ChatRoom({ messages, onSendMessage, currentUserId }: ChatRoomProps) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwnMessage={message.senderId === currentUserId}
          />
        ))}
      </div>
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
}