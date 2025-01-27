import React, {useState} from 'react'
import './App.css'
import CreateUser from './signupForm'
import LoginPage from './loginForm'
import NotesPage from './noteList'

function App() {
  const [step, setStep] = useState(1) // create state for conditional rendering

  // a function to handle conditional rendering
  const handleSignupSuccess = () => {
    setStep(2); // Transition to login page after successful signup
  };

  // move to the notes list after a succesfull login
  const handleLogInSuccess = () => {
    setStep(3); // Transition to login page after successful signup
  };

  // give the pages numbers for the sake of moving to other pages
  return (
    <>
     {step === 1 && ( <CreateUser onSignupSuccess={handleSignupSuccess}/>)}
     {step === 2 && (<LoginPage onLoginSuccess={handleLogInSuccess} />  )}
    </>
  )
}

export default App
