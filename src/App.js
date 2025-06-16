import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { io } from 'socket.io-client';
import './leafletFix';  // this fixes default icon missing issue

const socket = io('https://realtime-tracking-backend.onrender.com');

const App = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [eta, setEta] = useState(null);

  useEffect(() => {
    const mapInstance = L.map('map').setView([22.5726, 88.3639], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);
    setMap(mapInstance);
  }, []);

  useEffect(() => {
    socket.on('locationUpdate', ({ lat, lng, eta }) => {
      if (!map) return;

      if (marker) {
        marker.setLatLng([lat, lng]);
      } else {
        const newMarker = L.marker([lat, lng]).addTo(map);
        setMarker(newMarker);
      }

      map.setView([lat, lng], 13);
      setEta(eta);
    });

    return () => socket.off('locationUpdate');
  }, [map, marker]);

  return (
    <div>
      <div id="map" style={{ height: "90vh" }} />
      <div style={{ padding: "10px", backgroundColor: "#eee" }}>
        {eta !== null ? `Estimated Time of Arrival: ${eta} mins` : 'Waiting for driver location...'}
      </div>
    </div>
  );
};

export default App;
