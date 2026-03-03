'use client';
import {useRouter}from 'next/navigation';
import '@/app/ui/global.css';
import NavBar from '@/app/ui/NavBar';
import Hero from '@/app/ui/Hero';
import MainIdea from '@/app/ui/MainIdea';
import Features from '@/app/ui/Features';
import About from '@/app/ui/About';
import LastHook from '@/app/ui/LastHook';
import { useEffect,useState } from 'react';
import Authentification from '@/app/ui/Authentification';
import { createClient } from "@/app/lib/supabase/client";

 type Role = "student" | "teacher" | "admin"|null;

export default function HomeLanding(){
    const router=useRouter();
  const [auth, setauth] = useState(false);

  useEffect(()=>{
    const supabase= createClient();

    const enforceRoleRedirect=async()=>{
        const { data:{ user }} = await supabase.auth.getUser();
        const role = user?.app_metadata?.role ?? user?.user_metadata?.role;
         if (role === 'teacher') router.replace('/teacher');
         if (role === 'student') router.replace('/student');
         if(role==='admin')router.replace('/admin');
    };
    enforceRoleRedirect();
    window.addEventListener('pageshow',enforceRoleRedirect);
    return()=> window.removeEventListener('pageshow',enforceRoleRedirect);
  },[router]);
  return (
    <div>
      <NavBar onLoginClick={()=>{
        setauth((prev)=>!prev);
      }
      }/>
      <div className= {auth ? "auth" : "auth-hidden"}>
       
        <Authentification 
        onSuccess={(role:Role)=>{
          setauth(false);
          if(role==="student"){
            router.replace("/student");
          }else if(role==="teacher"){
            router.replace("/teacher");
          }else if(role==="admin"){
            router.replace("/admin");
          }else{
             router.replace("/");

          }
        }}
        />
      </div>
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
}