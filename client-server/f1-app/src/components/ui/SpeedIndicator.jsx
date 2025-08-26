import React from 'react';

const SpeedIndicator = ({ value, label, className = "" }) => {
  return (
    <div className={`bg-gray-800/80 backdrop-blur-md border border-gray-600/40 rounded-2xl p-6 shadow-2xl ${className}`}>
      <div className="text-4xl font-black text-red-500 mb-2">{value}</div>
      <div className="text-sm text-gray-400 uppercase tracking-wider">{label}</div>
    </div>
  );
};

export default SpeedIndicator;