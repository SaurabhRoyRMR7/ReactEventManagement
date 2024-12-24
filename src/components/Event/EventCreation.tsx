// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// // import EventService from '../../../services/eventService';  // You need to implement this service
// // import UserService from '../../../services/userService';    // You need to implement this service

// const EventCreate = () => {
//   const [event, setEvent] = useState({
//     title: '',
//     description: '',
//     location: '',
//     startDate: '',
//     endDate: '',
//     price: '',
//     registrationFields: []
//   });

//   const [newFormField, setNewFormField] = useState({
//     fieldName: '',
//     fieldType: 'Text',
//     isRequired: false,
//     dropdownOptions: [''],
//     radioOptions: ['']
//   });

//   const [registrationFields, setRegistrationFields] = useState([]);
//   const [createForm, setCreateForm] = useState(false);
//   const [userId, setUserId] = useState('');
//   const [userRole, setUserRole] = useState('');
//   const [organizerId, setOrganizerId] = useState(0);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUserId = localStorage.getItem('userId');
//     const storedUserRole = localStorage.getItem('userRole');
//     if (!storedUserRole || !storedUserId) {
//       navigate('/login');
//     }

//     setUserId(storedUserId);
//     setUserRole(storedUserRole);

//     const fetchOrganizerId = async () => {
//       try {
//         // const id = await UserService.getOrganizerIdByUserId(storedUserId);
//         // setOrganizerId(id);
//       } catch (error) {
//         console.error('Error fetching OrganizerId:', error);
//       }
//     };

//     fetchOrganizerId();
//   }, [navigate]);

//   const createEvent = async () => {
//     const eventData = {
//       ...event,
//       registrationFields,
//       organizerId
//     };

//     try {
//     //   const createdEvent = await EventService.createEvent(eventData);
//       toast.success('Event created successfully');
//     //   setEvent(createdEvent);
//       resetForm();
//       navigate('/dashboard');
//     } catch (error) {
//       toast.error('Error creating event');
//       console.error(error);
//     }
//   };

//   const resetForm = () => {
//     setEvent({
//       title: '',
//       description: '',
//       location: '',
//       startDate: '',
//       endDate: '',
//       price: '',
//       registrationFields: []
//     });
//     setRegistrationFields([]);
//     setNewFormField({
//       fieldName: '',
//       fieldType: 'Text',
//       isRequired: false,
//       dropdownOptions: [''],
//       radioOptions: ['']
//     });
//   };

//   const addRegistrationField = () => {
//     if (newFormField.fieldName) {
//       setRegistrationFields([...registrationFields, newFormField]);
//       setNewFormField({
//         fieldName: '',
//         fieldType: 'Text',
//         isRequired: false,
//         dropdownOptions: [''],
//         radioOptions: ['']
//       });
//       toast.success('Registration field added successfully');
//     } else {
//       toast.error('Please provide a valid field name');
//     }
//   };

//   const addFieldOption = () => {
//     if (newFormField.fieldType === 'Dropdown') {
//       setNewFormField({
//         ...newFormField,
//         dropdownOptions: [...newFormField.dropdownOptions, '']
//       });
//     } else if (newFormField.fieldType === 'Radio') {
//       setNewFormField({
//         ...newFormField,
//         radioOptions: [...newFormField.radioOptions, '']
//       });
//     }
//   };

//   const removeOption = (index) => {
//     if (newFormField.fieldType === 'Dropdown') {
//       const updatedOptions = newFormField.dropdownOptions.filter((_, i) => i !== index);
//       setNewFormField({ ...newFormField, dropdownOptions: updatedOptions });
//       toast.success('Option removed');
//     } else if (newFormField.fieldType === 'Radio') {
//       const updatedOptions = newFormField.radioOptions.filter((_, i) => i !== index);
//       setNewFormField({ ...newFormField, radioOptions: updatedOptions });
//       toast.success('Option removed');
//     }
//   };

//   const removeField = (index) => {
//     const updatedFields = registrationFields.filter((_, i) => i !== index);
//     setRegistrationFields(updatedFields);
//     toast.success('Registration field removed');
//   };

//   const toggleForm = () => {
//     setCreateForm(!createForm);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEvent({ ...event, [name]: value });
//   };

//   const handleNewFieldChange = (e) => {
//     const { name, value } = e.target;
//     setNewFormField({ ...newFormField, [name]: value });
//   };

//   return (
//     <div className="event-form-container">
//       <h1 className="form-heading">Create a new event</h1>
//       <form onSubmit={(e) => { e.preventDefault(); createEvent(); }}>
//         <div className="form-group">
//           <label htmlFor="title">Enter Title</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={event.title}
//             onChange={handleChange}
//             className="form-input"
//             placeholder="Enter Title"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Enter Description</label>
//           <input
//             type="text"
//             id="description"
//             name="description"
//             value={event.description}
//             onChange={handleChange}
//             className="form-input"
//             placeholder="Enter Description"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="location">Enter Location</label>
//           <input
//             type="text"
//             id="location"
//             name="location"
//             value={event.location}
//             onChange={handleChange}
//             className="form-input"
//             placeholder="Enter Location"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="startDate">Enter Start Date</label>
//           <input
//             type="datetime-local"
//             id="startDate"
//             name="startDate"
//             value={event.startDate}
//             onChange={handleChange}
//             className="form-input"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="endDate">Enter End Date</label>
//           <input
//             type="datetime-local"
//             id="endDate"
//             name="endDate"
//             value={event.endDate}
//             onChange={handleChange}
//             className="form-input"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="price">Price</label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={event.price}
//             onChange={handleChange}
//             className="form-input"
//             placeholder="Enter Payment Amount"
//           />
//         </div>

//         <button type="button" className="toggle-form-btn" onClick={toggleForm}>
//           Create Form
//         </button>

//         {createForm && (
//           <div>
//             <h3 className="form-heading">Add Registration Fields</h3>
//             {registrationFields.map((field, i) => (
//               <div key={i} className="dynamic-field">
//                 <p><strong>Field {i + 1}:</strong> {field.fieldName} (Type: {field.fieldType})</p>
//                 <button type="button" className="btn btn-danger" onClick={() => removeField(i)}>Remove Field</button>
//               </div>
//             ))}

//             <div className="form-group">
//               <label htmlFor="fieldName">Field Name</label>
//               <input
//                 type="text"
//                 id="fieldName"
//                 name="fieldName"
//                 value={newFormField.fieldName}
//                 onChange={handleNewFieldChange}
//                 className="form-input"
//                 placeholder="Field Name"
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="fieldType">Field Type</label>
//               <select
//                 name="fieldType"
//                 value={newFormField.fieldType}
//                 onChange={handleNewFieldChange}
//                 className="form-input"
//                 required
//               >
//                 <option value="Text">Text</option>
//                 <option value="Dropdown">Dropdown</option>
//                 <option value="Radio">Radio Button</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="isRequired">Is Required</label>
//               <input
//                 type="checkbox"
//                 name="isRequired"
//                 checked={newFormField.isRequired}
//                 onChange={(e) => setNewFormField({ ...newFormField, isRequired: e.target.checked })}
//               />
//             </div>

//             {newFormField.fieldType === 'Dropdown' && (
//               <div>
//                 <label htmlFor="dropdownOptions">Dropdown Options</label>
//                 {newFormField.dropdownOptions.map((option, j) => (
//                   <div key={j} className="input-block">
//                     <input
//                       type="text"
//                       value={option}
//                       onChange={(e) => {
//                         const options = [...newFormField.dropdownOptions];
//                         options[j] = e.target.value;
//                         setNewFormField({ ...newFormField, dropdownOptions: options });
//                       }}
//                       className="form-input"
//                       placeholder={`Option ${j + 1}`}
//                     />
//                     <button type="button" className="btn btn-danger" onClick={() => removeOption(j)}>Remove Option</button>
//                   </div>
//                 ))}
//                 <button type="button" className="btn btn-secondary" onClick={addFieldOption}>Add Option</button>
//               </div>
//             )}

//             {newFormField.fieldType === 'Radio' && (
//               <div>
//                 <label htmlFor="radioOptions">Radio Button Options</label>
//                 {newFormField.radioOptions.map((option, j) => (
//                   <div key={j} className="input-block">
//                     <input
//                       type="text"
//                       value={option}
//                       onChange={(e) => {
//                         const options = [...newFormField.radioOptions];
//                         options[j] = e.target.value;
//                         setNewFormField({ ...newFormField, radioOptions: options });
//                       }}
//                       className="form-input"
//                       placeholder={`Option ${j + 1}`}
//                     />
//                     <button type="button" className="btn btn-danger" onClick={() => removeOption(j)}>Remove Option</button>
//                   </div>
//                 ))}
//                 <button type="button" className="btn btn-secondary" onClick={addFieldOption}>Add Option</button>
//               </div>
//             )}

//             <button type="button" className="btn btn-primary" onClick={addRegistrationField}>
//               Add Field
//             </button>
//           </div>
//         )}

//         <button type="submit" className="submit-btn">Create Event</button>
//       </form>
//     </div>
//   );
// };

// export default EventCreate;
