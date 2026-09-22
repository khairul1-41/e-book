import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Download,
  BookOpen,
  FileCheck2,
  Tag
} from 'lucide-react';

interface HeroSectionProps {
  onShopNow: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopNow }) => {
  const { products, setSelectedProduct, formatPrice } = useStore();

  // Pick top featured bestseller book for the hero spotlight
  const featuredBook = products.find(p => p.isFeatured && p.isBestSeller) || products[0];

  return (
    <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white pt-10 pb-16 lg:py-20">
      
      {/* Decorative subtle ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & High-converting CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-700/60 text-amber-300 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>বাংলাদেশের নির্ভরযোগ্য ডিজিটাল ই-বুক স্টোর</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              জ্ঞান ও দক্ষতার নতুন দিগন্ত — <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                সেরা ই-বুক সংগ্রহে রাখুন
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              ফ্রিল্যান্সিং, প্রোগ্রামিং, ক্যারিয়ার ডেভেলপমেন্ট এবং আত্মউন্নয়নের প্র্যাকটিক্যাল ই-বুক কিনুন এক ক্লিকে। পেমেন্ট সম্পন্ন হলেই সাথে সাথে নিরাপদ PDF ও EPUB ডাউনলোড!
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="btn-hero-shop-now"
                onClick={onShopNow}
                className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>বইগুলো দেখুন (Shop Now)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {featuredBook && (
                <button
                  id="btn-hero-view-featured"
                  onClick={() => setSelectedProduct(featuredBook)}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base rounded-xl border border-white/20 backdrop-blur-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-amber-300" />
                  <span>ফিচার্ড বইয়ের বিস্তারিত</span>
                </button>
              )}
            </div>

            {/* Trust Badges Row */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-amber-400 shrink-0">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-none">ইনস্ট্যান্ট</div>
                  <div className="text-[11px] text-slate-400">ডাউনলোড অ্যাক্সেস</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-none">১০০% ভেরিফাইড</div>
                  <div className="text-[11px] text-slate-400">অরিজিনাল কনটেন্ট</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-900/60 flex items-center justify-center text-yellow-400 shrink-0">
                  <Star className="w-4 h-4 fill-yellow-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-none">৪.৯/৫ স্টার</div>
                  <div className="text-[11px] text-slate-400">পাঠক সন্তুষ্টি</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Featured Spotlight Card */}
          {featuredBook && (
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-xs sm:max-w-sm w-full">
                
                {/* Glow ring */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-amber-500 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-500" />

                <div className="relative bg-slate-900 border border-slate-700/80 rounded-2xl p-5 shadow-2xl flex flex-col">
                  
                  {/* Spotlight Header Badges */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="px-2.5 py-1 bg-amber-400 text-slate-950 font-bold text-[11px] rounded-lg tracking-wide uppercase flex items-center gap-1">
                      <Tag className="w-3 h-3 text-slate-950" />
                      <span>{featuredBook.discountPercentage}% মূল্যছাড়</span>
                    </span>
                    <span className="text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <FileCheck2 className="w-3 h-3" />
                      <span>{featuredBook.fileFormat} • {featuredBook.fileSize}</span>
                    </span>
                  </div>

                  {/* Book Image */}
                  <div
                    onClick={() => setSelectedProduct(featuredBook)}
                    className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-inner cursor-pointer"
                  >
                    <img
                      src={featuredBook.coverImage}
                      alt={featuredBook.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                      <div>
                        <div className="text-amber-300 text-xs font-semibold">{featuredBook.category}</div>
                        <h4 className="text-white text-base font-bold line-clamp-2">{featuredBook.title}</h4>
                      </div>
                    </div>
                  </div>

                  {/* Card Meta & Action */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-amber-400">
                          {formatPrice(featuredBook.discountPrice || featuredBook.price)}
                        </span>
                        {featuredBook.discountPrice && (
                          <span className="text-sm text-slate-500 line-through">
                            {formatPrice(featuredBook.price)}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">লেখক: {featuredBook.author}</div>
                    </div>

                    <button
                      id="btn-hero-featured-quickview"
                      onClick={() => setSelectedProduct(featuredBook)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors shadow-md"
                    >
                      বিস্তারিত দেখুন
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
