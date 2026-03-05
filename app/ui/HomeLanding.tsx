"use client";
import { useRouter } from "next/navigation";
import "@/app/ui/global.css";
import Hero from "@/app/ui/Hero";
import MainIdea from "@/app/ui/MainIdea";
import Features from "@/app/ui/Features";
import About from "@/app/ui/About";
import LastHook from "@/app/ui/LastHook";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function HomeLanding() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;

    const enforceRoleRedirect = async () => {
      if (!cancelled) setCheckingAuth(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const role = user?.app_metadata?.role;
      if (role === "teacher") {
        router.replace("/teacher");
        return;
      }
      if (role === "student") {
        router.replace("/student");
        return;
      }
      if (role === "admin") {
        router.replace("/admin");
        return;
      }
      if (!cancelled) setCheckingAuth(false);
    };
    const handlePageHide = () => {
      setCheckingAuth(true);
    };
    const disableBfCache = () => {};
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
        return;
      }
      void enforceRoleRedirect();
    };

    enforceRoleRedirect();
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("unload", disableBfCache);
    return () => {
      cancelled = true;
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("unload", disableBfCache);
    };
  }, [router]);

  if (checkingAuth) {
    return <div className="min-h-screen bg-slate-950" />;
  }

  return (
    <div>
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
