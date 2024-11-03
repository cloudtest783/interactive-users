// src/components/UserCard.js
import React from 'react';
import './UserCard.css'; // Import the CSS file

const UserCard = ({ user, onRemove, onSelect }) => (
  <div className="user-card" onClick={() => onSelect(user.id)}>
    <button className="remove-btn" onClick={(e) => { e.stopPropagation(); onRemove(user.id); }}>X</button>
    <h3>{user.name} ({user.username})</h3>
    <p>{user.email}</p>
    <p onClick={(e) => {
      e.stopPropagation();
      window.location.href = `/map/${user.address.geo.lat}/${user.address.geo.lng}`;
    }}>
      Coordinates: {user.address.geo.lat}, {user.address.geo.lng}
    </p>
    <p>Company: {user.company.name}</p>
  </div>
);

export default UserCard;

