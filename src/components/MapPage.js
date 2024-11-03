import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: 'https://i.ibb.co/Bs2xB7S/beehero-icon.png',
  iconSize: [32, 32],
});

const MapPage = () => {
  const { lat, lng } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/", {
      state: location.state,
    });
  };

  return (
    <div>
      <h2>Map</h2>
      <button onClick={handleBack}>Back</button>
      <MapContainer center={[lat, lng]} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[lat, lng]} icon={markerIcon}></Marker>
      </MapContainer>
    </div>
  );
};

export default MapPage;
