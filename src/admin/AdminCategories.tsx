import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Category } from '../types';
import { Plus, Edit2, Trash2, X, Layers } from 'lucide-react';

export const AdminCategories: React.FC = () => {
  const { categories, updateCategory, removeCategory, products } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState<Partial<Category>>({});

  const handleCreate = () => {
    setCurrent({
      id: `cat-${Date.now()}`,
      name: '',
      banglaName: '',
      slug: '',
      description: '',
      order: categories.length + 1,
      isActive: true
    });
    setIsEditing(true);
  };

  const handleEdit = (cat: Category) => {
    setCurrent({ ...cat });
    setIsEditing(true);
  };

  const handleDelete = async (catId: string) => {
    if (window.confirm('আপনি কি এই ক্যাটাগরিটি মুছে ফেলতে চান?')) {
      await removeCategory(catId);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!current.name || !current.banglaName) return;

    const slug = current.slug || current.name.toLowerCase().replace(/\s+/g, '-');
    await updateCategory({
      ...current,
      slug
    } as Category);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">ক্যাটাগরি ম্যানেজমেন্ট</h2>
          <p className="text-xs text-slate-500">বইয়ের ক্যাটাগরি তৈরি, এডিট ও ক্রমানুসার সাজান</p>
        </div>

        <button
          onClick={handleCreate}
          className="px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন ক্যাটাগরি</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const bookCount = products.filter(p => p.category === cat.name).length;

          return (
            <div
              key={cat.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold text-xs">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {bookCount} টি বই
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900">{cat.banglaName}</h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">{cat.name} ({cat.slug})</p>
                {cat.description && (
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">{cat.description}</p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">সিরিয়াল: #{cat.order}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="p-1.5 text-slate-500 hover:text-blue-900 hover:bg-slate-100 rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-slate-900">
                {current.id ? 'ক্যাটাগরি এডিট' : 'নতুন ক্যাটাগরি তৈরি'}
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">বাংলা নাম *</label>
                <input
                  type="text"
                  required
                  value={current.banglaName || ''}
                  onChange={(e) => setCurrent({ ...current, banglaName: e.target.value })}
                  placeholder="যেমন: ফ্রিল্যান্সিং ও ক্যারিয়ার"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">ইংরেজি নাম (English Name) *</label>
                <input
                  type="text"
                  required
                  value={current.name || ''}
                  onChange={(e) => setCurrent({ ...current, name: e.target.value })}
                  placeholder="যেমন: Freelancing"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">বিবরণ (Description)</label>
                <textarea
                  rows={3}
                  value={current.description || ''}
                  onChange={(e) => setCurrent({ ...current, description: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl shadow-sm"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
