"use client";

import { useRouter } from "next/navigation";
import Button from "../../ui/Button";
import { X } from "lucide-react";

export default function LoginModal() {
  const router = useRouter();
  const handleClose = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  return (
    <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
      <div className="relative bg-slate-900 w-full max-w-lg rounded-4xl flex flex-col gap-2 border-2 border-slate-800 p-10 justify-center items-center">
        
        <Button 
          variant="ghost" 
          size="s"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full"
        >
          <X className="w-6 h-6 text-slate-400 hover:text-white" />
        </Button>

        <h2 className="font-bold text-2xl mb-10">LOGIN</h2>

        <form action="" className="flex flex-col gap-6 w-full">
          <input type="text" placeholder="Email" className="bg-slate-800 border-2 border-slate-700 rounded-xl p-2 w-full"/>
          <input type="password" placeholder="Password" className="bg-slate-800 border-2 border-slate-700 rounded-xl p-2 w-full"/>

          <div className="flex flex-row items-center gap-3">
            <input type="checkbox" className="ml-5 bg-slate-300"/>
            <h6 className="text-sm font-extralight text-slate-400">Remember the Password</h6>
          </div>

          <Button variant="primary" size="m" className="w-full"> Submit </Button>
        </form>
      </div>
    </div>
  );
}
