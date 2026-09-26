import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  BookOpen,
  FileText,
  Calendar,
  Layers,
  Globe,
  Award,
  Video,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Download
} from 'lucide-react';

export const BookDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    setReadingBook,
    addToCart,
    cart,
    wishlist,
    toggleWishlist,
    setShareProduct,
    products,
    reviews,
    updateReview,
    formatPrice,
    setIsCheckoutOpen
  } = useStore();

  const { currentUser, isAuthenticated } = useAuth();
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'video' | 'reviews'>('details');

  if (!selectedProduct) return null;

  const inCart = cart.some(item => item.product.id === selectedProduct.id);
  const inWishlist = wishlist.includes(selectedProduct.id);

  // Reviews for this specific product
  const bookReviews = reviews.filter(r => r.productId === selectedProduct.id && r.status === 'approved');

  // Related products from same category
  const relatedProducts = products
    .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 3);

  const handleBuyNow = () => {
    if (!inCart) {
      addToCart(selectedProduct);
    }
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    await updateReview({
      id: `rev-${Date.now()}`,
      productId: selectedProduct.id,
      productTitle: selectedProduct.title,
      userId: currentUser?.uid || 'guest-user',
      userName: currentUser?.displayName || 'সম্মানিত পাঠক',
      userEmail: currentUser?.email,
      rating: newRating,
      comment: newComment.trim(),
      isVerifiedPurchase: currentUser?.purchasedBooks?.includes(selectedProduct.id) || false,
      status: 'approved',
      isFeatured: false,
      createdAt: new Date().toISOString()
    });

    setNewComment('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-auto sm:my-8 border border-slate-200 overflow-hidden flex flex-col relative max-h-[94vh]">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shadow-sm min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-4 sm:p-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Cover & Quick Actions */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-xs aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 group">
                <img
                  src={selectedProduct.coverImage}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {selectedProduct.discountPercentage && selectedProduct.discountPercentage > 0 ? (
                  <span className="absolute top-3 left-3 bg-rose-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-md uppercase">
                    {selectedProduct.discountPercentage}% মূল্যছাড়
                  </span>
                ) : null}
              </div>

              {/* Sample Reading Launch */}
              <button
                onClick={() => setReadingBook(selectedProduct)}
                className="mt-4 w-full max-w-xs py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-300 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-blue-800" />
                <span>ফ্রি নমুনা পড়ুন (Sample Preview)</span>
              </button>

              {/* Share & Wishlist quick bar */}
              <div className="mt-3 flex items-center justify-center gap-3 w-full max-w-xs">
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-colors ${
                    inWishlist
                      ? 'bg-rose-50 text-rose-600 border-rose-300'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current text-rose-600' : ''}`} />
                  <span>{inWishlist ? 'পছন্দের তালিকায় আছে' : 'উইশলিস্ট'}</span>
                </button>

                <button
                  onClick={() => setShareProduct(selectedProduct)}
                  className="py-2 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 text-blue-700" />
                  <span>শেয়ার</span>
                </button>
              </div>
            </div>

            {/* Right Col: Details, Metadata, Pricing, Actions */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  {selectedProduct.category}
                </span>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 leading-snug">
                  {selectedProduct.title}
                </h2>

                <p className="text-sm text-slate-600 font-medium mt-1">
                  লেখক: <span className="font-bold text-slate-800">{selectedProduct.author}</span>
                </p>

                {/* Ratings and Stats */}
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <div className="flex items-center text-amber-400 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold text-slate-900 ml-1.5">{selectedProduct.rating}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    ({selectedProduct.reviewCount} টি কাস্টমার রিভিউ)
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-semibold text-emerald-700">
                    {selectedProduct.salesCount}+ সফল ডাউনলোড
                  </span>
                </div>

                {/* Price Block */}
                <div className="mt-5 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block mb-0.5">অফার প্রাইস:</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-blue-950">
                        {formatPrice(selectedProduct.discountPrice || selectedProduct.price)}
                      </span>
                      {selectedProduct.discountPrice && (
                        <span className="text-sm text-slate-400 line-through">
                          {formatPrice(selectedProduct.price)}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>তাত্ক্ষণিক ডাউনলোড</span>
                  </span>
                </div>

                {/* Short Description */}
                <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                  {selectedProduct.shortDescription || selectedProduct.description}
                </p>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">ফরম্যাট</span>
                    <span className="text-xs font-bold text-slate-900 mt-0.5 block">{selectedProduct.fileFormat}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">ফাইল সাইজ</span>
                    <span className="text-xs font-bold text-slate-900 mt-0.5 block">{selectedProduct.fileSize}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">মোট পৃষ্ঠা</span>
                    <span className="text-xs font-bold text-slate-900 mt-0.5 block">{selectedProduct.pages} পৃষ্ঠা</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">ভাষা</span>
                    <span className="text-xs font-bold text-slate-900 mt-0.5 block">{selectedProduct.language}</span>
                  </div>
                </div>

              </div>

              {/* CTAs: Add to Cart & Buy Now */}
              <div className="mt-6 pt-5 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  id="btn-detail-add-cart"
                  onClick={() => addToCart(selectedProduct)}
                  className={`py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    inCart
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-900 border-slate-300'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{inCart ? 'কার্টে যুক্ত আছে' : 'কার্টে যোগ করুন'}</span>
                </button>

                <button
                  id="btn-detail-buy-now"
                  onClick={handleBuyNow}
                  className="py-3 px-4 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white rounded-xl text-sm font-extrabold shadow-md transition-all flex items-center justify-center cursor-pointer"
                >
                  এখনই কিনুন (Buy Now)
                </button>
              </div>

            </div>

          </div>

          {/* Tabbed Info: Description, Febspot Video, Customer Reviews */}
          <div className="mt-10 pt-6 border-t border-slate-200">
            
            <div className="flex items-center gap-4 border-b border-slate-200 pb-2">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'details'
                    ? 'border-blue-900 text-blue-900'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                বইয়ের বিবরণ (Description)
              </button>

              {selectedProduct.febspotVideoUrl && (
                <button
                  onClick={() => setActiveTab('video')}
                  className={`pb-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'video'
                      ? 'border-blue-900 text-blue-900'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Video className="w-4 h-4 text-rose-600" />
                  <span>ভিডিও রিভিউ (Febspot)</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-blue-900 text-blue-900'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>পাঠক মতামত ({bookReviews.length})</span>
              </button>
            </div>

            {/* Tab 1: Detailed Description */}
            {activeTab === 'details' && (
              <div className="py-5 space-y-4 text-slate-700 text-sm leading-relaxed">
                <p className="whitespace-pre-line">{selectedProduct.description}</p>
                {selectedProduct.publisher && (
                  <div className="pt-3 text-xs text-slate-500 border-t border-slate-100 flex flex-wrap gap-4">
                    <span>প্রকাশনী: <strong>{selectedProduct.publisher}</strong></span>
                    {selectedProduct.publicationDate && (
                      <span>প্রকাশকাল: <strong>{selectedProduct.publicationDate}</strong></span>
                    )}
                    {selectedProduct.isbn && (
                      <span>ISBN: <strong>{selectedProduct.isbn}</strong></span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Febspot Video Embed Player */}
            {activeTab === 'video' && selectedProduct.febspotVideoUrl && (
              <div className="py-5">
                <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                      <Video className="w-4 h-4" />
                      <span>Febspot Official Video Player</span>
                    </span>
                    <a
                      href={selectedProduct.febspotVideoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-amber-300 hover:underline"
                    >
                      Febspot-এ খুলুন
                    </a>
                  </div>

                  {/* Responsive video container */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                    <div className="text-center p-6 space-y-3">
                      <div className="w-14 h-14 rounded-full bg-rose-600/90 text-white flex items-center justify-center mx-auto shadow-lg">
                        <Video className="w-7 h-7" />
                      </div>
                      <h4 className="font-bold text-white text-base">
                        {selectedProduct.febspotVideoTitle || selectedProduct.title}
                      </h4>
                      <p className="text-xs text-slate-400 max-w-md mx-auto">
                        Febspot-এর মাধ্যমে পরিচালিত প্রমোশনাল ও রিভিউ ভিডিও।
                      </p>
                      <a
                        href={selectedProduct.febspotVideoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition-colors shadow-md"
                      >
                        ভিডিও প্লেয়ার লোড করুন (Febspot)
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Tab 3: Customer Reviews & Submission */}
            {activeTab === 'reviews' && (
              <div className="py-5 space-y-6">
                
                {/* Review List */}
                <div className="space-y-3">
                  {bookReviews.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">এখনও কোনো রিভিউ যুক্ত হয়নি। প্রথম রিভিউটি আপনি দিন!</p>
                  ) : (
                    bookReviews.map(r => (
                      <div key={r.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-900">{r.userName}</span>
                            {r.isVerifiedPurchase && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>ভেরিফাইড ক্রেতা</span>
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-current' : 'text-slate-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-slate-700 mt-2 leading-relaxed">{r.comment}</p>
                        <span className="text-[10px] text-slate-400 block mt-2">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Review Form */}
                <form onSubmit={handleReviewSubmit} className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    আপনার রিভিউ লিখুন
                  </h4>

                  {reviewSuccess && (
                    <div className="p-2.5 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>ধন্যবাদ! আপনার রিভিউটি সফলভাবে প্রকাশিত হয়েছে।</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-600">রেটিং নির্বাচন করুন:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewRating(star)}
                          className="p-1 text-amber-400 focus:outline-none"
                        >
                          <Star className={`w-5 h-5 ${star <= newRating ? 'fill-current' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    placeholder="বইটি সম্পর্কে আপনার অভিজ্ঞতা ও মতামত লিখুন..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    className="w-full p-3 text-xs bg-white border border-slate-300 rounded-xl focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                  />

                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm cursor-pointer"
                  >
                    রিভিউ পোস্ট করুন
                  </button>
                </form>

              </div>
            )}

          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                সম্পর্কিত অন্যান্য বই
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedProducts.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => setSelectedProduct(rel)}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50/50 hover:bg-white transition-all cursor-pointer group"
                  >
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className="w-12 h-16 object-cover rounded-lg shrink-0 shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-700">
                        {rel.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">{rel.author}</p>
                      <span className="text-xs font-extrabold text-blue-900 mt-1 block">
                        {formatPrice(rel.discountPrice || rel.price)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
