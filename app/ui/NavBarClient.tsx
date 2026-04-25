"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import Button from "./Button";
import Link from "next/link";
import { House, LibraryBig, Blocks, Menu, User, X, FileText, Bot } from "lucide-react";
import ProfileMenu from "./ProfileMenu";

type Role = "student" | "teacher" | "guest" | "admin";

const getNavLinks = (role: Role) => {
  if (role === "teacher") return [
    { name: "Home", href: "/teacher", icon: House },
    { name: "My Skills", href: "/teacher/skills", icon: LibraryBig },
    { name: "Dashboard", href: "/teacher/dashboard", icon: Blocks },
  ];
  if (role === "student") return [
    
    { name: "Home", href: "/student", icon: House },
    { name: "Explore Skills", href: "/skills", icon: Blocks },
    { name: "Dashboard", href: "/student/dashboard", icon: LibraryBig },
    { name: "AI Tutor", href: "/ai-tutor", icon: Bot },
  ];
  if (role === "admin") return [
    { name: "Home", href: "/admin", icon: House },
    { name: "Teacher requests", href: "/admin/requests", icon: FileText },
    { name: "User Management", href: "/admin/users", icon: User },
  ];
  return [
    { name: "Home", href: "/", icon: House },
    { name: "Skill catalog", href: "/skills", icon: Blocks },
    { name: "About", href: "/#about", icon: Blocks },
  ];
};

export default function NavBarClient({ role }: { role: Role }) {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = getNavLinks(role);

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
            {role !== "guest" ? (
              <ProfileMenu />
            ) : (
              <>
                <Button variant="ghost" href="/login">Login</Button>
                <Button variant="secondary" href="/signup">Sign Up</Button>
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

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[calc(100dvh-4.5rem)] border-b border-slate-800" : "max-h-0"
        }`}
      >
        <div className="rounded-b-[28px] border-b border-slate-700 bg-[rgba(2,6,23,0.82)] px-3 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_28px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="mb-2 flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-4 text-slate-200 transition-all hover:border-orange-400/20 hover:bg-orange-500/10 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-orange-200">
                  <link.icon size={18} />
                </span>
                <div>
                  <h3 className="text-base font-semibold">{link.name}</h3>
                  <p className="text-[11px] text-slate-500">Open {link.name.toLowerCase()}</p>
                </div>
              </div>
              <span className="text-slate-500">›</span>
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-3 border-t border-slate-800 pt-4 sm:hidden">
            {role !== "guest" ? (
              <ProfileMenu mobile />
            ) : (
              <>
                <Button variant="ghost" className="w-full" href="/login">Login</Button>
                <Button variant="secondary" className="w-full" href="/signup">Sign Up</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
