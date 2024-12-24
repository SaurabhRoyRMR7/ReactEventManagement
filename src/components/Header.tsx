import React from 'react';

import { LogIn ,LogOut, Settings } from 'lucide-react';
import { NotificationBell } from './dashboard/header/NotificationBell';
import { ProfileButton } from './dashboard/header/ProfileButton';
import {  useNavigate } from 'react-router-dom';
import { useMsal } from "@azure/msal-react";
export function Header() {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const handleLogout = async () => {
    // Logic for logging out (e.g., clear token, redirect to login, etc.)
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userToken');
    localStorage.removeItem('googleLogin');
    localStorage.removeItem('googleUser');

    const storedMicosoftredential = localStorage.getItem('microsoftLogin');

 if(storedMicosoftredential){
    try {
      await instance.logoutPopup(); // Log out the user
      localStorage.clear(); // Optionally clear any tokens stored locally
      alert("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
 

    navigate('/login');
    console.log("Logging out...");
  };
   // Initialize the useNavigate hook

  const handleNavigateToDashboard = () => {
    navigate('/dashboard');  // Navigate to the dashboard route when clicked
  };

  const handleSettings = () => {
    // Logic for settings (e.g., redirect to settings page)
    console.log("Opening settings...");
  };

  return (
    <header className="bg-white shadow">
    <div className="max-w-7xl  px-4 py-4">
      <div className="flex items-center justify-between"> {/* flex layout with justify-between */}
        {/* Event Manager Title */}
        <div className="flex items-start">
          <h1 className="text-2xl font-bold text-gray-900 cursor-pointer"  onClick={handleNavigateToDashboard} >Event Manager</h1>
        </div>

        {/* Buttons Section */}
        <div className="flex items-end">
        <div className="flex items-end space-x-4">
        <div className="flex items-end space-x-4">
          <NotificationBell />
        <ProfileButton/>
        </div>
          {/* Settings Button */}
          <button 
            onClick={handleSettings} 
            className="flex items-end bg-gray-100 text-gray-900 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <Settings className="w-5 h-5 mr-2" />
            <span>Settings</span>
          </button>

          {/* Logout Button */}
          <button 
            onClick={handleLogout} 
            className="flex items-end bg-red-100 text-red-900 py-2 px-4 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <LogOut className="w-5 h-5 mr-2" />
            <span>Logout</span>
          </button>
         
        </div>
        </div>
      </div>
    </div>
  </header>
  );
}
