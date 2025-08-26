import React, { useState, useEffect } from 'react';
import { ChevronRight, Calendar, MapPin, Trophy, Clock, Users, Flag, Star, Target } from 'lucide-react';
import Footer from "../components/layout/Footer";
import Navbar from '../components/layout/Navbar';

export default function Races() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeRace, setActiveRace] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const race_calendar = [
    { 
      icon: Flag, 
      title: "Australian Grand Prix", 
      date: "March 14-16, 2025",
      location: "Albert Park Ciruit",
      status: "Completed",
      winner: "Lando Norris",
      description: "Melbourne's Albert Park provides a perfect blend of speed and technical challenge with lakeside scenery and passionate fans."
    },
    { 
      icon: Flag, 
      title: "Chinese Grand Prix", 
      description: "The circuit is designed to look like the Chinese symbol for ‘shang’, meaning upwards – is equally pleasing to the drivers on terra firma.",
      date: "March 21-23, 2025",
      location: "Shanghai International Circuit",
      status: "Completed",
      winner: "Oscar Piastri"
    },
    { 
      icon: Flag, 
      title: "Japanese Grand Prix", 
      description: "The legendary Suzuka Circuit tests drivers with its famous figure-8 layout and the challenging 130R corner in motorsport's heartland.",
      date: "April 04-06, 2025",
      location: "Suzuka International Racing Course",
      status: "Completed",
      winner: "Max Verstappen"
    },
    { 
      icon: Flag, 
      title: "Bahrain Grand Prix", 
      description: "You can usually expect great racing and decent amounts of overtaking, while the drivers have to contend with wind and racing under floodlights.",
      date: "April 11-13, 2025",
      location: "Bahrain Internatiolat Circuit",
      status: "Completed",
      winner: "Oscar Piastri"
    },
    { 
      icon: Flag, 
      title: "Saudi Arabia Grand Prix", 
      description: "The event, which began in 2021, features a fast, temporary street circuit known for its high-speed nature and is a popular fixture.",
      date: "April 18-20, 2025",
      location: "Jeddah Corniche Circuit",
      status: "Completed",
      winner: "Oscar Piastri"
    },
    { 
      icon: Flag, 
      title: "Miami Grand Prix", 
      description: "America's newest F1 venue around Hard Rock Stadium offers a unique atmosphere with Miami's vibrant culture and entertainment.",
      date: "May 02-04, 2025",
      location: "Miami International Autodrome",
      status: "Completed",
      winner: "Oscar Piastri"
    },
    { 
      icon: Flag, 
      title: "Emilia Romagna Grand Prix", 
      description: "Imola's historic circuit brings old-school racing challenges with limited overtaking opportunities and passionate Italian fans.",
      date: "May 16-18, 2025",
      location: "Autodromo Enzo e Dino Ferrari",
      status: "Completed",
      winner: "Max Verstappen"
    },
    { 
      icon: Flag, 
      title: "Monaco Grand Prix", 
      description: "The crown jewel of motorsport through Monte Carlo's narrow streets where precision matters more than power and history lives.",
      date: "May 23-25, 2025",
      location: "Circuit de Monaco",
      status: "Completed",
      winner: "Lando Norris"
    },
    { 
      icon: Flag, 
      title: "Spanish Grand Prix", 
      description: "Barcelona-Catalunya combines technical complexity with traditional Spanish passion in a circuit that truly tests car setup and driver skill.",
      date: "May 30-June 01, 2025",
      location: "Circuit de Barcelona-Catalunya",
      status: "Completed",
      winner: "Oscar Piastri"
    },
    { 
      icon: Flag, 
      title: "Canadian Grand Prix", 
      description: "Montreal's Circuit Gilles Villeneuve offers high-speed racing with the famous Wall of Champions challenging even the best drivers.",
      date: "June 13-15, 2025",
      location: "Circuit Gilles Villeneuve",
      status: "Completed",
      winner: "George Russell"
    },
    { 
      icon: Flag, 
      title: "Austrian Grand Prix", 
      description: "The scenic Red Bull Ring in the Alps provides short lap thrills with elevation changes and stunning mountain views.",
      date: "June 27-29, 2025",
      location: "Red Bull Ring",
      status: "Completed",
      winner: "Lando Norris"
    },
    { 
      icon: Flag, 
      title: "British Grand Prix", 
      description: "Silverstone's high-speed corners and rich F1 history make it the home of British motorsport with unmatched atmosphere.",
      date: "July 04-06, 2025",
      location: "Silverstone Circuit",
      status: "Completed",
      winner: "Lando Norris"
    }
  ];

  const raceStats = [
    { 
      icon: Trophy, 
      title: "Total Races", 
      value: "24",
      description: "Complete season calendar"
    },
    { 
      icon: Flag, 
      title: "Countries Visited", 
      value: "21",
      description: "Global championship tour"
    },
    { 
      icon: Users, 
      title: "Teams Competing", 
      value: "10",
      description: "Constructor championship"
    },
    { 
      icon: Star, 
      title: "Championship Points", 
      value: "575",
      description: "Maximum points available"
    }
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
            Race
            <br />
            <span className="text-red-400">Calendar</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the complete <span className="text-red-500 font-semibold">Formula 1 Championship</span> journey across iconic circuits and legendary venues around the globe.
          </p>
        </div>
      </section>

      {/* Race Statistics */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
              SEASON STATISTICS
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {raceStats.map((stat, index) => (
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

      {/* Race Calendar */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">2024 RACE CALENDAR</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Follow the complete Formula 1 season across <span className="text-red-500 font-semibold">24 thrilling races</span> on the world's most challenging and iconic circuits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {race_calendar.map((race, index) => (
              <div
                key={race.title}
                className={`group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 transition-all duration-500 hover:scale-105 cursor-pointer ${
                  activeRace === index ? 'border-red-500 shadow-2xl shadow-red-500/20' : 'border-gray-600 hover:border-red-400'
                }`}
                onMouseEnter={() => setActiveRace(index)}
                style={{
                  animation: `slideInFromLeft 0.8s ease-out ${0.1 * (index + 1)}s both`
                }}
              >
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                  race.status === 'Completed' ? 'bg-green-600 text-green-100' : 'bg-yellow-600 text-yellow-100'
                }`}>
                  {race.status}
                </div>

                <div className="flex items-start space-x-4 mb-4">
                  <div className={`rounded-full p-3 transition-all duration-300 ${
                    activeRace === index ? 'bg-gradient-to-br from-red-600 to-red-800' : 'bg-gray-700 group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-red-800'
                  }`}>
                    <race.icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold group-hover:text-red-500 transition-colors mb-2">
                      {race.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
                      <Calendar size={14} />
                      <span>{race.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm mb-3">
                      <MapPin size={14} />
                      <span>{race.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 leading-relaxed text-sm mb-4">
                  {race.description}
                </p>

                {race.winner && (
                  <div className="flex items-center space-x-2 bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/30">
                    <Trophy size={16} className="text-yellow-500" />
                    <span className="text-yellow-500 font-semibold text-sm">Winner: {race.winner}</span>
                  </div>
                )}
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