import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Driver from './Driver';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/driver" element={<Driver />} />
    </Routes>
  </Router>
);
