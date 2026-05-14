import React, { useState, useEffect } from 'react';
import { 
  LuSearch, 
  LuHeart, 
  LuUser, 
  LuShoppingCart, 
  LuMenu
} from "react-icons/lu";
import { Link } from 'react-router-dom';
import { CATEGORY_ENDPOINT, api } from '../../api/apiClient';
import type { Category, CategoryResponse } from '../../types/Category';

const Header: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.get<CategoryResponse>(CATEGORY_ENDPOINT);
        console.log("Fetched categories data:", data);
        if (Array.isArray(data)) {
          setCategories(data);
        } else if (data && typeof data === 'object') {
          if ('content' in data && Array.isArray(data.content)) {
            setCategories(data.content);
          } else if ('categories' in data && Array.isArray(data.categories)) {
            setCategories(data.categories);
          }
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {

        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="sticky top-0 z-[100] w-full shadow-sm">
      {/* Main Header */}
      <header className="shrink-0 border-b bg-gray-100 border-gray-100 py-4 px-6 md:px-12  z-50">
        <div className="w-full flex items-center justify-between gap-4">
          {/* Menu & Logo Section */}
          <div className="flex items-center gap-4 shrink-0">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
               <LuMenu className="text-2xl" />
            </button>
            <Link to="/" className="flex items-center gap-2">
               <h1 className="text-2xl font-black tracking-tighter text-[#000000]">CAMBO SHOP</h1>
               <img src="/Fash-Sale.png" alt="Flash Sale" className="h-10 object-contain" />
            </Link>
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
            <Link to="/deals" className="flex items-center gap-2 text-[#ff8a00] cursor-pointer">
              <LuHeart className="text-xl" />
              <span>My Deals</span>
            </Link>
            <Link to="/login" className="flex items-center gap-2 cursor-pointer text-[#000000]">
              <LuUser className="text-xl" />
              <span>Sign Up/Sign In</span>
            </Link>
            <Link to="/cart" className="flex items-center gap-2 cursor-pointer text-[#000000]">
              <LuShoppingCart className="text-xl" />
              <span>Cart</span>
            </Link>
          </div>
        </div>
        
      </header>
      <div className='w-full h-px shadow-sm bg-[#dbd5d0]'></div>
      {/* Navigation with Categories */}
      <nav className="shrink-0 py-3 px-6 md:px-12 border-b border-gray-100 bg-gray-100 z-[100] overflow-hidden">
        <div className="w-full flex items-center gap-8 overflow-x-auto no-scrollbar py-1">
          {isLoading ? (
            // Skeleton Loader for premium feel
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-4 w-24 bg-gray-100 rounded-full animate-pulse"></div>
              ))}
            </>
          ) : (
            <>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#000000] text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-all shadow-sm whitespace-nowrap active:scale-95">
                <LuMenu className="text-lg" />
                All Categories
              </button>
              
              {categories.map((category) => (
                <Link 
                  key={category.id} 
                  to={`/category/${category.id}`}
                  className="relative text-[13.5px] font-bold text-gray-500 hover:text-black transition-colors whitespace-nowrap group"
                >
                  {category.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;

