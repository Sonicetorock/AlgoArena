import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {DNA} from 'react-loader-spinner'

{/*We are getting the authenticationReq prop from the App coz
    - If user is not  logged in i.e no global user then we should allow user to access the routes after "user/*"
    - so we r redirecting him to the home when not logged in
    - when the user is logged in but tries to access /login or register such as unathenticated we restricting by redirecting to his dashboard
    - Problem : if i wanted to show like leetcode i.e without authentication also user can see probList and probs but unable to submit, then this prop should allow user to this problist or specific prob even logged in or our*/}
const ProtectedRoute = ({ children, authenticationReq, role }) => {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // const [loader, setLoader] = useState(true)
    useEffect(() => {
        if (isAuthenticated()) {
            // User is logged in
            if (!authenticationReq) {
                // If authentication is not required (e.g., accessing /login)
                if (user) {
                    if (user?.role === 'admin')  navigate('/admin');
                   else navigate('/user'); 
                    // {?.role === 'user'}
                // } else if (user?.role === 'admin') {
                //     navigate('/admin');
                } 
                else {
                    navigate('/');
                }
            }
        } else {
            // User is not logged in
            if (!authenticationReq) {
                // If authentication is not required (e.g., accessing /login)
                return; // Allow access to /login
            } else {
                // If authentication is required (e.g., accessing /userDashboard or /adminDashboard)
                navigate('/');
            }
        }
        // setLoader(false)
    }, [isAuthenticated, authenticationReq, user, navigate]);

    return  children;
};

export default ProtectedRoute;
