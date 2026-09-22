import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Bell, X, ArrowRight, BookOpen } from 'lucide-react';

export const SocialBarAd: React.FC = () => {
  const { adsterra, products, setSelectedProduct } = useStore();
  const [closed, setClosed] = useState(false);
  const [popunderTriggered, setPopunderTriggered] = useState(false);

  // Popunder simulation/handler if enabled
  useEffect(() => {
    if (adsterra.popunderEnabled && !popunderTriggered) {
      const handleFirstClick = () => {
        if (!popunderTriggered) {
          setPopunderTriggered(true);
          console.log('[Adsterra] Popunder event triggered via configured policy');
        }
      };
      window.addEventListener('click', handleFirstClick, { once: true });
      return () => window.removeEventListener('click', handleFirstClick);
    }
  }, [adsterra.popunderEnabled, popunderTriggered]);

  if (!adsterra.socialBarEnabled || closed) {
    return null;
  }

  // Pick a featured or top product for the high-converting notification bar
  const hotBook = products.find(p => p.isSpecialOffer || p.isBestSeller) || products[0];

  return (
    <div
      id="adsterra-social-bar"
      className="fixed bottom-4 left-4 z-40 max-w-sm bg-white border border-blue-200 shadow-2xl rounded-2xl p-3.5 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 transition-all hover:border-blue-400"
    >
      <div className="relative shrink-0">
        {hotBook?.coverImage ? (
          <img
            src={hotBook.coverImage}
            alt={hotBook.title}
            className="w-12 h-16 object-cover rounded-lg shadow-md"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-12 h-16 rounded-lg bg-blue-900 flex items-center justify-center text-white">
            <BookOpen className="w-6 h-6 text-amber-400" />
          </div>
        )}
        <span className="absolute -top-1 -right-1 bg-rose-600 text-white p-0.5 rounded-full ring-2 ring-white">
          <Bell className="w-3 h-3 animate-bounce" />
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 text-[11px] font-bold text-rose-600 uppercase tracking-wider">
          <span>🔥 লিমিটেড টাইম ডিল!</span>
        </div>
        <h5 className="text-xs font-bold text-slate-900 truncate mt-0.5">
          {hotBook ? hotBook.title : 'Drem Shop স্পেশাল অফার'}
        </h5>
        <p className="text-[11px] text-slate-500 truncate">
          {hotBook ? `মাত্র ৳${hotBook.discountPrice || hotBook.price} টাকায় এখনই ডাউনলোড করুন` : '৫০% পর্যন্ত মূল্যছাড় চলছে!'}
        </p>
        <button
          onClick={() => {
            if (hotBook) setSelectedProduct(hotBook);
          }}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-900 mt-1 cursor-pointer"
        >
          <span>বিস্তারিত ও অফার দেখুন</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <button
        onClick={() => setClosed(true)}
        className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 self-start transition-colors"
        aria-label="Close Notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
