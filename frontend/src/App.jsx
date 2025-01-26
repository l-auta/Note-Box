import React, {useState} from 'react'
import './App.css'
import CreateUser from './signupForm'
import LoginPage from './loginForm'

function App() {
  const [step, setStep] = useState(1) // create state for conditional rendering

  // a function to handle conditional rendering
  const handleSignupSuccess = () => {
    setStep(2); // Transition to login page after successful signup
  };

  // give the pages numbers for the sake of moving to other pages
  return (
    <>
     {step === 1 && ( <CreateUser onSignupSuccess={handleSignupSuccess}/>)}
     {step === 2 && (<LoginPage onLoginSuccess={(message) => console.log("succcesfully logged in")} />  )}
    </>
  )
}

export default App
