import React, { useState } from "react";
import { Play, Calendar, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SpeedIndicator from "../components/ui/SpeedIndicator";
import PredictorCard from "../components/ui/PredictorCard";
import RaceCard from "../components/ui/RaceCard";
import usePageAnimations from "../hooks/usePageAnimation";
import Background from '../assets/F1-BKG.jpg';

export default function LandingPage() {
  const { isVisible, mousePosition } = usePageAnimations();
  const [activePredictor, setActivePredictor] = useState(0);

  const predictors = [
    { name: "Qualifying Grid AI", description: "Predict the starting grid", acc: 87.5 },
    { name: "Podium AI", description: "Predict the podium", acc: 80 },
    { name: "Whole Grid Result AI", description: "Predict the whole grid", acc: 78.9 },
  ];

  const races = [
    { name: "Dutch Grand Prix", date: "Aug 31, 2025", location: "Circuit Zandvoort" },
    { name: "Italian Grand Prix", date: "Sep 7, 2025", location: "Autodromo Nazionale Monza" },
    { name: "Azerbaijan Grand Prix", date: "Sep 21, 2025", location: "Baku City Circuit" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background cursor effect */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, red 0%, transparent 50%)`,
        }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        {/* Racing Lines */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"
              style={{
                top: `${20 + i * 15}%`,
                left: "-100%",
                width: "200%",
                animation: `slide-${i} ${3 + i * 0.5}s linear infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div
          className={`relative z-10 text-center px-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-r from-white via-red-300 to-white bg-clip-text text-transparent">
            Overtake <br />
            <span className="text-red-400">Intelligence</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            We predict the outcomes of the pinnacle of motorsport. Where legends are born and limits
            are shattered at <span className="text-red-500 font-semibold">350 km/h</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/f1predictions">
              <button className="group bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-red-600/40 flex items-center space-x-3">
                <Play size={20} />
                <span>View AI predictions</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </Link>

            <Link to="/about">
              <button className="group border-2 border-white hover:bg-white hover:text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center space-x-3">
                <Calendar size={20} />
                <span>About our AI</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </Link>
          </div>
        </div>

        {/* Speed Indicator component */}
        <div className="fixed bottom-6 right-6 z-50">
          <SpeedIndicator value={347} label="KM/H" />
        </div>
      </section>
    
      {/* Predictors Section */}
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
              <PredictorCard
                key={predictor.name}
                predictor={predictor}
                index={index}
                active={activePredictor === index}
                onHover={() => setActivePredictor(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Race Calendar Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">RACE CALENDAR</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Don&apos;t miss a single moment of high-octane racing action
            </p>
          </div>

          <div className="space-y-6">
            {races.map((race) => (
              <RaceCard key={race.name} race={race} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Footer */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-600 to-red-800 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black mb-6">JOIN THE COMMUNITY</h2>
          <p className="text-xl mb-8 opacity-90">
            Experience Formula 1 like never before. Get exclusive access to live predictions, and
            behind-the-scenes content.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Start Free Trial
            </button>
            <Link to="/about">
              <button className="border-2 border-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}