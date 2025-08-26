import React from 'react';
import { Calendar, MapPin, Zap, Clock, Flag } from 'lucide-react';

const RaceCard = ({ 
  race, 
  onSetReminder,
  showPredictions = false,
  predictionsData = null 
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isUpcoming = new Date(race.date) > new Date();
  const isPast = new Date(race.date) < new Date();

  return (
    <div className={`group bg-gradient-to-r from-gray-800 to-gray-700 border rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl ${
      isUpcoming ? 'border-red-600/50 hover:border-red-600 hover:shadow-red-600/20' :
      isPast ? 'border-gray-600 hover:border-gray-500' :
      'border-yellow-600/50 hover:border-yellow-600 hover:shadow-yellow-600/20'
    }`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className={`text-2xl font-bold transition-colors ${
              isUpcoming ? 'group-hover:text-red-500' :
              isPast ? 'text-gray-300' :
              'group-hover:text-yellow-500'
            }`}>
              {race.name}
            </h3>
            {race.round && (
              <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md text-sm font-medium">
                R{race.round}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>{race.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{formatDate(race.date)}</span>
            </div>
            {race.time && (
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{race.time}</span>
              </div>
            )}
          </div>

          {race.circuit && (
            <p className="text-gray-500 text-sm mb-3">{race.circuit}</p>
          )}

          {showPredictions && predictionsData && (
            <div className="bg-gray-800/50 rounded-lg p-3 mb-3">
              <h4 className="text-sm font-semibold text-red-400 mb-2">AI Prediction</h4>
              <div className="flex gap-2 text-sm">
                <span className="bg-yellow-600/20 text-yellow-300 px-2 py-1 rounded">
                  Winner: {predictionsData.winner}
                </span>
                <span className="bg-gray-600/20 text-gray-300 px-2 py-1 rounded">
                  Confidence: {predictionsData.confidence}%
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {isPast && (
            <div className="text-right">
              <div className="text-lg font-bold text-green-500">COMPLETED</div>
              <div className="text-sm text-gray-400">View Results</div>
            </div>
          )}
          
          {isUpcoming && (
            <>
              <div className="text-right">
                <div className={`text-xl font-bold ${isUpcoming ? 'text-red-500' : 'text-yellow-500'}`}>
                  {formatDate(race.date)}
                </div>
                <div className="text-sm text-gray-400 uppercase">RACE DATE</div>
              </div>
              
              <button 
                onClick={() => onSetReminder && onSetReminder(race)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 text-sm"
              >
                <Zap size={16} />
                <span>Set Reminder</span>
              </button>
            </>
          )}
        </div>
      </div>

      {race.weather && (
        <div className="mt-4 pt-3 border-t border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Weather Forecast:</span>
            <span className="text-blue-400">{race.weather}</span>
          </div>
        </div>
      )}

      {race.keyStats && (
        <div className="mt-3 flex gap-4 text-xs text-gray-500">
          {race.keyStats.map((stat, index) => (
            <span key={index}>{stat}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default RaceCard;