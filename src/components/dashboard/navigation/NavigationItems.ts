import { Calendar, Users, Settings, PlusCircle, List } from 'lucide-react';

export const navigationItems = [
  { id: 'events', label: 'My Events', icon: Calendar },
  { id: 'create', label: 'Create Event', icon: PlusCircle },
  { id: 'attendees', label: 'Attendees', icon: Users },
  { id: 'all-events', label: 'All Events', icon: List },
  { id: 'settings', label: 'Settings', icon: Settings },
];