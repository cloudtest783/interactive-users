import React, { useRef, useState, useCallback } from 'react';
import './PostCard.css'; // Import the CSS file for styling

const PostCard = React.memo(({ post, onRemove, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [errorMessage, setErrorMessage] = useState('');
  const titleRef = useRef();
  const bodyRef = useRef();

  const handleEdit = useCallback(() => {
    if (!title.trim() || !body.trim()) {
      setErrorMessage('Title and body cannot be empty.');
      return;
    }
    setErrorMessage('');
    onEdit(post.id, { title, body });
    setEditing(false);
  }, [title, body, onEdit, post.id]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      if (e.target.name === 'title') {
        bodyRef.current.focus(); // Switch focus to the body input
      } else if (e.target.name === 'body') {
        titleRef.current.focus(); // Switch focus to the title input
      }
    }
  }, []);

  return (
    <div className="post-card">
      <div className="content">
        <h3 onClick={() => setEditing(true)}>{post.title}</h3>
        <p onClick={() => setEditing(true)}>{post.body}</p>
      </div>
      {editing && (
        <div className="edit-popup">
          <input
            ref={titleRef}
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            className="edit-input"
          />
          <textarea
            ref={bodyRef}
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyPress={handleKeyPress}
            className="edit-textarea"
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="edit-actions">
            <button onClick={handleEdit} className="save-btn">Save</button>
            <button onClick={() => setEditing(false)} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}
      <button className="remove-btn" onClick={() => onRemove(post.id)}>X</button>
    </div>
  );
});

export default PostCard;
