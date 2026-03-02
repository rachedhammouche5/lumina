import React from 'react';
import { Brain, MessageSquare, Code2 } from 'lucide-react'; 
import Card from './Card';

const Features = () => {
  return (
    <section className="p-6 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Card 
          icon={Brain} 
          title="Adaptive Learning Engine"
          subtitle="Adjusts content difficulty based on quiz performance."
          iconColor="text-orange-500"
        />

        <Card 
          icon={MessageSquare} 
          title="AI Study Assistant"
          subtitle="Chat-based assistant for explanations and recommendations."
          iconColor="text-blue-500"
        />

        <Card 
          icon={Code2} 
          title="Developer-Ready Architecture"
          subtitle="API-based system for integration into platforms."
          iconColor="text-orange-500"
        />

      </div>
    </section>
  );
};

export default Features;