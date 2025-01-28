import React, { useState, useEffect } from 'react';
import './App.css';
import CreateUser from './signupForm';
import LoginPage from './loginForm';
import CreateNote from './createNotes';
import NotesList from './noteList';
import LogoutButton from './logoutButton';

function App() {
  const [step, setStep] = useState(1); // Create state for conditional rendering
  const [notes, setNotes] = useState([]); // State to hold the list of notes


   // Function to handle adding a new note
   const handleCreateNote = (newNote) => {
    setNotes([...notes, newNote]);  // Add the new note to the existing notes list
  };

  // A function to handle conditional rendering
  const handleSignupSuccess = () => {
    setStep(2); // Transition to login page after successful signup
    window.history.pushState({}, '', '/login');  // Update URL to /login
  };

  // Move to the notes list after a successful login
  const handleLogInSuccess = () => {
    setStep(3); // Transition to notes page after successful login
    window.history.pushState({}, '', '/notes');  // Update URL to /notes
  };

  // Check URL on initial load and set step accordingly
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/signup') {
      setStep(1);  // Show signup page if URL is /signup
    } else if (path === '/login') {
      setStep(2);  // Show login page if URL is /login
    } else if (path === '/notes') {
      setStep(3);  // Show notes page if URL is /notes
    }
  }, []); // This effect runs only once when the component is mounted

  // Give the pages numbers for the sake of moving to other pages
  return (
    <>
      {step === 1 && <CreateUser onSignupSuccess={handleSignupSuccess} />}
      {step === 2 && <LoginPage onLoginSuccess={handleLogInSuccess} />}
      {step === 3 && (
        <div>
          <h1 class="display-4"><b>Welcome to Your Notes App!</b></h1>
          <br />
          <CreateNote onCreate={handleCreateNote} />
          <br />
          <br />
          <NotesList />
          <LogoutButton />
        </div>
      )}
    </>
  );
}

export default App;
