import React, { useState } from 'react';

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
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 text-[13px] font-semibold">
            <div className="flex items-center gap-2 text-[#ff8a00] cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>
              <span>My Deals</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer text-[#000000]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span>Sign Up/Sign In</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer text-[#000000]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              <span>Cart</span>
            </div>
          </div>
        </div>
      </header>

      {/* Categories Bar */}
      <nav className="shrink-0 py-3 px-6 md:px-12 border-b border-gray-100 bg-white z-50">
        <div className="w-full flex gap-4 text-[13px] font-medium overflow-x-auto no-scrollbar">
          {["Groceries", "Premium Fruits", "Home & Kitchen", "Fashion", "Electronics", "Beauty", "Home Improvement", "Sports, Toys & Luggage"].map((cat) => (
            <button key={cat} className="flex items-center gap-1.5 bg-[#f3f9fb] hover:bg-gray-100 px-4 py-2 rounded-full whitespace-nowrap transition-colors">
              {cat}
              <svg className="text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto px-6 md:px-20 py-8 md:py-12 custom-scrollbar">
        <div className="max-w-[1600px] mx-auto">
        {/* Back Button Row */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
           <button className="flex items-center gap-3 font-bold text-xl group transition-all">
             <div className="border border-gray-200 rounded-full p-2.5 group-hover:bg-gray-50 transition-colors shadow-sm">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
             </div>
             Back
           </button>
           <button className="p-3 hover:bg-gray-50 rounded-full border border-transparent hover:border-gray-100 transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
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
                <div className="space-y-3">
                   <label className="text-[17px] font-bold text-[#000000]">Full name</label>
                   <input 
                    type="text" 
                    placeholder="Enter your full name" 
                    className="w-full bg-[#f3f4f6] border-none rounded-[14px] py-[18px] px-6 text-[16px] text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-black outline-none transition-all shadow-sm"
                   />
                </div>

                <div className="space-y-3">
                   <label className="text-[17px] font-bold text-[#000000]">Email</label>
                   <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full bg-[#f3f4f6] border-none rounded-[14px] py-[18px] px-6 text-[16px] text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-black outline-none transition-all shadow-sm"
                   />
                </div>

                <div className="space-y-3">
                   <label className="text-[17px] font-bold text-[#000000]">Password</label>
                   <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter your password" 
                        className="w-full bg-[#f3f4f6] border-none rounded-[14px] py-[18px] px-6 pr-14 text-[16px] text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-black outline-none transition-all shadow-sm"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                         {showPassword ? (
                           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                         ) : (
                           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                         )}
                      </button>
                   </div>
                </div>

                <button className="w-full bg-[#000000] text-white font-bold py-[18px] rounded-[14px] hover:bg-gray-800 active:scale-[0.98] transition-all mt-4 text-[18px] shadow-lg shadow-black/10">
                   Sign Up
                </button>

                <div className="relative py-4 flex items-center justify-center">
                   <div className="absolute w-full border-t border-gray-200"></div>
                   <span className="relative px-6 bg-white text-gray-400 font-semibold text-[15px]">Or</span>
                </div>

                <div className="space-y-4">
                   <button className="w-full bg-white border border-gray-200 text-black font-bold py-[18px] rounded-[14px] flex items-center justify-center gap-3 hover:bg-gray-50 active:scale-[0.98] transition-all text-[17px] shadow-sm">
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Sign Up with Google
                   </button>
                   <button className="w-full bg-[#1877F2] text-white font-bold py-[18px] rounded-[14px] flex items-center justify-center gap-3 hover:bg-[#166fe5] active:scale-[0.98] transition-all text-[17px] shadow-lg shadow-blue-500/20">
                      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      Sign Up with Facebook
                   </button>
                </div>
             </form>
          </div>
        </div>
        </div>
      </main>

      {/* Adding a simple floating animation style in a style tag for the illustration */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
};

export default SingUp;
