import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ExternalLink, Sparkles } from 'lucide-react';

interface AdBannerProps {
  placement: 'header' | 'homepage' | 'product_page' | 'sidebar' | 'between_products' | 'footer';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ placement, className = '' }) => {
  const { adsterra } = useStore();

  const ad = adsterra.banners?.find(b => b.placement === placement && b.enabled);
  const hasContent = Boolean(ad?.htmlCode?.trim() || ad?.code?.trim() || ad?.imageUrl?.trim());
  if (!ad || !hasContent) return null;

  return (
    <div className={`w-full overflow-hidden flex flex-col items-center justify-center my-4 ${className}`}>
      <div className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mb-1 flex items-center gap-1">
        <span>বিজ্ঞাপন (Sponsored Advertisement)</span>
      </div>

      {ad.htmlCode && ad.htmlCode.trim().length > 0 ? (
        <div
          className="w-full flex justify-center"
          dangerouslySetInnerHTML={{ __html: ad.htmlCode }}
        />
      ) : ad.imageUrl ? (
        <a
          href={ad.targetUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-xl border border-slate-200 shadow-sm max-w-full hover:shadow-md transition-shadow"
        >
          <img
            src={ad.imageUrl}
            alt={ad.title || 'Sponsored Advertisement'}
            className="w-full h-auto object-cover max-h-48 group-hover:scale-[1.01] transition-transform"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-2 right-2 bg-slate-900/80 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
            <ExternalLink className="w-2.5 h-2.5" />
            <span>Ad</span>
          </div>
        </a>
      ) : (ad.code || ad.htmlCode) ? (
        <div
          className="w-full flex justify-center"
          dangerouslySetInnerHTML={{ __html: ad.code || ad.htmlCode || '' }}
        />
      ) : null}
    </div>
  );
};
