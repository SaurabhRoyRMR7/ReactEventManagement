import React from "react";

const EditModal = ({ field, value, onChange, onClose, onUpdate }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit {field}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {field.charAt(0).toUpperCase() + field.slice(1)}:
          </label>
          <input
            type="text"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md"
            value={value}
            onChange={onChange}
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={onUpdate}
          >
            Update
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
