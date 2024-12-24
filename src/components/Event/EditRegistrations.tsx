import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditRegistration = ({ registrationId, onCancel }) => {
  const [registrationFields, setRegistrationFields] = useState([]);
  const [registrationResponses, setRegistrationResponses] = useState([]);
  const [eventId, setEventId] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch registration data
    axios.get(`https://localhost:7060/api/Event/EventRegistrationResponse/${registrationId}`)
      .then((response) => {
        const  EventRegistrationResponses  =response.data.response.registrationResponses.$values;
        console.log(response,'res of res ');
        console.log(response.data.response.registrationResponses.$values,'EventRegistrationResponses of res ');

        
        fetchRegistrationFields(response.data.response.eventId); // Assuming these are fetched from the API
        setRegistrationResponses(EventRegistrationResponses);
        setEventId(response.data.response.eventId);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching registration data', error);
        setLoading(false);
        toast.error('Error fetching registration data.');
      });
  }, [registrationId]);
  const fetchRegistrationFields = (eventId: string): void => {
    setLoading(true);
    axios.get(`https://localhost:7060/api/EventRegistrationForm/${eventId}`)
      .then(response => {
        
        setRegistrationFields(response.data.$values);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching registration fields', error);
        setLoading(false);
        toast.error('Error fetching registration fields.');
      });
  };


  const handleFieldChange = (fieldId, responseValue) => {
    const updatedResponses = registrationResponses.map((response) =>
      response.fieldId === fieldId
        ? { ...response, responseValue: responseValue }
        : response
    );
    setRegistrationResponses(updatedResponses);
  };
  const storedUserId = localStorage.getItem('userId');
  const parsedUserId = parseInt(storedUserId, 10);

  const handleSubmit = () => {
    const updatedData = {
      RegistrationCode: generateUniqueCode(),
      RegistrationResponses: registrationResponses.map((response) => ({
        fieldId: response.fieldId,
        responseValue: response.responseValue
      })),
     userId:parsedUserId,
     eventId:eventId

    };

    console.log(updatedData,'updated data');

    const token = localStorage.getItem('userToken');
    const headers = { Authorization: `Bearer ${token}` };

    axios.put(`https://localhost:7060/api/Event/${registrationId}/registrationupdate`, updatedData, { headers })
      .then((response) => {
        toast.success('Registration updated successfully!');
        onCancel(); // Close the modal or navigate to another page
      })
      .catch((error) => {
        console.error('Error updating registration', error);
        toast.error('Error updating registration.');
      });
  };

  const generateUniqueCode = () => {
    return `${new Date().getTime()}`;
  };

 

  return (
   
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    {/* Modal Content */}
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
      <h2 className="text-xl font-bold mb-4">Edit Registration</h2>

      {/* Registration Fields */}
      {registrationFields.map((field, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{field.fieldName}</label>

          {/* Text Field */}
          {field.fieldType === 'Text' && (
            <input
              type="text"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              value={registrationResponses.find((response) => response.fieldId === field.formFieldId)?.responseValue || ''}
              onChange={(e) => handleFieldChange(field.formFieldId, e.target.value)}
            />
          )}

          {/* Dropdown Field */}
          {field.fieldType === 'Dropdown' && (
            <select
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
              value={registrationResponses.find((response) => response.fieldId === field.formFieldId)?.responseValue || ''}
              onChange={(e) => handleFieldChange(field.formFieldId, e.target.value)}
            >
              {field.dropdownOptions.$values.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          )}

          {/* Radio Button Field */}
          {field.fieldType === 'Radio' && (
            <div>
              {field.radioOptions.$values.map((option, idx) => (
                <label key={idx}>
                  <input
                    type="radio"
                    name={field.formFieldId}
                    value={option}
                    checked={registrationResponses.find((response) => response.fieldId === field.formFieldId)?.responseValue === option}
                    onChange={(e) => handleFieldChange(field.formFieldId, e.target.value)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Modal Actions */}
      <div className="flex justify-between">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={handleSubmit}>
          Save
        </button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  </div>
  );
};

export default EditRegistration;
