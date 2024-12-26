import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import Registration from './components/auth/Registration';
import Login from './components/auth/Login';
import { Header } from './components/Header.tsx';
import { EventCard } from './components/Event/EventCard.tsx';
import { sampleEvents } from './data/sampleEvents.ts';
// import { Dashboard } from './components/Dashboard.tsx';
import {Dashboard} from "./components/dashboard/Dashboard.tsx"
import EventRegistration from "./components/Event/EventRegistration.tsx"
import { AttendeesView } from './components/dashboard/content/views/AttendeesView';
import Participants from "./components/Participants.tsx";
import EventDetailPage from "./components/Event/EventDetails.tsx"
import  UserProfilePage from './components/UserProfilePage.tsx';
function App() {
  return (
    <Router>
     <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard  />} />
      <Route path="/event-registration/:eventId" element={<EventRegistration />} />
      <Route path="/event/:eventId/participants" element={<Participants />} />
      <Route path="/event/:eventId" element={<EventDetailPage />} />
      <Route path="/dashboard/user/:userId/profile" element={<UserProfilePage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
    </div>
   
  </Router>
    
   
  );
}

export default App;
