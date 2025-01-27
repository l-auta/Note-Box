import React from 'react';

const NotesPage = () => {
    const handleLogout = async () => {
        try {
            // Make a POST request to the logout endpoint
            const response = await fetch('http://127.0.0.1:5000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (response.ok) {
                // Handle successful logout (e.g., redirect to the login page)
                console.log(data.message);  // Success message
                window.location.href = "/login";  // Redirect to login page after logout
            } else {
                console.error('Error logging out:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Welcome to the Notes Page</h1>
            {/* Logout Button */}
            <button style={{'color':'black'}} onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default NotesPage;
