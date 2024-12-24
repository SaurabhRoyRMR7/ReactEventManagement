import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Users, Share2, MoreHorizontal,ArrowRight } from 'lucide-react';
import { Event } from '../../types/Event';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserCard } from '../UserCard';
import EditRegistration from './EditRegistrations';
interface EventCardProps {
  event: Event;
  user
}

export function EventCard({ event, userRole, activeView, refreshEvents }) {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(false);
  const [isPublished, setIsPublished] = useState<boolean>(event.isPublished);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [selectedEventParticipants, setSelectedEventParticipants] = useState<any[]>([]); // Participants for the selected event
  const [viewParticipants, setViewParticipants] = useState<boolean>(false); // Toggle view of participants
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null); // The ID of the selected event
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);


  const navigate = useNavigate();
  const handleRegisterNowClick = () => {
    navigate(`/event-registration/${event.eventId}`);
  };
  const storedUserId = localStorage.getItem('userId');
  const parsedUserId = parseInt(storedUserId, 10);

  const openEventDetailPage = () => {
    navigate(`/event/${event.eventId}`);  // Navigate to the event detail page
  };

  useEffect(() => {
    const fetchRegistrationStatus = async () => {
      try {
        const response = await axios.get(`https://localhost:7060/api/Event/${event.eventId}/is-registered/${parsedUserId}`);
        setIsRegistered(response.data.isRegistered);


      } catch (error) {
        console.error('Error fetching registration status:', error);
      }
    };

    fetchRegistrationStatus();
  }, [event.eventId]);
  const handleUnregisterClick = async () => {
    const userId = parseInt(localStorage.getItem('userId') || '', 10);

    if (window.confirm('Are you sure you want to unregister from this event?')) {
      try {
        const registrationDTO = {
          UserId: userId,
          EventId: event.eventId,
        };


        await axios.post(
          `https://localhost:7060/api/Event/${event.eventId}/unregister`,
          registrationDTO
        );
        refreshEvents();
        alert('You have successfully unregistered from the event.');

        setIsRegistered(false); // Update the local state to reflect unregistration
      } catch (error) {
        console.error('Error unregistering from event:', error);
        alert('An error occurred while unregistering from the event.');
      }
    }
  };

  useEffect(() => {
    const fetchPublishStatus = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7060/api/Event/${event.eventId}/publish-status`
        );
        setIsPublished(event.isPublished);
      } catch (error) {
        console.error('Error fetching publish status:', error);
      }
    };

    fetchPublishStatus();
  }, [event.eventId]);
  const handlePublishClick = async () => {
    try {
      setIsClicked(true);
      const token = localStorage.getItem('userToken');
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.put(
        `https://localhost:7060/api/Event/${event.eventId}/publish`,
        {},
        { headers }
      );

      if (response.status === 200) {
        setIsPublished(!isPublished); // Toggle publish status after successful update
      }
    } catch (error) {
      console.error('Error updating publish status:', error);
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const token = localStorage.getItem('userToken');
        const headers = { Authorization: `Bearer ${token}` };

        // Sending DELETE request to delete the event
        const response = await axios.delete(
          `https://localhost:7060/api/Event/DeleteEvent/${event.eventId}`,
          { headers }
        );

        if (response.status === 200) {
          // Refresh the events list after successful deletion
          refreshEvents();
          alert('Event deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event.');
      }
    }
  };
  const viewEventParticipants = (eventId: number) => {
    if (activeView === 'events') {
      navigate(`/event/${eventId}/participants`);
    }

  };
  const handleEditClick = () => {
    setEditModalOpen(true);
    if (event.eventId && parsedUserId) {
      axios
        .get(`https://localhost:7060/api/Event/GetRegistrationIdByEventAndUser?eventId=${event.eventId}&userId=${parsedUserId}`)
        .then((response) => {
          setRegistrationId(response.data.registrationId);
          console.log(response.data, 'reg id data');
        })
        .catch((error) => {
          console.error("Error fetching registration ID", error);
          toast.error('Error fetching registration ID.');
        });
    }
    console.log(registrationId,'check');
   
  };

  const showAdminButtons = userRole === 'Admin' && (activeView === 'all-events' || activeView === 'events');
  const showOrganizerButtons = userRole === "Organizer" && activeView === 'events';
  const showEditEventRegistrationButtons = activeView === 'registered-events';
  console.log(showOrganizerButtons, userRole, activeView, 'check');

  const shareOnSocialMedia = (platform: string) => {
    const eventUrl = `https://yourwebsite.com/event/${event.eventId}`; // Replace with your actual event URL
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventUrl)}`;
        break;
      default:
        break;
    }
  // Open the share URL in a new window
  window.open(shareUrl, '_blank', 'width=600,height=400');
};
  console.log(event, 'event')
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative p-6">
      <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={openEventDetailPage}
        >
       <ArrowRight className="w-6 h-6 text-gray-600" />
        </button>
        <h2 className={`text-xl font-semibold text-gray-900 mb-4 ${activeView ==='events' ? 'cursor-poniter' : "" } `}  onClick={() => viewEventParticipants(event.eventId)}>{event.title}</h2>
         <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-2" />
            <span>Date: {event.startDate.slice(0, 10)}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2" />
            <span>Time: {event.startDate.slice(11, event.startDate.length)}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2" />
            <span>Location: {event.location}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Users className="w-5 h-5 mr-2" />
            <span>Price: ₹{event.price}</span>
          </div>
        </div>

        <div className="flex flex-wrap space-x-4">
          {/* Conditionally render Register/Unregister button */}
          {isRegistered == true ? (
            <button
              className="mt-6 w-full sm:w-auto bg-gray-600 text-white py-1 px-4 rounded-md hover:bg-warning-700 transition-colors"
              onClick={handleUnregisterClick}
            >
              Unregister
            </button>
          ) : (
            <button
              className="mt-6 w-full sm:w-auto bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleRegisterNowClick}
            >
              Register
            </button>
          )}
         
          {showAdminButtons && (
            <>
              <button
                className={`mt-6 w-full sm:w-auto py-1 px-4 rounded-md transition-colors ${isPublished ? 'bg-red-600 hover:bg-red-700  text-white' : 'bg-blue-600 hover:bg-blue-700  text-white'
                  }`}
                onClick={handlePublishClick}
              >
                {isPublished ? 'Unpublish' : 'Publish'}
              </button>
              <button
                className="mt-6 w-full sm:w-auto bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </>
          )}

          {showOrganizerButtons && (
            <>
              <button
                className={`mt-6 w-full sm:w-auto py-1 px-4 rounded-md transition-colors ${isPublished ? 'bg-red-600 hover:bg-red-700  text-white' : 'bg-blue-600 hover:bg-blue-700  text-white'
                  }`}
                onClick={handlePublishClick}
              >
                {isPublished ? 'Unpublish' : 'Publish'}
              </button>
              <button
                className="mt-6 w-full sm:w-auto bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </>
          )}
          {showEditEventRegistrationButtons && (
            <>

              <button
                className="mt-6 w-full sm:w-auto bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleEditClick}
              >
                Edit Registration
              </button>
              {editModalOpen && (
                <EditRegistration registrationId={registrationId} onCancel={() => setEditModalOpen(false)} />
              )}
            </>
          )}
        </div>


      </div>


    </div>
  );
}