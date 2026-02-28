import React from "react";
import '@/app/ui/styles/homeHero.css';

interface HeroProps {
    src: string; // Changed srs to src for standard naming
    title: string;
    subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ src, subtitle }) => {
    return (
        <section className="hero-wrapper">
            <div className="hero-card">
                
                {/* 1. Background Video (Contained) */}
                <video autoPlay loop muted playsInline className="hero-video">
                    <source src={src} type="video/mp4" />
                </video>
                
                {/* 2. The Tint Overlay */}
                <div className="hero-overlay"></div>

                {/* 3. The Content (Split Layout) */}
                <div className="hero-content">
                    
                    <div className="hero-texts">
                        <h1 className="titles">
                            Learn Smarter.<br />
                            Adapt Faster.
                        </h1>
                        <h1 className="titles-highlight">AI ASSISTED</h1>
                        <p className="subtitle">{subtitle}</p>
                        <div className="hero-btns">
                            <button className="start-learning-btn">Start Learning</button>
                            <button className="explore-more-btn"> Explore More </button>
                        </div>
                    </div>

                    <div className="hero-vector">
                        <img 
                            src="/png/learning.png" 
                            alt="Learning Illustration" 
                            className="hero-vector-image" 
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Hero;