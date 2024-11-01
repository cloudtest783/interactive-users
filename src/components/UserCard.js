// src/components/UserCard.js
import React from 'react';

const UserCard = ({ user, onRemove, onSelect }) => (
  <div className="user-card">
    <h3>{user.name} ({user.username})</h3>
    <p>{user.email}</p>
    <p>Coordinates: {user.address.geo.lat}, {user.address.geo.lng}</p>
    <p>Company: {user.company.name}</p>
    <button onClick={() => onRemove(user.id)}>Remove</button>
    <div onClick={() => onSelect(user.id)}>See Posts</div>
  </div>
);

export default UserCard;
