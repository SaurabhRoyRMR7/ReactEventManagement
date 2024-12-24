import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
// import EventService from '../../../services/eventService';  // Implement this service
// import UserService from '../../../services/userService';    // Implement this service

const CreateEventView = () => {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    price: '',
    registrationFields: []
  });

  const [newFormField, setNewFormField] = useState({
    fieldName: '',
    fieldType: 'Text',
    isRequired: false,
    dropdownOptions: [''],
    radioOptions: ['']
  });

  const [registrationFields, setRegistrationFields] = useState([]);
  const [createForm, setCreateForm] = useState(false);
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [organizerId, setOrganizerId] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUserRole = localStorage.getItem('userRole');
    if (!storedUserRole || !storedUserId) {
      navigate('/login');
    }

    setUserId(storedUserId);
    setUserRole(storedUserRole);
    
      const parsedUserId = parseInt(storedUserId, 10);

    const fetchOrganizerId = async () => {
      console.log('In Ftech');
      
      try {
        const token = localStorage.getItem('userToken');  // Get the token from localStorage
    
        if (!token) {
          throw new Error('No token found');
        }
    
        const headers = {
          'Authorization': `Bearer ${token}`,  // Set Authorization header with Bearer token
          'Content-Type': 'application/json',  // Set the Content-Type to JSON
        };
    
        // Make the GET request to fetch the organizer ID
        const response = await axios.get(`https://localhost:7060/api/User/organizerId/${parsedUserId}`, { headers });
        setOrganizerId(response.data);
        console.log(response.data,'rsd')
      } catch (error) {
        console.error('Error fetching OrganizerId:', error);
      }
    };

    fetchOrganizerId();
  }, [navigate]);

  const createEvent = async () => {
    const eventData = {
      ...event,
      registrationFields,
      organizerId
    };

    try {
      const token = localStorage.getItem('userToken');  // Get the token from localStorage
    
      if (!token) {
        throw new Error('No token found');
      }
  
      const headers = {
        'Authorization': `Bearer ${token}`,  // Set Authorization header with Bearer token
        'Content-Type': 'application/json',  // Set the Content-Type to JSON
      };
  console.log(event,'event');
      // Make the POST request to create the event
      const response = await axios.post(`https://localhost:7060/api/Event`, eventData, { headers });
      
      toast.success('Event created successfully');
      alert('Event created successfully!');
      // setEvent(createdEvent);
      resetForm();
      navigate('/dashboard');
    } catch (error) {
      toast.error('Error creating event');
      console.error(error);
    }
  };

  const resetForm = () => {
    setEvent({
      title: '',
      description: '',
      location: '',
      startDate: '',
      endDate: '',
      price: '',
      registrationFields: []
    });
    setRegistrationFields([]);
    setNewFormField({
      fieldName: '',
      fieldType: 'Text',
      isRequired: false,
      dropdownOptions: [''],
      radioOptions: ['']
    });
  };

  const addRegistrationField = () => {
    if (newFormField.fieldName) {
      setRegistrationFields([...registrationFields, newFormField]);
      setNewFormField({
        fieldName: '',
        fieldType: 'Text',
        isRequired: false,
        dropdownOptions: [''],
        radioOptions: ['']
      });
      toast.success('Registration field added successfully');
    } else {
      toast.error('Please provide a valid field name');
    }
  };

  const addFieldOption = () => {
    if (newFormField.fieldType === 'Dropdown') {
      setNewFormField({
        ...newFormField,
        dropdownOptions: [...newFormField.dropdownOptions, '']
      });
    } else if (newFormField.fieldType === 'Radio') {
      setNewFormField({
        ...newFormField,
        radioOptions: [...newFormField.radioOptions, '']
      });
    }
  };

  const removeOption = (index) => {
    if (newFormField.fieldType === 'Dropdown') {
      const updatedOptions = newFormField.dropdownOptions.filter((_, i) => i !== index);
      setNewFormField({ ...newFormField, dropdownOptions: updatedOptions });
      toast.success('Option removed');
    } else if (newFormField.fieldType === 'Radio') {
      const updatedOptions = newFormField.radioOptions.filter((_, i) => i !== index);
      setNewFormField({ ...newFormField, radioOptions: updatedOptions });
      toast.success('Option removed');
    }
  };

  const removeField = (index) => {
    const updatedFields = registrationFields.filter((_, i) => i !== index);
    setRegistrationFields(updatedFields);
    toast.success('Registration field removed');
  };

  const toggleForm = () => {
    setCreateForm(!createForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleNewFieldChange = (e) => {
    const { name, value } = e.target;
    setNewFormField({ ...newFormField, [name]: value });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Create a New Event</h1>
      <form onSubmit={(e) => { e.preventDefault(); createEvent(); }}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold">Enter Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={event.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter Title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold">Enter Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter Description"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-semibold">Enter Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={event.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter Location"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-semibold">Enter Start Date</label>
          <input
            type="datetime-local"
            id="startDate"
            name="startDate"
            value={event.startDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-semibold">Enter End Date</label>
          <input
            type="datetime-local"
            id="endDate"
            name="endDate"
            value={event.endDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-semibold">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={event.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter Payment Amount"
          />
        </div>

        <button
          type="button"
          className="w-full py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={toggleForm}
        >
          Create Form
        </button>

        {createForm && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Add Registration Fields</h3>

            {registrationFields.map((field, i) => (
              <div key={i} className="flex items-center justify-between mb-4 p-4 border border-gray-300 rounded-md">
                <p><strong>Field {i + 1}:</strong> {field.fieldName} (Type: {field.fieldType})</p>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => removeField(i)}
                >
                  Remove Field
                </button>
              </div>
            ))}

            <div className="mb-4">
              <label htmlFor="fieldName" className="block text-sm font-semibold">Field Name</label>
              <input
                type="text"
                id="fieldName"
                name="fieldName"
                value={newFormField.fieldName}
                onChange={handleNewFieldChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Field Name"
                
              />
            </div>

            <div className="mb-4">
              <label htmlFor="fieldType" className="block text-sm font-semibold">Field Type</label>
              <select
                name="fieldType"
                value={newFormField.fieldType}
                onChange={handleNewFieldChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="Text">Text</option>
                <option value="Dropdown">Dropdown</option>
                <option value="Radio">Radio Button</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="isRequired" className="block text-sm font-semibold">Is Required</label>
              <input
                type="checkbox"
                name="isRequired"
                checked={newFormField.isRequired}
                onChange={(e) => setNewFormField({ ...newFormField, isRequired: e.target.checked })}
                className="mr-2"
              />
              <span>Yes</span>
            </div>

            {newFormField.fieldType === 'Dropdown' && (
              <div>
                <label htmlFor="dropdownOptions" className="block text-sm font-semibold">Dropdown Options</label>
                {newFormField.dropdownOptions.map((option, j) => (
                  <div key={j} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const options = [...newFormField.dropdownOptions];
                        options[j] = e.target.value;
                        setNewFormField({ ...newFormField, dropdownOptions: options });
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={`Option ${j + 1}`}
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-red-600"
                      onClick={() => removeOption(j)}
                    >
                      Remove Option
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  onClick={addFieldOption}
                >
                  Add Option
                </button>
              </div>
            )}

            {newFormField.fieldType === 'Radio' && (
              <div>
                <label htmlFor="radioOptions" className="block text-sm font-semibold">Radio Button Options</label>
                {newFormField.radioOptions.map((option, j) => (
                  <div key={j} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const options = [...newFormField.radioOptions];
                        options[j] = e.target.value;
                        setNewFormField({ ...newFormField, radioOptions: options });
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={`Option ${j + 1}`}
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-red-600"
                      onClick={() => removeOption(j)}
                    >
                      Remove Option
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  onClick={addFieldOption}
                >
                  Add Option
                </button>
              </div>
            )}

            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 mt-4"
              onClick={addRegistrationField}
            >
              Add Field
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventView;
