import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  BookOpen,
  Mail,
  Phone,
  Facebook,
  Youtube,
  ShieldCheck,
  Lock,
  ArrowUpRight
} from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const { settings, setLegalModalType, setIsContactOpen } = useStore();

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-300 pt-8 pb-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-6 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <BookOpen className="w-4 h-4 text-amber-300" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                {settings.siteName}
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed">
              ডিজিটাল ই-বুক মার্কেটপ্লেস ও অনলাইন রিডার। তাৎক্ষণিক ডাউনলোড ও সুরক্ষিত পেমেন্ট সুবিধা।
            </p>

            <div className="flex flex-col gap-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{settings.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{settings.contactEmail}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-md bg-slate-900 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={settings.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-md bg-slate-900 hover:bg-rose-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setIsContactOpen(true)}
                className="w-7 h-7 rounded-md bg-slate-900 hover:bg-emerald-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Contact"
              >
                <Mail className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Col 2: Quick Shop Links */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-3">
              শপ লিংক (Shop)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('ebooks-section')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  সকল ই-বুক ক্যাটালগ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('offers-section')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-rose-400 font-medium"
                >
                  স্পেশাল অফার ও কুপন
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('bestsellers-section')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  বেস্ট সেলিং ই-বুক
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('reviews-section')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  ভিডিও রিভিউ ও রেটিং
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Guidance & Policies */}
          <div>
            <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-3">
              সহায়তা ও পলিসি
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setLegalModalType('download')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>ডাউনলোড নির্দেশিকা</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalModalType('privacy')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  প্রাইভেসি পলিসি
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalModalType('terms')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  ব্যবহারের শর্তাবলী
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalModalType('refund')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  রিফান্ড পলিসি
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  কাস্টমার সাপোর্ট
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Admin Page Preview & Payment Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-white uppercase mb-2">
              এডমিন ও নিরাপত্তা
            </h4>

            {/* Dedicated Admin Page Preview Link */}
            <div>
              <a
                id="link-footer-admin-preview"
                href="#/admin"
                className="inline-flex items-center justify-between w-full px-3 py-2 bg-slate-900 hover:bg-blue-950 text-amber-300 hover:text-amber-200 border border-slate-800 hover:border-blue-700/60 rounded-xl text-xs font-bold transition-all shadow-xs group"
                title="এডমিন কন্ট্রোল প্যানেল প্রিভিউ করুন"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>এডমিন প্যানেল প্রিভিউ</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300 transition-colors" />
              </a>
              <span className="text-[10px] text-slate-500 block mt-1">
                পণ্য, অর্ডার ও বিজ্ঞাপন নিয়ন্ত্রণ প্যানেল (/#/admin)
              </span>
            </div>

            {/* Secure Payment Badges */}
            <div className="pt-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 mb-1.5">
                <Lock className="w-3 h-3" />
                <span>নিরাপদ পেমেন্ট চ্যানেল</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-1.5 py-0.5 bg-rose-950 text-rose-300 font-bold rounded border border-rose-900 text-[9px]">
                  bKash
                </span>
                <span className="px-1.5 py-0.5 bg-orange-950 text-orange-300 font-bold rounded border border-orange-900 text-[9px]">
                  Nagad
                </span>
                <span className="px-1.5 py-0.5 bg-purple-950 text-purple-300 font-bold rounded border border-purple-900 text-[9px]">
                  Rocket
                </span>
                <span className="px-1.5 py-0.5 bg-blue-950 text-blue-300 font-bold rounded border border-blue-900 text-[9px]">
                  Cards
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Ultra-Compact Bottom Row */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            <p>© {new Date().getFullYear()} {settings.siteName}. সর্বস্বত্ব সংরক্ষিত।</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLegalModalType('copyright')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              কপিরাইট ও DMCA
            </button>
            <span>•</span>
            <a
              href="#/admin"
              className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <span>Admin Access</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
