import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import {
  BookOpen,
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  Tag,
  Phone,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateSection }) => {
  const {
    settings,
    categories,
    cart,
    wishlist,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setIsCartOpen,
    setIsAccountOpen,
    setIsContactOpen
  } = useStore();

  const { currentUser, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigateSection('ebooks-section');
  };

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-sm transition-all">
      {/* Primary Top Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 sm:h-20 gap-2 sm:gap-6">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="btn-logo-home"
              onClick={() => handleNavClick('hero-section')}
              className="flex items-center gap-2 sm:gap-2.5 group text-left focus:outline-none cursor-pointer py-1"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-blue-950/20 group-hover:scale-105 transition-transform shrink-0">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-extrabold tracking-tight text-slate-900 leading-none">
                  {settings.siteName}
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-blue-700 tracking-wide mt-0.5">
                  ডিজিটাল ই-বুক স্টোর
                </span>
              </div>
            </button>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-2">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <div className="relative flex items-center">
                <input
                  id="input-header-search"
                  type="text"
                  placeholder="বইয়ের নাম, লেখক বা বিষয় দিয়ে খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-24 py-2.5 bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder-slate-400 text-sm rounded-full border border-slate-300/80 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-20 text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  id="btn-header-search-submit"
                  type="submit"
                  className="absolute right-1.5 px-4 py-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-full shadow-sm transition-colors cursor-pointer"
                >
                  খুঁজুন
                </button>
              </div>
            </form>
          </div>

          {/* Action Buttons: Wishlist, Cart, User */}
          <div className="flex items-center gap-1 sm:gap-3">
            
            {/* Wishlist button */}
            <button
              id="btn-header-wishlist"
              onClick={() => setIsAccountOpen(true)}
              className="p-2 sm:p-2.5 rounded-full text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors relative min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
              title="আমার পছন্দের তালিকা"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              id="btn-header-cart"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-900 border border-slate-200/80 transition-all relative group cursor-pointer min-h-[40px]"
              title="শপিং কার্ট"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-blue-900" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-amber-500 text-slate-950 font-extrabold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold text-slate-700">
                কার্ট
              </span>
            </button>

            {/* User Account / Login */}
            <button
              id="btn-header-user-account"
              onClick={() => setIsAccountOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-full bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer min-h-[40px]"
            >
              <User className="w-4 h-4" />
              <span>
                {isAuthenticated ? (currentUser?.displayName?.split(' ')[0] || 'অ্যাকাউন্ট') : 'লগইন'}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl md:hidden min-w-[42px] min-h-[42px] flex items-center justify-center cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Search input bar */}
        <div className="pb-2.5 pt-0.5 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              id="input-mobile-search"
              type="text"
              placeholder="বই বা লেখকের নাম দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-24 py-2 bg-slate-100 text-slate-900 placeholder-slate-400 text-xs rounded-full border border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-16 top-2 text-slate-400 hover:text-slate-600 p-0.5"
                title="Clear"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1 top-1 px-3.5 py-1 bg-blue-900 text-white text-[11px] font-bold rounded-full shadow-xs cursor-pointer"
            >
              খুঁজুন
            </button>
          </form>
        </div>
      </div>

      {/* Desktop Main Navigation Bar */}
      <nav className="hidden md:block bg-slate-50 border-t border-slate-200/70 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <ul className="flex items-center gap-6 text-sm font-medium text-slate-700">
            <li>
              <button
                id="nav-home"
                onClick={() => handleNavClick('hero-section')}
                className="hover:text-blue-900 transition-colors py-1 cursor-pointer font-semibold text-slate-900"
              >
                হোম (Home)
              </button>
            </li>

            {/* Category Dropdown */}
            <li className="relative">
              <button
                id="nav-categories-dropdown"
                onClick={() => setCatDropdownOpen(!catDropdownOpen)}
                onBlur={() => setTimeout(() => setCatDropdownOpen(false), 200)}
                className="flex items-center gap-1 hover:text-blue-900 transition-colors py-1 cursor-pointer"
              >
                <span>ক্যাটাগরি সমূহ</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${catDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {catDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in-50 duration-150">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      handleNavClick('ebooks-section');
                      setCatDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 ${selectedCategory === 'all' ? 'text-blue-900 bg-blue-50/50' : 'text-slate-700'}`}
                  >
                    <span>সব বই (All Categories)</span>
                  </button>
                  <div className="h-px bg-slate-100 my-1" />
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        handleNavClick('ebooks-section');
                        setCatDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${selectedCategory === cat.name ? 'text-blue-900 font-bold bg-blue-50' : 'text-slate-700'}`}
                    >
                      <span>{cat.banglaName}</span>
                      <span className="text-[10px] text-slate-400">{cat.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </li>

            <li>
              <button
                id="nav-ebooks"
                onClick={() => handleNavClick('ebooks-section')}
                className="hover:text-blue-900 transition-colors py-1 cursor-pointer"
              >
                সকল ই-বুক
              </button>
            </li>
            <li>
              <button
                id="nav-offers"
                onClick={() => handleNavClick('offers-section')}
                className="inline-flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-semibold py-1 cursor-pointer"
              >
                <Tag className="w-3.5 h-3.5" />
                <span>স্পেশাল অফার</span>
              </button>
            </li>
            <li>
              <button
                id="nav-bestsellers"
                onClick={() => handleNavClick('bestsellers-section')}
                className="hover:text-blue-900 transition-colors py-1 cursor-pointer"
              >
                বেস্ট সেলার
              </button>
            </li>
            <li>
              <button
                id="nav-newarrivals"
                onClick={() => handleNavClick('newarrivals-section')}
                className="hover:text-blue-900 transition-colors py-1 cursor-pointer"
              >
                নতুন বই
              </button>
            </li>
            <li>
              <button
                id="nav-reviews"
                onClick={() => handleNavClick('reviews-section')}
                className="hover:text-blue-900 transition-colors py-1 cursor-pointer"
              >
                ভিডিও ও রিভিউ
              </button>
            </li>
            <li>
              <button
                id="nav-about"
                onClick={() => handleNavClick('trust-section')}
                className="hover:text-blue-900 transition-colors py-1 cursor-pointer"
              >
                আমাদের সম্পর্কে
              </button>
            </li>
            <li>
              <button
                id="nav-contact"
                onClick={() => setIsContactOpen(true)}
                className="hover:text-blue-900 transition-colors py-1 cursor-pointer"
              >
                যোগাযোগ
              </button>
            </li>
          </ul>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-blue-700" />
              <span>{settings.contactPhone}</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <span>✓ ইনস্ট্যান্ট ডিজিটাল ডাউনলোড</span>
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-lg px-4 pt-2 pb-6 animate-in slide-in-from-top-3">
          <ul className="space-y-2 text-sm font-medium text-slate-700">
            <li>
              <button
                onClick={() => handleNavClick('hero-section')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 font-semibold"
              >
                হোম (Home)
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('ebooks-section')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100"
              >
                সকল ই-বুক (E-Books)
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('offers-section')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-rose-50 text-rose-600 font-semibold flex items-center gap-2"
              >
                <Tag className="w-4 h-4" />
                <span>স্পেশাল অফার ও ডিল</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('bestsellers-section')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100"
              >
                বেস্ট সেলিং ই-বুক
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('newarrivals-section')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100"
              >
                নতুন বই (New Arrivals)
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('reviews-section')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100"
              >
                পাঠকের রিভিউ ও Febspot ভিডিও
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setIsContactOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100"
              >
                যোগাযোগ ও সাপোর্ট
              </button>
            </li>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsAccountOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 bg-blue-900 text-white text-center font-semibold rounded-xl text-xs shadow-sm"
              >
                {isAuthenticated ? 'আমার অ্যাকাউন্ট ও কেনা বই' : 'লগইন বা রেজিস্টার করুন'}
              </button>
            </div>
          </ul>
        </div>
      )}
    </header>
  );
};
