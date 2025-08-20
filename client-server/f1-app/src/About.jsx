import React, { useState, useEffect } from 'react';
import { ChevronRight, Database, Brain, BarChart3, Users, Code, Zap, Target, Settings, Globe, Shield, TrendingUp } from 'lucide-react';
import './LandingPage.css';
import { Link } from "react-router-dom";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
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

  const objectives = [
    { 
      icon: Database, 
      title: "Data Collection & Preprocessing", 
      description: "Comprehensive historical F1 data including race results, weather conditions, qualifying data, driver stats, and circuit information"
    },
    { 
      icon: Brain, 
      title: "Machine Learning Development", 
      description: "Advanced ML models to predict race winners and estimate final season standings based on real-time data analysis"
    },
    { 
      icon: BarChart3, 
      title: "Contextual Performance Analysis", 
      description: "Deep analysis of weather and track type influence on race outcomes and driver performance patterns"
    },
    { 
      icon: Globe, 
      title: "Web Application Development", 
      description: "User-friendly platform integrating predictive tools, live statistics, and interactive data visualizations"
    }
  ];

  const features = [
    { 
      icon: TrendingUp, 
      title: "Interactive Dashboard", 
      description: "Real-time statistics on races, teams, and drivers with dynamic visualizations"
    },
    { 
      icon: Target, 
      title: "Race Winner Predictor", 
      description: "Machine learning algorithms forecast Grand Prix winners with high accuracy"
    },
    { 
      icon: BarChart3, 
      title: "Season Simulation", 
      description: "Visualize predicted final championship standings through advanced modeling"
    },
    { 
      icon: Shield, 
      title: "User Authentication", 
      description: "Personalized predictions and preferences with secure account management"
    }
  ];

  const techStack = {
    backend: ["Python", "FastAPI", "scikit-learn", "pandas", "NumPy"],
    frontend: ["React.js", "TailwindCSS", "Chart.js", "Recharts"],
    database: ["MongoDB"],
    others: ["Git", "Docker", "Swagger"]
  };

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
          <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-600/30"
          >
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
            About
            <br />
            <span className="text-red-400">F1 Insight</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Leveraging <span className="text-red-500 font-semibold">Machine Learning</span> to analyze historical Formula 1 data and generate intelligent predictions for the pinnacle of motorsport.
          </p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
              PROJECT OVERVIEW
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              F1 Insight is a cutting-edge web platform that combines statistical analysis, data visualization, 
              and personalized predictions to deliver an <span className="text-red-500 font-semibold">interactive and informative experience</span> for Formula 1 enthusiasts through a modern, intuitive interface.
            </p>
          </div>
        </div>
      </section>

      {/* Main Objectives */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">MAIN OBJECTIVES</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => (
              <div
                key={objective.title}
                className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border-2 border-gray-700 hover:border-red-600 transition-all duration-500 hover:scale-105 cursor-pointer hover:shadow-2xl hover:shadow-red-600/20"
              >
                <div className="flex items-start space-x-6">
                  <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                    <objective.icon size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-red-500 transition-colors">
                      {objective.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {objective.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planned Features */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
              PLANNED FEATURES
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border-2 transition-all duration-500 hover:scale-105 cursor-pointer ${
                  activeFeature === index ? 'border-red-500 shadow-2xl shadow-red-500/20' : 'border-gray-600 hover:border-red-400'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="flex items-center space-x-6 mb-4">
                  <div className={`rounded-full p-4 transition-all duration-300 ${
                    activeFeature === index ? 'bg-gradient-to-br from-red-600 to-red-800' : 'bg-gray-700 group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-red-800'
                  }`}>
                    <feature.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-red-500 transition-colors">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-400 leading-relaxed ml-20">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">TECH STACK</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(techStack).map(([category, technologies]) => (
              <div
                key={category}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-red-600 transition-all duration-500 hover:shadow-xl hover:shadow-red-600/20"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-lg p-3">
                    {category === 'backend' && <Code size={24} className="text-white" />}
                    {category === 'frontend' && <Globe size={24} className="text-white" />}
                    {category === 'database' && <Database size={24} className="text-white" />}
                    {category === 'others' && <Settings size={24} className="text-white" />}
                  </div>
                  <h3 className="text-xl font-bold capitalize">{category}</h3>
                </div>
                <div className="space-y-2">
                  {technologies.map((tech) => (
                    <div
                      key={tech}
                      className="bg-gray-700/50 rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-600/20 hover:text-red-400 transition-all duration-300"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-600 to-red-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-6">OUR VISION</h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            To revolutionize how Formula 1 fans experience the sport by providing cutting-edge AI predictions, 
            comprehensive data analysis, and immersive visualizations that bring the excitement of racing 
            to your fingertips with unprecedented accuracy and insight.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/F1Predictions">
              <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
                View Predictions
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

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center font-black">
                  F1
                </div>
                <span className="text-xl font-bold">F1 INSIGHT</span>
              </div>
              <p className="text-gray-400">AI-powered Formula 1 predictions and analysis.</p>
            </div>
            
            {['Predictors', 'Features', 'Tech Stack'].map((category) => (
              <div key={category}>
                <h4 className="font-bold mb-4">{category}</h4>
                <div className="space-y-2">
                  {['Dashboard', 'Predictions', 'Analytics'].map((link) => (
                    <div key={link} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                      {link}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 F1 Insight. All rights reserved. | Powered by Machine Learning.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}