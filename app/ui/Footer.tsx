import React from "react";
import Logo from "../ui/Logo";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-4 pb-8 pt-12 text-center sm:p-10 sm:pt-16">
      
      <div className="mx-auto mb-10 flex max-w-7xl flex-col gap-8 text-left sm:gap-10 md:flex-row md:items-start md:justify-between">
        
        <div className="flex w-full flex-col gap-4 md:w-80">
          <div className="flex items-center gap-3">
            <Logo size={24} />
          </div>
          <p className="text-sm leading-relaxed font-light text-slate-400">
            Empowering University Students with AI-Driven Personalized Learning
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-2 md:flex md:w-auto md:gap-12">
          {[
            { title: "Product", links: ["Home", "Domains", "Courses"] },
            { title: "Resources", links: ["Blog", "Help Center", "Contact Us"] },
            { title: "Developers", links: ["API Documentation", "Open Source", "GitHub"] },
            { title: "Company", links: ["About Us", "Careers", "Press"] },
          ].map((section) => (
          <div key={section.title} className="flex flex-col gap-4">
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
      </div>
      
      <div className="mx-auto max-w-7xl border-t border-slate-800 pt-8">
        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Lumina. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
