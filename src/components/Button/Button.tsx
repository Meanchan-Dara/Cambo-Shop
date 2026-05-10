import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`w-full font-medium bg-white border border-gray-200 text-black py-[12px] rounded-[14px] flex items-center justify-center gap-3 hover:bg-gray-50 active:scale-[0.98] transition-all text-base shadow-sm ${className || ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
