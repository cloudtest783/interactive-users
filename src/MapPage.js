import React from 'react';
import { useParams } from 'react-router-dom';

const MapPage = () => {
  const { lat, lng } = useParams();
  const markerUrl = 'https://i.ibb.co/Bs2xB7S/beehero-icon.png';
  
  return (
    <div>
      <h1>Map Page</h1>
      <iframe
        width="600"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${lat},${lng}&zoom=14&maptype=roadmap&markers=icon:${markerUrl}|${lat},${lng}`}>
      </iframe>
    </div>
  );
};

export default MapPage;
