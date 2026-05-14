import React from 'react';
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
  LuPlus
} from "react-icons/lu";

const Home: React.FC = () => {
  return (
    <AppLayout>
      <div className="flex flex-col gap-10 pb-20 bg-[#ffffff]">
        
        {/* Hero Slider Section */}
        <section className="px-6 md:px-12 pt-6">
          <div className="relative aspect-[21/9] w-full bg-gradient-to-r from-[#1a5fbf] to-[#12408c] rounded-3xl overflow-hidden shadow-xl group">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#fca311] rounded-l-[100%] opacity-20 transform translate-x-20"></div>
            <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative h-full flex flex-col justify-center px-16 text-white max-w-2xl">
              <span className="text-lg font-medium mb-2">Best Deal Online on smart watches</span>
              <h1 className="text-6xl font-black mb-4 leading-tight tracking-tight uppercase">
                LATEST NIKE SHOES
              </h1>
              <p className="text-2xl font-bold mb-8">UP TO 80% OFF</p>
              
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${i === 1 ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}></div>
                ))}
              </div>
            </div>

            {/* Slider Navigation */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100">
              <LuChevronLeft size={24} />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100">
              <LuChevronRight size={24} />
            </button>

            {/* Image Placeholder */}
            <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[40%] aspect-square border-2 border-dashed border-white/30 rounded-2xl flex items-center justify-center text-white/50 font-bold italic">
              IMAGE PLACEHOLDER
            </div>
          </div>
        </section>

        {/* Features Bar */}
        <section className="px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-b border-gray-100">
            {[
              { icon: LuTruck, title: "FASTEST DELIVERY", desc: "Delivery in 24/7" },
              { icon: LuRotateCcw, title: "24 HOURS RETURN", desc: "100% money-back guarantee" },
              { icon: LuShieldCheck, title: "SECURE PAYMENT", desc: "Your study details" },
              { icon: LuHeadphones, title: "SUPPORT 24/7", desc: "Easy 30 days return policy" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full text-gray-400">
                  <feature.icon size={24} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800 tracking-wider uppercase">{feature.title}</h4>
                  <p className="text-[11px] text-gray-500 font-medium">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brands Section */}
        <section className="px-6 md:px-12">
          <h2 className="text-xl font-bold text-gray-800 mb-8 tracking-tight uppercase">SHOP BY BRANDS</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {['ZARA', 'D&G', 'H&M', 'CHANEL', 'PRADA', 'BIBA'].map((brand) => (
              <div key={brand} className="aspect-[4/3] bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
                <span className="text-xl font-black text-gray-300 group-hover:text-gray-800 transition-colors tracking-tighter uppercase italic">{brand}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Deals of the Day */}
        <section className="px-6 md:px-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-800 tracking-tight uppercase">TODAY'S DEALS OF THE DAY</h2>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500">Deals ends in</span>
                <div className="flex items-center gap-1">
                  {['16d', '21h', '57m', '23s'].map((t, i) => (
                    <div key={i} className="px-2 py-1 bg-[#ffcc00] text-black font-bold text-xs rounded shadow-sm">
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              <button className="px-4 py-1.5 bg-[#ffcc00] text-black font-bold text-xs rounded uppercase hover:bg-[#e6b800] transition-colors">VIEW ALL</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-4 border border-transparent hover:border-gray-200 transition-all">
                  <div className="absolute top-3 left-3 bg-[#ffcc00] text-black text-[10px] font-bold px-2 py-0.5 rounded">NEW</div>
                  <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold italic border-2 border-dashed border-gray-200 m-4 rounded-xl">
                    PRODUCT IMAGE
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Electronics / Mobile</span>
                  <h3 className="font-bold text-sm text-gray-800 uppercase leading-tight group-hover:text-blue-600 transition-colors">ADIDAS 4DFWD X PARLEY RUNNING SHOES</h3>
                  <button className="w-full mt-4 py-2 bg-[#222222] text-white text-[10px] font-bold uppercase rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2">
                    BUY NOW - $123
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Categories */}
        <section className="px-6 md:px-12 py-10 bg-gray-50/50">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-800 tracking-tight uppercase">SHOP FROM <span className="text-[#ffcc00]">TOP CATEGORIES</span></h2>
            <button className="px-4 py-1.5 bg-[#ffcc00] text-black font-bold text-xs rounded uppercase">VIEW ALL</button>
          </div>
          <div className="flex justify-between gap-4 overflow-x-auto no-scrollbar pb-2">
            {['Mobile', 'Cosmetics', 'Electronics', 'Furniture', 'Watches', 'Decor', 'Accessories'].map((cat) => (
              <div key={cat} className="flex flex-col items-center gap-3 shrink-0">
                <div className="w-24 h-24 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-200 font-bold text-[8px] text-center p-4 hover:scale-110 transition-transform cursor-pointer">
                  CATEGORY IMAGE
                </div>
                <span className="text-xs font-bold text-gray-600 tracking-tight">{cat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Electronics Brands Banners */}
        <section className="px-6 md:px-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-800 tracking-tight uppercase">TOP <span className="text-[#ffcc00]">ELECTRONICS BRANDS</span></h2>
            <button className="px-4 py-1.5 bg-[#ffcc00] text-black font-bold text-xs rounded uppercase">VIEW ALL</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { brand: 'IPHONE', bg: 'bg-[#333333]', logo: 'Apple' },
              { brand: 'REALME', bg: 'bg-[#fff9e6]', logo: 'realme', textColor: 'text-gray-800' },
              { brand: 'XIAOMI', bg: 'bg-[#fff1e6]', logo: 'mi', textColor: 'text-gray-800' },
            ].map((b, i) => (
              <div key={i} className={`${b.bg} rounded-2xl h-48 relative overflow-hidden flex flex-col justify-center px-8 cursor-pointer hover:shadow-lg transition-shadow`}>
                <div className={`${b.textColor || 'text-white'} space-y-2`}>
                   <div className="w-12 h-12 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center font-bold text-xs uppercase mb-2">{b.logo}</div>
                   <h3 className="text-lg font-bold uppercase tracking-wider">{b.brand}</h3>
                   <p className="text-xl font-black uppercase italic">UP TO 80% OFF</p>
                </div>
                <div className="absolute right-4 bottom-4 w-1/2 h-full border-2 border-dashed border-white/20 rounded-xl m-4 flex items-center justify-center text-[8px] font-bold text-white/30 uppercase italic">
                   BRAND IMAGE
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
             <div className="w-8 h-1.5 bg-blue-600 rounded-full"></div>
             {[1, 2, 3, 4, 5].map(i => (
               <div key={i} className="w-2 h-1.5 bg-gray-200 rounded-full"></div>
             ))}
          </div>
        </section>

        {/* Frequently Bought Together */}
        <section className="px-6 md:px-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-800 tracking-tight uppercase">FREQUENTLY BOUGHT TOGETHER</h2>
            <button className="px-4 py-1.5 bg-[#ffcc00] text-black font-bold text-xs rounded uppercase">VIEW ALL</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-0 border-l border-t border-gray-100">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="border-r border-b border-gray-100 p-4 group cursor-pointer hover:shadow-2xl hover:z-10 bg-white transition-all">
                <div className="relative aspect-square bg-gray-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center text-gray-200 text-[10px] font-bold border-2 border-dashed border-gray-100">
                  PRODUCT IMAGE
                  {i % 3 === 0 && <div className="absolute top-2 left-2 bg-[#ffcc00] text-black text-[8px] font-bold px-1.5 py-0.5 rounded">32% OFF</div>}
                  {i % 4 === 0 && <div className="absolute top-2 left-2 bg-[#ff4d4d] text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">HOT</div>}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-[#ffcc00]">
                    {[1, 2, 3, 4, 5].map(s => <LuStar key={s} size={10} fill="currentColor" />)}
                    <span className="text-[10px] text-gray-400 ml-1 font-medium">(4.8)</span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-800 leading-tight line-clamp-2">Xbox Series S - 512GB SSD Console with Wireless Controller</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-black text-blue-600">$442.12</span>
                    <span className="text-[10px] text-gray-400 line-through">$560.00</span>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <button className="flex-1 bg-blue-600 text-white text-[10px] font-bold py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                      <LuPlus size={14} /> ADD TO CART
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all border border-gray-100">
                      <LuHeart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </AppLayout>
  );
};

export default Home;
