import React, { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import { toast } from 'react-toastify'; // Import toast for notifications
import {  useNavigate } from 'react-router-dom'; // Import useHistory for navigation
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
const Registration = () => {
   const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: '',
    googleId: '',
    userRoleId: '',
    organizationName: '',
    contactInfo: ''
  });

  const navigate = useNavigate(); // To navigate to login page after registration

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };
  const handleGoogleSuccess = async (response) => {
    console.log(jwtDecode(response.credential));
    const userInfo=jwtDecode(response.credential);
    console.log(response,'res');

    // Update the registrationData with Google login details
    setRegistrationData({
      ...registrationData,
      name: userInfo.name,
      email: userInfo.email,
      googleId: userInfo.email, // Use the Google ID for registration
      password:userInfo.email, // You can either use the token or skip password
      userRoleId:7
    });
    console.log(registrationData,'reg data');
    console.log(userInfo,'prof');
   
    
    // handleSubmit(new Event('submit')); 
  };

  // Register function
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log(registrationData,"Reg data");

    if (registrationData.userRoleId === '8' && (!registrationData.organizationName || !registrationData.contactInfo)) {
      toast.error('Please provide organization name and contact info for organizers.');
      return;
    }

    try {
      // Replace the URL with your backend API URL
      const response = await axios.post('https://localhost:7060/api/User/register', registrationData);
      console.log(response,'res');

      if (response.status === 201) {
        toast.success('User registered successfully');
        navigate('/login');// Navigate to login page after successful registration
      }
    } catch (error) {
      console.error(error);
      toast.error('Error registering user');
    }
  };
  const handleLoginOnClick=()=>{
    navigate('/login');
  }
  const handleGoogleFailure = (error) => {
    console.error(error);
    toast.error('Google login failed. Please try again.');
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Register User</h2>
                  <p className="text-white-50 mb-5">Please fill out the form to register!</p>

                  <form onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control form-control-lg"
                        value={registrationData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Email Input */}
                    <div className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control form-control-lg"
                        value={registrationData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Password Input */}
                    <div className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control form-control-lg"
                        value={registrationData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Role Selection */}
                    <div className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="role">Role</label>
                      <select
                        id="role"
                        name="userRoleId"
                        className="form-control form-control-lg"
                        value={registrationData.userRoleId}
                        onChange={handleChange}
                        required
                      >
                        <option value="7">Participant</option>
                        <option value="8">Organizer</option>
                      </select>
                    </div>

                    {/* Organizer Fields */}
                    {registrationData.userRoleId === '8' && (
                      <div className="organizer-fields">
                        <div className="form-outline form-white mb-4">
                          <label className="form-label" htmlFor="organizationName">Organization Name</label>
                          <input
                            type="text"
                            id="organizationName"
                            name="organizationName"
                            className="form-control form-control-lg"
                            value={registrationData.organizationName}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="form-outline form-white mb-4">
                          <label className="form-label" htmlFor="contactInfo">Contact Info</label>
                          <input
                            type="text"
                            id="contactInfo"
                            name="contactInfo"
                            className="form-control form-control-lg"
                            value={registrationData.contactInfo}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    )}

                    <button type="submit" className="btn btn-outline-light btn-lg px-5">Register</button>
                  </form>

                  <div className="text-white-50" style={{ cursor: 'pointer' }} onClick={handleLoginOnClick}>
                    Already have an account? Login here
                  </div>
                  <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            useOneTap
            theme="outline"
            type="icon"
            context='signup'
            shape="circle"
            width="100%" // Full width button
          />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
