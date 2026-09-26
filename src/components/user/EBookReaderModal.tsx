import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  BookOpen,
  Download,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Sparkles
} from 'lucide-react';

export const EBookReaderModal: React.FC = () => {
  const { readingBook, setReadingBook, downloadBookFile } = useStore();
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');

  if (!readingBook) return null;

  const chapters = readingBook.sampleChapters || [
    {
      title: 'ভূমিকা ও প্রারম্ভিক অধ্যায়',
      content: readingBook.description
    }
  ];

  const activeChapter = chapters[currentChapterIndex] || chapters[0];

  const fontSizeClass = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-loose'
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF9F5] text-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full h-[94vh] flex flex-col border border-stone-300 overflow-hidden">
        
        {/* Reader Top Bar */}
        <div className="bg-[#F3EFE6] px-3.5 sm:px-6 py-2.5 sm:py-3 border-b border-stone-300 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-amber-300" />
            </div>
            <div className="min-w-0">
              <h3 className="font-extrabold text-xs sm:text-base text-slate-900 truncate">
                {readingBook.title}
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate">
                {readingBook.author} • {readingBook.language}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Font size controls */}
            <div className="hidden sm:flex items-center gap-1 bg-stone-200/80 rounded-lg p-0.5 text-xs font-semibold text-stone-700">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-1 rounded ${fontSize === 'sm' ? 'bg-white shadow-xs' : 'hover:bg-stone-300'}`}
                title="Small text"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-1 rounded ${fontSize === 'base' ? 'bg-white shadow-xs' : 'hover:bg-stone-300'}`}
                title="Normal text"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-1 rounded ${fontSize === 'lg' ? 'bg-white shadow-xs' : 'hover:bg-stone-300'}`}
                title="Large text"
              >
                A+
              </button>
            </div>

            {/* Direct Download Button */}
            <button
              onClick={() => downloadBookFile(readingBook)}
              className="px-2.5 sm:px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer min-h-[36px]"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ফাইল ডাউনলোড</span>
            </button>

            {/* Close */}
            <button
              onClick={() => setReadingBook(null)}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-stone-200 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
              aria-label="Close reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Body / Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-10 max-w-2xl mx-auto w-full font-serif">
          <div className="mb-6 pb-4 border-b border-stone-200 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans">
              নমুনা প্রিভিউ (Sample Preview) • অধ্যায় {currentChapterIndex + 1} / {chapters.length}
            </span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-sans">
              {readingBook.fileFormat} Format
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-6 font-sans">
            {activeChapter.title}
          </h2>

          <div className={`${fontSizeClass} text-stone-800 space-y-4 whitespace-pre-line`}>
            {activeChapter.content}
          </div>

          <div className="mt-12 p-5 bg-stone-100 rounded-xl border border-stone-200 text-center font-sans">
            <Sparkles className="w-6 h-6 text-amber-600 mx-auto mb-2" />
            <h4 className="font-bold text-sm text-stone-900">সম্পূর্ণ বইটি পড়তে চান?</h4>
            <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
              মাত্র কয়েক সেকেন্ডে বিকাশ বা নগদে পেমেন্ট করে সম্পূর্ণ বইটি নিজের ডিভাইসে ডাউনলোড করে নিন।
            </p>
            <button
              onClick={() => downloadBookFile(readingBook)}
              className="mt-3 px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow-sm"
            >
              সম্পূর্ণ ফাইল এখনই সেভ করুন
            </button>
          </div>
        </div>

        {/* Reader Footer Navigation */}
        <div className="bg-[#F3EFE6] px-6 py-3 border-t border-stone-300 flex items-center justify-between">
          <button
            disabled={currentChapterIndex === 0}
            onClick={() => setCurrentChapterIndex(prev => Math.max(0, prev - 1))}
            className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>পূর্ববর্তী পাতা</span>
          </button>

          <span className="text-xs font-medium text-stone-600">
            {currentChapterIndex + 1} / {chapters.length}
          </span>

          <button
            disabled={currentChapterIndex >= chapters.length - 1}
            onClick={() => setCurrentChapterIndex(prev => Math.min(chapters.length - 1, prev + 1))}
            className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <span>পরবর্তী পাতা</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
