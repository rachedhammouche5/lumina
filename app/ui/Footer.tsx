import React from "react";
import Logo from "../ui/Logo";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 p-10 pt-16 pb-8 border-t border-slate-800 text-center">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-10 text-left">
        
        <div className="w-full md:w-80 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Logo size={24} />
          </div>
          <p className="text-sm font-light text-slate-400 leading-relaxed">
            Empowering University Students with AI-Driven Personalized Learning
          </p>
        </div>
        
        {[
          { title: "Product", links: ["Home", "Domains", "Courses"] },
          { title: "Resources", links: ["Blog", "Help Center", "Contact Us"] },
          { title: "Developers", links: ["API Documentation", "Open Source", "GitHub"] },
          { title: "Company", links: ["About Us", "Careers", "Press"] },
        ].map((section) => (
          <div key={section.title} className="flex flex-col gap-4 w-full md:w-auto">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">
              {section.title}
            </h3>
            <div className="flex flex-col gap-3">
              {section.links.map((link) => (
                <a 
                  key={link}
                  href="#" 
                  className="text-sm text-slate-400 hover:text-orange-500 transition-all duration-200 hover:translate-x-1"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800">
        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Lumina. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;