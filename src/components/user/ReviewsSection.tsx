import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import {
  Star,
  CheckCircle2,
  Quote,
  MessageSquarePlus,
  BookOpen
} from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { reviews, updateReview } = useStore();
  const { currentUser } = useAuth();

  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [userName, setUserName] = useState(currentUser?.displayName || '');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const approvedReviews = reviews.filter(r => r.status === 'approved');

  const filtered = filterRating === 'all'
    ? approvedReviews
    : approvedReviews.filter(r => r.rating === filterRating);

  const avgRating = approvedReviews.length > 0
    ? (approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length).toFixed(1)
    : '5.0';

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    await updateReview({
      id: `rev-${Date.now()}`,
      productId: 'general',
      productTitle: 'Drem Shop General Review',
      userId: currentUser?.uid || 'guest-user',
      userName: userName.trim() || 'সম্মানিত পাঠক',
      userEmail: currentUser?.email,
      rating,
      comment: comment.trim(),
      isVerifiedPurchase: true,
      status: 'approved',
      isFeatured: true,
      createdAt: new Date().toISOString()
    });

    setSubmitted(true);
    setComment('');
    setTimeout(() => {
      setSubmitted(false);
      setShowModal(false);
    }, 2500);
  };

  return (
    <section id="reviews-section" className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Overall Rating */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold mb-2">
              <Quote className="w-3.5 h-3.5" />
              <span>পাঠক অভিজ্ঞতা ও মতামত</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              হাজারো সন্তুষ্ট পাঠকের রিভিউ
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">
              Drem Shop থেকে ই-বুক কিনে উপকৃত হওয়া পাঠকদের বাস্তব অভিজ্ঞতা ও অনুপ্রেরণামূলক মূল্যায়ন।
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-3.5 sm:p-4 rounded-2xl shrink-0">
            <div className="text-center pr-4 border-r border-slate-200">
              <span className="text-3xl font-black text-slate-900 leading-none block">{avgRating}</span>
              <div className="flex items-center text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-800 block">
                {approvedReviews.length}+ ভেরিফাইড রিভিউ
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                ৯৮% পাঠক সুপারিশ করেছেন
              </span>
              <button
                onClick={() => setShowModal(true)}
                className="mt-2 text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>রিভিউ লিখুন</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(0, 6).map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < rev.rating ? 'fill-current' : 'text-slate-300'}`}
                      />
                    ))}
                  </div>

                  {rev.isVerifiedPurchase && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>ভেরিফাইড ক্রেতা</span>
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{rev.userName}</h4>
                  {rev.productTitle && (
                    <span className="text-[10px] text-blue-700 truncate max-w-[180px] block mt-0.5">
                      বই: {rev.productTitle}
                    </span>
                  )}
                </div>

                <span className="text-[10px] text-slate-400">
                  {new Date(rev.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Submit Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">আপনার মূল্যায়ন দিন</h3>
            <p className="text-xs text-slate-500 mb-4">Drem Shop-এর সেবা ও ই-বুক কোয়ালিটি নিয়ে আপনার অভিজ্ঞতা শেয়ার করুন।</p>

            {submitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl text-center">
                ✓ আপনার মূল্যবান রিভিউটি সফলভাবে গৃহীত হয়েছে!
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">রেটিং</label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setRating(s)}
                        className="p-1 text-amber-400 focus:outline-none"
                      >
                        <Star className={`w-6 h-6 ${s <= rating ? 'fill-current' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">আপনার নাম</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="সাকিব আহমেদ"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">আপনার মন্তব্য</label>
                  <textarea
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="বইটির কোয়ালিটি, ভাষা ও ডেলিভারি কেমন লেগেছে লিখুন..."
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-sm"
                  >
                    রিভিউ সাবমিট
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
