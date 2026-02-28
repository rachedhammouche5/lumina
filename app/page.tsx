
'use client';

import './ui/global.css';
import NavBar from './ui/NavBar';
import Hero from './ui/Hero';
import MainIdea from './ui/MainIdea'; 
import Features from './ui/Features';
import About from './ui/About';
import LastHook from './ui/LastHook';
import Footer from './ui/Footer';
import { useState } from 'react';

export default function Home() {
  const [auth, setauth] = useState(false);
  return (
    

    <div>
      <NavBar />
      <div className="body">
        <Hero 
        src="/videos/homeVideo.mp4"
        subtitle="Lumina is an AI-powered adaptive learning platform designed for 
          university students. It personalizes learning paths based on 
          performance, engagement, and skill level."
      />
      <MainIdea
        question="What is Lumina?"
        answer="Lumina is an AI-powered adaptive learning platform designed for university students. It personalizes learning paths based on performance, engagement, and skill level."
      />
        <Features />
        <About />
        <LastHook /> 
      </div>
      
    </div>  
  );
};
