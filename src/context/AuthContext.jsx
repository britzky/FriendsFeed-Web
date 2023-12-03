import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [accessToken, setAccessToken] = useState(null)
    const [loading, setLoading] = useState(true);
    const [inRegistrationFlow, setInRegistrationFlow] = useState(false);
    const [formData, setFormData] = useState({});

    const updateFormData = (newData) => {
        setFormData(formData => ({ ...formData, ...newData }));
    };

    const refreshToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token')
            const response = await fetch('https://colab-test.onrender.com/token-refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${refreshToken}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('user_details', JSON.stringify(data.user));
                setAccessToken(data.access_token);
                setUserDetails(data.user); // Update user details in context
                setIsLoggedIn(true);
            } else {
                // If the refresh token is also expired or not valid
                logout()
            }
        } catch (error) {
            console.log("An error occurred during token refresh: ", error)
            logout();
        }
    };

    const checkServerReadiness = async () => {
        try {
            const response = await fetch('https://colab-test.onrender.com/health');
            return response.ok;
        } catch (error) {
            return false
        }
    }

    const checkLoginStatus = useCallback(async () => {
        let attempts = 0;
        const maxAttempts = 5;
        const attemptDelay = 15000;

        const attemptFetch = async () => {
            const isReady = await checkServerReadiness();
            if (isReady) {
                await checkLoginInfo();
                return;
            } else {
                attempts++;
                if (attempts < maxAttempts) {
                    await new Promise(resolve => setTimeout(resolve, attemptDelay));
                    await attemptFetch();
                } else {
                    setLoading(false);
                }
            }
        };
        await attemptFetch();
    }, [refreshToken])

    const checkLoginInfo = useCallback(async () => {
        try{
            const token = localStorage.getItem('access_token');
            if (token) {
                // Decode token to check expiration
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp * 1000 < Date.now()) {
                    await refreshToken()
                } else {
                    setAccessToken(token);
                    const userInfo = JSON.parse(localStorage.getItem('user_details'));
                    if (userInfo) {
                        setUserDetails(userInfo);
                        setIsLoggedIn(true);
                    }
                }
            }
            setLoading(false);
        } catch (error) {
            console.error('Error retrieving login info from AsyncStorage: ', error)
            setLoading(false);
        }

    }, [refreshToken])


    const registerUser = async (formData) => {
        console.log('Registering user with data:', formData); // Add this for debugging
        setLoading(true);
        try {
            const response = await fetch("https://colab-test.onrender.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user_details', JSON.stringify(data.user));
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                setUserDetails(data.user);
                setAccessToken(data.access_token);
                setIsLoggedIn(true);
                setLoading(false);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            console.error("Error registering user:", error);
            setLoading(false);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const loginUser = async (username, password) => {
        const credentials = {
            username: username,
            password: password
        }
        console.log('Logging in user with credentials:', credentials); // Add this for debugging
        setLoading(true);
        try {
            const response = await fetch("https://colab-test.onrender.com/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user_details', JSON.stringify(data.user));
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                setUserDetails(data.user);
                setAccessToken(data.access_token);
                setIsLoggedIn(true);
            } else {
                setLoading(false);
                throw new Error(data.message);
            }
        } catch (error) {
            setLoading(false);
            throw error;
        }
    }

    const logout = async () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setUserDetails(null);
        setAccessToken(null);
    };

    useEffect(() => {
        checkLoginStatus()
    }, []);

    useEffect(() => {
        console.log('Access Token Updated:', accessToken)
        console.log('User Details Updated:', userDetails)
    }, [accessToken, userDetails])


    const contextValue = {
        isLoggedIn,
        setIsLoggedIn,
        userDetails,
        setUserDetails,
        accessToken,
        setAccessToken,
        refreshToken,
        registerUser,
        loginUser,
        logout,
        loading,
        inRegistrationFlow,
        setInRegistrationFlow,
        formData,
        updateFormData
    }

  return (
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
  )
}
