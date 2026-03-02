import React from "react";
import Button from "./Button";

interface HeroProps {
  src: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ src, subtitle }) => {
  return (
    // .hero-wrapper
    <section className="flex w-full justify-center py-10 md:py-[60px] bg-[#020617]">
      {/* .hero-card: Margin top applied for mobile, removed for md+ screens */}
      <div className="mt-16 md:mt-10 relative w-[95vw] md:w-[90vw] max-w-[1400px] h-auto md:h-[650px] rounded-[30px] md:rounded-[40px] overflow-hidden shadow-[-50px_100px_40px_rgba(0,0,58,0.212)]">
        
        {/* .hero-video */}
        <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute top-0 left-0 w-full h-full object-cover z-10"
        >
          <source src={src} type="video/mp4" />
        </video>
        
        {/* .hero-overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/50 z-20"></div>

        {/* .hero-content */}
        <div className="relative z-30 w-full h-full flex flex-col md:flex-row items-center justify-between p-6 md:px-20 text-center md:text-left">
          
          {/* .hero-texts */}
          <div className="flex-1 w-full flex flex-col items-center md:items-start md:order-1 order-2 mt-8 md:mt-0">
            {/* .titles */}
            <h1 className="text-4xl md:text-7xl font-extrabold leading-[1.1] text-white mb-5">
              Learn Smarter.<br />
              Adapt Faster.
            </h1>
            
            {/* .titles-highlight */}
            <h1 className="text-xl md:text-2xl font-black tracking-[2px] uppercase bg-gradient-to-br from-[#FF4D00] to-[#FFB800] bg-clip-text text-transparent mb-2.5">
                AI ASSISTED
            </h1>
            
            {/* .subtitle */}
            <p className="text-sm md:text-base max-w-[500px] text-white/80 mb-8 md:mb-[30px]">
              {subtitle}
            </p>
            
            {/* .hero-btns */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center md:justify-start items-center w-full sm:w-auto">
              <Button variant="primary" size="l" className="w-full sm:w-auto"> Start Learning </Button>
              <Button variant="outline" size="l" className="w-full sm:w-auto"> Explore More</Button>
            </div>
          </div>

          {/* .hero-vector */}
          <div className="flex-1 flex justify-center md:justify-end md:order-2 order-1">
            <img 
                src="/png/learning.png" alt="Learning Illustration"
                className="w-full max-w-[300px] md:max-w-[550px] h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;