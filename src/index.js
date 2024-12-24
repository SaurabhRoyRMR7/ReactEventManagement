import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { MsalProvider} from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import reportWebVitals from './reportWebVitals';
import { msalConfig } from './authConfig';
const msalInstance = new PublicClientApplication(msalConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  {/* Wrap your App with both MsalProvider and GoogleOAuthProvider */}
  <MsalProvider instance={msalInstance}>
    <GoogleOAuthProvider clientId="120657123861-3s0i9ncbuaq5c12q4fbqm8fpfnoqje11.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </MsalProvider>
</React.StrictMode>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
