// src/components/PostCard.js
import React, { useState } from 'react';

const PostCard = ({ post, onRemove, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleEdit = () => {
    onEdit(post.id, { title, body });
    setEditing(false);
  };

  return (
    <div className="post-card">
      {editing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
          <button onClick={handleEdit}>Confirm</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => onRemove(post.id)}>Remove</button>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
};

export default PostCard;
