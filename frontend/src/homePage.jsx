import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
  
    // Navigate to the sign-up page when the button is clicked
    const goToSignUp = () => {
      navigate('/signup');
    };
  
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Hello, Welcome to the Notes App!</h1>
        <button onClick={goToSignUp}>Go to Sign In</button>
      </div>
    );
  }

export default HomePage;