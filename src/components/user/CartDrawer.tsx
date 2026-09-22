import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Trash2,
  ArrowRight,
  ShoppingCart,
  Tag,
  CheckCircle2,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    formatPrice,
    setIsCheckoutOpen
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({
      text: res.message,
      isError: !res.success
    });
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="font-bold text-base text-slate-900">
                আপনার শপিং কার্ট ({cart.length})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800 text-base">আপনার কার্ট খালি রয়েছে</h4>
                <p className="text-xs text-slate-500 max-w-xs">
                  পছন্দের ই-বুকটি কার্টে যুক্ত করে এক ক্লিকে সহজ ডাউনলোড সুবিধা গ্রহণ করুন।
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-5 py-2.5 bg-blue-900 text-white font-bold text-xs rounded-xl hover:bg-blue-800 transition-colors"
                >
                  ই-বুক কালেকশন দেখুন
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 transition-colors"
                >
                  <img
                    src={item.product.coverImage}
                    alt={item.product.title}
                    className="w-16 h-22 object-cover rounded-xl shrink-0 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-blue-700 uppercase">
                        {item.product.fileFormat} • {item.product.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate mt-0.5">
                        {item.product.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">{item.product.author}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                      <span className="font-extrabold text-sm text-blue-950">
                        {formatPrice(item.product.discountPrice || item.product.price)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="কার্ট থেকে মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Calculations & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-4">
              
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        কুপন কোড <strong>{appliedCoupon.code}</strong> কার্যকর (-{formatPrice(cartDiscount)})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-900 font-bold hover:underline"
                    >
                      বাতিল
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="কুপন কোড থাকলে লিখুন (যেমন DREM20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:border-blue-600 uppercase font-semibold outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl shrink-0"
                    >
                      প্রয়োগ
                    </button>
                  </form>
                )}

                {couponMessage && (
                  <p className={`text-[11px] mt-1.5 flex items-center gap-1 ${couponMessage.isError ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {couponMessage.isError ? <AlertCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                    <span>{couponMessage.text}</span>
                  </p>
                )}
              </div>

              {/* Summary Calculations */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-3">
                <div className="flex justify-between">
                  <span>সাবটোটাল</span>
                  <span className="font-semibold text-slate-900">{formatPrice(cartSubtotal)}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>কুপন ছাড়</span>
                    <span>-{formatPrice(cartDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-slate-200">
                  <span>সর্বমোট প্রদেয়</span>
                  <span className="text-base text-blue-900">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                id="btn-drawer-checkout"
                onClick={handleProceedToCheckout}
                className="w-full py-3 px-4 bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>অর্ডার সম্পন্ন করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>নিরাপদ বিকাশ/নগদ পেমেন্ট</span>
                </span>
                <button
                  onClick={clearCart}
                  className="hover:text-rose-600 transition-colors"
                >
                  কার্ট খালি করুন
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
