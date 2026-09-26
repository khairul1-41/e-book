import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { Header } from '../components/common/Header';
import { AnnouncementBar } from '../components/common/AnnouncementBar';
import { Footer } from '../components/common/Footer';
import { AdBanner } from '../components/common/AdBanner';
import { SocialBarAd } from '../components/common/SocialBarAd';
import { ShareModal } from '../components/common/ShareModal';
import { HeroSection } from '../components/user/HeroSection';
import { CategoriesBar } from '../components/user/CategoriesBar';
import { BookCard } from '../components/user/BookCard';
import { BookDetailModal } from '../components/user/BookDetailModal';
import { EBookReaderModal } from '../components/user/EBookReaderModal';
import { CartDrawer } from '../components/user/CartDrawer';
import { CheckoutModal } from '../components/user/CheckoutModal';
import { UserAccountModal } from '../components/user/UserAccountModal';
import { OffersSection } from '../components/user/OffersSection';
import { VideoReviewsSection } from '../components/user/VideoReviewsSection';
import { ReviewsSection } from '../components/user/ReviewsSection';
import { TrustBenefitsSection } from '../components/user/TrustBenefitsSection';
import { NewsletterSection } from '../components/user/NewsletterSection';
import { LegalModal } from '../components/user/LegalModal';
import { ContactModal } from '../components/user/ContactModal';
import { MobileBottomNav } from '../components/common/MobileBottomNav';
import {
  BookOpen,
  Filter,
  Sparkles,
  Search,
  ArrowUpDown,
  TrendingUp,
  Clock
} from 'lucide-react';

export const UserWebsite: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy
  } = useStore();

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Best sellers list
  const bestSellers = products.filter(p => p.isBestSeller);
  // New arrivals list
  const newArrivals = products.filter(p => p.isNewArrival);

  // Filtered & Sorted main catalog
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory && selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price_low':
        list.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price_high':
        list.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
      default:
        list.sort((a, b) => b.salesCount - a.salesCount);
        break;
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden pb-16 md:pb-0">
      
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Header */}
      <Header onNavigateSection={handleNavigateSection} />

      {/* Adsterra Header Banner */}
      <div className="max-w-7xl mx-auto px-4 w-full">
        <AdBanner placement="header" />
      </div>

      {/* Hero Section */}
      <HeroSection onShopNow={() => handleNavigateSection('ebooks-section')} />

      {/* Categories Bar */}
      <CategoriesBar />

      {/* Section: Best Sellers */}
      <section id="bestsellers-section" className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 mb-2">
                <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                <span>সর্বোচ্চ পঠিত ও জনপ্রিয়</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                বেস্ট সেলিং ই-বুকসমূহ
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                পাঠকদের সর্বাধিক পছন্দের এবং সর্বোচ্চ বিক্রিত সেরা সেরা বইগুলো এক নজরে দেখে নিন।
              </p>
            </div>

            <button
              onClick={() => handleNavigateSection('ebooks-section')}
              className="text-xs font-bold text-blue-900 hover:text-blue-700 self-start sm:self-auto cursor-pointer"
            >
              সব বই দেখুন &rarr;
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.slice(0, 4).map((book) => (
              <BookCard key={book.id} product={book} />
            ))}
          </div>

        </div>
      </section>

      {/* Adsterra Between Products / In-Feed Banner */}
      <div className="max-w-7xl mx-auto px-4 w-full">
        <AdBanner placement="between_products" />
      </div>

      {/* Section: All E-Books Catalog with Filter & Search */}
      <section id="ebooks-section" className="py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                সকল ই-বুক কালেকশন
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {selectedCategory !== 'all' ? `ক্যাটাগরি: "${selectedCategory}"` : 'সব বিষয়ের ই-বুক এক সাথে'} 
                {' • '}{filteredProducts.length} টি বই প্রদর্শিত
              </p>
            </div>

            {/* Filter and Sort Toolbar */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Active Tag */}
              {searchQuery && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-900 text-xs font-semibold rounded-xl">
                  <span>অনুসন্ধান: "{searchQuery}"</span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="hover:text-rose-600 ml-1"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Sorting Select */}
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-500 hidden sm:inline">সাজান:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-semibold text-slate-800 bg-transparent outline-none cursor-pointer"
                >
                  <option value="popular">জনপ্রিয়তা (Popularity)</option>
                  <option value="newest">সর্বশেষ প্রকাশিত (Newest)</option>
                  <option value="rating">সর্বোচ্চ রেটিং (Rating)</option>
                  <option value="price_low">মূল্য: কম থেকে বেশি</option>
                  <option value="price_high">মূল্য: বেশি থেকে কম</option>
                </select>
              </div>
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="pt-8">
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-slate-200 p-8">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">কোনো বই পাওয়া যায়নি</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  অনুগ্রহ করে অন্য কোনো শব্দ দিয়ে অনুসন্ধান করুন অথবা সকল ক্যাটাগরি সিলেক্ট করুন।
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-4 py-2 bg-blue-900 text-white text-xs font-bold rounded-xl hover:bg-blue-800 transition-colors"
                >
                  সব বই পুনরায় দেখুন
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((book) => (
                  <BookCard key={book.id} product={book} />
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Special Offers Section */}
      <OffersSection />

      {/* Section: New Arrivals */}
      <section id="newarrivals-section" className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold mb-2">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>সর্বশেষ সংযোজন</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                নতুন প্রকাশিত ই-বুক
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.slice(0, 4).map((book) => (
              <BookCard key={book.id} product={book} />
            ))}
          </div>

        </div>
      </section>

      {/* Febspot Video Reviews Showcase */}
      <VideoReviewsSection />

      {/* Customer Testimonials & Reviews */}
      <ReviewsSection />

      {/* Trust Benefits */}
      <TrustBenefitsSection />

      {/* Newsletter */}
      <NewsletterSection />

      {/* Adsterra Footer Banner */}
      <div className="max-w-7xl mx-auto px-4 w-full">
        <AdBanner placement="footer" />
      </div>

      {/* Main Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* Interactive Modals & Drawers */}
      <BookDetailModal />
      <EBookReaderModal />
      <CartDrawer />
      <CheckoutModal />
      <UserAccountModal />
      <ShareModal />
      <LegalModal />
      <ContactModal />
      <SocialBarAd />

      {/* Mobile Sticky Thumb Navigation Bar */}
      <MobileBottomNav onNavigateSection={handleNavigateSection} />

    </div>
  );
};
