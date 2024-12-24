import React,{ useState,useEffect }  from 'react';
import { Users, Calendar, Mail, User } from 'lucide-react'; 
import RoleEditPopup from './RoleEditPopup';
import { toast } from 'react-toastify';
import axios from "axios";
import { useLocation } from 'react-router-dom';


interface UserCardProps {
  user: {
    name: string;
    email: string;
    userRole: string;
    joinDate: string; // Assuming join date is in ISO format (e.g., "2021-12-01T10:00:00Z")
    profilePicture: string; // URL for the user's profile picture
  };
}

export function UserCard({ user , refreshEvents}) {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isParticipantsRoute, setIsParticipantsRoute] = useState(false);
  const location = useLocation(); 
  
  const roles = [
    { userRoleId: 7, roleName: 'Participant' },
    { userRoleId: 8, roleName: 'Organizer' },
    { userRoleId: 9, roleName: 'Admin' },
  ];
  


  const updateRole = (userId: number, userRoleId: number) => {
   console.log(userId,userRoleId,'user');
   const token = localStorage.getItem('userToken'); // Get the token from localStorage
  
  // Check if the token exists
  if (!token) {
    toast.error('No token found, please log in again.');
    return;
  }

  // Set headers with Authorization Bearer token
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Make PUT request to the backend API to update the user role
  axios
    .put(`https://localhost:7060/api/User/user/UpdateUserRole/${userId}`, { UserRoleId: userRoleId }, { headers })
    .then((response) => {
      toast.success('User role updated successfully!');
      refreshEvents();
      console.log(response.data); // Log the response for debugging
    })
    .catch((error) => {
      console.error('Error updating user role', error);
      toast.error('Failed to update user role!');
    });
  };
  const deleteUser = async (userId: number) => {
    // Show confirmation dialog
    if (window.confirm('Are you sure you want to delete this user?')) {
      const token = localStorage.getItem('userToken'); // Get the token from localStorage
  
      // If token doesn't exist, notify user to log in
      if (!token) {
        toast.error('No token found, please log in again.');
        return;
      }
  
      // Set headers with Authorization Bearer token
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      // Make DELETE request to the backend API to delete the user
      try {
        await axios.delete(`https://localhost:7060/api/User/users/DeleteUser/${userId}`, { headers });
  
        toast.success('User deleted successfully!');
        // Optionally call a function to refresh the list of users
        // getUsers(); // You can call your function to refresh the user list
        refreshEvents();
      } catch (error) {
        console.error('Error deleting user', error);
        toast.error('Error deleting user!');
      }
    }
  };
  useEffect(() => {
    // Check if the current path contains "participants"
    if (location.pathname.includes('participants')) {
      setIsParticipantsRoute(true);
    } else {
      setIsParticipantsRoute(false);
    }
  }, [location]);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img 
            // src={user.profilePicture} 
            // alt={`${user.name}'s profile`} 
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Mail className="w-5 h-5 mr-2" />
            <span>Email: {user.email}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <User className="w-5 h-5 mr-2" />
            <span>Role: {user.userRole}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-2" />
            <span>J</span>
          </div>
        </div>

        <div className="flex flex-wrap space-x-4">
  <button 
    className="mt-6 w-full sm:w-auto bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition-colors"
   
  >
   View Profile
  </button>
  {!isParticipantsRoute && (
        <>
          <button
            className="mt-6 w-full sm:w-auto bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => deleteUser(user.userId)}
          >
            Delete
          </button>
          <button
            className="mt-6 w-full sm:w-auto bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => {
              setSelectedUser(user);
              setShowPopup(true);
            }}
          >
            Edit
          </button>
        </>
      )}
</div>
      </div>
       {/* Popup for editing user role */}
       {showPopup && selectedUser && (
        <RoleEditPopup
          user={selectedUser}
          roles={roles}
          onClose={() => setShowPopup(false)}
          onRoleUpdate={updateRole}
        />
      )}
      
    </div>
    
  );
}
