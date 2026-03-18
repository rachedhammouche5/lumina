import "@/app/ui/global.css";
import Hero from "@/app/ui/Hero";
import MainIdea from "@/app/ui/MainIdea";
import Features from "@/app/ui/Features";
import About from "@/app/ui/About";
import LastHook from "@/app/ui/LastHook";

export default function HomeLanding() {
  return (
    <div>
      <div className="body">
        <Hero
          src="/videos/homeVideo.mp4"
          subtitle="Lumina identifies your gaps and crafts a path that focuses only on what you don't know. No more redundant lectures, just pure mastery."
        />
        <MainIdea
          question="What is Lumina?"
          answer="Lumina is a next-generation Educational Platform that moves away from the 'one-size-fits-all' model. It bridges the gap between expert-curated content and student-specific needs"
        />
        <Features />
        <About />
        <LastHook />
      </div>
    </div>
  );
}
