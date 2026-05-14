import React from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#000000] text-white pt-16 pb-8">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tighter italic">CAMBO SHOP</h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Your one-stop destination for worldwide Megamart essentials. We bring premium quality products right to your doorstep.
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-all">
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              {['Home', 'Shop All', 'Offers', 'Track Order', 'Store Locator'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-6">Customer Service</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              {['Contact Us', 'FAQs', 'Returns & Exchanges', 'Shipping Policy', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold mb-6">Contact Info</h3>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-blue-500" />
                <span>+1 (234) 567-890</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500" />
                <span>support@uniteddeals.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-500" />
                <span>123 Megamart St, New York, NY 10001</span>
              </div>
            </div>
            <div className="pt-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
                <button className="absolute right-1 top-1 bottom-1 bg-white text-black text-xs font-bold px-5 rounded-full hover:bg-blue-600 hover:text-white transition-all">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-gray-500 font-medium">
          <div>© 2026 UNITED DEALS. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 grayscale opacity-50">
               <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white">Terms of Use</a>
              <a href="#" className="hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
