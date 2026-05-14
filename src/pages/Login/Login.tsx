import React, { useState } from 'react';
import ButtonInput from "@/components/Button/ButtonInput";
import ButtonSubmit from "@/components/Button/ButtonSubmit";
import Button from "@/components/Button/Button";
import { LuChevronLeft } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import AppLayout from "@/components/Layout/AppLayout";
import { useNavigate } from 'react-router-dom';
import { api, LOGIN_ENDPOINT } from '@/api/apiClient';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.post<{ token: string }>(LOGIN_ENDPOINT, { 
                email, 
                password 
            });
            
            toast.success("Login successful!");
            localStorage.setItem('token', response.token);
            
            setTimeout(() => navigate('/'), 1000);
        } catch (error: any) {
            console.error("Login error:", error);
            toast.error(error.message || "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AppLayout>
            {/* Main Content Area */}
            <div className="px-20 py-4 mb-12">
                <div className="max-w-[1600px] mx-auto ml-16">
                    {/* Back Button Row */}
                    <div className="flex items-center justify-between mb-2 ml-34">
                        <button 
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 font-bold text-base group transition-all"
                        >
                            <div className="border border-gray-200 rounded-full p-2 group-hover:bg-gray-50 transition-colors shadow-sm">
                                <LuChevronLeft className="text-lg" />
                            </div>
                            Back
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-2 items-start">
                        {/* Left Side: Title and Illustration */}
                        <div className="relative pt-2">
                            <h2 className="text-2xl font-extrabold leading-tight mb-2 tracking-tight ml-34">Welcome Back</h2>
                            <p className="text-[#8e8e8e] text-[14px] ml-36">Login in to your account</p>

                            <div className="relative flex justify-center mt-2">
                                {/* Decorative Circles */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none -z-10">
                                    <svg className="w-full h-full text-gray-100 opacity-60" viewBox="0 0 500 500">
                                        <circle cx="250" cy="250" r="230" fill="none" stroke="currentColor" strokeWidth="1" />
                                        <circle cx="250" cy="250" r="180" fill="none" stroke="currentColor" strokeWidth="1" />
                                    </svg>
                                </div>
                                {/* Illustration */}
                                <img
                                    src="/pngwing.com.png"
                                    alt="Login Illustration"
                                    className="w-full max-w-sm h-auto object-contain drop-shadow-2xl animate-float"
                                />
                            </div>

                            <div className=" text-center text-base text-[#8e8e8e] font-medium">
                                First time here?{" "}
                                <button 
                                    onClick={() => navigate('/signup')}
                                    className="text-black font-bold underline underline-offset-4 hover:text-blue-600 transition-colors"
                                >
                                    Signup
                                </button>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="max-w-md mx-auto lg:mx-0 w-full pt-4">
                            <form className="space-y-2" onSubmit={handleLogin}>
                                <ButtonInput
                                    label="Email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <ButtonInput
                                    label="Password"
                                    showPasswordToggle
                                    showPassword={showPassword}
                                    onTogglePassword={() => setShowPassword(!showPassword)}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <div className="flex justify-end pt-1">
                                    <a href="#" className="text-sm font-semibold text-gray-500 hover:text-black transition-colors">Forgot password?</a>
                                </div>

                                <ButtonSubmit disabled={isLoading}>
                                    {isLoading ? "Logging in..." : "Login"}
                                </ButtonSubmit>

                                <div className="relative py-2 flex items-center justify-center">
                                    <div className="absolute w-full border-t border-gray-200"></div>
                                    <span className="relative px-4 bg-white text-gray-400 font-medium text-[13px]">Or</span>
                                </div>

                                <div className="space-y-3">
                                    <Button className="w-full" type="button">
                                        <FcGoogle className="text-xl" />
                                        Login with Google
                                    </Button>
                                    <Button className="w-full bg-[#1877F2] border-none hover:bg-[#166fe5]" type="button">
                                        <FaFacebook className="text-xl" />
                                        Login with Facebook
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

export default Login;
