import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import F1Predictions from './pages/F1Predictions'; 
import About from './pages/About';
import Races from './pages/Races';
import Teams from './pages/Teams';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/F1Predictions" element={<F1Predictions />} />
        <Route path="/About" element={<About />} />
        <Route path="/Races" element={<Races />} />
        <Route path="/Teams" element={<Teams />} />
      </Routes>
    </Router>
  );
}

export default App;
