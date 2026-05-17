import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import SingUp from '@/pages/SingUp/SingUp';
import Skincare from '@/pages/Skincare/Skincare';
import Electronics from '@/pages/Electronics/Electronics';
import Fashion from '@/pages/Fashion/Fashion';

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SingUp />} />
                <Route path="/skincare" element={<Skincare />} />
                <Route path="/electronics" element={<Electronics />} />
                <Route path="/fashion" element={<Fashion />} />
                
                {/* Add more routes here as needed */}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;

