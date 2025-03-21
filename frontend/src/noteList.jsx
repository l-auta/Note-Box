import React, { useState, useEffect } from 'react';

const NotesList = ({notes, setNotes}) => {
  const [error, setError] = useState('');

  // Fetch notes when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('https://phase-4-project-3-o2io.onrender.com/notes', {
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
  }, []); // Empty dependency array means this runs only once when the component is mounted

  // Handle deleting a note
  const handleDelete = (id) => {
    fetch(`https://phase-4-project-3-o2io.onrender.com/notes/${id}`, { method: 'DELETE', credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Note deleted successfully') {
          setNotes(notes.filter(note => note.id !== id)); // Remove the note from state
        }
      })
      .catch((err) => {
        console.error('Error deleting note:', err);
      });
  };

  // Handle updating a note
  const handleUpdate = (id, updatedTitle, updatedContent) => {
    fetch(`https://phase-4-project-3-o2io.onrender.com/notes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: updatedTitle, content: updatedContent }),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the note in the state after successful update
        setNotes(notes.map(note => note.id === id ? { ...note, title: updatedTitle, content: updatedContent } : note));
      })
      .catch((err) => {
        console.error('Error updating note:', err);
      });
  };

  return (
    <div>
      <h2 className="display-5 gradient-text">Your Notes</h2>
      <ul className="list-group list-group-flush">
        {notes.length === 0 ? (
          <p>No notes available</p>
        ) : (
          notes.map((note) => (
            <li className="list-group-item box" key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button
                className="btn"
                onClick={() =>
                  handleUpdate(
                    note.id,
                    prompt('Enter new title', note.title),
                    prompt('Enter new content', note.content)
                  )
                }
              >
                Update
              </button>
              <button className="btn" onClick={() => handleDelete(note.id)}>
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default NotesList;
