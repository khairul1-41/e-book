import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { EBookProduct } from '../types';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Copy,
  Check,
  Eye,
  FileText,
  Video,
  X,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const {
    products,
    categories,
    updateProduct,
    removeProduct,
    formatPrice
  } = useStore();

  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState<Partial<EBookProduct>>({});

  // Filtered list
  const filtered = products.filter(p => {
    const matchesCat = catFilter === 'all' || p.category === catFilter;
    const matchesSearch = !search.trim() ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCreateNew = () => {
    setEditProduct({
      id: `prod-${Date.now()}`,
      title: '',
      author: '',
      category: categories[0]?.name || 'Freelancing',
      price: 250,
      discountPrice: 150,
      discountPercentage: 40,
      description: '',
      shortDescription: '',
      coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
      fileFormat: 'PDF',
      fileSize: '4.5 MB',
      pages: 180,
      language: 'বাংলা',
      publisher: 'Drem Publications',
      publicationDate: new Date().toISOString().slice(0, 10),
      isbn: '978-984-00-1122-3',
      sampleChapters: [
        {
          title: 'অধ্যায় ১: সূচিপত্র ও ভূমিকা',
          content: 'এই বইয়ের প্রথম অধ্যায়ে মূল দিকনির্দেশনা ও কৌশল আলোচনা করা হয়েছে।'
        }
      ],
      febspotVideoUrl: '',
      rating: 5.0,
      reviewCount: 0,
      salesCount: 0,
      isFeatured: false,
      isBestSeller: false,
      isNewArrival: true,
      isSpecialOffer: false,
      isActive: true,
      createdAt: new Date().toISOString()
    });
    setIsEditing(true);
  };

  const handleEdit = (product: EBookProduct) => {
    setEditProduct({ ...product });
    setIsEditing(true);
  };

  const handleDuplicate = async (product: EBookProduct) => {
    const duplicated: EBookProduct = {
      ...product,
      id: `prod-${Date.now()}`,
      title: `${product.title} (কপি)`,
      salesCount: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString()
    };
    await updateProduct(duplicated);
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই বইটি মুছে ফেলতে চান?')) {
      await removeProduct(productId);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct.title || !editProduct.author) return;

    // Calculate discount percentage if missing
    let discountPct = editProduct.discountPercentage;
    if (editProduct.price && editProduct.discountPrice && editProduct.price > editProduct.discountPrice) {
      discountPct = Math.round(((editProduct.price - editProduct.discountPrice) / editProduct.price) * 100);
    }

    const finalProduct = {
      ...editProduct,
      discountPercentage: discountPct,
      updatedAt: new Date().toISOString()
    } as EBookProduct;

    await updateProduct(finalProduct);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">ই-বুক ক্যাটালগ ম্যানেজমেন্ট</h2>
          <p className="text-xs text-slate-500">বই যোগ, পরিবর্তন, মূল্য নির্ধারণ ও ডাউনলোড ফাইল কনফিগার করুন</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন ই-বুক যুক্ত করুন</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="বইয়ের নাম বা লেখক দিয়ে খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500">ক্যাটাগরি:</span>
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none cursor-pointer"
          >
            <option value="all">সকল ক্যাটাগরি</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>{c.banglaName} ({c.name})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">কভার ও টাইটেল</th>
                <th className="py-3.5 px-4">ক্যাটাগরি</th>
                <th className="py-3.5 px-4">মূল্য ও ছাড়</th>
                <th className="py-3.5 px-4">ফরম্যাট</th>
                <th className="py-3.5 px-4">বিক্রি</th>
                <th className="py-3.5 px-4">ব্যাজসমূহ</th>
                <th className="py-3.5 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map(product => (
                <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.coverImage}
                        alt={product.title}
                        className="w-10 h-14 object-cover rounded-lg shrink-0 shadow-xs"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 max-w-[200px]">
                        <h4 className="font-bold text-slate-900 truncate" title={product.title}>
                          {product.title}
                        </h4>
                        <span className="text-[11px] text-slate-500 truncate block">
                          লেখক: {product.author}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-slate-100 rounded-md font-semibold text-[11px] text-slate-700">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-blue-900 text-sm">
                      {formatPrice(product.discountPrice || product.price)}
                    </div>
                    {product.discountPrice && (
                      <div className="text-[10px] text-slate-400 line-through">
                        {formatPrice(product.price)} (-{product.discountPercentage}%)
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[11px] text-slate-600 font-mono">
                      {product.fileFormat} • {product.fileSize}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">
                    {product.salesCount} বার
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {product.isBestSeller && (
                        <span className="px-1.5 py-0.5 bg-amber-100 text-amber-900 rounded text-[9px] font-bold">
                          Best Seller
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="px-1.5 py-0.5 bg-blue-100 text-blue-900 rounded text-[9px] font-bold">
                          Featured
                        </span>
                      )}
                      {product.isSpecialOffer && (
                        <span className="px-1.5 py-0.5 bg-rose-100 text-rose-900 rounded text-[9px] font-bold">
                          Offer
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleDuplicate(product)}
                        className="p-1.5 text-slate-500 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Duplicate e-book"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-1.5 text-slate-500 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit e-book"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete e-book"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Edit / Add Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full my-8 border border-slate-200 overflow-hidden flex flex-col relative max-h-[92vh]">
            
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-base text-slate-900">
                {editProduct.id ? 'ই-বুক এডিট করুন' : 'নতুন ই-বুক যুক্ত করুন'}
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ই-বুকের শিরোনাম *</label>
                  <input
                    type="text"
                    required
                    value={editProduct.title || ''}
                    onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">লেখক (Author) *</label>
                  <input
                    type="text"
                    required
                    value={editProduct.author || ''}
                    onChange={(e) => setEditProduct({ ...editProduct, author: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={editProduct.category || ''}
                    onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.banglaName} ({c.name})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">রেগুলার প্রাইস (৳)</label>
                  <input
                    type="number"
                    value={editProduct.price || 0}
                    onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ডিসকাউন্ট প্রাইস (৳)</label>
                  <input
                    type="number"
                    value={editProduct.discountPrice || 0}
                    onChange={(e) => setEditProduct({ ...editProduct, discountPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">কভার ছবির URL</label>
                <input
                  type="url"
                  value={editProduct.coverImage || ''}
                  onChange={(e) => setEditProduct({ ...editProduct, coverImage: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">সংক্ষিপ্ত বিবরণ (Short Description)</label>
                <input
                  type="text"
                  value={editProduct.shortDescription || ''}
                  onChange={(e) => setEditProduct({ ...editProduct, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">বিস্তারিত বিবরণ (Full Description)</label>
                <textarea
                  rows={4}
                  value={editProduct.description || ''}
                  onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ফরম্যাট</label>
                  <select
                    value={editProduct.fileFormat || 'PDF'}
                    onChange={(e) => setEditProduct({ ...editProduct, fileFormat: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none"
                  >
                    <option value="PDF">PDF</option>
                    <option value="EPUB">EPUB</option>
                    <option value="PDF + EPUB">PDF + EPUB</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ফাইল সাইজ</label>
                  <input
                    type="text"
                    value={editProduct.fileSize || ''}
                    onChange={(e) => setEditProduct({ ...editProduct, fileSize: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">পৃষ্ঠা সংখ্যা</label>
                  <input
                    type="number"
                    value={editProduct.pages || 0}
                    onChange={(e) => setEditProduct({ ...editProduct, pages: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ভাষা</label>
                  <input
                    type="text"
                    value={editProduct.language || 'বাংলা'}
                    onChange={(e) => setEditProduct({ ...editProduct, language: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Febspot ভিডিও রিভিউ URL (ঐচ্ছিক)</label>
                <input
                  type="url"
                  placeholder="https://www.febspot.com/..."
                  value={editProduct.febspotVideoUrl || ''}
                  onChange={(e) => setEditProduct({ ...editProduct, febspotVideoUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                />
              </div>

              {/* Toggles */}
              <div className="pt-3 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editProduct.isFeatured || false}
                    onChange={(e) => setEditProduct({ ...editProduct, isFeatured: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span className="font-semibold text-slate-800">ফিচার্ড (Featured)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editProduct.isBestSeller || false}
                    onChange={(e) => setEditProduct({ ...editProduct, isBestSeller: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span className="font-semibold text-slate-800">বেস্ট সেলার</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editProduct.isSpecialOffer || false}
                    onChange={(e) => setEditProduct({ ...editProduct, isSpecialOffer: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span className="font-semibold text-slate-800">স্পেশাল অফার</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editProduct.isActive !== false}
                    onChange={(e) => setEditProduct({ ...editProduct, isActive: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span className="font-semibold text-slate-800">সক্রিয় (Active)</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl shadow-sm"
                >
                  সংরক্ষণ করুন (Save)
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
