import React, { useState, useEffect } from 'react';

const F1Predictions = () => {
  const [races, setRaces] = useState([]);
  const [selectedRace, setSelectedRace] = useState('');
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch races list from backend
  const fetchRaces = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/races/');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      // Filter only 2024 races
      const races2024 = data.filter(race => race.date.startsWith('2024'));
      setRaces(races2024);

      // Default to first race if available
      if (races2024.length > 0) setSelectedRace(races2024[0].id);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">
            🏎️ F1 Race Predictions
          </h1>

          {/* Dropdown for 2024 races */}
          {races.length > 0 ? (
            <div className="mb-4">
              <select
                value={selectedRace}
                onChange={handleRaceChange}
                className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg"
              >
                {races.map((race) => (
                  <option key={race.id} value={race.id}>
                    {race.name} - {race.date}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p className="text-gray-400">No races found for 2024.</p>
          )}

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </>
            ) : (
              <>🔄 Refresh Predictions</>
            )}
          </button>

          {lastUpdated && <p className="text-sm text-gray-400 mt-2">Last updated: {lastUpdated}</p>}
          {error && <p className="text-red-400 mt-2">{error}</p>}
        </div>

        {/* Predictions display */}
        {predictions && (
          <div className="text-left max-w-2xl mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-2">Predicted Top 3:</h2>
            <ol className="list-decimal list-inside">
              {predictions.predicted_top3.map((driver, index) => (
                <li key={index}>{driver}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default F1Predictions;