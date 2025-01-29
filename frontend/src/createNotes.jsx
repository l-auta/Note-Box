import React, { useState } from 'react';

const CreateNote = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // const newNote = { title, content };
    
    // POST request to create a new note
    fetch('https://127.0.0.1:5000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, content}),
      credentials: 'include'  // Important: this ensures cookies are sent
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          onCreate(data); // Update parent state to add the new note to the list
          setTitle("");
          setContent("");
        }
      })
      .catch(err => {
        console.error('Error creating note:', err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Title</label>
        <input
          class="form-control" 
          id="exampleFormControlInput1"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Content</label>
        <textarea
          class="form-control" 
          id="exampleFormControlTextarea1" rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit" class="btn btn-light">Create Note</button>
    </form>
  );
};

export default CreateNote;
