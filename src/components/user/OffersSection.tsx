import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { BookCard } from './BookCard';
import {
  Tag,
  Clock,
  Sparkles,
  Copy,
  Check,
  Percent,
  Flame,
  ArrowRight
} from 'lucide-react';

export const OffersSection: React.FC = () => {
  const { offers, coupons, products, applyCoupon, setIsCartOpen } = useStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Countdown timer simulation for flash deals (e.g. 14 hours 28 mins)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 38,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Special offer books
  const discountedBooks = products.filter(p => p.isSpecialOffer || (p.discountPercentage && p.discountPercentage >= 30));

  return (
    <section id="offers-section" className="py-14 bg-gradient-to-b from-rose-50/50 via-white to-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Deal Header with Live Countdown */}
        <div className="bg-gradient-to-r from-rose-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden mb-10">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/30 text-rose-300 text-xs font-bold border border-rose-400/30">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>লিমিটেড টাইম ফ্ল্যাশ ডিল</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                বিশেষ অফার ও কুপন ডিসকাউন্ট
              </h2>
              <p className="text-sm text-slate-300 max-w-xl">
                আজকের কেনাকাটায় সর্বোচ্চ ৬০% পর্যন্ত নগদ ছাড়! চেকআউট করার আগে কুপন কোড ব্যবহার করে অতিরিক্ত ছাড় উপভোগ করুন।
              </p>
            </div>

            {/* Countdown Box */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/20">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 pr-2 border-r border-white/20">
                <Clock className="w-4 h-4" />
                <span>অফারের সময় বাকি:</span>
              </div>

              <div className="flex items-center gap-2 text-center font-mono">
                <div className="bg-slate-900/80 px-2.5 py-1.5 rounded-lg">
                  <span className="text-lg font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[9px] text-slate-400 block -mt-1">ঘণ্টা</span>
                </div>
                <span className="text-white font-bold">:</span>
                <div className="bg-slate-900/80 px-2.5 py-1.5 rounded-lg">
                  <span className="text-lg font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[9px] text-slate-400 block -mt-1">মিনিট</span>
                </div>
                <span className="text-white font-bold">:</span>
                <div className="bg-slate-900/80 px-2.5 py-1.5 rounded-lg">
                  <span className="text-lg font-black text-amber-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[9px] text-slate-400 block -mt-1">সেকেন্ড</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coupons Showcase Grid */}
        <div className="mb-10">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Percent className="w-4 h-4 text-rose-600" />
            <span>সক্রিয় কুপন কোডসমূহ (ক্লিক করে কপি করুন)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-white rounded-2xl border border-rose-200/80 p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex items-center justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded">
                    {coupon.discountType === 'percentage' ? `${coupon.discountValue}% ছাড়` : `৳${coupon.discountValue} ফ্ল্যাট ছাড়`}
                  </span>
                  <h4 className="text-xs font-bold text-slate-800">{coupon.description}</h4>
                  {coupon.minSpend && (
                    <p className="text-[11px] text-slate-400">সর্বনিম্ন অর্ডার: ৳{coupon.minSpend}</p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    {copiedCode === coupon.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>কপিকৃত</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{coupon.code}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Discounted E-Books Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
              সর্বোচ্চ ছাড়ের নির্বাচিত ই-বুক
            </h3>
            <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              {discountedBooks.length} টি বই পাওয়া গেছে
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {discountedBooks.slice(0, 4).map((book) => (
              <BookCard key={book.id} product={book} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
