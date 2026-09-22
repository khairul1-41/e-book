import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Layers } from 'lucide-react';

export const CategoriesBar: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory, products } = useStore();

  const getBookCount = (catName: string) => {
    if (catName === 'all') return products.length;
    return products.filter(p => p.category === catName).length;
  };

  return (
    <section id="categories-section" className="py-6 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-900" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              বিষয়ভিত্তিক ই-বুক ক্যাটাগরি
            </h2>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            ক্লিক করে নির্দিষ্ট ক্যাটাগরির বই ফিল্টার করুন
          </span>
        </div>

        {/* Categories scrollable pill list */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
                : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            <span>সকল বই (All)</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${selectedCategory === 'all' ? 'bg-blue-800 text-amber-300' : 'bg-slate-100 text-slate-500'}`}>
              {getBookCount('all')}
            </span>
          </button>

          {categories.map((cat) => {
            const count = getBookCount(cat.name);
            const isSelected = selectedCategory === cat.name;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
                    : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                <span>{cat.banglaName}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${isSelected ? 'bg-blue-800 text-amber-300' : 'bg-slate-100 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
