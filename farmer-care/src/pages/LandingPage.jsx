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
    icon: <Shield className="w-8 h-8 text-green-600" />,
    title: "Easy to use and understand GUI",
    description: "Specifically designed for Indian standards"
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
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://in.nec.com/en_IN/blog/2020/images/20200801_og.png")',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-green-600/50" />
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">Empowering Farmers Through Technology</h1>
            <p className="text-xl mb-8">Transform your farming practices with FarmerCare's innovative solutions</p>
            <button 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              onClick={() => navigate('/home')}
            >
              Get Started
            </button>
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
                src="https://www.youtube.com/embed/B0dDg5lTGcI" 
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

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-green-200">
                <li className="hover:text-white cursor-pointer">About Us</li>
                <li className="hover:text-white cursor-pointer">Services</li>
                <li className="hover:text-white cursor-pointer">Blog</li>
                <li className="hover:text-white cursor-pointer">Careers</li>
                <li className="hover:text-white cursor-pointer">FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-green-200">
                <li>Email: support@farmercare.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Farming Street</li>
                <li>Agriculture Valley, AG 12345</li>
                <li>Hours: Mon-Fri 9:00 AM - 6:00 PM</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-green-200 hover:text-white">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-green-200 hover:text-white">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-green-200 hover:text-white">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-green-200 hover:text-white">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
              <p className="mt-4 text-green-200">
                Stay connected with us on social media for the latest updates and farming tips.
              </p>
            </div>
          </div>
          <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
            <p>&copy; 2024 FarmerCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;