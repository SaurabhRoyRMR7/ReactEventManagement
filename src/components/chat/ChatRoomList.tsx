import React from 'react';
import { ChatRoom } from '../../types/chat';
import { formatDistanceToNow } from 'date-fns';
import { FiMessageCircle } from 'react-icons/fi';  // Chat bubble icon
import { FaRegClock, FaRestroom } from 'react-icons/fa';      // Clock icon for timestamps
import { AiOutlineBell } from 'react-icons/ai';    // Bell icon for notifications
import { BsPerson, BsPeople } from 'react-icons/bs'; // Personal/Group icons
import { HouseIcon } from 'lucide-react';

interface ChatRoomListProps {
  rooms: ChatRoom[];
  activeRoomId: number;
  onRoomSelect: (roomId: number) => void;
}

export function ChatRoomList({ rooms, activeRoomId, onRoomSelect }: ChatRoomListProps) {
  return (
    <div className="p-4 border-r border-gray-200 w-100 bg-white">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Chat Rooms</h2>
        <button className="text-blue-500 text-lg p-2 hover:bg-gray-100 rounded-full">
          <FiMessageCircle />
        </button>
      </div>
      <div className="space-y-2">
        {rooms.map((room) => (
          <button
            key={room.chatRoomId}
            onClick={() => onRoomSelect(room.chatRoomId)}
            className={`w-full text-left p-4 hover:bg-gray-50 focus:outline-none transition duration-300 ease-in-out rounded-lg ${
              activeRoomId === room.chatRoomId ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <HouseIcon className="w-6 h-6 text-green-500" />
              <span className="font-medium">{room.name}</span>
              {/* {room.unreadMessages > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-semibold">
                  {room.unreadMessages}
                </span> */}
              {/* )} */}
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
              <FaRegClock className="w-4 h-4" />
              <span>
                {/* {room.lastMessage
                  ? formatDistanceToNow(new Date(room.lastMessage.timestamp), { addSuffix: true })
                  : 'No messages yet'} */}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
