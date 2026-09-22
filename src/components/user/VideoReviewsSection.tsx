import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Video,
  Play,
  ExternalLink,
  BookOpen,
  Eye,
  CheckCircle2,
  X
} from 'lucide-react';
import { FebspotVideo } from '../../types';

export const VideoReviewsSection: React.FC = () => {
  const { videos, products, setSelectedProduct } = useStore();
  const [activeVideoModal, setActiveVideoModal] = useState<FebspotVideo | null>(null);

  if (!videos || videos.length === 0) return null;

  return (
    <section id="videos-section" className="py-14 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 text-rose-400 text-xs font-bold border border-rose-800/80 mb-2">
              <Video className="w-3.5 h-3.5" />
              <span>Febspot ভিডিও রিভিউ প্ল্যাটফর্ম</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              ই-বুক পরিচিতি ও ভিডিও রিভিউ
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              বই কেনার আগে বিশিষ্ট আলোচকদের পুঙ্খানুপুঙ্খ আলোচনা এবং প্র্যাকটিক্যাল ডেমো ভিডিও দেখে সিদ্ধান্ত নিন।
            </p>
          </div>

          <a
            href="https://www.febspot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
          >
            <span>Febspot চ্যানেল ভিজিট করুন</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid) => {
            const linkedProduct = products.find(p => p.id === vid.relatedProductId);

            return (
              <div
                key={vid.id}
                className="bg-slate-800/90 rounded-2xl border border-slate-700 overflow-hidden shadow-lg hover:border-slate-600 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail Container */}
                  <div
                    onClick={() => setActiveVideoModal(vid)}
                    className="relative aspect-video bg-slate-950 cursor-pointer overflow-hidden"
                  >
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />

                    {/* Play Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors">
                      <div className="w-13 h-13 rounded-full bg-rose-600 group-hover:bg-rose-500 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      </div>
                    </div>

                    {/* Video Duration Badge */}
                    {vid.duration && (
                      <span className="absolute bottom-2.5 right-2.5 bg-slate-950/80 text-white text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold">
                        {vid.duration}
                      </span>
                    )}

                    <span className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                      Febspot Video
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-bold text-sm sm:text-base text-white line-clamp-2 group-hover:text-amber-300 transition-colors">
                      {vid.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {vid.description}
                    </p>
                  </div>
                </div>

                {/* Related E-Book Quick Buy Bar */}
                {linkedProduct && (
                  <div className="px-4 py-3 bg-slate-950/60 border-t border-slate-700/80 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-xs text-slate-300 font-medium truncate">
                        {linkedProduct.title}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedProduct(linkedProduct)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shrink-0 shadow-xs cursor-pointer"
                    >
                      বইটি কিনুন
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-rose-500 uppercase">
                  Febspot Video Player
                </span>
                <h4 className="text-sm font-bold text-white truncate">{activeVideoModal.title}</h4>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embed Frame / Player Container */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {activeVideoModal.embedUrl ? (
                <iframe
                  src={activeVideoModal.embedUrl}
                  title={activeVideoModal.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="text-center p-6 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-rose-600 text-white flex items-center justify-center mx-auto shadow-lg">
                    <Play className="w-7 h-7 fill-current translate-x-0.5" />
                  </div>
                  <h5 className="font-bold text-white text-base">{activeVideoModal.title}</h5>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    ভিডিওটি সরাসরি Febspot সার্ভারে হোস্ট করা আছে। প্লে বাটনে ক্লিক করে চালু করুন:
                  </p>
                  <a
                    href={activeVideoModal.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors"
                  >
                    <span>Febspot প্লেয়ারে ভিডিওটি দেখুন</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 flex items-center justify-between text-xs">
              <p className="text-slate-400 truncate max-w-md">{activeVideoModal.description}</p>
              <a
                href={activeVideoModal.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:underline shrink-0"
              >
                Febspot-এ শেয়ার করুন
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
