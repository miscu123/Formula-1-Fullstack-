import React, { useState, useEffect } from 'react';
import { ChevronRight, Play, Calendar, Trophy, Zap, Users, ArrowRight, Star } from 'lucide-react';

const F1Predictions = () => {
  const [races, setRaces] = useState([]);
  const [selectedRace, setSelectedRace] = useState('');
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fetch races list from backend
  const fetchRaces = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/races/');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      // Filter only 2024 races for latest races predictions
      const races = data.filter(race => race.date.startsWith('2024'));
      setRaces(races);

      // Default to first race if available
      if (races.length > 0) setSelectedRace(races[0].id);
    } catch (err) {
      console.error('Error fetching races:', err);
      setError(err.message);
    }
  };

  // Fetch predictions for the selected race
  const fetchPredictions = async (raceId) => {
    if (!raceId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/api/predict/?race_id=${raceId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setPredictions(data);
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      setError(err.message);
      console.error('Error fetching predictions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRaces();
  }, []);

  useEffect(() => {
    fetchPredictions(selectedRace);
  }, [selectedRace]);

  const handleRaceChange = (e) => setSelectedRace(e.target.value);
  const handleRefresh = () => fetchPredictions(selectedRace);

  const podiumPositions = [
    { position: '1st', gradient: 'from-yellow-500 to-yellow-600', bgGlow: 'shadow-yellow-500/30', ring: 'ring-yellow-400/50', icon: '🏆' },
    { position: '2nd', gradient: 'from-gray-400 to-gray-500', bgGlow: 'shadow-gray-400/30', ring: 'ring-gray-400/50', icon: '🥈' },
    { position: '3rd', gradient: 'from-orange-500 to-orange-600', bgGlow: 'shadow-orange-500/30', ring: 'ring-orange-400/50', icon: '🥉' }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden overflow-x-hidden">
      {/* Mouse follow effect */}
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, red 0%, transparent 50%)`
        }}
      />
      
      {/* Navigation - Same as landing page */}
      <nav className="relative z-50 p-6 flex justify-between items-center bg-black/80 backdrop-blur-md border-b border-red-900/30">
        <div className="flex items-center space-x-4">
          <button className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center font-black text-xl transform hover:scale-110 transition-all duration-300 cursor-pointer"
          onClick={() => window.location.href = './'}>
            F1
          </button>
          <span className="text-2xl font-bold tracking-wider">FORMULA 1</span>
        </div>
        <div className="hidden md:flex space-x-8">
          {['Drivers', 'Teams', 'Races', 'Schedule', 'Login / Sign Up'].map((item) => (
            <button key={item} className="hover:text-red-500 transition-colors duration-300 font-medium tracking-wide">
              {item}
            </button>
          ))}
        </div>
        <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-600/30">
          Watch Live
        </button>
      </nav>

      {/* Racing Lines Animation - Similar to landing page */}
      <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse`}
              style={{
                top: `${20 + i * 15}%`,
                left: '-100%',
                width: '200%',
                animation: `slide-${i} ${3 + i * 0.5}s linear infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <section className={`text-center py-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-r from-white via-red-300 to-white bg-clip-text text-transparent">
            AI Race
            <br />
            <span className="text-red-400">Predictions</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the future of motorsport analytics. Our AI predicts race outcomes with precision, 
            bringing you closer to the <span className="text-red-500 font-semibold">pinnacle of racing intelligence</span>.
          </p>
        </section>

        {/* Race Selection Section - Styled like landing page cards */}
        <section className="py-16 bg-gradient-to-br from-gray-800/30 to-gray-900/50 rounded-3xl mb-16 border border-gray-700/50">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
              SELECT RACE
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="max-w-2xl mx-auto px-6">
            {races.length > 0 ? (
              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                <select
                  value={selectedRace}
                  onChange={handleRaceChange}
                  className="relative w-full bg-gray-800/90 backdrop-blur-sm border-2 border-gray-600 text-white px-8 py-6 rounded-2xl appearance-none cursor-pointer hover:border-red-500 focus:border-red-400 focus:outline-none transition-all duration-300 text-lg font-semibold"
                >
                  {races.map((race) => (
                    <option key={race.id} value={race.id} className="bg-gray-900 py-2">
                      🏎️ {race.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronRight className="w-6 h-6 text-red-400 rotate-90" />
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gray-800/60 rounded-2xl p-8 border border-gray-700">
                  <div className="text-4xl mb-4">🏁</div>
                  <p className="text-xl text-gray-400">No races found</p>
                </div>
              </div>
            )}

            {/* Generate Predictions Button */}
            <div className="text-center">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="group bg-red-600 hover:bg-red-700 disabled:bg-gray-700 px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-2xl shadow-red-600/40 flex items-center space-x-3 mx-auto"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing Race Data...</span>
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    <span>Generate AI Predictions</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </>
                )}
              </button>
            </div>

            {/* Status Messages */}
            <div className="mt-8 text-center space-y-3">
              {lastUpdated && (
                <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-600/50 rounded-xl px-4 py-2 text-green-300 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Last updated: {lastUpdated}
                </div>
              )}
              {error && (
                <div className="bg-red-900/50 border-2 border-red-500 rounded-2xl px-6 py-4 text-red-300 max-w-md mx-auto">
                  <div className="flex items-center gap-3 justify-center">
                    <span className="text-xl">⚠️</span>
                    <span className="font-semibold">{error}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Predictions Display - Championship Standings Style */}
        {predictions && (
          <section className="py-16">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
                PREDICTED PODIUM
              </h2>
              <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {predictions.predicted_top3.map((driver, index) => (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border-2 transition-all duration-500 hover:scale-105 cursor-pointer ${
                    index === 0 ? 'border-yellow-500 shadow-2xl shadow-yellow-500/20' : 
                    index === 1 ? 'border-gray-400 shadow-2xl shadow-gray-400/20' : 
                    'border-orange-500 shadow-2xl shadow-orange-500/20'
                  }`}
                  style={{
                    animation: `slideInFromLeft 0.8s ease-out ${0.2 * (index + 1)}s both`
                  }}
                >
                  {index === 0 && (
                    <div className="absolute -top-4 -right-4 bg-yellow-500 rounded-full p-3">
                      <Trophy className="text-black" size={24} />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className={`text-6xl font-black ${
                      index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-orange-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="text-4xl">
                      {podiumPositions[index].icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-center">{driver}</h3>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                      index === 0 ? 'bg-yellow-500/20 text-yellow-400' : 
                      index === 1 ? 'bg-gray-400/20 text-gray-300' : 
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {podiumPositions[index].position} PLACE
                    </span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={`${i < (index === 0 ? 5 : index === 1 ? 4 : 3) ? 'text-yellow-500 fill-current' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Speed Indicator - Similar to landing page */}
        <div className="fixed bottom-10 right-10 bg-gray-800/80 backdrop-blur-md border border-gray-600/40 rounded-2xl p-6 shadow-2xl">
          <div className="text-4xl font-black text-red-500 mb-2">AI</div>
          <div className="text-sm text-gray-400 uppercase tracking-wider">POWERED</div>
        </div>
      </div>

      {/* Enhanced CSS animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideAnimation {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes slideInFromLeft {
          from { 
            opacity: 0; 
            transform: translateX(-100px) scale(0.8); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }
      `}} />
    </div>
  );
};

export default F1Predictions;