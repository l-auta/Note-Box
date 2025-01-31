import React from 'react';
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
          const response = await fetch('https://phase-4-project-3-o2io.onrender.com/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Include session cookie
          });
      
          const data = await response.json();
      
          if (response.ok) {
            // After logout, redirect to the login page
            console.log('Logged out successfully');
            navigate('/login'); // This will redirect the user to the login page
          } else {
            setError(data.message || 'Failed to log out');
          }
        } catch (error) {
          setError('An error occurred while logging out.');
          console.error('Logout error:', error);
        }
      };

  return (
    <button class="btn btn-light" onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
