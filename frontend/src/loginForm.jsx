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

  // // Fetch notes after login
  // const fetchNotes = async () => {
  //   try {
  //     const response = await fetch('http://127.0.0.1:5000/notes', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include', // Include session cookies
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       // Set the notes data in state
  //       setNotes(data);
  //     } else {
  //       // If there's an error, set the error message
  //       setError(data.message || 'Failed to fetch notes');
  //     }
  //   } catch (error) {
  //     setError('An error occurred while fetching notes.');
  //     console.error(error);
  //   }
  // };

  //   fetchNotes(); // Call fetchNotes when the component mounts
  // }, []); // Empty dependency array to call only once when the component mounts


  return (
    <div>
      <h1 style={{ marginLeft: '10px' }} class="display-2">Login</h1>
      <br />
      <form style={{ marginLeft: '10px' }} onSubmit={handleLogin}>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Email:</label>
          <input 
            class="form-control"
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
