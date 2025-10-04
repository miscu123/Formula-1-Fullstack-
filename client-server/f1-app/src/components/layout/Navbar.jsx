import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Predictions', path: '/F1Predictions' },
    { name: 'Races', path: '/races' },
    { name: 'Teams', path: '/teams' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
    { name: 'Login / SignUp', path: '/auth' }
  ];

  return (
    <nav className="relative z-50 p-6 flex justify-between items-center bg-black/80 backdrop-blur-md border-b border-red-900/30">
      <Link to="/" className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center font-black text-xl transform hover:scale-110 transition-all duration-300 cursor-pointer">
          F1
        </div>
        <span className="text-2xl font-bold tracking-wider">FORMULA 1</span>
      </Link>
      
      <div className="hidden md:flex space-x-8">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path} 
            className="hover:text-red-500 transition-colors duration-300 font-medium tracking-wide"
          >
            {item.name}
          </Link>
        ))}
      </div>
      
      <Link to="/F1Predictions">
        <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-600/30">
          View Predictions
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;