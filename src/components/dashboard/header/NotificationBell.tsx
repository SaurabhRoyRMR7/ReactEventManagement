import React from 'react';
import { Bell } from 'lucide-react';

interface NotificationBellProps {
  notifications: { [key: number]: number };
  activeRoomId: number;
}

export function NotificationBell({ notifications, activeRoomId }: NotificationBellProps) {
  const unreadCount = notifications[activeRoomId] || 0;
  console.log(unreadCount,'unread count ');

  return (
    <button className="relative p-2 text-gray-400 hover:text-gray-500">
      <Bell className="w-6 h-6" />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
      )}
    </button>
  );
}
