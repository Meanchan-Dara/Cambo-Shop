import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface AppLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  showHeader = true, 
  showFooter = true 
}) => {
  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {showHeader && <Header />}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <div className="min-h-full flex flex-col">
          <div className="flex-1">
            {children}
          </div>
          {showFooter && <Footer />}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;

