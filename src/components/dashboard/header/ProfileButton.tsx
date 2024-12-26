import React from 'react';
import { useNavigate } from 'react-router-dom';


export function ProfileButton() {
  const navigate = useNavigate();
  const userProfile= ()=>{
    const storedUserId = localStorage.getItem('userId');
    const parsedUserId = parseInt(storedUserId, 10);

    navigate(`/dashboard/user/${parsedUserId}/profile?role=user`);
  }
  return (
    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
    onClick={userProfile} >
      View Profile
    </button>
  );
}