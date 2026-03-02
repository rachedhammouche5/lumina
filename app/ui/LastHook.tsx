import React from "react";
import Button from "./Button";

const LastHook: React.FC = () => {
  return (
    // .last-hook-container + radial gradient background
    <section className="flex flex-col items-center justify-center p-6 py-20 md:p-20 bg-[radial-gradient(circle_at_center,rgba(255,77,0,0.05)_0%,transparent_70%)]">
      
      {/* .last-hook */}
      <div className="w-full max-w-4xl flex flex-col items-center justify-center text-center">
        
        {/* .last-hook-title */}
        <h2 className="w-full max-w-3xl mb-5 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-50">
          Ready to Illuminate Your Learning Journey?
        </h2>
        
        {/* .last-hook-subtitle */}
        <p className="text-sm md:text-lg text-slate-400 mb-12 font-semibold">
          AI Assisted. self-improvement. Built for performance
        </p>
        
        <Button variant="primary" size="l" className="w-full sm:w-auto"> Start With Lumina</Button>
      </div>
      
    </section>
  );
};

export default LastHook;