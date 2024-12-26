import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'
import { FaMicrosoft } from 'react-icons/fa6';
import { useMsal,useAccount  } from '@azure/msal-react';
import { ProfileButton } from '../dashboard/header/ProfileButton';
import { PUBLIC_CLIENT_APPLICATION, loginRequest } from '../../authConfig';
const Login = () => {
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const navigate = useNavigate(); // For navigation
    const { instance,accounts } = useMsal();
    // const account = useAccount();
    const [profile, setProfile] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const account = useAccount(instance.getAllAccounts()[0]);
    const handleChange = (e) => {
      const { name, value } = e.target;
      setLoginData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

   
  //   useEffect(() => {
  //     if (account) {
  //       instance.acquireTokenSilent({
  //           scopes: ["User.Read"],
  //           account: account
  //       }).then(response => {
  //           fetch('https://graph.microsoft.com/v1.0/me', {
  //               headers: {
  //                   Authorization: `Bearer ${response.accessToken}`
  //               }
  //           })
  //           .then(res => res.json())
  //           .then(data => setProfile(data));
  //       });
       
  //   }
  // }, [account, instance]);
//   useEffect(() => {
//     if (account) {
//         console.log('User logged in:', account);
//     }
// }, [account]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Replace with your actual API endpoint
        const response = await axios.post("https://localhost:7060/api/User/login", loginData);
        console.log(response);
        const { userId, userRole} = response.data.response;
        const token =response.data.token;
        localStorage.setItem("userId", userId.toString());
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("userToken", token);
        
        // Display success message
        toast.success("Login successful");
  
        // Navigate to dashboard or home page based on role
      
          navigate("/dashboard");
        
      } catch (error) {
        console.error("Login failed", error);
        toast.error("Invalid email or password");
      }
    };
  
    const handleRegister = () => {
      navigate("/register"); // Navigate to register page
    };
    const handleGoogleLogin = async (response) => {
      try {
      console.log(jwtDecode(response.credential));
      const userEmail=jwtDecode(response.credential).email;
      console.log(userEmail,'user email');
      const backendResponse = await axios.post("https://localhost:7060/api/User/google-login",{email: userEmail});
       
        
        localStorage.setItem('googleLogin', response.credential);
        localStorage.setItem('googleUser',JSON.stringify(jwtDecode(response.credential)));
        const { userId, userRole} = backendResponse.data.response;
        const token =backendResponse.data.token;
        localStorage.setItem("userId", userId.toString());
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("userToken", token);
         
        

        // localStorage.setItem('userRole', userRole);
        // localStorage.setItem('userToken', token);

        
        toast.success('Google login successful');
        navigate('/dashboard');
      } catch (error) {
        console.error('Google login failed', error);
        toast.error('Google login failed');
      }
    };

   

    const handleMicrosoftLogin = async (response) => {
      try {
       const loginResponse = await instance.loginPopup(loginRequest);
        // const loginResponse = await PUBLIC_CLIENT_APPLICATION.loginPopup(loginRequest);
        // console.log("Login Successful:", loginResponse);
      
        console.log("Login Successful:", loginResponse);
        const { accessToken, idToken } = loginResponse;

        // // Store tokens in localStorage or sessionStorage
        localStorage.setItem("userAccessToken", accessToken);
        localStorage.setItem("userTokenId", loginResponse.account.homeAccountId);
       
      localStorage.setItem('microsoftLogin',JSON.stringify(loginResponse) );
     
    
        navigate('/dashboard');
      } catch (error) {
        console.error('Google login failed', error);
        toast.error('Microsoft login failed');
      }
    };
   
  

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>

                  <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="form-outline form-white mb-4">
                      <label className="form-label" htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control form-control-lg"
                        value={loginData.email}
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
                        value={loginData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-outline-light btn-lg px-5">Login</button>
                  </form>

                  <div className="text-white-50" style={{ cursor: 'pointer' }} onClick={handleRegister}>
                    Don't have an account? Register here
                  </div>
                  <div className="mt-3 flex items-center space-x-3 w-full bg-[white] text-gray py-2 rounded-md flex items-center justify-center space-x-3 hover:bg-[#0061a8] transition-colors">
  <GoogleLogin
    className="flex-shrink-0 "
    onSuccess={handleGoogleLogin}
    onError={() => toast.error('Google login failed')}
    useOneTap
    theme="outline"
    type="icon"
    shape="circle"
    width="50px" // Adjusted width for the icon
  />
 <span className="text-orange-500 text-lg">Login with Google</span>
</div>
                  <div className="mt-4">
              <button onClick={handleMicrosoftLogin} className="w-full bg-[#0078D4] text-white py-2 rounded-md flex items-center justify-center space-x-3 hover:bg-[#0061a8] transition-colors">
                <FaMicrosoft className="text-white text-xl" />
                <span>Login with Microsoft</span>
              </button>
            </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
