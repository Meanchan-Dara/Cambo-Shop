import React from 'react';

interface ButtonSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`w-full bg-[#000000] text-white font-bold py-[18px] rounded-[14px] hover:bg-gray-800 active:scale-[0.98] transition-all mt-4 text-[18px] shadow-lg shadow-black/10 ${className || ''}`}
    >
      {children}
    </button>
  );
};

export default ButtonSubmit;
