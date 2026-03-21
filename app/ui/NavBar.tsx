"use client";
import React, { useEffect, useMemo, useState } from "react";
import Logo from "../ui/Logo";
import Button from "../ui/Button";
import Link from "next/link";
import { House, LibraryBig, Blocks, Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import LogoutButton from "@/app/ui/LogoutButton";
import { useParams } from "next/navigation";

const NavBar: React.FC = () => {
  const params = useParams<{ student_id?: string }>();
  const studentId = params.student_id ?? null;
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<"student" | "teacher" | "guest">("guest");

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
    } = supabase.auth.onAuthStateChange(() => {
      void syncRole();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const navLinks = useMemo(() => {
    if (role === "teacher") {
      return [
        { name: "Home", href: "/teacher", icon: House },
        { name: "My Skills", href: "/teacher/skills", icon: LibraryBig },
      ];
    }

    if (role === "student" && studentId) {
      return [
        { name: "Home", href: `/${studentId}`, icon: House },
        { name: "My Learning", href: `/${studentId}`, icon: LibraryBig },
        { name: "Explore", href: `/${studentId}/skills`, icon: Blocks },
      ];
    }

    return [
      { name: "Home", href: "/", icon: House },
      { name: "Skill catalog", href: "/skills", icon: Blocks },
      { name: "About", href: "/#about", icon: Blocks },
    ];
  }, [role, studentId]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] border-b border-slate-800 bg-[rgba(2,6,23,0.6)] backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-2 md:px-8">
        <div className="flex h-11 w-30 items-center justify-center md:h-11 md:w-30">
          <Logo />
        </div>

        <div className="hidden flex-row gap-8 text-slate-400 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center justify-center gap-1.5 font-medium transition-all duration-200 ease-in hover:text-slate-100"
            >
              <link.icon size={16} />
              <h3>{link.name}</h3>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden gap-3 sm:flex">
            {role !== "guest" ? (
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
            className="p-2 text-slate-100 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-slate-700 bg-[rgba(2,6,23,0.6)] backdrop-blur-md transition-all duration-300 ease-in-out md:hidden ${isOpen ? "max-h-96 border-b border-slate-800" : "max-h-0"}`}
      >
        <div className="flex flex-col gap-4 border-b border-slate-700 bg-[rgba(2,6,23,0.6)] px-6 py-4 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 rounded-lg p-2 text-slate-200 transition-all hover:bg-slate-800 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <link.icon size={20} />
              <h3 className="text-lg font-medium">{link.name}</h3>
            </Link>
          ))}
          <div className="flex flex-col gap-3 border-t border-slate-800 pt-4 sm:hidden">
            {role !== "guest" ? (
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
