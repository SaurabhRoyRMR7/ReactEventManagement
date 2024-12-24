import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Users, Share2, Text } from 'lucide-react';  // Share2 for the share icon
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { CiMoneyBill } from 'react-icons/ci';
import { FaFacebookF, FaLinkedinIn, FaEnvelope } from 'react-icons/fa'; 
import { BiRegistered } from 'react-icons/bi';
interface EventDetailPageProps {
  eventId: number;
}

const EventDetailPage = () => {
  const [event, setEvent] = useState<any>(null);
  const { eventId } = useParams<{ eventId: string }>(); // Getting event ID from the URL
  const [isRegistered, setIsRegistered] = useState<boolean | null>(false);
  const storedRole = localStorage.getItem('userRole');
    const storedUserId = localStorage.getItem('userId');
    const storedGoogleCredential= localStorage.getItem('googleLogin');
  const parsedUserId = parseInt(storedUserId, 10);
  const navigate = useNavigate()
  if (((!storedRole || !storedUserId!)&& !storedGoogleCredential)) {
    navigate('/login');
   }

  useEffect(() => {
    const fetchRegistrationStatus = async () => {
      try {
        const response = await axios.get(`https://localhost:7060/api/Event/${eventId}/is-registered/${parsedUserId}`);
        setIsRegistered(response.data.isRegistered);


      } catch (error) {
        console.error('Error fetching registration status:', error);
      }
    };

    fetchRegistrationStatus();
  }, [eventId]);
  // Fetch the event details by event ID
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7060/api/Event/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  const handleUnregisterClick = async () => {
    const userId = parseInt(localStorage.getItem('userId') || '', 10);

    if (window.confirm('Are you sure you want to unregister from this event?')) {
      try {
        const registrationDTO = {
          UserId: userId,
          EventId: eventId,
        };


        await axios.post(
          `https://localhost:7060/api/Event/${eventId}/unregister`,
          registrationDTO
        );
       
        alert('You have successfully unregistered from the event.');

        setIsRegistered(false); // Update the local state to reflect unregistration
      } catch (error) {
        console.error('Error unregistering from event:', error);
        alert('An error occurred while unregistering from the event.');
      }
    }
  };

  const handleRegisterNowClick = () => {
    navigate(`/event-registration/${eventId}`);
  };

  // Function to share the event
  const shareOnSocialMedia = (platform: string) => {
    const eventUrl = `https://localhost:3000/event/${eventId}`;  // Use actual event URL
   
  const eventTitle = encodeURIComponent(event.title);
  const eventDescription = encodeURIComponent(event.description);
  const eventLocation = encodeURIComponent(event.location);
  const eventDate = encodeURIComponent(event.startDate.slice(0, 10)); 
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}&quote=${eventTitle}%0A${eventDescription}%0A${eventLocation}%0A${eventDate}`;
        break;
      case 'linkedin':
       shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventUrl)}&title=${eventTitle}&summary=${eventDescription}&source=${eventLocation}`;
        break;
      default:
        break;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };
  const shareOnEmail = () => {
    const eventUrl = `https://localhost:3000/event/${eventId}`; // Use actual event URL
    const subject = `Check out this event: ${event.title}`;
    const body = `Hey, I wanted to share this event with you!\n\nTitle: ${event.title}\nDate: ${event.startDate.slice(0, 10)}\nTime: ${event.startDate.slice(11)}\nLocation: ${event.location}\nDescription: ${event.description}\nPrice: ₹${event.price}\n\nYou can register for the event here: ${eventUrl}`;

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };


  if (!event) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{event.title}</h2>

      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 mr-2" />
          <span>Date: {event.startDate.slice(0, 10)}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Clock className="w-5 h-5 mr-2" />
          <span>Time: {event.startDate.slice(11)}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-2" />
          <span>Location: {event.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Text className="w-5 h-5 mr-2" />
          <span>Description: {event.description}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <CiMoneyBill className="w-5 h-5 mr-2" />
          <span>Price: ₹{event.price}</span>
        </div>
      </div>

      <div className="flex space-x-4 mt-6">
      <button
  className="mt-6 w-full sm:w-auto bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center"
  onClick={() => shareOnSocialMedia('facebook')}
>
  <FaFacebookF className="w-5 h-5 mr-2" />
 
  Share on Facebook
</button>

        <button
  className="mt-6 w-full sm:w-auto bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center"
         
          onClick={() => shareOnSocialMedia('linkedin')}
        >
             <FaLinkedinIn className="w-5 h-5 mr-2" />
          Share on LinkedIn
        </button>
        <button
           className="mt-6 w-full sm:w-auto bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center"

          onClick={shareOnEmail}
        >
             <FaEnvelope className="w-5 h-5 mr-2" />
          Share on Email
        </button>


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
      </div>
    </div>
  );
};

export default EventDetailPage;
