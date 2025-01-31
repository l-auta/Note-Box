import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
  
    // Navigate to the sign-up page when the button is clicked
    const goToSignUp = () => {
      navigate('/signup');
    };
  
    return (
      <div style={{ padding: '20px', textAlign: 'center'}}>
        <h1 class="gradient-text display-2">Hello there, Welcome to the Notes App!</h1>
        <br />
        <p class="lead">To finally start creating notes of your own, create an account by clicking the button below.</p>
        <br />
        <button class="btn gradient-text" onClick={goToSignUp}>Go to Sign In</button>
      </div>
    );
  }

export default HomePage;