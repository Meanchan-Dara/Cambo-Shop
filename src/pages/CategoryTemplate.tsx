import React, { useState, useEffect } from 'react';
import AppLayout from '../components/Layout/AppLayout';
import {
  LuStar,
  LuHeart,
  LuPlus,
  LuSearch,
  LuSlidersHorizontal,
  LuArrowUpDown,
  LuShoppingBag,
  LuSparkles
} from "react-icons/lu";
import { api } from '../api/apiClient';
import type { Product } from '../types/Product';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

interface CategoryTemplateProps {
  categoryName: 'Skincares' | 'Electronics' | 'Fashions';
}

// Custom curated visual themes for each category
const THEMES = {
  Skincares: {
    title: "Skincares & Beauty",
    tagline: "Radiant, healthy skin starts here. Pure ingredients, dermatologically tested.",
    bg: "bg-[#F8FAFC]",
    accent: "text-[#B76E79]",
    btnBg: "bg-[#B76E79] hover:bg-[#A05C66] text-white",
    cardBorderHover: "hover:border-[#F3C5CB]",
    badgeBg: "bg-[#EAA8B1] text-white",
    bannerBg: "bg-gradient-to-r from-[#FBC5CD] via-[#E4A0AC] to-[#B76E79] text-white",
    heroText: "text-white",
    iconColor: "text-[#B76E79]",
    inputFocus: "focus:ring-[#B76E79]",
    tag: "SKINCARE",
    mockups: [
      {
        id: 101,
        name: "Hyaluronic Acid Hydrating Serum",
        imageUrl: "",
        price: 24.99,
        description: "Intense hydration with multi-molecular hyaluronic acid formula. Plumps skin and minimizes fine lines.",
        categoryId: 1,
        categoryName: "Skincares",
        rating: 4.9,
        reviewsCount: 142,
        isNew: true,
      },
      {
        id: 102,
        name: "Centella Soothing Gel Cream",
        imageUrl: "",
        price: 18.50,
        description: "Lightweight calming moisturizer with 72% Centella Asiatica. Perfect for sensitive and irritated skin.",
        categoryId: 1,
        categoryName: "Skincares",
        rating: 4.8,
        reviewsCount: 98,
        discount: 15,
      },
      {
        id: 103,
        name: "SPF 50+ Broad Spectrum Sunscreen",
        imageUrl: "",
        price: 22.00,
        description: "Ultra-lightweight daily sun protection. Non-greasy, zero white cast, enriched with Vitamin E.",
        categoryId: 1,
        categoryName: "Skincares",
        rating: 4.7,
        reviewsCount: 310,
      },
      {
        id: 104,
        name: "Retinol Youth Renewal Night Cream",
        imageUrl: "",
        price: 35.00,
        description: "Overnight renewal treatment with micro-encapsulated retinol to reduce wrinkles and brighten skin tone.",
        categoryId: 1,
        categoryName: "Skincares",
        rating: 4.9,
        reviewsCount: 75,
        discount: 20,
      }
    ]
  },
  Electronics: {
    title: "Smart Electronics",
    tagline: "Experience the next generation of smart gadgets, tech essentials, and devices.",
    bg: "bg-[#F8FAFC]",
    accent: "text-[#38BDF8]",
    btnBg: "bg-[#0284C7] hover:bg-[#0369A1] text-white",
    cardBorderHover: "hover:border-[#38BDF8]",
    badgeBg: "bg-[#0EA5E9] text-white",
    bannerBg: "bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0B0F19] text-white border border-slate-800",
    heroText: "text-slate-100",
    iconColor: "text-[#38BDF8]",
    inputFocus: "focus:ring-[#38BDF8]",
    tag: "ELECTRONICS",
    mockups: [
      {
        id: 201,
        name: "Wireless ANC Smart Earbuds",
        imageUrl: "",
        price: 129.99,
        description: "Active Noise Cancelling earbuds with ultra-low latency, custom EQ, and 36h playback time.",
        categoryId: 2,
        categoryName: "Electronics",
        rating: 4.8,
        reviewsCount: 512,
        discount: 20,
      },
      {
        id: 202,
        name: "ProSmart OLED Fitness Watch",
        imageUrl: "",
        price: 199.99,
        description: "Always-on AMOLED display with heart rate, Spo2 tracking, built-in GPS, and 14-day battery life.",
        categoryId: 2,
        categoryName: "Electronics",
        rating: 4.7,
        reviewsCount: 320,
        isNew: true,
      },
      {
        id: 203,
        name: "Quantum 4K Ultra-Wide Monitor",
        imageUrl: "",
        price: 449.00,
        description: "34-inch curved ultra-wide professional gaming monitor. 144Hz refresh rate with HDR 400 support.",
        categoryId: 2,
        categoryName: "Electronics",
        rating: 4.9,
        reviewsCount: 128,
      },
      {
        id: 204,
        name: "Ergonomic Mechanical Keyboard (RGB)",
        imageUrl: "",
        price: 89.50,
        description: "Hot-swappable linear mechanical switches with premium aluminum build, PBT keycaps and wireless connectivity.",
        categoryId: 2,
        categoryName: "Electronics",
        rating: 4.6,
        reviewsCount: 89,
        discount: 10,
      }
    ]
  },
  Fashions: {
    title: "Premium Fashions",
    tagline: "Redefine your everyday style with luxury tailored clothing and premium accessories.",
    bg: "bg-[#F8FAFC]",
    accent: "text-[#C5A880]",
    btnBg: "bg-[#8C6D58] hover:bg-[#735643] text-white",
    cardBorderHover: "hover:border-[#C5A880]",
    badgeBg: "bg-[#C5A880] text-white",
    bannerBg: "bg-gradient-to-r from-[#7D6B58] via-[#8C6D58] to-[#C5A880] text-white",
    heroText: "text-white",
    iconColor: "text-[#8C6D58]",
    inputFocus: "focus:ring-[#8C6D58]",
    tag: "FASHION",
    mockups: [
      {
        id: 301,
        name: "Luxe Cashmere Knit Cardigan",
        imageUrl: "",
        price: 149.00,
        description: "Incredibly soft, 100% Mongolian cashmere knit. Relaxed fit with tortoiseshell button details.",
        categoryId: 3,
        categoryName: "Fashions",
        rating: 4.9,
        reviewsCount: 64,
        isNew: true,
      },
      {
        id: 302,
        name: "Premium Tailored Linen Blazer",
        imageUrl: "",
        price: 110.00,
        description: "Breathable Italian linen blend blazer. Structured shoulders with classic double-breasted buttoning.",
        categoryId: 3,
        categoryName: "Fashions",
        rating: 4.7,
        reviewsCount: 42,
      },
      {
        id: 303,
        name: "Urban Leather Minimalist Boots",
        imageUrl: "",
        price: 185.00,
        description: "Full-grain genuine leather boots with heavy-duty rubber sole and orthopedic comfort footbed.",
        categoryId: 3,
        categoryName: "Fashions",
        rating: 4.8,
        reviewsCount: 104,
        discount: 15,
      },
      {
        id: 304,
        name: "Retro-Chic Acetate Sunglasses",
        imageUrl: "",
        price: 45.00,
        description: "Handcrafted acetate frames with polarized UV400 lenses. Timeless design suitable for all face shapes.",
        categoryId: 3,
        categoryName: "Fashions",
        rating: 4.5,
        reviewsCount: 150,
        discount: 30,
      }
    ]
  }
};

const CategoryTemplate: React.FC<CategoryTemplateProps> = ({ categoryName }) => {
  const theme = THEMES[categoryName];
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Wishlist and cart local state for interaction
  const [wishlist, setWishlist] = useState<Record<number, boolean>>({});

  // Filter and Sorting state
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<'featured' | 'priceAsc' | 'priceDesc' | 'rating'>('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Synchronously reset filters when categoryName changes (official React recommendation)
  const [prevCategoryName, setPrevCategoryName] = useState(categoryName);
  if (categoryName !== prevCategoryName) {
    setPrevCategoryName(categoryName);
    setSearchQuery('');
    setPriceRange([0, 1000]);
    setSortBy('featured');
  }

  // Fetch API
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setIsLoading(true);
      try {
        const response = await api.get<Product[]>('/api/products');

        // Filter products matching current category (robust case-insensitive check)
        const matched = response.filter(p => {
          if (!p.categoryName) return false;
          const pName = p.categoryName.toLowerCase();
          const target = categoryName.toLowerCase();

          if (target === 'skincares') {
            return pName.includes('skincare') || pName.includes('cosmetic') || pName.includes('beauty');
          }
          if (target === 'fashions') {
            return pName.includes('fashion') || pName.includes('cloth') || pName.includes('shoe') || pName.includes('wear');
          }
          if (target === 'electronics') {
            return pName.includes('electron') || pName.includes('mobile') || pName.includes('phone') || pName.includes('gadget');
          }
          return pName.includes(target) || target.includes(pName);
        });

        // Add additional mockup helper properties to API products if needed
        const processed = matched.map((p, idx) => ({
          ...p,
          rating: p.rating || parseFloat((4.5 + (idx % 5) * 0.1).toFixed(1)),
          reviewsCount: p.reviewsCount || (45 + (idx * 17) % 300),
          isNew: idx % 3 === 0,
        }));

        // If no products matched in API, default to our gorgeous theme mockups
        if (processed.length === 0) {
          setProducts(theme.mockups);
        } else {
          setProducts(processed);
        }
      } catch (error) {
        console.error(`Failed to fetch ${categoryName} products:`, error);
        // Fallback to mockups on error to ensure a beautiful premium UX
        setProducts(theme.mockups);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName, theme.mockups]);

  // Apply search, filters, and sorting dynamically via useMemo (prevents cascading renders)
  const filteredProducts = React.useMemo(() => {
    let result = [...products];

    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // 2. Price Range Filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // 3. Sorting
    if (sortBy === 'priceAsc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [products, searchQuery, priceRange, sortBy]);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      if (updated[id]) {
        toast.success("Added to Wishlist!", { icon: '❤️' });
      } else {
        toast("Removed from Wishlist", { icon: '🤍' });
      }
      return updated;
    });
  };

  const handleAddToCart = (productName: string) => {
    toast.success(`Added ${productName} to cart!`, {
      style: {
        border: '1px solid #10B981',
        padding: '16px',
        color: '#065F46',
      },
      iconTheme: {
        primary: '#10B981',
        secondary: '#FFFDFA',
      },
    });
  };

  return (
    <AppLayout>
      <div className={`min-h-screen ${theme.bg} transition-colors duration-500 pb-16`}>

        {/* Breadcrumb Navigation */}
        <div className="px-6 md:px-12 pt-6 flex items-center gap-2 text-xs font-semibold text-gray-500">
          <Link to="/home" className="hover:text-black transition-colors flex items-center gap-1">
            🏠 Home
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-bold">{categoryName}</span>
        </div>

        {/* Dynamic Category Hero Banner */}
        <section className="px-6 md:px-12 pt-8">
          <div className={`${theme.bannerBg} rounded-3xl p-10 md:p-16 relative overflow-hidden shadow-lg border border-opacity-20`}>
            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-5 right-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative max-w-xl space-y-4">
              <span className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full w-fit">
                <LuSparkles /> Premium Collection
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight">
                {theme.title}
              </h1>
              <p className="text-sm md:text-base opacity-90 leading-relaxed font-medium">
                {theme.tagline}
              </p>
            </div>

            {/* Elegant category tag decoration */}
            <div className="absolute right-12 bottom-6 opacity-10 text-[90px] font-black tracking-tighter select-none hidden md:block">
              {theme.tag}
            </div>
          </div>
        </section>

        {/* Filters and Grid Section */}
        <section className="px-6 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block space-y-8 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm h-fit sticky top-6 self-start z-30">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-bold text-base text-gray-800 flex items-center gap-2">
                <LuSlidersHorizontal size={18} /> Filters
              </h3>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setPriceRange([0, 1000]);
                  setSortBy('featured');
                }}
                className="text-xs font-bold text-red-500 hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Search filter inside category */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-xs outline-none focus:border-gray-400 focus:bg-white transition-all ${theme.inputFocus}`}
                />
                <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Price Range</label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#222222]"
                />
                <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
                  <span>$0</span>
                  <span className="px-2 py-1 bg-gray-100 rounded font-black text-black">Up to ${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Sort by option */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sort By</label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as 'featured' | 'priceAsc' | 'priceDesc' | 'rating')}
                  className={`w-full bg-gray-50/50 border border-gray-200 rounded-xl py-2.5 px-3 text-xs outline-none focus:border-gray-400 focus:bg-white transition-all appearance-none cursor-pointer`}
                >
                  <option value="featured">Featured / Default</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <LuArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
              </div>
            </div>
          </aside>

          {/* Mobile Filter Trigger and Active status bar */}
          <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm gap-4">
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold text-gray-700 transition-colors"
            >
              <LuSlidersHorizontal size={14} /> Filter / Sort
            </button>
            <div className="text-xs font-bold text-gray-500">
              {filteredProducts.length} Products
            </div>
          </div>

          {/* Mobile Filters Dropdown Drawer */}
          {showFiltersMobile && (
            <div className="lg:hidden bg-white p-6 rounded-xl border border-gray-100 shadow-lg space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h4 className="font-bold text-sm text-gray-800">Filter Products</h4>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setPriceRange([0, 1000]);
                    setSortBy('featured');
                  }}
                  className="text-xs font-bold text-red-500"
                >
                  Clear All
                </button>
              </div>

              {/* Mobile Search */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search product name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-9 pr-3 text-xs outline-none"
                  />
                  <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                </div>
              </div>

              {/* Mobile Price */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500">Price: Up to ${priceRange[1]}</label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Mobile Sort */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as 'featured' | 'priceAsc' | 'priceDesc' | 'rating')}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-xs outline-none"
                >
                  <option value="featured">Featured / Default</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              <button
                onClick={() => setShowFiltersMobile(false)}
                className="w-full py-2.5 bg-black text-white text-xs font-bold rounded-lg uppercase"
              >
                Apply Filters
              </button>
            </div>
          )}

          {/* Products Grid Content Area */}
          <div className="lg:col-span-3 space-y-6">

            {/* Products count and sorting headers */}
            <div className="hidden lg:flex items-center justify-between bg-white/40 p-4 rounded-xl border border-gray-100/50 backdrop-blur-sm">
              <div className="text-sm font-bold text-gray-600">
                Showing <span className="text-black font-black">{filteredProducts.length}</span> premium products
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-400">Viewing style:</span>
                <span className="text-xs font-bold px-3 py-1 bg-black text-white rounded-full uppercase tracking-wider">{categoryName} Grid</span>
              </div>
            </div>

            {isLoading ? (
              // PREMIUM SKELETON LOADER
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 space-y-4 animate-pulse">
                    <div className="aspect-square bg-gray-100 rounded-xl"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/3"></div>
                    <div className="h-6 bg-gray-100 rounded w-5/6"></div>
                    <div className="h-8 bg-gray-100 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              // GORGEOUS EMPTY STATE
              <div className="bg-white rounded-3xl p-16 border border-gray-100 text-center space-y-6 shadow-sm">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto border border-dashed border-gray-200">
                  <LuShoppingBag size={40} className="text-gray-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-800">No Products Found</h3>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto">
                    We couldn't find any products in {categoryName} that match your filter search criteria. Try adjusting your filters.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setPriceRange([0, 1000]);
                    setSortBy('featured');
                  }}
                  className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-colors shadow-md"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              // PRODUCTS GRID
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const finalPrice = product.price;
                  const discount = product.discount || 0;
                  const originalPrice = discount > 0 ? (finalPrice / (1 - discount / 100)).toFixed(2) : null;

                  return (
                    <div
                      key={product.id}
                      className={`bg-white rounded-2xl p-4 border border-gray-100/80 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group relative cursor-pointer border-transparent ${theme.cardBorderHover}`}
                    >
                      {/* Product Badges */}
                      <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5">
                        {product.isNew && (
                          <span className={`text-[9px] font-black tracking-widest px-2 py-0.5 rounded shadow-sm uppercase ${theme.badgeBg}`}>
                            NEW
                          </span>
                        )}
                        {discount > 0 && (
                          <span className="text-[9px] font-black tracking-widest px-2 py-0.5 rounded shadow-sm uppercase bg-red-500 text-white">
                            {discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* Heart Wishlist Icon with micro-animation */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className={`absolute top-6 right-6 z-10 w-9 h-9 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-100 transition-all duration-300 active:scale-90 ${wishlist[product.id] ? 'text-red-500 bg-red-50/50' : 'text-gray-400 hover:text-red-500'
                          }`}
                      >
                        <LuHeart size={18} fill={wishlist[product.id] ? "currentColor" : "none"} />
                      </button>

                      {/* Product Image Section */}
                      <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden mb-4 flex items-center justify-center border border-gray-100 group-hover:scale-98 transition-transform">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-contain p-2"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-200/60 m-3 rounded-lg bg-white/50">
                            <span className={`text-[10px] font-extrabold uppercase tracking-widest ${theme.accent} mb-1 flex items-center gap-1`}>
                              <LuSparkles /> {categoryName.slice(0, -1)}
                            </span>
                            <span className="text-[8px] font-bold text-gray-300 italic max-w-[120px] line-clamp-2">
                              {product.name}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Information */}
                      <div className="space-y-2 flex-grow flex flex-col justify-between">
                        <div>
                          {/* Star Ratings */}
                          <div className="flex items-center gap-1 text-[#FFC72C] mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <LuStar
                                key={star}
                                size={12}
                                fill={star <= Math.round(product.rating || 4.5) ? "currentColor" : "none"}
                                stroke="currentColor"
                              />
                            ))}
                            <span className="text-[10px] text-gray-400 font-bold ml-1">
                              ({product.rating || 4.5})
                            </span>
                          </div>

                          {/* Product Title */}
                          <h3 className="font-extrabold text-sm text-gray-800 group-hover:text-black transition-colors leading-tight line-clamp-2 uppercase">
                            {product.name}
                          </h3>

                          {/* Product description short */}
                          {product.description && (
                            <p className="text-[11px] text-gray-400 line-clamp-2 font-medium pt-1">
                              {product.description}
                            </p>
                          )}
                        </div>

                        <div className="pt-3">
                          {/* Price */}
                          <div className="flex items-baseline gap-2">
                            <span className={`text-base font-black ${theme.accent}`}>
                              ${finalPrice.toFixed(2)}
                            </span>
                            {originalPrice && (
                              <span className="text-xs text-gray-400 line-through">
                                ${originalPrice}
                              </span>
                            )}
                          </div>

                          {/* Interactive Buttons */}
                          <div className="flex items-center gap-2 mt-4 opacity-90 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product.name);
                              }}
                              className={`flex-1 text-[11px] font-black uppercase py-2.5 rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-1.5 shadow-sm ${theme.btnBg}`}
                            >
                              <LuPlus size={14} /> Add to Cart
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </section>

      </div>
    </AppLayout>
  );
};

export default CategoryTemplate;
