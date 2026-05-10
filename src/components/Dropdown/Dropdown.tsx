import React, { useState, useRef, useEffect } from 'react';
import { LuMenu, LuChevronDown, LuChevronRight } from "react-icons/lu";

interface DropdownProps {
  label: string;
  items: string[];
  className?: string;
  variant?: 'primary' | 'secondary';
}

const Dropdown: React.FC<DropdownProps> = ({ label, items, className, variant = 'secondary' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const variantStyles = {
    primary: "bg-[#000000] text-white hover:bg-gray-800 border-transparent",
    secondary: "bg-[#f3f9fb] text-[#000000] hover:bg-[#e8f4f8] border-transparent hover:border-blue-100"
  };

  return (
    <div className={`relative inline-block text-left ${className || ''}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 font-semibold text-[14px] shadow-sm hover:shadow-md border ${variantStyles[variant]}`}
      >
        {variant === 'primary' && (
          <LuMenu className="text-white text-lg" />
        )}
        {label}
        <LuChevronDown 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${variant === 'primary' ? 'text-white/70' : 'text-gray-400'} text-lg`} 
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-3 w-64 origin-top-left bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 py-3 z-[9999] transform transition-all duration-200 ease-out animate-in fade-in slide-in-from-top-2 zoom-in-95">
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {items.map((item, index) => (
              <button
                key={item}
                className="w-full text-left px-4 py-3 text-[15px] text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center justify-between group"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <span className="font-medium">{item}</span>
                <LuChevronRight 
                  className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-blue-500 text-lg" 
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};



export default Dropdown;
