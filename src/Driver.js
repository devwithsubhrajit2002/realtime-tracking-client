import { useEffect } from 'react';
import { io } from 'socket.io-client';
import './leafletFix';  // this fixes default icon missing issue

const socket = io('http://localhost:5000');

const Driver = () => {
  useEffect(() => {
    const driverId = 'driver001';

    const sendLocation = (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit('driverLocation', {
        driverId,
        lat: latitude,
        lng: longitude
      });
    };

    const error = (err) => console.error('Geolocation error', err);

    const watchId = navigator.geolocation.watchPosition(sendLocation, error, {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 10000
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return <p>Sending live location...</p>;
};

export default Driver;
