import React from 'react';
import { EventCard } from './EventCard';
import { Event } from '../../types/Event';

interface EventListProps {
  events: Event[];
}

export function EventList({ events, userRole, activeView ,refreshEvents}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
      {events.map((event) => (
        <EventCard key={event.id} event={event}  userRole={userRole}  activeView={activeView} refreshEvents={refreshEvents}/>
      ))}
    </div>
  );
}