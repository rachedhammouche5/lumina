"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Mail, Lock, X } from 'lucide-react';
import Button from "../../ui/Button";

export default function SignupModal() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleClose = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  return (
    <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg rounded-[2rem] bg-slate-900 border border-slate-800 p-8 text-white shadow-2xl">
        
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Join Lumina
            </h2>
            <p className="text-xs text-slate-400 mt-1">Start your AI learning journey</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 ml-1">First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="text" 
                  placeholder="John"
                  className="w-full bg-slate-800/40 border border-slate-700 focus:border-orange-500 rounded-xl py-2.5 pl-9 pr-3 text-white outline-none transition-all placeholder:text-slate-600 text-sm"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 ml-1">Last Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Doe"
                  className="w-full bg-slate-800/40 border border-slate-700 focus:border-orange-500 rounded-xl py-2.5 pl-9 pr-3 text-white outline-none transition-all placeholder:text-slate-600 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="email" 
                placeholder="johndoe@example.com"
                className="w-full bg-slate-800/40 border border-slate-700 focus:border-orange-500 rounded-xl py-2.5 pl-9 pr-3 text-white outline-none transition-all placeholder:text-slate-600 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className="w-full bg-slate-800/40 border border-slate-700 focus:border-orange-500 rounded-xl py-2.5 pl-9 pr-10 text-white outline-none transition-all placeholder:text-slate-600 text-sm"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button variant="primary" size="m" className="w-full py-3.5 mt-2 shadow-orange-500/10 shadow-lg">
            Create Account
          </Button>

          <p className="text-center text-xs text-slate-500">
            By signing up, you agree to our Terms and Conditions.
          </p>
        </form>
      </div>
    </div>
  );
}