import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Toast notifications for success and error messages

const RoleEditPopup = ({ user, roles, onClose, onRoleUpdate }: any) => {
  const [selectedRole, setSelectedRole] = useState(user.selectedRole);

  const handleUpdate = () => {
    if (selectedRole === user.selectedRole) {
      toast.error('No role change detected.');
      return;
    }

    onRoleUpdate(user.userId, selectedRole); 
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit User Role</h2>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700">Select Role</label>
          <select
            id="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(Number(e.target.value))}
            className="form-select block w-full mt-2 p-2 border rounded-md"
          >
            {roles.map((role: any) => (
              <option key={role.userRoleId} value={role.userRoleId}>
                {role.roleName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Update Role
          </button>
        </div>
      </div>
    </div>
  );
};
export default RoleEditPopup;