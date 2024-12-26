import React, { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { DashboardHeader } from './header/DashboardHeader';
import { DashboardContent } from './content/DashboardContent';
import { getViewTitle } from './utils/viewTitles';
import { sampleEvents } from '../../data/sampleEvents';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../authConfig';

export function Dashboard() {
  const [activeView, setActiveView] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState({});

  // const [roles, setRoles] = useState([]);
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState(null);
  const { instance, accounts } = useMsal();
  useEffect(() => {
    // Get userRole and userId from localStorage
    const storedRole = localStorage.getItem('userRole');
    const storedUserId = localStorage.getItem('userId');
    const storedGoogleCredential = localStorage.getItem('googleLogin');
    const storedMicosoftredential = localStorage.getItem('microsoftLogin');


    if (((!storedRole || !storedUserId!) && !storedGoogleCredential && !storedMicosoftredential)) {
      navigate('/login');
    }

    setUserRole(storedRole);
    setUserId(storedUserId);
    console.log(userId, 'id');

    const parsedUserId = parseInt(storedUserId, 10);



    fetchUserProfile(parsedUserId, storedMicosoftredential, storedUserId);
   

  }, []);

 


  const fetchUserInfo = async () => {
    try {
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });

      console.log(response, 'response by instance');

      const user = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
          Authorization: `Bearer ${response.accessToken}`,
        },
      });
      const userData = await user.json();
      console.log(userData, 'userData');
      setUserInfo(userData);



      const registrationData =

      {
        name: userData.displayName,
        email: userData.mail,
        password: userData.mail,
        userRoleId: 7,
        googleId: userData.mail

      }

      console.log(registrationData, 'registration dtaatata');

      try {

        const userExistence = await axios.get(`https://localhost:7060/api/User/user/GetUserByEmail/${userData.mail}`);
        console.log(userExistence, 'user existence');

        const backendResponse = await axios.post("https://localhost:7060/api/User/google-login", { email: userData.mail });
        handleUserBackendResponse(backendResponse);



      }
      catch (err) {
        console.log(err, err.error, 'error check');
         
        if (err.response.status == 401) {
          try {
            const response = await axios.post('https://localhost:7060/api/User/register', registrationData);
            console.log(response, 'res');
            if (response.status === 201) {
              const backendResponse = await axios.post("https://localhost:7060/api/User/google-login", { email: userData.mail });
              handleUserBackendResponse(backendResponse);
            }
          } catch (err) {
            console.error(err);
          }

        }

      }






    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const handleUserBackendResponse = (backendResponse) => {
    console.log(backendResponse, 'backend response');
    const { userId, userRole } = backendResponse.data.response;
    const token = backendResponse.data.token;
    localStorage.setItem("userId", userId.toString());
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("userToken", token);
    setUserRole(userRole);
    const storedUserId = localStorage.getItem('userId');
    const storedMicosoftredential = localStorage.getItem('microsoftLogin');
    fetchUserProfile(userId, storedMicosoftredential, storedUserId);
  }

  // Fetch user profile
  const fetchUserProfile = async (userId, storedMicosoftredential, storedUserId) => {

    if (storedMicosoftredential == null || storedUserId) {
      axios.get(`https://localhost:7060/api/User/${userId}`)
        .then(response => {
          setUser(response.data);
          console.log(response.data, 'user data');

        })
        .catch(error => {
          console.error('Error fetching user profile', error);
        });
    }

    else {
      fetchUserInfo();
    };



  };









  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        user={user}
        userRole={userRole}
      />

      {/* Main Dashboard */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Header */}
        <DashboardHeader title={getViewTitle(activeView)} />

        {/* Dashboard Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4">
          <DashboardContent
            activeView={activeView}
            events={sampleEvents}
            userRole={userRole}
          />
        </div>
      </div>
    </div>
  );
}