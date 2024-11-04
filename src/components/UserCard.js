import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserCard.css'; // Import the CSS file

const UserCard = React.memo(({ user, onRemove, onSelect }) => {
  const navigate = useNavigate();

  return (
    <div className="user-card" onClick={() => onSelect(user.id)}>
      <button className="remove-btn" onClick={(e) => { e.stopPropagation(); onRemove(user.id); }}>X</button>
      <h3>{user.name} ({user.username})</h3>
      <p>{user.email}</p>
      <Link to={`/map/${user.address.geo.lat}/${user.address.geo.lng}`} state={{ userId: user.id }}>
        Coordinates: {user.address.geo.lat}, {user.address.geo.lng}
      </Link>
      <p>Company: {user.company.name}</p>
    </div>
  );
});

export default UserCard;
