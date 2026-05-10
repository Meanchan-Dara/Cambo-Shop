import React, { useState } from 'react';
import ButtonInput from '../../components/Button/ButtonInput';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import Dropdown from '../../components/Dropdown/Dropdown';
import { 
  LuSearch, 
  LuHeart, 
  LuUser, 
  LuShoppingCart, 
  LuChevronLeft, 
  LuShare2,
  LuMenu
} from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const SingUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-white font-sans text-gray-900 overflow-hidden">
      {/* Top Header Bar */}
      <div className="shrink-0 bg-[#000000] text-white text-[11px] py-2 px-6 flex justify-between items-center z-50">
        <div>Welcome to worldwide Megamart!</div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-1">
            <span className="opacity-60">Deliver to</span> <span className="font-semibold">423651</span>
          </div>
          <div className="w-[1px] h-3 bg-white/20"></div>
          <div>Track your order</div>
          <div className="w-[1px] h-3 bg-white/20"></div>
          <div>All Offers</div>
        </div>
      </div>

      {/* Main Header */}
      <header className="shrink-0 border-b border-gray-100 py-4 px-6 md:px-12 bg-white z-50">
        <div className="w-full flex items-center justify-between gap-4">
          {/* Menu & Logo Section */}
          <div className="flex items-center gap-4 shrink-0">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
               <LuMenu className="text-2xl" />
            </button>
            <div className="flex items-center gap-2">
               <h1 className="text-2xl font-black tracking-tighter text-[#000000]">UNITED DEALS</h1>
               <img src="/Fash-Sale.png" alt="Flash Sale" className="h-10 object-contain" />
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <input 
              type="text" 
              placeholder="Search essentials, groceries and more..." 
              className="w-full bg-[#f3f9fb] border-none rounded-md py-3 pl-10 pr-4 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
              <LuSearch className="text-lg" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 text-[13px] font-semibold">
            <div className="flex items-center gap-2 text-[#ff8a00] cursor-pointer">
              <LuHeart className="text-xl" />
              <span>My Deals</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer text-[#000000]">
              <LuUser className="text-xl" />
              <span>Sign Up/Sign In</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer text-[#000000]">
              <LuShoppingCart className="text-xl" />
              <span>Cart</span>
            </div>
          </div>
        </div>
      </header>

      <nav className="shrink-0 py-3 px-6 md:px-12 border-b border-gray-100 bg-white z-[100]">
        <div className="w-full flex items-center gap-3 overflow-visible">
          <Dropdown 
            variant="primary"
            label="All Categories" 
            items={["Groceries", "Electronics", "Fashion", "Beauty", "Home & Kitchen"]} 
          />
          <Dropdown 
            label="Premium Fruits" 
            items={["Apples & Pears", "Berries & Melons", "Exotic Fruits", "Grapes", "Citrus Fruits"]} 
          />
          <Dropdown 
            label="Home & Kitchen" 
            items={["Cookware", "Small Appliances", "Kitchen Storage", "Dining & Serving"]} 
          />
          <Dropdown 
            label="Fashion" 
            items={["Men's Clothing", "Women's Clothing", "Kid's Fashion", "Watches", "Footwear"]} 
          />
          <Dropdown 
            label="Electronics" 
            items={["Smartphones", "Laptops & PCs", "Audio & Headphones", "Smartwatches"]} 
          />
          <Dropdown 
            label="Beauty" 
            items={["Skincare", "Makeup Kit", "Fragrances", "Haircare Products"]} 
          />
          <Dropdown 
            label="Home Improvement" 
            items={["Tools & Hardware", "Electrical & Lighting", "Plumbing", "Home Safety"]} 
          />
          <Dropdown 
            label="Sports, Toys & Luggage" 
            items={["Fitness Equipment", "Outdoor Sports", "Board Games", "Travel Bags"]} 
          />
        </div>
      </nav>

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto px-6 md:px-20 py-8 md:py-12 custom-scrollbar">
        <div className="max-w-[1600px] mx-auto">
        {/* Back Button Row */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
           <button className="flex items-center gap-3 font-bold text-xl group transition-all">
             <div className="border border-gray-200 rounded-full p-2.5 group-hover:bg-gray-50 transition-colors shadow-sm">
               <LuChevronLeft className="text-xl" />
             </div>
             Back
           </button>
           <button className="p-3 hover:bg-gray-50 rounded-full border border-transparent hover:border-gray-100 transition-all">
              <LuShare2 className="text-xl text-gray-600" />
           </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Title and Illustration */}
          <div className="relative pt-2">
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-2 tracking-tight">Create an account</h2>
            <p className="text-[#8e8e8e] text-lg lg:text-xl mb-8 font-medium">Let's create your account</p>
            
            <div className="relative flex justify-center mt-4">
               {/* Decorative Circles */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none -z-10">
                  <svg className="w-full h-full text-gray-100 opacity-60" viewBox="0 0 500 500">
                    <circle cx="250" cy="250" r="230" fill="none" stroke="currentColor" strokeWidth="1" />
                    <circle cx="250" cy="250" r="180" fill="none" stroke="currentColor" strokeWidth="1" />
                  </svg>
               </div>
               {/* Main Illustration from public folder */}
               <img 
                src="/pngwing.com.png" 
                alt="3D Illustration" 
                className="w-full max-w-lg h-auto object-contain drop-shadow-2xl animate-float" 
               />
            </div>

            <div className="mt-16 text-center text-[18px] text-[#8e8e8e] font-medium">
               Already a member? <a href="/login" className="text-black font-bold underline underline-offset-4 hover:text-blue-600 transition-colors">Log In</a>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="max-w-md mx-auto lg:mx-0 w-full pt-4">
             <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
                <ButtonInput 
                  label="Full name" 
                  type="text" 
                  placeholder="Enter your full name" 
                />

                <ButtonInput 
                  label="Email" 
                  type="email" 
                  placeholder="Enter your email address" 
                />

                <ButtonInput 
                  label="Password" 
                  showPasswordToggle 
                  showPassword={showPassword} 
                  onTogglePassword={() => setShowPassword(!showPassword)} 
                  placeholder="Enter your password" 
                />

                <ButtonSubmit>
                   Sign Up
                </ButtonSubmit>

                <div className="relative py-4 flex items-center justify-center">
                   <div className="absolute w-full border-t border-gray-200"></div>
                   <span className="relative px-6 bg-white text-gray-400 font-semibold text-[15px]">Or</span>
                </div>

                <div className="space-y-4">
                   <button className="w-full bg-white border border-gray-200 text-black font-bold py-[18px] rounded-[14px] flex items-center justify-center gap-3 hover:bg-gray-50 active:scale-[0.98] transition-all text-[17px] shadow-sm">
                      <FcGoogle className="text-2xl" />
                      Sign Up with Google
                   </button>
                   <button className="w-full bg-[#1877F2] text-white font-bold py-[18px] rounded-[14px] flex items-center justify-center gap-3 hover:bg-[#166fe5] active:scale-[0.98] transition-all text-[17px] shadow-lg shadow-blue-500/20">
                      <FaFacebook className="text-2xl" />
                      Sign Up with Facebook
                   </button>
                </div>
             </form>
          </div>
        </div>
        </div>
      </main>

    </div>
  );
};

export default SingUp;
