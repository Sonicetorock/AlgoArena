import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
const AccountProfilePage = () => {
    const { user } = useAuth();
    useEffect(() => {
      console.log("Current user:", user);
    }, [user]);
    return (
      <div>
        <h1>Account Page</h1>
        {user && (
          <div>
            <p>Name: {user.fullname}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
    );
}

export default AccountProfilePage
