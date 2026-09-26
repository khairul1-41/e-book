import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import {
  Home,
  BookOpen,
  Search,
  ShoppingCart,
  User,
  Heart
} from 'lucide-react';

interface MobileBottomNavProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onNavigateSection }) => {
  const {
    cart,
    wishlist,
    setIsCartOpen,
    setIsAccountOpen,
    setSelectedCategory
  } = useStore();

  const { isAuthenticated, currentUser } = useAuth();
  const cartCount = cart.length;

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onNavigateSection) {
      onNavigateSection('hero-section');
    }
  };

  const handleCategoriesClick = () => {
    const el = document.getElementById('categories-section') || document.getElementById('ebooks-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchClick = () => {
    const searchInput = document.getElementById('input-mobile-search') || document.getElementById('input-header-search');
    if (searchInput) {
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      searchInput.focus();
    } else {
      const ebooksEl = document.getElementById('ebooks-section');
      if (ebooksEl) {
        ebooksEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      id="mobile-bottom-navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-2 py-1.5 safe-area-pb"
    >
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
        
        {/* 1. Home */}
        <button
          id="btn-bottom-nav-home"
          onClick={handleHomeClick}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-600 hover:text-blue-900 active:scale-95 transition-all cursor-pointer min-h-[44px]"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1 tracking-tight">হোম</span>
        </button>

        {/* 2. Categories */}
        <button
          id="btn-bottom-nav-categories"
          onClick={handleCategoriesClick}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-600 hover:text-blue-900 active:scale-95 transition-all cursor-pointer min-h-[44px]"
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1 tracking-tight">ক্যাটাগরি</span>
        </button>

        {/* 3. Search */}
        <button
          id="btn-bottom-nav-search"
          onClick={handleSearchClick}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-600 hover:text-blue-900 active:scale-95 transition-all cursor-pointer min-h-[44px]"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1 tracking-tight">অনুসন্ধান</span>
        </button>

        {/* 4. Cart with Badge */}
        <button
          id="btn-bottom-nav-cart"
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-600 hover:text-blue-900 active:scale-95 transition-all cursor-pointer relative min-h-[44px]"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 text-blue-900" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2.5 bg-amber-500 text-slate-950 font-black text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-1 tracking-tight text-blue-950">কার্ট</span>
        </button>

        {/* 5. User Account / Purchased Books */}
        <button
          id="btn-bottom-nav-account"
          onClick={() => setIsAccountOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-600 hover:text-blue-900 active:scale-95 transition-all cursor-pointer relative min-h-[44px]"
        >
          <div className="relative">
            <User className="w-5 h-5" />
            {wishlist.length > 0 && !isAuthenticated && (
              <span className="absolute -top-1 -right-1.5 bg-rose-500 text-white font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-1 tracking-tight truncate max-w-[56px]">
            {isAuthenticated ? 'আমার বই' : 'প্রোফাইল'}
          </span>
        </button>

      </div>
    </div>
  );
};
