import React from "react";

interface MainIdeaProps {
  question: string;
  answer: string;
}
const MainIdea: React.FC<MainIdeaProps> = ({ question, answer }) => {
  return (
    // .main-idea-wrapper
    <section className="flex flex-col items-center text-center py-10 md:py-16 px-4 md:px-6 gap-6 md:gap-8 z-[1000]">

      {/* .main-idea-card */}
      <div className="p-6 md:p-8 max-w-[900px] w-full">

        {/* .main-idea-question */}
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-5 text-white leading-tight">
          {question}
        </h2>

        {/* .main-idea-answer */}
        <p className="text-sm md:text-lg text-white/80 leading-relaxed">
          {answer}
        </p>

        
      </div>
    </section>
  );
}

export default MainIdea;