import React from 'react';
import { EventList } from '../../../Event/EventList';
import { Event } from '../../../../types/Event';



export function EventsView({ events,userRole,activeView,refreshEvents }) {
  return (
    <div>
      <EventList events={events}  userRole={userRole}  activeView={activeView} refreshEvents={refreshEvents}/>
    </div>
  );
}