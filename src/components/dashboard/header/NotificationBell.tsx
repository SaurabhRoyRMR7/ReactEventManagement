import React from 'react';
import { Bell } from 'lucide-react';

export function NotificationBell() {
  return (
    <button className="relative p-2 text-gray-400 hover:text-gray-500">
      <Bell className="w-6 h-6" />
      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
    </button>
  );
}