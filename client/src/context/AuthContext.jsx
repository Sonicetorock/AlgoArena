import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

//create Context
const AuthContext = createContext();

const API_URL = 'http://localhost:8000/api';

// Util to decode JWT token
const decodeToken = (token) => {
    return JSON.parse(atob(token.split('.')[1]));
};

// AuthProvider component to provide authentication context to children
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
    const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken'));
    const [isLoading, setIsLoading] = useState(false);

    // Set the auth header for axios while requesting the server (needed)
    const setAuthHeader = (token) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    // If accessToken exists, set the auth header
    if (accessToken) {
        setAuthHeader(accessToken);
    }

    // handle login
    const login = async (email, password) => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
            if (response.data.user && response.data.accessToken) {
                setUser(response.data.user);
                setAccessToken(response.data.accessToken);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('accessToken', response.data.accessToken);
                setAuthHeader(response.data.accessToken);
            } else {
                throw new Error('Invalid response from server');
            }
            return response.data;
        } catch (error) {
            console.error("@context: login error", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    //  handle registration
    const register = async (userData) => {
        //intially sent as different key-value but now sent as an object
        try {
            setIsLoading(true);
            const response = await axios.post(`${API_URL}/auth/register`, userData, { withCredentials: true });
            setUser(response.data.user);
            setAccessToken(response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('accessToken', response.data.accessToken);
            setAuthHeader(response.data.accessToken);
            return response.data;
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // handle logout
    const logout = async () => {
        try {
            await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
            toast.success("Logged Out")
            setUser(null);
            setAccessToken(null);
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            setAuthHeader(null);
            //should redirect to "/""
            //when token expires, it exits but url is not getting updated , somehow have to change in protected routes
        } catch (error) {
            throw error;
        }
    };

    // check if user is authenticated
    const isAuthenticated = () => !!accessToken;

    // refresh the token
    const refreshToken = async () => {
        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
            setAccessToken(response.data.accessToken);
            localStorage.setItem('accessToken', response.data.accessToken);
            setAuthHeader(response.data.accessToken);
        } catch (error) {
            console.error("Error refreshing token", error);
            if (error.response && (error.response.status === 403 || error.response.status === 401 )) {
                logout(); // Logout if refresh token is forbidden or unauthorised
            }
            throw error;
        }
    };

    // useEffect to call refresh exactly when expiry of accesstoken is 1 min
    useEffect(() => {
        if (accessToken) {
            const decodedToken = decodeToken(accessToken);
            const expirationTime = decodedToken.exp * 1000;
            const currentTime = Date.now();

            const refreshInterval = expirationTime - currentTime - 60000; // Refresh 1 minute before expiration

            const interval = setInterval(() => {
                refreshToken();
            }, refreshInterval > 0 ? refreshInterval : 0);

            return () => clearInterval(interval);
        }
    }, [accessToken]);

    return (
        <AuthContext.Provider 
        value={{ user, accessToken, login, register, logout, isAuthenticated, refreshToken, isLoading }}>

            {children}
        </AuthContext.Provider>
    );
};

// hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);