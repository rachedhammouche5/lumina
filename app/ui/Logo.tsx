import React from "react";
import '@/app/ui/styles/logo.css';
import { Lightbulb } from "lucide-react";
import Image from "next/image"
import LuminaLogo from "@/public/png/LuminaLogo.png"
interface LogoProps {
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ size = 28 }) => {
  return (
      <div className="logo">
        
      <Image width={200} height={52} src="/png/LuminaLogo2.png" alt=""/>
      </div>
  );
};

export default Logo;