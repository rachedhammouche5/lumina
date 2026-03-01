
'use client';
import {useRouter}from 'next/navigation';
import '@/app/ui/global.css';
import NavBar from '@/app/ui/NavBar';
import Hero from '@/app/ui/Hero';
import MainIdea from '@/app/ui/MainIdea';
import Features from '@/app/ui/Features';
import About from '@/app/ui/About';
import LastHook from '@/app/ui/LastHook';
import Footer from '@/app/ui/Footer';
import { useEffect, useState } from 'react';
import Authentification from '@/app/ui/Authentification';
import { createClient } from '@/app/lib/supabase/client';


export default function Home() {
  const router=useRouter();
  const [auth, setauth] = useState(false);

  

  return (
    

    <div>
      <NavBar onLoginClick={()=>{
        setauth((prev)=>!prev);
      }
      }/>
      <div className= {auth ? "auth" : "auth-hidden"}>
        <Authentification 
        onSuccess={()=>{
          setauth(false);
          router.push('/student');
        }}
        />
      </div>
      <div className="body">
        <Hero 
        src="/videos/homeVideo.mp4"
        title="Learn Smarter. Adapt Faster."
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
        <Footer />  
      </div>
      
    </div>  
  );
};
