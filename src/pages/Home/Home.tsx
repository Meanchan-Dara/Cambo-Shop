import React, { useState, useEffect, useMemo } from 'react';
import AppLayout from '../../components/Layout/AppLayout';
import {
  LuChevronLeft,
  LuChevronRight,
  LuTruck,
  LuRotateCcw,
  LuShieldCheck,
  LuHeadphones,
  LuStar,
  LuHeart,
  LuPlus,
  LuSparkles,
  LuShoppingBag,
  LuArrowRight
} from "react-icons/lu";
import { api, CATEGORY_ENDPOINT } from '../../api/apiClient';
import type { Category, CategoryResponse } from '../../types/Category';
import type { Product } from '../../types/Product';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// HERO_SLIDES constant removed - slides are now dynamically populated from active API products

const DEFAULT_CATEGORIES = [
  { id: 1, name: 'Skincare' },
  { id: 2, name: 'Electronics' },
  { id: 3, name: 'Fashion' }
];

const DEFAULT_PRODUCTS: Product[] = [
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
    discount: 10,
    isNew: true
  },
  {
    id: 201,
    name: "Wireless ANC Smart Earbuds",
    imageUrl: "",
    price: 129.99,
    description: "Active Noise Cancelling earbuds with ultra-low latency, custom EQ, and 36h playback.",
    categoryId: 2,
    categoryName: "Electronics",
    rating: 4.8,
    reviewsCount: 512,
    discount: 20,
    isNew: true
  },
  {
    id: 301,
    name: "Luxe Cashmere Knit Cardigan",
    imageUrl: "",
    price: 149.00,
    description: "Incredibly soft, 100% Mongolian cashmere knit. Relaxed fit with classic tortoiseshell buttons.",
    categoryId: 3,
    categoryName: "Fashions",
    rating: 4.9,
    reviewsCount: 64,
    isNew: true
  },
  {
    id: 202,
    name: "ProSmart OLED Fitness Watch",
    imageUrl: "",
    price: 199.99,
    description: "Always-on AMOLED display with heart rate, Spo2 tracking, built-in GPS, and 14-day battery.",
    categoryId: 2,
    categoryName: "Electronics",
    rating: 4.7,
    reviewsCount: 320,
    discount: 15
  },
  {
    id: 102,
    name: "Centella Soothing Gel Cream",
    imageUrl: "",
    price: 18.50,
    description: "Lightweight calming moisturizer with 72% Centella Asiatica. Perfect for sensitive skin.",
    categoryId: 1,
    categoryName: "Skincares",
    rating: 4.8,
    reviewsCount: 98,
    discount: 25
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
    discount: 15
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  // State variables for fetched API data
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Hero section slider index state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Wishlist local state persisted in localStorage
  const [wishlist, setWishlist] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Fetch API categories and products on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const data = await api.get<CategoryResponse>(CATEGORY_ENDPOINT);
        console.log("Fetched categories for Home:", data);
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
        console.error("Failed to fetch categories on Home:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const data = await api.get<Product[]>('/api/products');
        console.log("Fetched products for Home:", data);
        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products on Home:", error);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  // Slide transition effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + 3) % 3);
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % 3);
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem('wishlist', JSON.stringify(updated));
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
        fontWeight: 'bold',
      },
      iconTheme: {
        primary: '#10B981',
        secondary: '#FFFDFA',
      },
    });
  };

  // Helper to map category names to page links, icons, and visual themes
  const getCategoryDetails = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('skincare') || n.includes('cosmetic') || n.includes('beauty')) {
      return {
        path: '/skincare',
        label: name,
        icon: '🌸',
        accentColor: 'text-[#B76E79]',
        accentBg: 'bg-[#B76E79]/10',
        borderColor: 'hover:border-[#B76E79]/50 hover:shadow-[#B76E79]/10'
      };
    }
    if (n.includes('electron') || n.includes('mobile') || n.includes('phone') || n.includes('gadget')) {
      return {
        path: '/electronics',
        label: name,
        icon: '⚡',
        accentColor: 'text-[#0284C7]',
        accentBg: 'bg-[#0284C7]/10',
        borderColor: 'hover:border-[#0284C7]/50 hover:shadow-[#0284C7]/10'
      };
    }
    if (n.includes('fashion') || n.includes('cloth') || n.includes('shoe') || n.includes('wear')) {
      return {
        path: '/fashion',
        label: name,
        icon: '🧥',
        accentColor: 'text-[#8C6D58]',
        accentBg: 'bg-[#8C6D58]/10',
        borderColor: 'hover:border-[#8C6D58]/50 hover:shadow-[#8C6D58]/10'
      };
    }
    return {
      path: '/electronics', // Default fallback router path
      label: name,
      icon: '🛍️',
      accentColor: 'text-[#fca311]',
      accentBg: 'bg-[#fca311]/10',
      borderColor: 'hover:border-[#fca311]/50 hover:shadow-[#fca311]/10'
    };
  };

  // Active Categories derived dynamically
  const activeCategories = categories.length > 0 ? categories : DEFAULT_CATEGORIES;

  // Active Products derived dynamically
  const activeProducts = products.length > 0 ? products : DEFAULT_PRODUCTS;

  // Dynamic Hero Slides derived from real database products
  const heroSlides = useMemo(() => {
    // 1. Find a real Fashion/Clothing product
    const fashionProduct = activeProducts.find(p => {
      const cat = (p.categoryName || '').toLowerCase();
      const name = p.name.toLowerCase();
      return cat.includes('fashion') || cat.includes('cloth') || cat.includes('wear') || cat.includes('shoe') || name.includes('shirt') || name.includes('jeans') || name.includes('top') || name.includes('jorts');
    });

    // 2. Find a real Skincare product
    const skincareProduct = activeProducts.find(p => {
      const cat = (p.categoryName || '').toLowerCase();
      const name = p.name.toLowerCase();
      return cat.includes('skincare') || cat.includes('cosmetic') || cat.includes('beauty') || name.includes('serum') || name.includes('cream') || name.includes('spf') || name.includes('gel');
    });

    // 3. Find a real Electronics product
    const electronicsProduct = activeProducts.find(p => {
      const cat = (p.categoryName || '').toLowerCase();
      const name = p.name.toLowerCase();
      return cat.includes('electron') || cat.includes('mobile') || cat.includes('phone') || cat.includes('gadget') || name.includes('watch') || name.includes('earbuds') || name.includes('keyboard') || name.includes('monitor');
    });

    return [
      {
        tag: fashionProduct ? "TRENDING FASHION ARRIVAL" : "BEST DEAL ONLINE ON SMART WATCHES",
        title: fashionProduct ? fashionProduct.name : "LATEST NIKE GEAR",
        desc: fashionProduct ? `JUST $${fashionProduct.price.toFixed(2)} - SHOP NOW` : "UP TO 80% OFF",
        gradient: "from-[#8C6D58] via-[#a88972] to-[#c7a78f]",
        accentColor: "#ffcc00",
        image: fashionProduct ? (fashionProduct.imageUrl || '') : "/pngwing.com.png",
        link: "/fashion"
      },
      {
        tag: skincareProduct ? "DERMATOLOGIST APPROVED SKINCARE" : "ORGANIC FORMULAS FOR RADIANT GLOW",
        title: skincareProduct ? skincareProduct.name : "LUXURY BEAUTY & SKIN",
        desc: skincareProduct ? `PREMIUM THERAPY FOR $${skincareProduct.price.toFixed(2)}` : "UP TO 40% OFF",
        gradient: "from-[#8c525a] via-[#b76e79] to-[#d9a2a9]",
        accentColor: "#ffffff",
        image: skincareProduct ? (skincareProduct.imageUrl || '') : null,
        link: "/skincare"
      },
      {
        tag: electronicsProduct ? "ADVANCED TECH & GADGETS" : "EXPERIENCE THE NEXT GENERATION",
        title: electronicsProduct ? electronicsProduct.name : "PREMIUM ELECTRONICS",
        desc: electronicsProduct ? `SMART VALUE AT JUST $${electronicsProduct.price.toFixed(2)}` : "UP TO 60% OFF",
        gradient: "from-[#0f172a] via-[#1e293b] to-[#334155]",
        accentColor: "#38bdf8",
        image: electronicsProduct ? (electronicsProduct.imageUrl || '') : null,
        link: "/electronics"
      }
    ];
  }, [activeProducts]);

  // Filter products for Deals of the Day (high discount or marked as new)
  const dealsProducts = useMemo(() => {
    const discounted = activeProducts.filter(p => (p.discount && p.discount > 0) || p.isNew);
    return discounted.length > 0 ? discounted.slice(0, 4) : activeProducts.slice(0, 4);
  }, [activeProducts]);

  return (
    <AppLayout>
      <div className="flex flex-col gap-14 pb-20 bg-gradient-to-b from-gray-50 via-white to-gray-50/30">
        
        {/* Dynamic Hero Slider Section */}
        <section className="px-6 md:px-12 pt-6">
          <div className="relative h-[300px] sm:h-[380px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl group transition-all duration-700">
            {heroSlides.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <div
                  key={idx}
                  className={`absolute inset-0 w-full h-full bg-gradient-to-r ${slide.gradient} transition-all duration-1000 ease-in-out flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-6 md:py-0 text-white ${
                    isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0 pointer-events-none"
                  }`}
                >
                  {/* Background Decorations */}
                  <div className="absolute top-0 right-0 w-[45%] h-full bg-white/5 rounded-l-[100%] opacity-20 transform translate-x-12 blur-sm"></div>
                  <div className="absolute bottom-0 right-1/3 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

                  <div className="relative z-20 flex flex-col justify-center max-w-full md:max-w-2xl space-y-4 md:space-y-6 text-center md:text-left mt-4 md:mt-0">
                    <span 
                      className={`text-[10px] md:text-xs font-extrabold uppercase tracking-widest px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full w-fit mx-auto md:mx-0 transition-all duration-500 ${
                        isActive ? 'animate-slide-in-left' : 'opacity-0'
                      }`}
                      style={{ color: slide.accentColor }}
                    >
                      {slide.tag}
                    </span>
                    <h1 className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight uppercase max-w-lg transition-all duration-700 ${
                      isActive ? 'animate-slide-in-left [animation-delay:150ms]' : 'opacity-0'
                    }`}>
                      {slide.title}
                    </h1>
                    <p className={`text-sm sm:text-base md:text-2xl font-extrabold italic transition-all duration-700 ${
                      isActive ? 'animate-slide-in-left [animation-delay:300ms]' : 'opacity-0'
                    }`} style={{ color: slide.accentColor }}>
                      {slide.desc}
                    </p>

                    <button 
                      onClick={() => navigate(slide.link)}
                      className={`flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-white text-black text-[10px] md:text-xs font-black uppercase rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 w-fit mx-auto md:mx-0 cursor-pointer ${
                        isActive ? 'animate-slide-in-up [animation-delay:450ms]' : 'opacity-0'
                      }`}
                    >
                      Shop Collection <LuArrowRight size={14} />
                    </button>
                  </div>

                  {/* Right Graphics */}
                  <div className="relative md:absolute md:right-24 md:top-1/2 md:-translate-y-1/2 w-full md:w-[35%] h-[120px] sm:h-[180px] md:h-auto max-h-[85%] flex items-center justify-center select-none pointer-events-none z-20 mt-4 md:mt-0">
                    {slide.image ? (
                      <img
                        src={slide.image}
                        alt="Promo Image"
                        className={`h-full md:w-full md:h-full max-h-[110px] sm:max-h-[160px] md:max-h-[340px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] animate-float-premium rounded-2xl bg-white/10 p-2 md:p-3 border border-white/20 transition-all duration-700 ${
                          isActive ? 'animate-slide-in-up [animation-delay:200ms]' : 'opacity-0 scale-90'
                        }`}
                      />
                    ) : (
                      // Gorgeous CSS fallback graphic
                      <div className={`w-24 h-24 sm:w-36 sm:h-36 md:w-64 md:h-64 rounded-full bg-white/10 border border-white/20 flex flex-col items-center justify-center text-center p-2 sm:p-4 md:p-8 backdrop-blur-md relative overflow-hidden group shadow-2xl transition-all duration-700 ${
                        isActive ? 'animate-slide-in-up [animation-delay:200ms]' : 'opacity-0 scale-90'
                      }`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <LuSparkles className="text-white/80 animate-pulse mb-1 md:mb-4 text-xl sm:text-2xl md:text-5xl" />
                        <h4 className="text-[10px] sm:text-xs md:text-lg font-black tracking-wider uppercase mb-0.5 md:mb-1 line-clamp-1">{slide.title.split(' ')[0]}</h4>
                        <p className="text-[7px] sm:text-[9px] md:text-xs text-white/60 font-semibold uppercase tracking-widest">{slide.desc}</p>
                        {/* Glow spots */}
                        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Slider Dots */}
            <div className="absolute bottom-6 left-16 z-30 flex gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentSlide ? 'w-10 bg-white shadow-lg' : 'w-2 bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Slider Navigation Arrows */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/60 rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-30 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            >
              <LuChevronLeft size={24} />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/60 rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-30 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            >
              <LuChevronRight size={24} />
            </button>
          </div>
        </section>

        {/* Features Bar */}
        <section className="px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 px-6 bg-white rounded-3xl shadow-sm border border-gray-100">
            {[
              { icon: LuTruck, title: "FASTEST DELIVERY", desc: "Express delivery in 24 hours" },
              { icon: LuRotateCcw, title: "24 HOURS RETURN", desc: "100% satisfaction guarantee" },
              { icon: LuShieldCheck, title: "SECURE PAYMENT", desc: "Fully encrypted and certified" },
              { icon: LuHeadphones, title: "SUPPORT 24/7", desc: "Dedicated concierge service" },
            ].map((feature, i) => (
              <div 
                key={i} 
                className="flex items-center gap-4 group hover:scale-[1.03] transition-transform duration-300 cursor-default"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-gray-50 rounded-2xl text-black border border-gray-100 group-hover:bg-black group-hover:text-white transition-colors duration-300 shadow-sm">
                  <feature.icon size={26} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-900 tracking-wider uppercase">{feature.title}</h4>
                  <p className="text-xs text-gray-500 font-medium">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Categories Section (Dynamic API Fetched) */}
        <section className="px-6 md:px-12 py-10 bg-gray-50/70 rounded-3xl border border-gray-100/50 mx-6 md:mx-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight uppercase">
              SHOP FROM <span className="text-[#0284c7]">TOP CATEGORIES</span>
            </h2>
            <span className="text-xs font-bold text-gray-400 bg-white border border-gray-200 px-3 py-1 rounded-full uppercase tracking-wider">
              {isLoadingCategories ? "Loading..." : `${activeCategories.length} Categories`}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
            {isLoadingCategories ? (
              // Categories skeleton
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-3 animate-pulse">
                  <div className="w-24 h-24 rounded-full bg-gray-200" />
                  <div className="h-4 bg-gray-200 rounded w-16" />
                </div>
              ))
            ) : (
              activeCategories.map((cat) => {
                const details = getCategoryDetails(cat.name);
                return (
                  <div 
                    key={cat.id} 
                    onClick={() => navigate(details.path)}
                    className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group"
                  >
                    <div 
                      className={`w-24 h-24 rounded-2xl bg-white shadow-md border border-gray-100 flex flex-col items-center justify-center text-4xl hover:scale-110 active:scale-95 transition-all duration-300 select-none ${details.borderColor}`}
                    >
                      <span className="group-hover:animate-bounce">{details.icon}</span>
                      <span className={`text-[8.5px] font-black uppercase tracking-wider mt-2 px-1.5 py-0.5 rounded-full ${details.accentBg} ${details.accentColor}`}>
                        View All
                      </span>
                    </div>
                    <span className="text-sm font-black text-gray-800 tracking-tight group-hover:text-black transition-colors uppercase">
                      {cat.name}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Deals of the Day (Dynamic API Fetched) */}
        <section className="px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight uppercase">
                ⚡ TODAY'S DEALS OF THE DAY
              </h2>
              <p className="text-xs text-gray-500 font-medium">Specially selected products at unbeatable prices</p>
            </div>
            <div className="flex items-center gap-4 self-end md:self-auto">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-400">Ends in</span>
                <div className="flex items-center gap-1.5">
                  {['12d', '18h', '42m', '05s'].map((t, i) => (
                    <div key={i} className="px-2 py-1 bg-black text-white font-black text-[10px] rounded shadow-sm tracking-wider">
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {isLoadingProducts ? (
            // Premium Skeleton loaders
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-3xl p-4 border border-gray-100 space-y-4 animate-pulse">
                  <div className="aspect-[4/5] bg-gray-100 rounded-2xl"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-100 rounded w-5/6"></div>
                  <div className="h-8 bg-gray-100 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {dealsProducts.map((product) => {
                const discount = product.discount || 0;
                const finalPrice = product.price;
                const originalPrice = discount > 0 ? (finalPrice / (1 - discount / 100)).toFixed(2) : null;
                const details = getCategoryDetails(product.categoryName || 'electronics');

                return (
                  <div 
                    key={product.id} 
                    className="group cursor-pointer bg-white rounded-3xl p-4 border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Badge and Heart */}
                      <div className="relative aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden mb-4 border border-gray-100/50 flex items-center justify-center group-hover:scale-98 transition-transform duration-300">
                        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                          {product.isNew && (
                            <span className="bg-black text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm tracking-wider uppercase">NEW</span>
                          )}
                          {discount > 0 && (
                            <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm tracking-wider uppercase">{discount}% OFF</span>
                          )}
                        </div>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className={`absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-xl bg-white shadow-md border border-gray-100 transition-all duration-300 active:scale-90 ${
                            wishlist[product.id] ? 'text-red-500 bg-red-50/50' : 'text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <LuHeart size={18} fill={wishlist[product.id] ? "currentColor" : "none"} />
                        </button>

                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-white/50">
                            <span className="text-4xl mb-2">{details.icon}</span>
                            <span className="text-[10px] font-black text-gray-300 tracking-wider uppercase max-w-[120px] line-clamp-2">
                              {product.name}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="space-y-1">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${details.accentColor}`}>
                          {product.categoryName || 'General'}
                        </span>
                        <h3 className="font-extrabold text-sm text-gray-800 uppercase leading-tight line-clamp-2 group-hover:text-black transition-colors min-h-[2.5rem]">
                          {product.name}
                        </h3>

                        {/* Stars */}
                        <div className="flex items-center gap-1 text-[#FFC72C] py-1">
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
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-lg font-black text-black">${finalPrice.toFixed(2)}</span>
                        {originalPrice && (
                          <span className="text-[10px] text-gray-400 line-through">${originalPrice}</span>
                        )}
                      </div>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product.name);
                        }}
                        className="bg-black hover:bg-gray-800 text-white rounded-xl p-2.5 shadow-md active:scale-90 transition-all duration-300"
                      >
                        <LuPlus size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Brands Grid Section */}
        <section className="px-6 md:px-12">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-8 tracking-tight uppercase">
            ⚡ SHOP BY BRANDS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {['ZARA', 'D&G', 'H&M', 'CHANEL', 'PRADA', 'BIBA'].map((brand) => (
              <div 
                key={brand} 
                className="aspect-[4/3] bg-white rounded-2xl flex items-center justify-center border border-gray-100 hover:shadow-xl hover:border-gray-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <span className="text-xl font-black text-gray-300 group-hover:text-black transition-colors tracking-tighter uppercase italic">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Promotional Electronics Banners */}
        <section className="px-6 md:px-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight uppercase">
              🔥 HOT <span className="text-[#0284c7]">ELECTRONICS BRANDS</span>
            </h2>
            <button className="px-4 py-1.5 bg-black hover:bg-gray-800 text-white font-bold text-xs rounded-full uppercase tracking-wider shadow-sm transition-colors">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { brand: 'APPLE IPHONE', bg: 'bg-[#18181b]', logo: '', desc: 'Up to 25% Off newest iPhone series', textColor: 'text-white' },
              { brand: 'REALME SMART', bg: 'bg-[#fffbeb]', logo: 'realme', desc: 'Sleek designs starting at $150', textColor: 'text-amber-900', secondaryTextColor: 'text-amber-700/80', badgeBg: 'bg-amber-100 text-amber-800' },
              { brand: 'XIAOMI ECO', bg: 'bg-[#fef2f2]', logo: 'mi', desc: 'Smart smartwatches & home ecosystem', textColor: 'text-red-950', secondaryTextColor: 'text-red-700/80', badgeBg: 'bg-red-100 text-red-800' },
            ].map((b, i) => (
              <div 
                key={i} 
                onClick={() => navigate('/electronics')}
                className={`${b.bg} rounded-3xl h-52 relative overflow-hidden flex flex-col justify-center px-8 cursor-pointer hover:shadow-2xl transition-all duration-300 border border-gray-100/50 group`}
              >
                <div className="absolute top-0 right-0 w-[45%] h-full bg-white/5 rounded-l-[100%] opacity-20 transform translate-x-8 blur-sm pointer-events-none"></div>
                
                <div className={`${b.textColor} space-y-2 max-w-[60%] relative z-10`}>
                  <div className={`w-12 h-12 ${b.badgeBg || 'bg-white/10'} rounded-2xl backdrop-blur-sm flex items-center justify-center font-black text-lg uppercase mb-2 shadow-sm`}>
                    {b.logo}
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-wider">{b.brand}</h3>
                  <p className={`text-xs ${b.secondaryTextColor || 'text-white/70'} font-semibold leading-snug`}>
                    {b.desc}
                  </p>
                </div>

                <div className="absolute right-6 bottom-6 w-24 h-24 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-4xl shadow-xl backdrop-blur-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 select-none">
                  📱
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Frequently Bought Together / Featured Catalog (Dynamic API Fetched) */}
        <section className="px-6 md:px-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight uppercase">
              🌟 EXPLORE OUR ENTIRE CATALOG
            </h2>
            <button 
              onClick={() => navigate('/electronics')}
              className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-full uppercase tracking-wider transition-colors"
            >
              Browse Category
            </button>
          </div>

          {isLoadingProducts ? (
            // Full catalog grid skeleton
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-white rounded-3xl p-4 border border-gray-100 space-y-4 animate-pulse">
                  <div className="aspect-square bg-gray-100 rounded-2xl"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-100 rounded w-5/6"></div>
                  <div className="h-8 bg-gray-100 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {activeProducts.map((product) => {
                const discount = product.discount || 0;
                const finalPrice = product.price;
                const originalPrice = discount > 0 ? (finalPrice / (1 - discount / 100)).toFixed(2) : null;
                const details = getCategoryDetails(product.categoryName || 'electronics');

                return (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-3xl p-4 border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative cursor-pointer"
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="relative aspect-square bg-gray-50 rounded-2xl mb-4 overflow-hidden flex items-center justify-center border border-gray-100 group-hover:scale-98 transition-transform duration-300">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-white/50">
                            <span className="text-3xl mb-1">{details.icon}</span>
                            <span className="text-[9px] font-black text-gray-300 tracking-wider uppercase max-w-[120px] line-clamp-2">
                              {product.name}
                            </span>
                          </div>
                        )}

                        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                          {product.isNew && (
                            <span className="bg-black text-white text-[8px] font-black px-1.5 py-0.5 rounded tracking-wider uppercase">NEW</span>
                          )}
                          {discount > 0 && (
                            <span className="bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded tracking-wider uppercase">{discount}% OFF</span>
                          )}
                        </div>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className={`absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow border border-gray-100 transition-all duration-300 active:scale-90 ${
                            wishlist[product.id] ? 'text-red-500 bg-red-50/50' : 'text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <LuHeart size={16} fill={wishlist[product.id] ? "currentColor" : "none"} />
                        </button>
                      </div>

                      {/* Details */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-[#FFC72C]">
                          {[1, 2, 3, 4, 5].map(s => (
                            <LuStar 
                              key={s} 
                              size={10} 
                              fill={s <= Math.round(product.rating || 4.5) ? "currentColor" : "none"} 
                              stroke="currentColor" 
                            />
                          ))}
                          <span className="text-[10px] text-gray-400 ml-1 font-extrabold">({product.rating || 4.5})</span>
                        </div>
                        <h3 className="text-xs font-extrabold text-gray-800 leading-tight line-clamp-2 uppercase min-h-[2rem] group-hover:text-black transition-colors">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-[10px] text-gray-400 line-clamp-1 font-medium">{product.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col gap-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-black text-black">${finalPrice.toFixed(2)}</span>
                        {originalPrice && (
                          <span className="text-[10px] text-gray-400 line-through">${originalPrice}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2 opacity-90 group-hover:opacity-100 transition-all">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product.name);
                          }}
                          className="flex-1 bg-black hover:bg-gray-800 text-white text-[10px] font-black uppercase py-2.5 rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                        >
                          <LuPlus size={14} /> Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </AppLayout>
  );
};

export default Home;
