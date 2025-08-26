import React, { useState, useEffect } from 'react';

const Layout = ({ children, showRacingLines = true }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Mouse follow effect */}
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, red 0%, transparent 50%)`
        }}
      />
      
      {/* Racing Lines Animation */}
      {showRacingLines && (
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"
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
      )}
    </div>
  );
};

export default Layout;