import React, { useState } from 'react';

const CreateNote = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // const newNote = { title, content };
    
    // POST request to create a new note
    fetch('http://127.0.0.1:5000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, content}),
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          onCreate(data); // Update parent state to add the new note to the list
        }
      })
      .catch(err => {
        console.error('Error creating note:', err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Note</button>
    </form>
  );
};

export default CreateNote;
