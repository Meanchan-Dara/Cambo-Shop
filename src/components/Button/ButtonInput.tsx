import React from 'react';
import { LuEye, LuEyeOff } from "react-icons/lu";

interface ButtonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  showPassword?: boolean;
}

const ButtonInput: React.FC<ButtonInputProps> = ({ 
  label, 
  showPasswordToggle, 
  onTogglePassword, 
  showPassword,
  ...props 
}) => {
  return (
    <div className="space-y-3">
      <label className="text-[17px] font-bold text-[#000000]">{label}</label>
      <div className="relative">
        <input
          {...props}
          type={showPasswordToggle ? (showPassword ? "text" : "password") : props.type}
          className={`w-full bg-[#f3f4f6] border-none rounded-[14px] py-[18px] px-6 text-[16px] text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-black outline-none transition-all shadow-sm ${showPasswordToggle ? 'pr-14' : ''} ${props.className || ''}`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <LuEyeOff className="text-[22px]" />
            ) : (
              <LuEye className="text-[22px]" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};


export default ButtonInput;
