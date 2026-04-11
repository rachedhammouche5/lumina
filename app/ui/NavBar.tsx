"use client";
import React, { useEffect, useState } from "react";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import Link from "next/link";
import { House, LibraryBig, Blocks, Menu, User, X, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import LogoutButton from "@/app/ui/LogoutButton";


const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<"student" | "teacher" | "guest" | "admin">("guest");

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    const syncRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
       if (mounted) setRole(user?.app_metadata?.role ?? "guest");
    };

    void syncRole();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void syncRole();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);


  const navLinks = role === "teacher"
  ? [
      { name: "Home", href: "/teacher", icon: House },
      { name: "My Skills", href: "/teacher/skills", icon: LibraryBig },
      { name: "Profile", href: "/profile", icon: User },
    ]
  : role === "student"
  ? [
      { name: "Home", href: "/student", icon: House },
      { name: "My Learning", href: "/student/dashboard", icon: LibraryBig },
      { name: "Explore", href: "/skills", icon: Blocks },
      { name: "Profile", href: "/profile", icon: User },
    ]
  : role === "admin"
  ? [
      { name: "Home", href: "/admin", icon: House },
      { name: "Teacher requests", href: "/admin/requests", icon: FileText },
      { name: "User Management", href: "/admin/users", icon: User },
    ]
  : [
      { name: "Home", href: "/", icon: House },
      { name: "Skill catalog", href: "/skills", icon: Blocks },
      { name: "About", href: "/#about", icon: Blocks },
      
    ];

  return (

    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(2,6,23,0.6)] border-b border-slate-800">

      <div className="flex items-center justify-between px-6 md:px-8 py-2">
        
        <div className="flex items-center justify-center h-11 w-30 md:h-11 md:w-30">
            <Logo />
        </div>

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

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex gap-3">
            {role!="guest" ? (
              <LogoutButton />
            ) : (
              <>
                <Button variant="ghost" href="/login">
                  Login
                </Button>
                <Button variant="secondary" href="/signup">
                  Sign Up
                </Button>
              </>
            )}
          </div>

          <button 
            className="md:hidden text-slate-100 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

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
            { role!="guest" ? (
              <LogoutButton />
            ) : (
              <>
                <Button variant="ghost" className="w-full" href="/login">
                  Login
                </Button>
                <Button variant="secondary" className="w-full" href="/signup">
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
