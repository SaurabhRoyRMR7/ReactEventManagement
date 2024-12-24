import React from 'react';
import { ChatRoom } from '../../types/chat';
import { formatDistanceToNow } from 'date-fns';
import { FiMessageCircle } from 'react-icons/fi';  // Chat bubble icon
import { FaRegClock } from 'react-icons/fa';      // Clock icon for timestamps
import { AiOutlineBell } from 'react-icons/ai';    // Bell icon for notifications

interface ChatRoomListProps {
  rooms: ChatRoom[];
  activeRoomId: string;
  onRoomSelect: (roomId: string) => void;
}

export function ChatRoomList({ rooms, activeRoomId, onRoomSelect }: ChatRoomListProps) {
  return (
    <div className="border-r border-gray-200 w-64 bg-white overflow-y-auto">
      <div className="p-4 border-b border-gray-200 bg-gray-100">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center">
          <AiOutlineBell className="mr-2 text-blue-500" />
          Chat Rooms
        </h2>
      </div>
      <div className="divide-y divide-gray-200">
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => onRoomSelect(room.id)}
            className={`w-full text-left p-4 hover:bg-gray-50 focus:outline-none ${
              activeRoomId === room.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Room Name and Icon */}
              <div className="flex items-center">
                <FiMessageCircle className="w-5 h-5 text-gray-500 mr-3" />
                <span className="font-medium text-gray-800">{room.name}</span>
              </div>
              {/* New Message Indicator */}
              
            </div>

            {/* Last Message Preview */}
            {room.lastMessage && (
              <div className="mt-2 text-sm text-gray-600 truncate">
                <span className="text-gray-500">Last Message:</span> {room.lastMessage.content}
              </div>
              
            )}
             <div className="flex items-center text-gray-500">
                  <FaRegClock className="w-4 h-4 mr-1 text-gray-400" />
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(room.lastMessage.timestamp, { addSuffix: true })}
                  </span>
                </div>
          </button>
        ))}
      </div>
    </div>
  );
}
