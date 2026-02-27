import React from "react";
import Logo from "@/app/ui/Logo";
import Button from "@/app/ui/Button";
import Link from "next/link";

interface NavBarProps {
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({onLoginClick, onSignUpClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(2,6,23,0.6)] border-b border-[var(--border)] ">
      <div className="flex items-center justify-between px-8 py-2">
        <Logo size={28} />

        <div className="flex gap-8 text-[var(--text-dim)]">
          <Link href="/">Home</Link>
          <Link href="/domains">Domains</Link>
          <Link href="/courses">Courses</Link>
        </div>

        <div className="flex py-1 gap-3">
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
};

export default NavBar;