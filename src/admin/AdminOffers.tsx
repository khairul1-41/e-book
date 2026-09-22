import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Coupon } from '../types';
import { Plus, Trash2, Tag, Percent, X, Check } from 'lucide-react';

export const AdminOffers: React.FC = () => {
  const { coupons, updateCoupon, removeCouponItem } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newCoupon, setNewCoupon] = useState<Partial<Coupon>>({
    code: '',
    discountType: 'percentage',
    discountValue: 20,
    minSpend: 200,
    description: '',
    isActive: true,
    expiresAt: '2026-12-31'
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code) return;

    await updateCoupon({
      ...newCoupon,
      id: `cpn-${Date.now()}`,
      code: newCoupon.code.toUpperCase().trim()
    } as Coupon);

    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('আপনি কি এই কুপনটি মুছে ফেলতে চান?')) {
      await removeCouponItem(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">অফার ও কুপন কোড</h2>
          <p className="text-xs text-slate-500">বিশেষ ছাড়, ডিসকাউন্ট কুপন ও ক্যাম্পেইন পরিচালনা করুন</p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন কুপন কোড</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono font-black text-base text-blue-900 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
                  {coupon.code}
                </span>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  {coupon.discountType === 'percentage' ? `${coupon.discountValue}% ছাড়` : `৳${coupon.discountValue} ফ্ল্যাট ছাড়`}
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-800">{coupon.description}</h4>
              <div className="text-[11px] text-slate-500 mt-2 space-y-0.5">
                <p>ন্যূনতম অর্ডার: ৳{coupon.minSpend || 0}</p>
                <p>মেয়াদ শেষ: {coupon.expiresAt}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${coupon.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                {coupon.isActive ? 'সক্রিয় (Active)' : 'নিষ্ক্রিয়'}
              </span>

              <button
                onClick={() => handleDelete(coupon.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-slate-900">নতুন কুপন কোড তৈরি করুন</h3>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">কুপন কোড (যেমন: DREM50) *</label>
                <input
                  type="text"
                  required
                  placeholder="DREM30"
                  value={newCoupon.code || ''}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl uppercase font-mono font-bold focus:border-blue-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ছাড়ের ধরন</label>
                  <select
                    value={newCoupon.discountType}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none"
                  >
                    <option value="percentage">শতাংশ (%)</option>
                    <option value="fixed">টাকা (৳ Fixed)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">মান (Value) *</label>
                  <input
                    type="number"
                    required
                    value={newCoupon.discountValue || 0}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">ন্যূনতম খরচ (Min Spend)</label>
                <input
                  type="number"
                  value={newCoupon.minSpend || 0}
                  onChange={(e) => setNewCoupon({ ...newCoupon, minSpend: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">বিবরণ (Description)</label>
                <input
                  type="text"
                  placeholder="যেমন: সব বইয়ে ৩০% স্পেশাল ফ্ল্যাশ ডিসকাউন্ট"
                  value={newCoupon.description || ''}
                  onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl shadow-sm"
                >
                  কুপন সেভ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
