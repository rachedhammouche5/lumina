import React from "react";

const About: React.FC = () => {
  return (
    <section className="flex flex-col items-center p-16 md:p-20">
      
      <h2 className="mt-8 mb-12 text-5xl md:text-6xl font-extrabold text-white">
        About Us
      </h2>

      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10">
        
        <div className="flex-1 flex justify-center w-full md:w-1/2">
          <img 
            src="/png/about.png" 
            alt="About Us" 
            className="w-4/5 md:w-full max-w-md h-auto animate-float"
          />
        </div>
        
        <div className="flex-1 w-full md:w-1/2 text-left p-2">
          <p className="text-sm md:text-lg  md:leading-relaxed text-slate-400">
            Lumina was developed at the University of Abdelhamid Mehri Constantine 2 to address a critical challenge in modern education: the &quot;one-size-fits-all&quot; approach. Traditional learning platforms often deliver identical content to every student, regardless of their individual skill level or learning pace. This lack of personalization frequently leads to student disengagement and learning difficulties, as some learners require reinforcement while others are ready for more advanced material.
            Our platform transforms the educational experience into an Adaptive Learning System (ALS). By tailoring content specifically to each learner&apos;s unique profile, performance, and engagement levels, Lumina ensures a personalized journey for every student. Built on the principles of Software Product Line (SPL) engineering, Lumina is designed as a family of applications that share a robust common core while offering modular, customizable features. This technical architecture allows us to integrate a functional AI Assistance Agent that provides real-time FAQ support, pedagogical guidance, and personalized content recommendations.
            At Lumina, our mission is to move beyond static curriculum. We empower 3rd-year Software Engineering students at the NTIC Faculty to master complex concepts through a system that adapts to them, rather than forcing them to adapt to the system.
          </p>
        </div>
      </div>
      
    </section>
  );
};

export default About;