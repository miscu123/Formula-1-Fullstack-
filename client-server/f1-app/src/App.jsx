import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import F1Predictions from './F1Predictions'; // Create this component for the "Make" page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/F1Predictions" element={<F1Predictions />} />
      </Routes>
    </Router>
  );
}

export default App;
