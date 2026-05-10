import React, { useState } from 'react';
import ButtonInput from '../../components/Button/ButtonInput';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import Button from '../../components/Button/Button';
import {
  LuChevronLeft,
} from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import AppLayout from '../../components/Layout/AppLayout';

const SingUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AppLayout>
      {/* Main Content Area */}
      <div className="px-20 py-4 mb-12">
        <div className="max-w-[1600px] mx-auto ml-16">
          {/* Back Button Row */}
          <div className="flex items-center justify-between mb-2 ml-34">
            <button className="flex items-center gap-2 font-bold text-base group transition-all">
              <div className="border border-gray-200 rounded-full p-2 group-hover:bg-gray-50 transition-colors shadow-sm">
                <LuChevronLeft className="text-lg" />
              </div>
              Back
            </button>
           
          </div>

          <div className="grid lg:grid-cols-2  items-start">
            {/* Left Side: Title and Illustration */}
            <div className="relative pt-2">
              <h2 className="text-2xl font-extrabold leading-tight mb-2 tracking-tight ml-34">Create an account</h2>
              <p className="text-[#8e8e8e] text-[14px] ml-36">Let's create your account</p>

              <div className="relative flex justify-center mt-2">
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
                  className="w-full max-w-sm h-auto object-contain drop-shadow-2xl animate-float"
                />
              </div>

              <div className=" text-center text-base text-[#8e8e8e] font-medium">
                Already a member? <a href="/login" className="text-black font-bold underline underline-offset-4 hover:text-blue-600 transition-colors">Log In</a>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="max-w-md mx-auto lg:mx-0 w-full pt-4">
              <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
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

                <div className="relative py-2 flex items-center justify-center">
                  <div className="absolute w-full border-t border-gray-200"></div>
                  <span className="relative px-4 bg-white text-gray-400 font-medium text-[13px]">Or</span>
                </div>

                <div className="space-y-3">
                  <Button >
                    <FcGoogle className="text-xl" />
                    Sign Up with Google
                  </Button>
                  <Button>
                    <FaFacebook className="text-xl" />
                    Sign Up with Facebook
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SingUp;
