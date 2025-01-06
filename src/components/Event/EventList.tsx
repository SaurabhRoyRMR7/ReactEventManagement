import React, { useState } from 'react';
import { EventCard } from './EventCard';
import { Event } from '../../types/Event';

interface EventListProps {
  events: Event[];
}

export function EventList({ events, userRole, activeView ,refreshEvents}) {
  const [locationFilter, setLocationFilter] = useState('');
  const filteredEvents = activeView === 'location-events' && locationFilter
  ? events.filter(event => event.location.toLowerCase().includes(locationFilter.toLowerCase()))
  : events;
  return (
    
    <div>
    {/* Location Input Bar for activeView 'location-events' */}
    {activeView === 'location-events' && (
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded-lg shadow-sm"
          placeholder="Enter location to filter events"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
      </div>
    )}

    {/* Event Grid */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredEvents.map((event) => (
        <EventCard 
          key={event.id} 
          event={event} 
          userRole={userRole} 
          activeView={activeView} 
          refreshEvents={refreshEvents} 
        />
      ))}
    </div>
  </div>
  );
}