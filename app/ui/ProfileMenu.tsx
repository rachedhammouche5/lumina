"use client";

import Link from "next/link";
import { ChevronDown, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import LogoutButton from "./LogoutButton";

type ProfileMenuProps = {
  mobile?: boolean;
};

export default function ProfileMenu({ mobile = false }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const menuShell = mobile
    ? "mt-3 flex flex-col gap-3 rounded-3xl border border-slate-700 bg-slate-950/90 p-3"
    : "absolute right-0 top-full z-50 mt-3 w-72 rounded-3xl border border-slate-700 bg-slate-950/95 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl";

  const triggerClassName = mobile
    ? "w-full justify-between rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 hover:bg-slate-800"
    : "rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-2.5 text-slate-100 hover:bg-slate-800";

  return (
    <div ref={menuRef} className={mobile ? "w-full" : "relative"}>
      <Button
        type="button"
        variant="ghost"
        className={triggerClassName}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="flex items-center gap-2">
          <User size={16} />
          Profile
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </Button>

      {open ? (
        <div className={menuShell}>
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm mb-2 font-semibold text-white transition hover:border-white/10 hover:bg-white/10"
          >
            <User size={16} />
            View profile
          </Link>
          <LogoutButton onLoggedOut={() => setOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}
