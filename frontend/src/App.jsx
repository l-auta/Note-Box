import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import HomePage from './homePage';
import CreateUser from './signupForm';
import LoginPage from './loginForm';
import CreateNote from './createNotes';
import NotesList from './noteList';
import LogoutButton from './logoutButton';

function App() {
  // Move the useNavigate hook inside the Router context
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();  // Now useNavigate is inside the Router context

  // Function to handle adding a new note
  const handleCreateNote = (newNote) => {
    setNotes(prevNotes => [...prevNotes, newNote]);
  };

  // Fetch notes when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('https://phase-4-project-3-o2io.onrender.com/notes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        }
      } catch (err) {
        console.error('Error fetching notes:', err);
      }
    };

    fetchNotes();
  }, []);

  // After successful signup, redirect to login
  const handleSignupSuccess = () => {
    navigate('/login');
  };

  // After successful login, redirect to notes
  const handleLogInSuccess = () => {
    setIsLoggedIn(true);
    navigate('/notes');
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<CreateUser onSignupSuccess={handleSignupSuccess} />} />
      <Route path="/login" element={<LoginPage onLoginSuccess={handleLogInSuccess} />} />
      <Route 
        path="/notes" 
        element={isLoggedIn ? (
          <div style={{ padding: '10px' }}>
            <h1 className="display-4 gradient-text"><b>Welcome to Your Notes App!</b></h1>
            <CreateNote onCreate={handleCreateNote} />
            <NotesList notes={notes} setNotes={setNotes} />
            <br />
            <LogoutButton />
          </div>
        ) : (
          <LoginPage onLoginSuccess={handleLogInSuccess} />
        )}
      />
    </Routes>
  );
}

export default App;


