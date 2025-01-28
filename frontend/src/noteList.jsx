import React, { useState, useEffect } from 'react';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');

  // Fetch notes when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('https://127.0.0.1:5000/notes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',  // Make sure cookies (session) are sent with the request
        });

        if (response.ok) {
          const data = await response.json();
          setNotes(data); // Store the notes in state
        } else {
          const data = await response.json();
          setError(data.message); // Show error message if the response is not OK
        }
      } catch (err) {
        setError('An error occurred while fetching notes.'); // Handle fetch error
      }
    };

    fetchNotes(); // Call the function when the component mounts
  }, []); // Empty dependency array means this runs only once when the component mounts


  const handleDelete = (id) => {
    fetch(`https://127.0.0.1:5000/notes/${id}`, { method: 'DELETE', credentials: 'include'})
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Note deleted successfully') {
          setNotes(notes.filter(note => note.id !== id)); // Remove note from list
        }
      })
      .catch((err) => {
        console.error('Error deleting note:', err);
      });
  };

  const handleUpdate = (id, updatedTitle, updatedContent) => {
    fetch(`https://127.0.0.1:5000/notes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: updatedTitle, content: updatedContent }),
      credentials: 'include',  // Make sure cookies (session) are sent with the request  // Make sure cookies (session) are sent with the request  // Make sure cookies (session) are sent with the request  // Make sure cookies (session) are sent with the request  // Make sure cookies (session) are sent with the request  // Make sure cookies (session) are sent with the request  // Make sure cookies (session) are sent with the request  // Make
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the notes state with the updated note data
        setNotes(notes.map(note => note.id === id ? { ...note, title: updatedTitle, content: updatedContent } : note));
      })
      .catch((err) => {
        console.error('Error updating note:', err);
      });
  };

  return (
    <div>
      <h2 class="display-5">Your Notes</h2>
      <ul class="list-group list-group-flush">
        {notes.map((note) => (
          <li class="list-group-item" key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button class="btn" onClick={() => handleUpdate(note.id, prompt('Enter new title', note.title), prompt('Enter new content', note.content))}>Update</button>
            <button class="btn" onClick={() => handleDelete(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
