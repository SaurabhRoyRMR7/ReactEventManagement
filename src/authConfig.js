import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: 'bc36c853-4502-41c2-8010-a50af0a08ffc', // Your Azure AD application's client ID
        authority: 'https://login.microsoftonline.com/1680abbe-1a01-4cb0-99e9-452fe05bf615/', // Your Azure AD tenant ID
        redirectUri: 'http://localhost:3000/dashboard', // Redirect URI configured in Azure AD app
        navigateToLoginRequestUrl: true,
    },
    cache: {
        cacheLocation: 'sessionStorage', // Use sessionStorage for security or localStorage for SSO
        storeAuthStateInCookie: false, // If true, supports IE
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        // console.error(message);
                        return;
                    case LogLevel.Info:
                        // console.info(message);
                        return;
                    case LogLevel.Verbose:
                        // console.debug(message);
                        return;
                    case LogLevel.Warning:
                        // console.warn(message);
                        return;
                }
            },
        },
    },
};

export const loginRequest = {
    scopes: ["openid", "profile", "User.Read"], // Scopes you want to request
  };