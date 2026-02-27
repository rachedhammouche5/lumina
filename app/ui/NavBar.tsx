import React from 'react';
import '@/app/ui/styles/homeNavBar.css';
import Logo from '@/app/ui/Logo';
import Button from '@/app/ui/Button';
import Link from 'next/link';

interface NavBarProps {
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onLoginClick, onSignUpClick }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Logo size={28} />
        
        <div className="services">
            <Link href="/">Home</Link>
            <Link href="/domains">Domains</Link>
            <Link href="/courses">Courses</Link>
        </div>

        <div className="login">
            {/* VARIANT handles the styling, onClick handles the logic */}
            <Button variant="ghost" onClick={onLoginClick}>
                Login
            </Button>
            <Button variant="outline" onClick={onSignUpClick}>
                Sign Up
            </Button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;