import React from 'react';
import { Calendar, Users, Settings, PlusCircle, List, MessageCircle, LocateIcon, MapIcon, Map, MapPin } from 'lucide-react';
import { UserProfile } from './UserProfile';
import { SidebarButton } from './SidebarButton';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  user:any;
  userRole:string;
}

export function Sidebar({ activeView, onViewChange,user,userRole }: SidebarProps) {
  const navigationItems = [
    { id: 'events', label: 'My Events', icon: List },
    { id: 'upcoming-events', label: 'Upcoming Events', icon: Calendar },
    { id: 'all-events', label: 'All Events', icon: List },
    { id: 'registered-events', label: 'Registered Events', icon: List },
    { id: 'location-events', label: 'Location', icon: MapPin },
    { id: 'create', label: 'Create Event', icon: PlusCircle },
    { id: 'users', label: 'All Users', icon: Users },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
   { id: 'settings', label: 'Settings', icon: Settings },

  ];
  const filteredNavigationItems = navigationItems.filter(item => {
    if (userRole === 'Organizer') {
      // Organizers should not see 'Users' and 'All Events' buttons
      return item.id !== 'users' && item.id !== 'all-events';
    }
    if (userRole === 'Participant') {
      // Participants should not see 'All Events' and 'Users' buttons
      return item.id !== 'all-events' && item.id !== 'users' && item.id !== 'create' && item.id!=='events';
    }
    // By default, all roles can see these items
    return true;
  });

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <UserProfile 
        name={user.name}
        email={user.email}
        role={user.userRole}
      />
      
      <nav className="flex-1 pt-4">
         {filteredNavigationItems.map((item) => (
          <SidebarButton
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeView === item.id}
            onClick={() => {
              console.log("view change",item.id);
              onViewChange(item.id)}}
              userRole={userRole}
          />
        ))}
      </nav>
    </div>
  );
}