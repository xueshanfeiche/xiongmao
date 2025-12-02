import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "rounded-2xl font-display font-bold transition-all transform active:scale-95 focus:outline-none flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-panda-primary text-white shadow-[0_6px_0_rgb(180,83,9)] hover:brightness-110",
    secondary: "bg-panda-secondary text-panda-text shadow-[0_6px_0_rgb(100,140,130)] hover:brightness-110",
    accent: "bg-panda-accent text-white shadow-[0_6px_0_rgb(160,50,50)] hover:brightness-110",
    outline: "bg-white border-4 border-panda-text text-panda-text shadow-[0_6px_0_rgb(43,45,66)] hover:bg-gray-50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-xl",
    lg: "px-8 py-4 text-2xl",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};