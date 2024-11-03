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
      <div className={`content ${editing ? 'shift' : ''}`}>
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
          <div className="edit-actions">
            <button onClick={handleEdit} className="save-btn">Save</button>
            <button onClick={() => setEditing(false)} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}
      <button className="remove-btn" onClick={() => onRemove(post.id)}>X</button>
    </div>
  );
};

export default PostCard;
