import React from "react";
import Image from "next/image"
import LuminaLogo from "../../public/png/LuminaLogo.png"

interface LogoProps {
  size?: number;
}

const Logo: React.FC<LogoProps> = () => {
  return (
    // .logo-wrapper
    <div className="flex items-center justify-center w-full h-full m-0 p-0">
      <Image 
        width={400}
        height={100}
        src={LuminaLogo} 
        alt="Lumina Logo" 
        // 1. Used aspect-ratio to match image file
        // 2. Used object-cover to fill container
        className="cursor-pointer w-full h-autoobject-contain" 
        priority
      />
    </div>
  );
};

export default Logo;