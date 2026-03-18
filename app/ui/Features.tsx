import React from 'react';
import { Brain, MessageSquare, Code2, BrainCircuit, Zap, Bot, Route, BarChart3 } from 'lucide-react'; 
import Card from './Card';

const Features = () => {
  return (
    <section className="p-6 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Card 
          icon={BrainCircuit} 
          title="Adaptive Learning Engine (ALS)"
          subtitle="Real-time path adjustment based on your mastery."
          iconColor="text-orange-500"
        />

        <Card 
          icon={Zap} 
          title="Smart Diagnostic Testing"
          subtitle="Identify gaps and skip what you already know."
          iconColor="text-blue-500"
        />

        <Card 
          icon={Bot} 
          title="AI Study Tutor"
          subtitle="Instant feedback and 24/7 expert guidance."
          iconColor="text-orange-500"
        />

        <Card 
          icon={Route} 
          title="Expert Skill Paths"
          subtitle="Curated modules built to industry standards."
          iconColor="text-blue-500"
        />

        <Card 
          icon={BarChart3} 
          title="Performance Insights"
          subtitle="Visualized tracking of your learning evolution."
          iconColor="text-orange-500"
        />

        <Card 
          icon={Bot} 
          title="Personalized Learning"
          subtitle="A system that adapts to your unique student profile."
          iconColor="text-blue-500"
        />

      </div>
    </section>
  );
};

export default Features;