import React, { useState } from "react";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import Link from "next/link";
import { House, LibraryBig, Blocks, Menu, X } from 'lucide-react';

interface NavBarProps {
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onLoginClick, onSignUpClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: House },
    { name: "Domains", href: "/domains", icon: Blocks },
    { name: "Courses", href: "/courses", icon: LibraryBig },
  ];

  return (
    // .nav-wrapper
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(2,6,23,0.6)] border-b border-slate-800">
      {/* .nav-container */}
      <div className="flex items-center justify-between px-6 md:px-8 py-2">
        
        {/* .logo-container */}
        <div className="flex items-center justify-center h-11 w-30 md:h-11 md:w-30">
            <Logo />
        </div>

        {/* .nav-links-desktop */}
        <div className="hidden md:flex flex-row gap-8 text-slate-400">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="hover:text-slate-100 transition-all duration-200 ease-in flex justify-center items-center gap-1.5 font-medium"
            >
              <link.icon size={16} />
              <h3>{link.name}</h3>
            </Link>
          ))}
        </div>

        {/* .nav-actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex gap-3">
            <Button variant="ghost" onClick={onLoginClick}>
              Login
            </Button>
            <Button variant="secondary" onClick={onSignUpClick}>
              Sign Up
            </Button>
          </div>

          {/* .mobile-menu-button */}
          <button 
            className="md:hidden text-slate-100 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* .mobile-menu*/}
      <div className={`md:hidden overflow-hidden transition-all border-slate-700  backdrop-blur-md bg-[rgba(2,6,23,0.6)] duration-300 ease-in-out ${isOpen ? "max-h-96 border-b border-slate-800" : "max-h-0"}`}>
        <div className="backdrop-blur-md bg-[rgba(2,6,23,0.6)] border-b border-slate-700 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-slate-200 hover:text-white transition-all flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800"
              onClick={() => setIsOpen(false)}
            >
              <link.icon size={20} />
              <h3 className="text-lg font-medium">{link.name}</h3>
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-slate-800 sm:hidden">
            <Button variant="ghost" onClick={onLoginClick} className="w-full">Login</Button>
            <Button variant="secondary" onClick={onSignUpClick} className="w-full">Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;