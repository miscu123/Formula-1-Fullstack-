import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import F1Predictions from './F1Predictions'; 
import About from './About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/F1Predictions" element={<F1Predictions />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
