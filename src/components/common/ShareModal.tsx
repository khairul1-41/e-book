import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Check, Copy, Share2, Facebook, MessageCircle } from 'lucide-react';

export const ShareModal: React.FC = () => {
  const { shareProduct, setShareProduct } = useStore();
  const [copied, setCopied] = useState(false);

  if (!shareProduct) return null;

  const currentUrl = window.location.origin + window.location.pathname;
  const shareUrl = `${currentUrl}#book=${shareProduct.id}`;
  const shareText = `Check out "${shareProduct.title}" by ${shareProduct.author} on Drem Shop! Special price available.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFacebookShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(fbUrl, '_blank', 'width=600,height=500');
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
    window.open(waUrl, '_blank');
  };

  const handleMessengerShare = () => {
    const msgUrl = `fb-messenger://share/?link=${encodeURIComponent(shareUrl)}&app_id=123456789`;
    window.open(msgUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 relative">
        <button
          onClick={() => setShareProduct(null)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">ই-বুক শেয়ার করুন</h3>
            <p className="text-xs text-slate-500">সোশ্যাল মিডিয়ায় বন্ধুদের সাথে শেয়ার করুন</p>
          </div>
        </div>

        {/* Product Preview Card */}
        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200 mb-6">
          <img
            src={shareProduct.coverImage}
            alt={shareProduct.title}
            className="w-14 h-20 object-cover rounded-lg shadow-sm shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-slate-900 truncate">
              {shareProduct.title}
            </h4>
            <p className="text-xs text-slate-500 truncate mt-0.5">লেখক: {shareProduct.author}</p>
            <p className="text-xs font-bold text-blue-900 mt-1">
              মূল্য: ৳{shareProduct.discountPrice || shareProduct.price}
            </p>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={handleFacebookShare}
            className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] font-semibold text-xs border border-[#1877F2]/20 transition-all cursor-pointer"
          >
            <Facebook className="w-6 h-6 fill-current" />
            <span>Facebook</span>
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-semibold text-xs border border-[#25D366]/20 transition-all cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleMessengerShare}
            className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl bg-[#0084FF]/10 hover:bg-[#0084FF]/20 text-[#0084FF] font-semibold text-xs border border-[#0084FF]/20 transition-all cursor-pointer"
          >
            <MessageCircle className="w-6 h-6" />
            <span>Messenger</span>
          </button>
        </div>

        {/* Copy Link Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            সরাসরি লিংক কপি করুন
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3 py-2 text-xs bg-slate-100 border border-slate-300 rounded-xl text-slate-700 select-all outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>কপি হয়েছে</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>কপি করুন</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
