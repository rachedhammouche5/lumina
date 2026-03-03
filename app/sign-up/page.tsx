'use client';

import React, { useState } from "react";
import Link from "next/link";
import Button from "../ui/Button"; 
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 sm:px-6 pt-24 pb-12">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl gap-10 lg:gap-12">
        
        <div className="flex-1 w-full max-w-xl text-left lg:text-left">
          <div className="mb-8 lg:mb-10 text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              Create Account,
            </h1>
            <p className="text-slate-400 mt-3 text-base sm:text-lg">
              Join the future of AI learning with Lumina
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md w-full rounded-[2rem] sm:rounded-[2.5rem] border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl">
            <h3 className="font-bold text-xl sm:text-2xl mb-8 tracking-widest text-white text-left">SIGN UP</h3>
            
            <form className="flex flex-col gap-5 w-full text-left" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">First Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      type="text" 
                      placeholder="John"
                      className="w-full bg-slate-800/40 border-2 border-slate-800 focus:border-orange-500 rounded-xl py-3 pl-11 pr-4 text-white outline-none transition-all placeholder:text-slate-600 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      type="text" 
                      placeholder="Doe"
                      className="w-full bg-slate-800/40 border-2 border-slate-800 focus:border-orange-500 rounded-xl py-3 pl-11 pr-4 text-white outline-none transition-all placeholder:text-slate-600 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="email" 
                    placeholder="johndoe@example.com"
                    className="w-full bg-slate-800/40 border-2 border-slate-800 focus:border-orange-500 rounded-xl py-3 pl-11 pr-4 text-white outline-none transition-all placeholder:text-slate-600 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    className="w-full bg-slate-800/40 border-2 border-slate-800 focus:border-orange-500 rounded-xl py-3 pl-11 pr-12 text-white outline-none transition-all placeholder:text-slate-600 text-sm"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    className="w-full bg-slate-800/40 border-2 border-slate-800 focus:border-orange-500 rounded-xl py-3 pl-11 pr-12 text-white outline-none transition-all placeholder:text-slate-600 text-sm"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button variant="primary" size="m" className="w-full py-4 mt-4 shadow-orange-500/20 shadow-lg">
                Create Account
              </Button>

              <p className="mt-4 text-center text-sm text-slate-400 font-light">
                Already have an account?{" "}
                <Link href="/log-in" className="text-orange-500 hover:underline font-medium">
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>

        <div className="w-full lg:flex-1 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <img 
            src="/png/signup.png" 
            alt="Signup Illustration" 
            className="w-[85%] sm:w-[65%] lg:w-full max-w-[580px] h-auto object-contain drop-shadow-[0_0_30px_rgba(255,165,0,0.1)]" 
          />
        </div>
      </div>
    </main>
  );
}