import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Review } from '../types';
import { Star, CheckCircle, XCircle, Trash2, Check, ShieldCheck } from 'lucide-react';

export const AdminReviews: React.FC = () => {
  const { reviews, updateReview, removeReview } = useStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

  const filtered = reviews.filter(r => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  const handleStatus = async (review: Review, status: 'approved' | 'rejected') => {
    await updateReview({ ...review, status });
  };

  const handleToggleFeatured = async (review: Review) => {
    await updateReview({ ...review, isFeatured: !review.isFeatured });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('আপনি কি এই রিভিউটি মুছে ফেলতে চান?')) {
      await removeReview(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">পাঠক রিভিউ ও মডারেশন</h2>
          <p className="text-xs text-slate-500">গ্রাহকের রিভিউ অনুমোদন, ফিচার বা বাতিল করুন</p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none"
          >
            <option value="all">সকল রিভিউ ({reviews.length})</option>
            <option value="approved">অনুমোদিত (Approved)</option>
            <option value="pending">অপেক্ষমান (Pending)</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(r => (
          <div
            key={r.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-current' : 'text-slate-300'}`}
                    />
                  ))}
                </div>
                <span className="font-bold text-slate-900 text-xs">{r.userName}</span>
                {r.isVerifiedPurchase && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                    ভেরিফাইড ক্রেতা
                  </span>
                )}
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  r.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {r.status}
                </span>
              </div>

              <p className="text-xs text-slate-700 italic">"{r.comment}"</p>
              
              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <span>বই: {r.productTitle}</span>
                <span>•</span>
                <span>{new Date(r.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleToggleFeatured(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  r.isFeatured
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {r.isFeatured ? '★ ফিচার্ড অন' : 'ফিচার্ড করুন'}
              </button>

              {r.status !== 'approved' && (
                <button
                  onClick={() => handleStatus(r, 'approved')}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  অনুমোদন
                </button>
              )}

              {r.status !== 'rejected' && (
                <button
                  onClick={() => handleStatus(r, 'rejected')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  রিজেক্ট
                </button>
              )}

              <button
                onClick={() => handleDelete(r.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
