import React from 'react';
import '@/app/ui/styles/button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children,
  className = '', 
  ...props 
}) => {
  // This builds the string: "btn btn-ghost your-extra-class"
  const buttonClass = `btn btn-${variant} ${className}`.trim();

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;