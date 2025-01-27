import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    fetch('http://127.0.0.1:5000/logout')
      .then(response => response.json())
      .then(() => {
        // Redirect to login page after logout
        window.location.href = '/login';
      })
      .catch(err => {
        console.error('Error logging out:', err);
      });
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
