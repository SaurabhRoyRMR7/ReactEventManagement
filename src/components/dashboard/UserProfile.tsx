import React from 'react';
import { User } from 'lucide-react';

interface UserProfileProps {
  name: string;
  email: string;
  imageUrl?: string;
  role:string
}

export function UserProfile({ name, email, role,imageUrl }: UserProfileProps) {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {/* {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          ) : ( */}
            <User className="w-6 h-6 text-gray-500" />
          {/* )} */}
        </div>
        <div>
        <p className="text-sm text-red-500">{role}</p>
          <h3 className="font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{email}</p>
        
          
        </div>
        
      </div>
    </div>
  );
}