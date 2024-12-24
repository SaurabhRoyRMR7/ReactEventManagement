import React from 'react';
import { Message } from '../../types/chat';
import { formatDistanceToNow } from '../dashboard/utils/dateFormatters';
import { DEFAULT_AVATAR } from '../dashboard/utils/constants';
import { FaRegClock } from 'react-icons/fa6';
import { User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

export function ChatMessage({ message, isOwnMessage }: ChatMessageProps) {
  return (
    <div className={`flex items-start space-x-4 p-2 ${isOwnMessage ? 'justify-end' : ''}`}>
      {/* Avatar for non-own messages */}
      {!isOwnMessage && (
         <User className="w-6 h-6 text-gray-500" />
      )}

      {/* Message content */}
      <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
        {/* Sender's name (only for non-own messages) */}
        {!isOwnMessage && (
          <span className="text-sm font-semibold text-gray-600">{message.senderName}</span>
        )}

        {/* Message content */}
        <div
          className={`bg-gray-200 p-2 rounded-lg max-w-xs sm:max-w-md md:max-w-lg ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
        >
          <p>{message.content}</p>
        </div>

        {/* Timestamp */}
        <div className="flex items-center text-gray-500">
                  <FaRegClock className="w-4 h-4 mr-1 text-gray-400" />
                  <span className="text-xs text-gray-400">
                  {formatDistanceToNow(message.timestamp)} ago
                  </span>
                </div>
       
      </div>
    </div>
  );
}
