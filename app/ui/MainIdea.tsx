import React from "react";
import '@/app/ui/styles/homeMainIdea.css';

interface MainIdeaProps {
    question: string;
    answer: string;
}
const MainIdea: React.FC<MainIdeaProps> = ({ question, answer }) => {
    return (
        <section className="main-idea-wrapper">
            <div className="main-idea-card">
                <h2 className="main-idea-question">{question}</h2>
                <p className="main-idea-answer">{answer}</p>
            </div>
        </section>
    
    );
}

export default MainIdea;