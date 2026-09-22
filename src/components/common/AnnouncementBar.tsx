import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, X, ArrowRight } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { settings } = useStore();
  const [dismissed, setDismissed] = useState(false);

  if (!settings.announcementBar?.enabled || dismissed) {
    return null;
  }

  return (
    <div id="announcement-bar" className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs sm:text-sm py-2 px-4 shadow-sm border-b border-blue-800/40 relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center justify-center gap-2 text-center flex-wrap">
          {settings.announcementBar.badge && (
            <span className="bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wider inline-flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3 text-slate-950" />
              {settings.announcementBar.badge}
            </span>
          )}
          <span className="text-slate-100 font-medium">
            {settings.announcementBar.text}
          </span>
          {settings.announcementBar.link && (
            <a
              href={settings.announcementBar.link}
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2 ml-1"
            >
              <span>অফার দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
        <button
          id="btn-dismiss-announcement"
          onClick={() => setDismissed(true)}
          className="text-slate-300 hover:text-white p-1 rounded-md transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
