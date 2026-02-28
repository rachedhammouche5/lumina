import React from "react";
import '@/app/ui/styles/homeAbout.css';

const About: React.FC = () => {
    return (
    <div className="about-container">
        <h2>About Us</h2>
        <div className="about">
            <div className="about-vector">
                <img src="/png/about.png" alt="About Us" />
            </div>
            <div className="about-content">
                <p>
                    Lumina was developed at the University of Abdelhamid Mehri Constantine 2 to address a critical challenge in modern education: the &quot;one-size-fits-all&quot; approach. Traditional learning platforms often deliver identical content to every student, regardless of their individual skill level or learning pace. This lack of personalization frequently leads to student disengagement and learning difficulties, as some learners require reinforcement while others are ready for more advanced material.
                    Our platform transforms the educational experience into an Adaptive Learning System (ALS). By tailoring content specifically to each learner&apos;s unique profile, performance, and engagement levels, Lumina ensures a personalized journey for every student. Built on the principles of Software Product Line (SPL) engineering, Lumina is designed as a family of applications that share a robust common core while offering modular, customizable features. This technical architecture allows us to integrate a functional AI Assistance Agent that provides real-time FAQ support, pedagogical guidance, and personalized content recommendations.
                    At Lumina, our mission is to move beyond static curriculum. We empower 3rd-year Software Engineering students at the NTIC Faculty to master complex concepts through a system that adapts to them, rather than forcing them to adapt to the system.
                </p>
            
            </div>
        </div>
        
    </div>
    );
};

export default About;