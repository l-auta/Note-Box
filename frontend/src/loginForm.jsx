import React, { useState } from 'react';
import { useEffect } from 'react';

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Make API request to backend to verify login credentials
    try {
      const response = await fetch('https://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();
      
      if (response.ok) {
        // Login was successful
        onLoginSuccess(); // Pass success message or trigger route change
        // fetchNotes()
      } else {
        // Show error message if login failed
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  

  return (
    <div style={{ padding: '10px' }}>
      <h1 class="display-2 gradient-text">Login</h1>
      <br />
      <form  onSubmit={handleLogin}>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Email:</label>
          <input 
            class="form-control "
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div class="mb-3">
          <label>Password:</label>
          <input 
            class="form-control"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button class="btn " type="submit" >Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
    </div>
  );
};

export default LoginPage;
