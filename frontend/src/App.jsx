import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CreateUser from './signupForm';
import LoginPage from './loginForm';
import CreateNote from './createNotes';
import NotesList from './noteList';
import LogoutButton from './logoutButton';

function App() {
  const [notes, setNotes] = useState([]);

  // Function to handle adding a new note
  const handleCreateNote = (newNote) => {
    setNotes(prevNotes => [...prevNotes, newNote]);  // Add the new note to the existing notes list
  };

  useEffect(() => {
    // Fetch notes when the component mounts (optional if you want to load initial notes)
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

  return (
    <Router>
      <Routes>
        {/* Route for the signup page */}
        <Route path="/signup" exact>
          <CreateUser onSignupSuccess={() => <Navigate to="/login" />} />
        </Route>

        {/* Route for the login page */}
        <Route path="/login" exact>
          <LoginPage onLoginSuccess={() => <Navigate to="/notes" />} />
        </Route>

        {/* Route for the notes page */}
        <Route path="/notes" exact>
          <div style={{ padding: '10px' }}>
            <h1 className="display-4 gradient-text"><b>Welcome to Your Notes App!</b></h1>
            <br />
            <CreateNote onCreate={handleCreateNote} />
            <br />
            <br />
            <NotesList notes={notes} setNotes={setNotes} />
            <br />
            <LogoutButton />
          </div>
        </Route>

        {/* Redirect to /login if no route matches */}
        <Navigate to="/login" />
      </Routes>
    </Router>
  );
}

export default App;
