import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { Order, PaymentMethod } from '../../types';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Download,
  BookOpen,
  ArrowRight,
  CreditCard,
  Sparkles,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    placeOrder,
    formatPrice,
    downloadBookFile,
    setReadingBook,
    settings
  } = useStore();

  const { currentUser } = useAuth();

  const [customerName, setCustomerName] = useState(currentUser?.displayName || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');
  const [transactionId, setTransactionId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [copiedNumber, setCopiedNumber] = useState(false);

  if (!isCheckoutOpen) return null;

  const paymentAccounts: Record<string, { number: string; type: string; fee: string }> = {
    bkash: { number: '01712-345678', type: 'Personal', fee: '0%' },
    nagad: { number: '01812-345678', type: 'Merchant', fee: '0%' },
    rocket: { number: '01912-345678', type: 'Personal', fee: '0%' },
    card: { number: 'Online Visa/Mastercard Gateway', type: 'Automated', fee: '0%' },
    bank: { number: 'City Bank AC: 1234567890', type: 'Corporate', fee: '0%' },
    sandbox: { number: 'INSTANT-TEST-SIMULATOR', type: 'Demo Instant Activation', fee: 'Free' },
    sandbox_test: { number: 'INSTANT-TEST-SIMULATOR', type: 'Demo Instant Activation', fee: 'Free' },
  };

  const handleCopyNumber = (num: string) => {
    navigator.clipboard.writeText(num.replace(/[^0-9]/g, ''));
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) return;

    setSubmitting(true);

    try {
      const isAutoApproved = paymentMethod === 'sandbox_test' || paymentMethod === 'card';

      const order = await placeOrder({
        userId: currentUser?.uid,
        customerName,
        customerEmail,
        customerPhone,
        items: cart.map(item => ({
          productId: item.product.id,
          title: item.product.title,
          productTitle: item.product.title,
          author: item.product.author,
          price: item.product.discountPrice || item.product.price,
          fileFormat: item.product.fileFormat,
          fileSize: item.product.fileSize,
          coverImage: item.product.coverImage,
          downloadUrl: item.product.fileUrl || item.product.downloadUrl
        })),
        subtotal: cartSubtotal,
        discountAmount: cartDiscount,
        totalAmount: cartTotal,
        total: cartTotal,
        paymentMethod,
        paymentStatus: isAutoApproved ? 'paid' : 'unpaid',
        orderStatus: isAutoApproved ? 'completed' : 'processing',
        transactionId: transactionId || (isAutoApproved ? `TXN-AUTO-${Math.floor(100000 + Math.random() * 900000)}` : 'OFFLINE-MANUAL'),
        couponCode: appliedCoupon?.code
      });

      setCompletedOrder(order);
    } catch (err) {
      console.error('Order checkout error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-auto sm:my-8 border border-slate-200 overflow-hidden flex flex-col relative max-h-[94vh]">
        
        {/* Top Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                {completedOrder ? 'অর্ডার সফলভাবে গৃহীত হয়েছে' : 'নিরাপদ চেকআউট ও পেমেন্ট'}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-500">
                {completedOrder ? 'আপনার ই-বুক ডাউনলোডের জন্য প্রস্তুত' : 'ই-বুক ক্রয়ের তথ্য দিন'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200 transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6">
          
          {completedOrder ? (
            /* Order Completion Screen */
            <div className="space-y-6 text-center">
              
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-black text-slate-900">অভিনন্দন! আপনার অর্ডার সফল হয়েছে</h4>
                <p className="text-xs text-slate-600 mt-1">
                  অর্ডার নম্বর: <strong className="text-blue-900 font-mono text-sm">{completedOrder.orderNumber}</strong>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  একটি কনফার্মেশন ও ডাউনলোড লিংক আপনার ইমেইলে পাঠানো হয়েছে: <strong>{completedOrder.customerEmail}</strong>
                </p>
              </div>

              {/* Instant Download Area */}
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-blue-800" />
                    <span>আপনার অর্ডারের ডিজিটাল ই-বুক ফাইলসমূহ</span>
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    আনলিমিটেড অ্যাক্সেস
                  </span>
                </div>

                <div className="space-y-2">
                  {completedOrder.items.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white rounded-xl border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {item.coverImage && (
                          <img
                            src={item.coverImage}
                            alt={item.productTitle}
                            className="w-10 h-14 object-cover rounded-lg shrink-0"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-slate-900 truncate">
                            {item.productTitle}
                          </h5>
                          <span className="text-[11px] text-slate-500">
                            ফরম্যাট: {item.fileFormat} • {item.fileSize}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const mockProduct = {
                            id: item.productId,
                            title: item.productTitle,
                            author: 'Drem Shop Author',
                            category: 'E-Book',
                            price: item.price,
                            description: 'Full purchased digital copy of ' + item.productTitle,
                            coverImage: item.coverImage || '',
                            fileFormat: item.fileFormat,
                            fileSize: item.fileSize,
                            pages: 150,
                            language: 'বাংলা',
                            downloadUrl: item.downloadUrl,
                            rating: 5,
                            reviewCount: 1,
                            salesCount: 1,
                            isActive: true,
                            createdAt: new Date().toISOString()
                          };
                          downloadBookFile(mockProduct as any);
                        }}
                        className="w-full sm:w-auto py-2.5 px-4 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer shrink-0"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>ডাউনলোড করুন</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  স্টোরে ফিরে যান
                </button>
              </div>

            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* Order Summary Snapshot */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  <span>অর্ডার সামারি ({cart.length} টি বই)</span>
                  <span className="text-blue-900 font-extrabold text-sm">{formatPrice(cartTotal)}</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  {cart.map(c => (
                    <div key={c.product.id} className="flex justify-between truncate">
                      <span className="truncate pr-2">• {c.product.title}</span>
                      <span className="shrink-0 font-semibold">{formatPrice(c.product.discountPrice || c.product.price)}</span>
                    </div>
                  ))}
                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold pt-1 border-t border-slate-200">
                      <span>কুপন ছাড়</span>
                      <span>-{formatPrice(cartDiscount)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  ১. ক্রেতার বিবরণ
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      আপনার পূর্ণ নাম *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: সাকিব আহমেদ"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      মোবাইল নম্বর *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="017XXXXXXXX"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ইমেইল অ্যাড্রেস (যেখানে ই-বুক ফাইল পাঠানো হবে) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="yourname@gmail.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  ২. পেমেন্ট পদ্ধতি নির্বাচন করুন
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'bkash'
                        ? 'border-rose-600 bg-rose-50 text-rose-900 ring-2 ring-rose-200'
                        : 'border-slate-200 hover:border-rose-300 bg-white'
                    }`}
                  >
                    <span className="block font-black text-sm text-[#E2136E]">bKash</span>
                    <span className="text-[10px] text-slate-500">বিকাশ পেমেন্ট</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'nagad'
                        ? 'border-orange-600 bg-orange-50 text-orange-900 ring-2 ring-orange-200'
                        : 'border-slate-200 hover:border-orange-300 bg-white'
                    }`}
                  >
                    <span className="block font-black text-sm text-[#F7921E]">Nagad</span>
                    <span className="text-[10px] text-slate-500">নগদ পেমেন্ট</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('rocket')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'rocket'
                        ? 'border-purple-600 bg-purple-50 text-purple-900 ring-2 ring-purple-200'
                        : 'border-slate-200 hover:border-purple-300 bg-white'
                    }`}
                  >
                    <span className="block font-black text-sm text-[#8C3494]">Rocket</span>
                    <span className="text-[10px] text-slate-500">রকেট পেমেন্ট</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('sandbox_test')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'sandbox_test'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200'
                        : 'border-slate-200 hover:border-emerald-300 bg-white'
                    }`}
                  >
                    <span className="block font-black text-xs text-emerald-800">1-Click Test</span>
                    <span className="text-[10px] text-slate-500">ইনস্ট্যান্ট ট্রায়াল</span>
                  </button>
                </div>

                {/* Instructions Box */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">
                      {paymentMethod === 'sandbox_test' ? 'ইনস্ট্যান্ট প্রিভিউ টেস্ট মোড:' : `${paymentMethod.toUpperCase()} অ্যাকাউন্ট নম্বর:`}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <strong className="font-mono text-slate-900">
                        {paymentAccounts[paymentMethod]?.number || '01712-345678'}
                      </strong>
                      {paymentMethod !== 'sandbox_test' && (
                        <button
                          type="button"
                          onClick={() => handleCopyNumber(paymentAccounts[paymentMethod]?.number || '01712-345678')}
                          className="p-1 text-slate-500 hover:text-slate-800 transition-colors"
                          title="Copy Number"
                        >
                          {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </div>
                  </div>

                  {paymentMethod !== 'sandbox_test' ? (
                    <div>
                      <p className="text-slate-500 text-[11px]">
                        উপরে উল্লিখিত নম্বরে <strong>Send Money</strong> অথবা পেমেন্ট করুন এবং প্রাপ্ত Transaction ID টি নিচের বক্সে লিখুন:
                      </p>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: TRXB10294X"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="mt-2 w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl uppercase font-mono font-bold focus:border-blue-600 outline-none"
                      />
                    </div>
                  ) : (
                    <p className="text-emerald-700 text-[11px]">
                      টেস্ট মোডে কোনো টাকা কাটবে না। ক্লিক করলেই তাৎক্ষণিক অর্ডার সম্পূর্ণ হবে এবং ই-বুক ফাইল ডাউনলোড শুরু হবে।
                    </p>
                  )}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                id="btn-submit-order"
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-950/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <span>প্রসেসিং হচ্ছে...</span>
                ) : (
                  <>
                    <span>{formatPrice(cartTotal)} পরিশোধ করে ই-বুক সংগ্রহ করুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
