import React, { useEffect, useState } from 'react';
import { Event } from '../../../types/Event'
import { EventsView } from './views/EventsView';
import CreateEventView  from './views/CreateEventView';
import { AttendeesView } from './views/AttendeesView';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ChatView } from './views/ChatView';
interface DashboardContentProps {
  activeView: string;
  events: Event[];
  userRole: any;
 
}

export function DashboardContent({ activeView, events, userRole}: DashboardContentProps) {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [myevents, setEvents] = useState<Event[]>([]); 
  const [allevents, setAllEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<any[]>([]);   
  const [error, setError] = useState<string>('');  

  const fetchOrganizerEvent = (userId: number) => {
    setLoading(true);  // Start loading
    setError(''); // Clear previous errors

    axios
      .get(`https://localhost:7060/api/Event/organizer/${userId}/events`)
      .then((response) => {
        if (response.data && Array.isArray(response.data.$values)) {
          setEvents(response.data.$values); 
         
        } else {
          setEvents([]);  
          console.error('Invalid response format', response);
        }
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        setError('Error fetching events');
        setEvents([]);  // Set events to empty in case of error
      })
      .finally(() => {
        setLoading(false);  // Set loading to false after API call completes
      });
  };



  const loadUpcomingEvents = (userId) => {
    setLoading(true);
    axios
      .get(`https://localhost:7060/api/Event/upcoming`)
      .then((response) => {
        const events = response.data.$values;
        setUpcomingEvents(events);
      })
      .catch((error) => {
        console.error('Error loading upcoming events', error);
        toast.error('An error occurred while loading upcoming events.');
      })
      .finally(() => {
        setLoading(false); // Set loading to false once API call is done
      });
  };
  const loadRegisteredEvents = (userId) => {
    axios.get(`https://localhost:7060/api/Event/GetRegisteredEvents/${userId}`)
      .then(response => {
        setRegisteredEvents(response.data.$values);
      })
      .catch(error => {
        console.error('Error loading registered events', error);
      });
  };
  const loadEvents = () => {
    setLoading(true); // Set loading to true before API call
    setError(null); // Reset error state before new request

    axios
      .get('https://localhost:7060/api/Event/events') // Replace with your API URL
      .then((response) => {
        if (response.data && Array.isArray(response.data.$values)) {
          setAllEvents(response.data.$values); // Set the events from the response
        } else {
          console.error('Invalid response format', response);
          setAllEvents([]); // Set events to an empty array if the response format is invalid
        }
      })
      .catch((error) => {
        console.error('Error fetching events', error);
        setError('Error fetching events'); // Set error state if the request fails
        toast.error('Error fetching events'); // Display error toast message (similar to Toastr in Angular)
      })
      .finally(() => {
        setLoading(false); // Set loading to false after API call finishes
      });
  };
  const getUsers = () => {
    setLoading(true);  // Set loading to true when the request starts
    const token = localStorage.getItem('userToken');
    axios.get('https://localhost:7060/api/User/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        const usersData = response.data.$values;
        setUsers(usersData);  // Set users data from response
        console.log(usersData);
        
        usersData.forEach((user: any) => {
          user.selectedRole = user.userRoleId;  
          if(user.userRoleId==7){
            user.userRole='Participant'
          }
          else if(user.userRoleId==8){
            user.userRole='Organizer'
          }
          else if(user.userRoleId==9){
            user.userRole='Admin'
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching users', error);
        toast.error('Error fetching users.');  // Show an error toast if there's an issue
      })
      .finally(() => {
        setLoading(false);  // Set loading to false when the request completes
      });
  };

  const refreshEvents = () => {
    if (activeView === 'upcoming-events') {
      const storedUserId = localStorage.getItem('userId');
      const parsedUserId = parseInt(storedUserId, 10);
      loadUpcomingEvents(parsedUserId);
    }
    if (activeView === 'registered-events') {
      const storedUserId = localStorage.getItem('userId');
      const parsedUserId = parseInt(storedUserId, 10);
      loadRegisteredEvents(parsedUserId);
    }
    if (activeView === 'events') {
      const storedUserId = localStorage.getItem('userId');
      const parsedUserId = parseInt(storedUserId, 10);
      fetchOrganizerEvent(parsedUserId);
    }
    if (activeView === 'all-events') {
      loadEvents();
    }
    if (activeView === 'users') {
      getUsers();
    }
  };


  // Using useEffect to load upcoming events when the activeView changes to 'upcoming-events'
  useEffect(() => {
    if (activeView === 'upcoming-events') {
      const storedUserId = localStorage.getItem('userId');
      const parsedUserId = parseInt(storedUserId, 10);
      loadUpcomingEvents(parsedUserId);
    }
    if (activeView === 'registered-events') {
      const storedUserId = localStorage.getItem('userId');
      const parsedUserId = parseInt(storedUserId, 10);
      loadRegisteredEvents(parsedUserId);
    }
    if (activeView === 'events') {
      const storedUserId = localStorage.getItem('userId');
      const parsedUserId = parseInt(storedUserId, 10);
      fetchOrganizerEvent(parsedUserId);
    }
    if (activeView === 'all-events') {
      loadEvents();
    }
    if (activeView === 'users') {
      getUsers();
    }


  }, [activeView]);
  const renderContent = () => {
    switch (activeView) {

      case 'events':
      
        return <EventsView events={myevents} userRole={userRole}  activeView={activeView} refreshEvents={refreshEvents} />;
     
        case 'all-events':
        
        return <EventsView events={allevents} userRole={userRole}   activeView={activeView} refreshEvents={refreshEvents}/>;
      
        case 'upcoming-events':
       
       
        return <EventsView events={upcomingEvents} userRole={userRole}   activeView={activeView} refreshEvents={refreshEvents} />;
     
        case 'registered-events':
      
        return <EventsView events={registeredEvents} userRole={userRole}   activeView={activeView} refreshEvents={refreshEvents} />;

      case 'create':
        return <CreateEventView />;
      case 'users':
        return <AttendeesView users={users} refreshEvents={refreshEvents} />;
        case 'chat':
          return <ChatView />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold">Select a view</h2>
            <p className="text-gray-500 mt-2">Choose an option from the sidebar</p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-8">
      {renderContent()}
    </div>
  );
}