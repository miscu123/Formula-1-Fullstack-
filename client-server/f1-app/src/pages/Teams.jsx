import React, { useState, useEffect } from 'react';
import { ChevronRight, Calendar, MapPin, Trophy, Clock, Users, Flag, Star, Target, Car } from 'lucide-react';
import Footer from "../components/layout/Footer";
import Navbar from '../components/layout/Navbar';
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

  const team_history = [
    { 
      icon: Car, 
      title: "Ferrari", 
      date: "Founded: 1929",
      location: "Base: Maranello",
      description: ""
    },
    { 
      icon: Car, 
      title: "McLaren", 
      date: "Founded: 1963",
      location: "Base: Woking",
      description: ""
    },
    { 
      icon: Car, 
      title: "Williams", 
      date: "Founded: 1977",
      location: "Base: Grove",
      description: ""
    },
    { 
      icon: Car, 
      title: "Lotus", 
      date: "Founded: 1958",
      location: "Base: Enstone",

      description: ""
    },
    { 
      icon: Car, 
      title: "Red Bull Racing", 
      date: "Founded: 2004",
      location: "Base: Milton Keynes",
      description: ""
    },
    { 
      icon: Car, 
      title: "Renault", 
      date: "Founded: 1977",
      location: "Base: Viry-Châtillon",
      description: ""
    },
    { 
      icon: Car, 
      title: "Brabham", 
      date: "Founded: 1960",
      location: "Base: Surbiton",
      description: ""
    },
    { 
      icon: Car, 
      title: "Alfa Romeo", 
      date: "Founded: 1950",
      location: "Base: Hinwil",
      description: ""
    },
    { 
      icon: Car, 
      title: "Mercedes", 
      date: "Founded: 2009",
      location: "Base: Brackley",
      description: ""
    },
    { 
      icon: Car, 
      title: "Torro Rosso", 
      date: "Founded: 2005",
      location: "Base: Faenza",
      description: ""
    },
    { 
      icon: Car, 
      title: "Benetton", 
      date: "Founded: 1986",
      location: "Base: Enstone",
      description: ""
    },
    { 
      icon: Car, 
      title: "Sauber", 
      date: "Founded: 1993",
      location: "Base: Hinwil",
      description: ""
    },
    { 
      icon: Car, 
      title: "Force India", 
      date: "Founded: 2007",
      location: "Base: Silverstone",
      description: ""
    },
    { 
      icon: Car, 
      title: "Haas", 
      date: "Founded: 2014",
      location: "Base: Kannapolis",
      description: ""
    },
    {
      icon: Car, 
      title: "Aston Martin", 
      date: "Founded: 2018",
      location: "Base: Silverstone",
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
      <Navbar />

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
            Explore the history of 
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
      {/* Footer */}
      <Footer />
    </div>
  );
}