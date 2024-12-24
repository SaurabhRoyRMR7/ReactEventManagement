import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EventRegistration = () => {
  const [registrationFields, setRegistrationFields] = useState<any[]>([]); // State for registration fields
  const [registrationResponses, setRegistrationResponses] = useState<any[]>([]); // State for user responses
  const [amount, setAmount] = useState<number>(0);
  const [userId, setUserId] = useState<number>(1); // default user ID
  const [userRole, setUserRole] = useState<string>(''); // default user role
  const [loading, setLoading] = useState<boolean>(false);

  const { eventId, amount: routeAmount } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!eventId) {
      toast.error("Event ID is missing.");
      return;
    }

    setAmount(Number(routeAmount) || 0);

    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId ? parseInt(storedUserId, 10) : 1);

    const storedUserRole = localStorage.getItem('userRole');
    setUserRole(storedUserRole || '');

    if (!storedUserRole || !storedUserId) {
      navigate('/login');
    }

    fetchRegistrationFields(eventId);

  }, [eventId, routeAmount]);

  useEffect(()=>{
    console.log(registrationFields);
    registrationFields.forEach((f,i)=>{
      registrationResponses[i]={FieldId:f.formFieldId,ResponseValue:f.dropdownOptions['$values'][0]};
    })
  },[registrationFields])

  // Function to generate a unique registration code
  const generateUniqueCode = (userId: number, eventId: number): string => {
    const timestamp = new Date().toISOString();
    return `${userId}-${eventId}-${timestamp}`;
  };

  // Fetch the registration fields for the event
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

  // Handle form field changes
  const handleFieldChange = (fieldId: number, responseValue: string): void => {
    setRegistrationResponses(prev => {
      const updatedResponses = [...prev];
      const existingResponse = updatedResponses.find((r) => r.FieldId === fieldId);
      if (existingResponse) {
        existingResponse.ResponseValue = responseValue;
      } else {
        updatedResponses.push({ FieldId: fieldId, ResponseValue: responseValue });
      }
      return updatedResponses;
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("registrationResponses",registrationResponses);
    if (registrationResponses.length === 0) {
      if (registrationFields.length !== 0) {
        toast.error('Please fill in all the required fields.');
      }
      return;
    }

    const registrationData = {
      EventId: eventId,
      UserId: userId,
      RegistrationCode: generateUniqueCode(userId, Number(eventId)),
      RegistrationResponses: registrationResponses.map((response: any) => ({
        FieldId: response.FieldId,
        ResponseValue: response.ResponseValue
      }))
    };
    console.log(registrationData,'data')
    const token = localStorage.getItem('userToken'); 

    if (!token) {
      return Promise.reject(new Error('No token found. Please log in again.'));
    }
  
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios.post(`https://localhost:7060/api/Event/${registrationData.EventId}/register`, registrationData,{headers})
      .then(response => {
        console.log(response,'reg response code check')
        toast.success('Successfully registered for the event!');
        navigate('/dashboard');
      })
      .catch(error => {
        console.error('Error during registration', error);
        toast.error('Error during registration!');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Register for Event</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        {registrationFields.map((field, index) => (
          <div key={index} className="form-group">
            <label htmlFor={field.formFieldId}>{field.fieldName}</label>

            {/* Text Field */}
            {field.fieldType === 'Text' && (
              <input
                type="text"
                className="form-control"
                id={field.formFieldId}
               
                onChange={(e) => handleFieldChange(field.formFieldId, e.target.value)}
                required
              />
            )}

            {/* Dropdown Field */}
            {field.fieldType === 'Dropdown' && (
              <select
                className="form-control"
                id={field.formFieldId}
                value={registrationResponses.find((response) => response.FieldId === field.formFieldId)?.ResponseValue || ''}
                onChange={(e) => handleFieldChange(field.formFieldId, e.target.value)}
                required
              >
                {field.dropdownOptions.$values.map((option: string, idx: number) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            )}

            {/* Radio Button Field */}
            {field.fieldType === 'Radio' && (
              <div>
                {field.radioOptions.$values.map((option: string, idx: number) => (
                  <label key={idx}>
                    <input
                      type="radio"
                      name={field.formFieldId}
                      value={option}
                      // checked={field.ResponseValue === option}
                      onChange={(e) => handleFieldChange(field.formFieldId, e.target.value)}
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        <button type="submit" className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
          Register Now
        </button>
      </form>
    </div>
  );
};

export default EventRegistration;
