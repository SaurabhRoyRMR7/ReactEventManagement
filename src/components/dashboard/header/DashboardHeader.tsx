import React from 'react';
import { NotificationBell } from './NotificationBell';
import { ProfileButton } from './ProfileButton';

interface DashboardHeaderProps {
  title: string;
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <div className="flex items-center space-x-4">
         
          
        </div>
      </div>
    </div>
  );
}