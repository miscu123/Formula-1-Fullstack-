import React, { useState, useEffect } from 'react';
import { ChevronRight, Calendar, MapPin, Trophy, Clock, Users, Flag, Star, Target, Car } from 'lucide-react';
import './LandingPage.css';
import { Link } from "react-router-dom";

export default function Teams() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTeam, setActiveTeam] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getNavLink = (item) => {
    switch(item) {
        case 'Home': return '/';
        case 'Predictions': return '/F1Predictions';
        case 'Dashboard': return '#'; 
        case 'Login / SignUp': return '#'; 
        default: return '#';
    }
  };

  const team_history = [
    { 
      icon: Car, 
      title: "Ferrari", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "McLaren", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Williams", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Lotus", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Tyrell", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Red Bull Racing", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Renault", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Brabham", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Sauber", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Minardi", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Mercedes", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Ligier", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Arrows", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Torro Rosso", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Benetton", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Jordan", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Alfa Romeo", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Force India", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Haas", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "BRM", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "March", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Lola", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Toyota", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Osella", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Cooper", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Surtees", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "BAR", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Aston Martin", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Shadow", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Alpine", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Ensign", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Footwork", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "ATS", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "BMW Sauber", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Honda", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Jaguar", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Prost", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "AlphaTauri", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Dallara", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Marussia", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Copersucar", 
      date: "",
      location: "",

      description: ""
    },
    { 
      icon: Car, 
      title: "Maserati", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Matra", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Toleman", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "HRT", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Caterham", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Zakspeed", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Hesketh", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Stewart", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Wolf", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "AGS", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Penske", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Super Aguri", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Virgin", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Racing Point", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Kick Sauber", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Gordini", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Theodore", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Fittipaldi", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Larrousse", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Porsche", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Iso-Marlboro", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Leyton House", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Vanwall", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "RAM", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Eagle", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "RB", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Spirit", 
      date: "",
      location: "",
      description: ""
    },
    { 
      icon: Car, 
      title: "Forti", 
      date: "",
      location: "",
      description: ""
    }
  ];

  const teamStats = [
    { 
      icon: Car, 
      title: "Competing TEAMS", 
      value: "10",
      description: ""
    },
    { 
      icon: Star, 
      title: "Championship POINTS", 
      value: "575",
      description: ""
    },
    { 
      icon: Trophy, 
      title: "Championship WINNER", 
      value: "1",
      description: ""
    },
    { 
      icon: Users, 
      title: "Losing TEAMS", 
      value: "9",
      description: ""
    },
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
        <Link to="/" className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center font-black text-xl transform hover:scale-110 transition-all duration-300 cursor-pointer">
            F1
          </div>
          <span className="text-2xl font-bold tracking-wider">FORMULA 1</span>
        </Link>
        <div className="hidden md:flex space-x-8">
          {['Home', 'Predictions', 'Dashboard', 'Login / SignUp'].map((item) => (
            <Link 
              key={item} 
              to={getNavLink(item)} 
              className="hover:text-red-500 transition-colors duration-300 font-medium tracking-wide">
              {item}
            </Link>
          ))}
        </div>
        <Link to="/F1Predictions">
          <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-600/30">
            View Predictions
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 flex items-center justify-center overflow-hidden f1-bg">
        {/* Racing Lines Animation */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse`}
              style={{
                top: `${30 + i * 20}%`,
                left: '-100%',
                width: '200%',
                animation: `slide-${i} ${4 + i * 0.5}s linear infinite`,
                animationDelay: `${i * 0.4}s`
              }}
            />
          ))}
        </div>

        <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-r from-white via-red-300 to-white bg-clip-text text-transparent">
            Teams
            <br />
            <span className="text-red-400">Statistics</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            View and explore historical stats for <span className="text-red-500 font-semibold">Formula 1 Teams</span> .
          </p>
        </div>
      </section>

      {/* Race Statistics */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
              TEAM STATISTICS
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {teamStats.map((stat, index) => (
              <div
                key={stat.title}
                className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-red-600 transition-all duration-500 hover:scale-105 cursor-pointer hover:shadow-xl hover:shadow-red-600/20 text-center"
              >
                <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon size={32} className="text-white" />
                </div>
                <div className="text-4xl font-black text-red-500 mb-2">{stat.value}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors">
                  {stat.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

        {/* Team Stats */}
    <section className="py-20 px-6 bg-gradient-to-br from-gray-800 to-gray-900">
    <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
        <h2 className="text-5xl font-black mb-6">HISTORICAL TEAM STATS</h2>
        <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-8"></div>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Explore the complete history of 
            <span className="text-red-500 font-semibold"> Formula 1 teams</span>.
        </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team_history.map((team, index) => (
            <div
            key={team.title}
            className={`group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 transition-all duration-500 hover:scale-105 cursor-pointer ${
                activeTeam === index 
                ? 'border-red-500 shadow-2xl shadow-red-500/20' 
                : 'border-gray-600 hover:border-red-400'
            }`}
            onMouseEnter={() => setActiveTeam(index)}
            style={{
                animation: `slideInFromLeft 0.8s ease-out ${0.1 * (index + 1)}s both`
            }}
            >
            {/* Team Icon + Title + Meta */}
            <div className="flex items-start space-x-4 mb-4">
                <div
                className={`rounded-full p-3 transition-all duration-300 ${
                    activeTeam === index 
                    ? 'bg-gradient-to-br from-red-600 to-red-800' 
                    : 'bg-gray-700 group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-red-800'
                }`}
                >
                <team.icon size={24} className="text-white" />
                </div>
                <div className="flex-1">
                <h3 className="text-xl font-bold group-hover:text-red-500 transition-colors mb-2">
                    {team.title}
                </h3>
                <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
                    <Calendar size={14} />
                    <span>{team.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-sm mb-3">
                    <MapPin size={14} />
                    <span>{team.location}</span>
                </div>
                </div>
            </div>

            {/* Team Description */}
            <p className="text-gray-400 leading-relaxed text-sm mb-4">
                {team.description}
            </p>
            </div>
        ))}
        </div>
    </div>
    </section>  


      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-600 to-red-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-6">PREDICT THE NEXT WINNER</h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Use our advanced AI predictions to forecast race outcomes and championship standings 
            based on comprehensive data analysis and machine learning algorithms.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/F1Predictions">
              <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
                View AI Predictions
              </button>
            </Link>
            <Link to="/">
              <button className="border-2 border-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </section>

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

        ${[...Array(5)].map((_, i) => `
          @keyframes slide-${i} {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `).join('')}
      `}} />

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center font-black">
                  F1
                </div>
                <span className="text-xl font-bold">Overtake Intelligence</span>
              </div>
              <p className="text-gray-400">Experience every race of the championship season.</p>
            </div>
            
            {['Races', 'Predictions', 'Statistics'].map((category) => (
              <div key={category}>
                <h4 className="font-bold mb-4">{category}</h4>
                <div className="space-y-2">
                  {['Calendar', 'Results', 'Analysis'].map((link) => (
                    <div key={link} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                      {link}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Overtake Intelligence. All rights reserved. | Follow every lap of the season.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}