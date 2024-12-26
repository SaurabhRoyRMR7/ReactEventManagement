import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get route params
import axios from 'axios';
import { AttendeesView } from './dashboard/content/views/AttendeesView';

const ParticipantsList = () => {
  const { eventId } = useParams(); // Get eventId from the route params
  const [participants, setParticipants] = useState<any[]>([]); // State to store participants
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetch participants when the component mounts
  useEffect(() => {
    if (eventId) {
        axios.get(`https://localhost:7060/api/Event/participants/${eventId}`) // Fetch participants for the event
        .then(response => {
          setParticipants(response.data.$values); // Assuming your API returns participants in $values
          console.log(response.data.$values,'participants');
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching participants:', error);
          setLoading(false);
        });
    }
  }, [eventId]); // Re-fetch when eventId changes

  if (loading) {
    return <div>Loading participants...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Participants for Event {eventId}</h2>
      <ul>
        {participants.length === 0 ? (
          <li>No participants available.</li>
        ) : (
         
            <AttendeesView users={participants} refreshEvents={null}/>
         
        )}
      </ul>
    </div>
  );
};

export default ParticipantsList;
