import React, { useRef, useState } from 'react';
import './PostCard.css'; // Import the CSS file for styling

const PostCard = ({ post, onRemove, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const titleRef = useRef();
  const bodyRef = useRef();

  const handleEdit = () => {
    onEdit(post.id, { title, body });
    setEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (e.target.name === 'title') {
        bodyRef.current.focus();
      } else if (e.target.name === 'body') {
        handleEdit();
      }
    }
  };

  return (
    <div className="post-card">
      {editing ? (
        <>
          <input
            ref={titleRef}
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <textarea
            ref={bodyRef}
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleEdit}>Confirm</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3 onClick={() => setEditing(true)}>{post.title}</h3>
          <p onClick={() => setEditing(true)}>{post.body}</p>
          <button className="remove-btn" onClick={() => onRemove(post.id)}>X</button>
        </>
      )}
    </div>
  );
};

export default PostCard;
