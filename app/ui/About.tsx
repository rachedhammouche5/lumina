import React from "react";
const About: React.FC = () => {
  return (
    <section
      id="about"
      className="flex flex-col items-center p-16 md:p-20 overflow-hidden"
    >
      <h2 className="mt-8 mb-16 text-5xl md:text-6xl font-extrabold text-white tracking-tight">
        About Us.
      </h2>

      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 flex justify-center w-full md:w-1/2">
          <img
            src="/png/about.png"
            alt="About Lumina"
            className="w-4/5 md:w-full max-w-md h-auto animate-float drop-shadow-2xl"
          />
        </div>

        <div className="flex-1 w-full md:w-1/2 text-left space-y-6">
          <p className="text-sm md:text-lg leading-relaxed text-slate-400">
            Born at the <span className="text-white font-medium">University of Abdelhamid Mehri Constantine 2</span>,
            Lumina was built to solve a critical flaw in modern education: the &ldquo;one-size-fits-all&rdquo; approach. While
            traditional platforms deliver identical content to everyone, Lumina recognizes that every learner has a
            unique pace and skill level.
          </p>

          <p className="text-sm md:text-lg leading-relaxed text-slate-400">
            We transformed the journey into an <span className="text-white font-medium">Adaptive Learning System (ALS)</span>.
            By leveraging Software Product Line (SPL) engineering, our modular architecture adapts to your real-time
            performance. Our integrated <span className="text-white font-medium">AI Assistant</span> provides pedagogical
            guidance, ensuring you never get stuck on complex concepts.
          </p>

          <p className="text-sm md:text-lg leading-relaxed text-slate-400 border-l-2 border-orange-500 pl-4 italic">
            Our mission is to empower Software Engineering students at the NTIC Faculty to master skills through a system
            that adapts to them - not the other way around.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
