import React from 'react';
import Link from 'next/link';
import type { LinkProps } from 'next/link';

interface AnchorProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 's' | 'm' | 'l';
  replace?: LinkProps['replace'];
  scroll?: LinkProps['scroll'];
  prefetch?: LinkProps['prefetch'];
}

interface RegularButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 's' | 'm' | 'l';
}

type ButtonProps = AnchorProps | RegularButtonProps;

const Button: React.FC<ButtonProps> = (props) => {
  const { 
    variant = 'primary', 
    size = 'm',
    children,
    className = '', 
    ...rest 
  } = props;

  const baseStyles = "font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center";

  const variants = {
    primary: "text-base font-semibold rounded-4xl border-none cursor-pointer transition-all duration-300 bg-gradient-to-br from-[#FF4D00] to-[#FFB800] text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-500/40",
    secondary: "bg-gradient-to-br from-indigo-600 via-blue-500 to-sky-400 text-white hover:bg-none hover:bg-white hover:text-black focus:ring-blue-500 hover:-translate-y-0.5 transition-all duration-300 ease-out hover:shadow-[0_5px_20px_blue]",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-black focus:ring-white transition-all duration-300 ease-out",
    ghost: "text-white hover:bg-white/10"
  };
  
  const sizes = {
    xs: "px-2 py-1 text-xs",
    s: "px-3 py-1.5 text-sm",
    m: "px-4 py-2 text-base",
    l: "px-10 py-5 text-lg"
  };

  const buttonStyle = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  if ('href' in rest && rest.href) {
    const { href, ...linkProps } = rest;
    
    return (
      <Link href={href} className={buttonStyle} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonStyle} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
};

export default Button;
