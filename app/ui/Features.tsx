import React from 'react';
// 1. Import the specific icons you need
import { Brain, MessageSquare, Code2 } from 'lucide-react'; 
import '@/app/ui/styles/features.css';

const Features = () => {
  return (
    <section className="features-section">
      <div className="features-grid">
        
        {/* Card 1 */}
        <div className="feature-card">
          <div className="icon-wrapper-orange">
            <Brain size={28} strokeWidth={2} color='orange'/> {/* 2. Use it like a component */}
          </div>
          <h3>Adaptive Learning Engine</h3>
          <p>Adjusts content difficulty based on quiz performance.</p>
        </div>

        {/* Card 2 */}
        <div className="feature-card">
          <div className="icon-wrapper-blue">
            <MessageSquare size={28} strokeWidth={2} />
          </div>
          <h3>AI Study Assistant</h3>
          <p>Chat-based assistant for explanations and recommendations.</p>
        </div>

        {/* Card 3 */}
        <div className="feature-card">
          <div className="icon-wrapper-orange">
            <Code2 size={28} strokeWidth={2} />
          </div>
          <h3>Developer-Ready Architecture</h3>
          <p>API-based system for integration into platforms.</p>
        </div>

      </div>
    </section>
  );
};

export default Features;