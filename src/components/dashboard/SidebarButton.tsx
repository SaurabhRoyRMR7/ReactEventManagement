import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarButtonProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
  userRole:string;
}

export function SidebarButton({ icon: Icon, label, isActive = false, onClick,userRole }: SidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
        isActive 
          ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );
}