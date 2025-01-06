import React, { useEffect, useRef } from 'react';
import { Message } from '../../types/chat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Users } from 'lucide-react';

interface ChatRoomProps {
  messages: Message[];
  onSendMessage: (content: string,file?:File) => void;
  currentUserId: number;
  activeRoomId: any;
  showUsers: boolean;
  setShowUsers: (show: any) => void;
  usersInRoom: any[];
}

export function ChatRoom({ messages, onSendMessage, currentUserId, activeRoomId, usersInRoom, showUsers, setShowUsers }: ChatRoomProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  return (

    <div className="flex-1 flex flex-col bg-gray-50 relative">

      <div className="bg-white shadow-md p-4 flex items-center justify-between rounded-t-lg w-full z-10">
        <div className="text-lg font-semibold text-gray-700">
          Chat Room: {`Room ${activeRoomId}`}
        </div>
        <button
          onClick={() => setShowUsers((prev) => !prev)}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          {showUsers ? 'Hide Users' : 'Show Users'}
        </button>
      </div>

      {/* Chat Room Users List */}
      {showUsers && (
        <div className="bg-gray-100 p-4 space-y-2 rounded-b-lg shadow-inner w-full max-h-60 overflow-y-auto absolute top-16 left-0 z-10">
          <div className="text-sm font-semibold text-gray-700">Users ({usersInRoom.length})</div>
          <ul>
            {usersInRoom.map((user) => (
              <li key={user.userId} className="flex items-center a space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>

                <span className="text-gray-800">{user.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Chat Room Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pt-24 pb-20">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwnMessage={message.senderId === currentUserId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
}