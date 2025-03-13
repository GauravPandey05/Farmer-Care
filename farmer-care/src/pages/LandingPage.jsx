import React from 'react';
import { PieChart, BarChart3, Sprout, Users, Leaf, Shield, HeartHandshake, Trophy, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const statistics = [
  { label: 'Agricultural households in debt', value: 52 },
  { label: 'Small scale farmers relying on informal lending sources', value: 40 },
  { label: 'Farmers rely on moneylenders with high interest rates', value: 64 }
];

const features = [
  // {
  //   icon: <Sprout className="w-8 h-8 text-green-600" />,
  //   title: "Smart Farming",
  //   description: "Access to modern farming techniques and real-time crop monitoring"
  // },
  // {
  //   icon: <Users className="w-8 h-8 text-green-600" />,
  //   title: "Community Support",
  //   description: "Connect with expert farmers and agricultural specialists"
  // },
  {
    icon: <BarChart3 className="w-8 h-8 text-green-600" />,
    title: "Real-Time Weather Updates",
    description: "Get insights on the current and forecoming weather in your area"
  },
  {
    icon: <Leaf className="w-8 h-8 text-green-600" />,
    title: "Crop Recommendations",
    description: "Recommends crops based on the soil type and rainfall"
  },
  {
    icon: <Users className="w-8 h-8 text-green-600" />,
    title: "Community Section",
    description: "We provide a platform for small-scale & large-scale farmers to connect with each other"
  },
  {
    icon: <HeartHandshake className="w-8 h-8 text-green-600" />,
    title: "Financial Support",
    description: "Access to loans and government scheme information"
  }
];

function LandingPage() {
  const navigate= useNavigate();  
  return (
    <div className="min-h-screen bg-white">
      {/* 3D Animated Intro Section */}
      <div className="relative h-[85vh] bg-gradient-to-b from-green-900 to-green-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.iotm2mcouncil.org/wp-content/uploads/2021/03/marblog2.jpg')] bg-cover bg-center opacity-25"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-8 animate-float">
            <h1 className="text-7xl font-bold text-white mb-6 tracking-tight animate-title">
              <span className="inline-block animate-slideDown">Farmer</span>
              <span className="inline-block text-green-300 animate-slideUp">Care</span>
            </h1>
            <p className="text-2xl text-green-100 max-w-2xl mx-auto leading-relaxed animate-fadeIn">
              Empowering farmers with innovative solutions for a sustainable future
            </p>
            <div className="flex justify-center gap-6 animate-fadeIn">
              <button className="px-8 py-3 bg-white text-green-700 rounded-full font-semibold hover:bg-green-50 transform hover:scale-105 transition-all shadow-lg"
              onClick={() => navigate('/home')}>
                Get Started
              </button>
            </div>
          </div>
        </div>
        {/* Animated floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-float-slow absolute top-1/4 left-1/4 text-white/20">
            <Sprout className="w-24 h-24" />
          </div>
          <div className="animate-float-slower absolute top-1/3 right-1/4 text-white/20">
            <Leaf className="w-32 h-32" />
          </div>
          <div className="animate-float-slowest absolute bottom-1/4 left-1/3 text-white/20">
            <Shield className="w-20 h-20" />
          </div>
        </div>
      </div>
      {/* Video Section */}
      <div className="bg-green-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-8">See How We're Making a Difference</h2>
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                className="w-full h-[500px]"
                src="https://www.youtube.com/embed/VGaVD9VQ6tg?si=Ol7rFkja-eSuXGoE" 
                title="FarmerCare Impact"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      {/* Statistics and Mission Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Statistics */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-green-800 mb-6">Why Farmers Need FarmerCare ?</h2>
            <div className="space-y-6">
              {statistics.map((stat, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-48 bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-green-600 h-4 rounded-full"
                      style={{ width: `${stat.value}%` }}
                    />
                  </div>
                  <span className="ml-4 text-gray-700">{stat.label} ({stat.value}%)</span>
                </div>
              ))}
              <p id = "para">[Data verified by <a href='https://sansad.in/getFile/loksabhaquestions/annex/174/AU277.pdf?source=pqals#:~:text=The%20Statement%20reveals%20that%20about,47000%2F%2D%20(approx.).'>National survey 2022-2023</a> & <a href='https://www.mospi.gov.in/national-sample-survey-officensso'>NSSO Survey(2019)]</a></p>
              <br></br>
              <p id="dyk">DO YOU KNOW ?</p><p id="abc">70% of India's food production comes from small-scale farmers which very usually are Non-Machinery farmers</p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-green-50 p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-green-800 mb-6">Our Mission</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                Empowering farmers with cutting-edge technology and sustainable practices to enhance agricultural productivity and improve livelihoods.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Easily accessible services for Indian farmers accross the country</li>
                <li>Help farmers with financial planning</li>
                <li>Promote sustainable farming practices</li>
                <li>Insightful crop recommendation & weather integration facilities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* How FarmerCare Helps */}
      <div className="bg-green-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-16">How Does FarmerCare Help You ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default LandingPage;