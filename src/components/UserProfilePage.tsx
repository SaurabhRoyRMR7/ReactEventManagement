import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UserEditModal from "./UserEditModal"; // We will create this modal component next
import { Edit, Lock, Mail, User } from "lucide-react";

const UserProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState("");
  const [newValue, setNewValue] = useState("");
  const location = useLocation(); // Get the current URL location
  // const isAdminRoute = location.pathname.includes('/admin');
  const urlParams = new URLSearchParams(location.search);
  const role = urlParams.get('role');

  useEffect(() => {
    // Fetch user profile data
    axios
      .get(`https://localhost:7060/api/User/${userId}`)
      .then((response) => {
        setUser(response.data);
        console.log(response.data,'response of uer');
      })
      .catch((error) => {
        console.error("Error fetching user profile", error);
      });
  }, [userId]);

  const handleEditClick = (field) => {
    setFieldToEdit(field);
    setNewValue(user[field]);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    // Send update request to backend
    const updatedData = { ...user, [fieldToEdit]: newValue };
    console.log(updatedData,'updated data');
    axios
      .put(`https://localhost:7060/api/User/updateUser/${userId}`, updatedData)
      .then((response) => {
        setUser(response.data); // Update state with the new data
        setIsModalOpen(false);
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user profile", error);
        toast.error("Error updating profile.");
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">User Profile</h1>

      <div className="space-y-3">
     
        {/* Name Section */}

        <div className="flex justify-between items-center text-gray-600">
        <div className="flex items-center">
          <User className="w-5 h-5 mr-2" />
          <span>Name: {user.name}</span>
        </div>
        { role !== 'Organizer' && (  <button
          className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
          onClick={() => handleEditClick("name")}
        >
          <Edit className="w-5 h-5 mr-2" />
          Edit
        </button>
        )}
      </div>

      

        {/* Email Section */}

        <div className="flex justify-between items-center text-gray-600">
        <div className="flex items-center">
          <Mail className="w-5 h-5 mr-2" />
          <span>Email: {user.email}</span>
        </div>
        { role !== 'Organizer' && (<button
          className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
          onClick={() => handleEditClick("email")}
        >
          <Edit className="w-5 h-5 mr-2" />
          Edit
        </button>
)}
      </div>

     

      {role==='user' && (
        <div className="flex justify-between items-center text-gray-600">
        <div className="flex items-center">
          <Lock className="w-5 h-5 mr-2" />
          <span>Password: ********</span>
        </div>
        <button
          className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
          onClick={() => handleEditClick("password")}
        >
          <Edit className="w-5 h-5 mr-2" />
          Edit
        </button>
      </div>
      )}

       
        {/* Add additional fields here (e.g., Role, Phone Number, etc.) */}

      </div>

      {/* Modal for editing */}
      {isModalOpen && (
        <UserEditModal
          field={fieldToEdit}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default UserProfile;
