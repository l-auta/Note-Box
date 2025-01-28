import React from 'react';

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
          const response = await fetch('https://127.0.0.1:5000/logout', {
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
            window.location.href = '/login'; // This will redirect the user to the login page
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
