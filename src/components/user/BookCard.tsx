import React from 'react';
import { EBookProduct } from '../../types';
import { useStore } from '../../context/StoreContext';
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Share2,
  FileText,
  Check
} from 'lucide-react';

interface BookCardProps {
  product: EBookProduct;
  onQuickView?: (product: EBookProduct) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ product, onQuickView }) => {
  const {
    addToCart,
    cart,
    wishlist,
    toggleWishlist,
    setSelectedProduct,
    setShareProduct,
    formatPrice,
    setIsCheckoutOpen
  } = useStore();

  const inCart = cart.some(item => item.product.id === product.id);
  const inWishlist = wishlist.includes(product.id);

  const handleCardClick = () => {
    if (onQuickView) {
      onQuickView(product);
    } else {
      setSelectedProduct(product);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!inCart) {
      addToCart(product);
    }
    setIsCheckoutOpen(true);
  };

  return (
    <div
      id={`book-card-${product.id}`}
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Top Media Container */}
      <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
        <img
          src={product.coverImage}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Badges: Discount & Status */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.discountPercentage && product.discountPercentage > 0 ? (
            <span className="bg-rose-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wider">
              {product.discountPercentage}% ছাড়
            </span>
          ) : null}

          {product.isBestSeller && (
            <span className="bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded-md shadow-sm uppercase">
              বেস্ট সেলার
            </span>
          )}

          {product.isNewArrival && (
            <span className="bg-blue-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-md shadow-sm uppercase">
              নতুন
            </span>
          )}
        </div>

        {/* Format Badge */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className="bg-slate-950/75 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
            <FileText className="w-2.5 h-2.5 text-amber-400" />
            <span>{product.fileFormat}</span>
          </span>
        </div>

        {/* Floating Quick Action Buttons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-full backdrop-blur-xs shadow-md transition-colors ${
              inWishlist
                ? 'bg-rose-600 text-white'
                : 'bg-white/90 text-slate-700 hover:text-rose-600 hover:bg-white'
            }`}
            title="পছন্দের তালিকায় যুক্ত করুন"
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current' : ''}`} />
          </button>

          {/* Share */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShareProduct(product);
            }}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 backdrop-blur-xs shadow-md transition-colors"
            title="শেয়ার করুন"
            aria-label="Share"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          {/* Quick Preview */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 backdrop-blur-xs shadow-md transition-colors"
            title="বিস্তারিত দেখুন"
            aria-label="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Category */}
          <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block mb-1">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-blue-900 transition-colors">
            {product.title}
          </h3>

          {/* Author */}
          <p className="text-xs text-slate-500 font-medium mt-1 truncate">
            লেখক: {product.author}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-slate-800">{product.rating}</span>
            <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
            <span className="text-slate-300 text-xs">•</span>
            <span className="text-[11px] text-emerald-700 font-medium">{product.salesCount} বার বিক্রীত</span>
          </div>
        </div>

        {/* Pricing and Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-extrabold text-blue-950">
                {formatPrice(product.discountPrice || product.price)}
              </span>
              {product.discountPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-500">
              {product.pages} পৃষ্ঠা
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              id={`btn-cart-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className={`py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                inCart
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-900 border border-slate-200'
              }`}
            >
              {inCart ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>কার্টে আছে</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>কার্টে নিন</span>
                </>
              )}
            </button>

            <button
              id={`btn-buynow-${product.id}`}
              onClick={handleBuyNow}
              className="py-2 px-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center cursor-pointer"
            >
              এখনই কিনুন
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
