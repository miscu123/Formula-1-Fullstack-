import React from 'react';
import { Trophy, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const PredictorCard = ({ 
  predictor, 
  index, 
  isActive = false, 
  onMouseEnter,
  linkTo = "/F1Predictions" 
}) => {
  const getPositionStyling = (position) => {
    switch(position) {
      case 0:
        return {
          border: 'border-yellow-500',
          shadow: 'shadow-yellow-500/20',
          accent: 'text-yellow-500',
          accuracy: 87
        };
      case 1:
        return {
          border: 'border-gray-400',
          shadow: 'shadow-gray-400/20',
          accent: 'text-gray-400',
          accuracy: 70
        };
      case 2:
        return {
          border: 'border-orange-500',
          shadow: 'shadow-orange-500/20',
          accent: 'text-orange-500',
          accuracy: 65
        };
      default:
        return {
          border: 'border-gray-600',
          shadow: 'shadow-gray-600/20',
          accent: 'text-gray-400',
          accuracy: 0
        };
    }
  };

  const styling = getPositionStyling(index);
  const starCount = index === 0 ? 5 : index === 1 ? 4 : 3;

  return (
    <Link to={linkTo} className="block">
      <div
        className={`group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border-2 transition-all duration-500 hover:scale-105 cursor-pointer ${styling.border} hover:shadow-2xl ${styling.shadow}`}
        onMouseEnter={() => onMouseEnter && onMouseEnter(index)}
      >
        {index === 0 && (
          <div className="absolute -top-4 -right-4 bg-yellow-500 rounded-full p-3">
            <Trophy className="text-black" size={24} />
          </div>
        )}
        
        <div className="flex items-center justify-between mb-6">
          <div className={`text-4xl font-black ${styling.accent}`}>
            #{index + 1}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-red-500">{styling.accuracy}%</div>
            <div className="text-sm text-gray-400 uppercase">ACCURACY</div>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-2 group-hover:text-red-500 transition-colors">
          {predictor.name}
        </h3>
        <p className="text-gray-400 mb-4">{predictor.description}</p>
        
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
            index === 1 ? 'bg-gray-400/20 text-gray-300' :
            'bg-orange-500/20 text-orange-400'
          }`}>
            {predictor.category || 'AI Predictor'}
          </span>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={`${i < starCount ? 'text-yellow-500 fill-current' : 'text-gray-600'}`} 
              />
            ))}
          </div>
        </div>

        {predictor.status && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
              predictor.status === 'active' ? 'bg-green-900/30 text-green-300' :
              predictor.status === 'beta' ? 'bg-blue-900/30 text-blue-300' :
              'bg-yellow-900/30 text-yellow-300'
            }`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                predictor.status === 'active' ? 'bg-green-400' :
                predictor.status === 'beta' ? 'bg-blue-400' :
                'bg-yellow-400'
              }`}></div>
              {predictor.status.toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default PredictorCard;