import React, { useState, useEffect } from 'react';
import { ChevronRight, Play, Calendar, Trophy, Zap, Users, ArrowRight, Star } from 'lucide-react';
import './LandingPage.css';
import { Link } from "react-router-dom";

export default function F1LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [ActivePredictor, setActivePredictor] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const predictors = [
    { name: "Qualifying Grid AI", description: "Predict the starting grid", acc: 87.5},
    { name: "Podium AI", description: "Predict the podium", acc: 80},
    { name: "Whole Grid Result AI", description: "Predict the whole grid", acc: 78.9}
  ];

  const races = [
    { name: "Dutch Grand Prix", date: "Aug 31, 2025", location: "Circuit Zandvoort" },
    { name: "Italian Grand Prix", date: "Sep 7, 2025", location: "Autodromo Nazionale Monza" },
    { name: "Azerbaijan Grand Prix", date: "Sep 21, 2025", location: "Baku City Circuit" }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, red 0%, transparent 50%)`
        }}
      />
      
      {/* Navigation */}
      <nav className="relative z-50 p-6 flex justify-between items-center bg-black/80 backdrop-blur-md border-b border-red-900/30">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center font-black text-xl transform hover:scale-110 transition-all duration-300">
            F1
          </div>
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

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden f1-bg">
        {/* Racing Lines Animation */}
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

        <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-r from-white via-red-300 to-white bg-clip-text text-transparent">
            Overtake
            <br />
            <span className="text-red-400">Intelligence</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            We predict the outcomes of the pinnacle of motorsport. Where legends are born and limits are shattered at <span className="text-red-500 font-semibold">350 km/h</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="group bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-red-600/40 flex items-center space-x-3"
              onClick={() => window.location.href = './F1Predictions'} // sau URL complet
            >
              <Play size={20} />
              <span>View AI predictions</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>

            
            <button className="group border-2 border-white hover:bg-white hover:text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center space-x-3">
              <Calendar size={20} />
              <span>About our AI</span>
              <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
        </div>

        {/* Speed Indicator */}
        <div className="absolute bottom-20 right-10 bg-gray-800/80 backdrop-blur-md border border-gray-600/40 rounded-2xl p-6 shadow-2xl">
          <div className="text-6xl font-black text-red-500 mb-2">347</div>
          <div className="text-sm text-gray-400 uppercase tracking-wider">KM/H TOP SPEED</div>
        </div>
      </section>

      {/* Championship Standings */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
              INCLUDED PREDICTIONS 
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {predictors.map((predictor, index) => (
              <Link key={predictor.name} to="/F1Predictions" className="block">
              <div
                key={predictor.name}
                className={`group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border-2 transition-all duration-500 hover:scale-105 cursor-pointer ${
                  index === 0 ? 'border-yellow-500 shadow-2xl shadow-yellow-500/20' : 
                  index === 1 ? 'border-gray-400 shadow-2xl shadow-gray-400/20': 
                  'border-orange-500 shadow-2xl shadow-orange-500/20'
                }`}
                onMouseEnter={() => setActivePredictor(index)}
              >
                {index === 0 && (
                  <div className="absolute -top-4 -right-4 bg-yellow-500 rounded-full p-3">
                    <Trophy className="text-black" size={24} />
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-6">
                  <div className={`text-4xl font-black ${
                    index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-orange-500'
                  }`}>
                    #{index + 1}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-500">{predictor.acc}</div>
                    <div className="text-sm text-gray-400 uppercase">ACCURACY</div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2">{predictor.name}</h3>
                <p className="text-gray-400 mb-4">{predictor.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                  </span>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={`${i < (index === 0 ? 5 : index === 1 ? 4 : 3) ? 'text-yellow-500 fill-current' : 'text-gray-600'}`} />
                    ))}
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Races */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">RACE CALENDAR</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Don't miss a single moment of high-octane racing action
            </p>
          </div>

          <div className="space-y-6">
            {races.map((race, index) => (
              <div
                key={race.name}
                className="group bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-2xl p-8 hover:border-red-600 transition-all duration-500 hover:shadow-2xl hover:shadow-red-600/20"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-red-500 transition-colors">
                      {race.name}
                    </h3>
                    <p className="text-gray-400 text-lg">{race.location}</p>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-500">{race.date}</div>
                      <div className="text-sm text-gray-400 uppercase">RACE DATE</div>
                    </div>
                    
                    <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                      <Zap size={18} />
                      <span>Set Reminder</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-800/30 to-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users size={32} className="text-white" />
              </div>
              <div className="text-4xl font-black mb-2 text-red-500">500M+</div>
              <div className="text-gray-400 text-lg">Global Fans</div>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap size={32} className="text-white" />
              </div>
              <div className="text-4xl font-black mb-2 text-red-500">350</div>
              <div className="text-gray-400 text-lg">KM/H Max Speed</div>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Trophy size={32} className="text-white" />
              </div>
              <div className="text-4xl font-black mb-2 text-red-500">23</div>
              <div className="text-gray-400 text-lg">Races Per Season</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-600 to-red-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-6">JOIN THE COMMUNITY</h2>
          <p className="text-xl mb-8 opacity-90">
            Experience Formula 1 like never before. Get exclusive access to live predictions, and behind-the-scenes content.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Start Free Trial
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center font-black">
                  F1
                </div>
                <span className="text-xl font-bold">FORMULA 1</span>
              </div>
              <p className="text-gray-400">The pinnacle of motorsport excellence.</p>
            </div>
            
            {['Predictors', 'Races', 'FAQ'].map((category) => (
              <div key={category}>
                <h4 className="font-bold mb-4">{category}</h4>
                <div className="space-y-2">
                  {['Link 1', 'Link 2', 'Link 3'].map((link) => (
                    <div key={link} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                      {link}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Formula 1. All rights reserved. | Experience the speed.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}