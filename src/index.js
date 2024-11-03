import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import MapPage from './components/Map'; // Correct import path

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/map/:lat/:lng" element={<MapPage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
