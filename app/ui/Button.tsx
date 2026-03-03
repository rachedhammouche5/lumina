import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 's' | 'm' | 'l';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'm',
  children,
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "text-base font-semibold rounded-4xl border-none cursor-pointer transition-all duration-300 bg-gradient-to-br from-[#FF4D00] to-[#FFB800] text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-500/40",
    secondary: "bg-gradient-to-br from-indigo-600 via-blue-500 to-sky-400 text-white hover:bg-none hover:bg-white hover:text-black focus:ring-blue-500 hover:-translate-y-0.5 transition-all duration-300 ease-out hover:shadow-[0_5px_20px_blue]",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-black focus:ring-white transition-all duration-300 ease-out",
    ghost: "text-white hover:bg-white/10"
  };
  
  const sizes = {
    s: "px-3 py-1.5 text-sm",
    m: "px-4 py-2 text-base",
    l: "px-10 py-5 text-lg"
  };

  const buttonStyle = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  return (
    <button className={buttonStyle} {...props}>
      {children}
    </button>
  );
};

export default Button;