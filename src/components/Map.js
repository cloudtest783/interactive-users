import React from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const beeHeroIcon = new L.Icon({
  iconUrl: 'https://i.ibb.co/Bs2xB7S/beehero-icon.png',
  iconSize: [35, 35],
});

const Map = () => {
  const { lat, lng } = useParams();
  const position = [parseFloat(lat), parseFloat(lng)];

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <Marker position={position} icon={beeHeroIcon}>
        <Popup>
          User's Location
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
