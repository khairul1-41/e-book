import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { FebspotVideo } from '../types';
import { Video, Plus, Trash2, Edit2, Play, ExternalLink, X } from 'lucide-react';

export const AdminVideos: React.FC = () => {
  const { videos, products, updateVideo, removeVideo } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState<Partial<FebspotVideo>>({});

  const handleCreate = () => {
    setCurrent({
      id: `vid-${Date.now()}`,
      title: '',
      description: '',
      videoUrl: 'https://www.febspot.com/watch/',
      thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
      relatedProductId: products[0]?.id || '',
      duration: '08:45',
      isActive: true,
      createdAt: new Date().toISOString()
    });
    setIsEditing(true);
  };

  const handleEdit = (v: FebspotVideo) => {
    setCurrent({ ...v });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('আপনি কি এই Febspot ভিডিওটি মুছে ফেলতে চান?')) {
      await removeVideo(id);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!current.title || !current.videoUrl) return;

    await updateVideo(current as FebspotVideo);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">Febspot ভিডিও রিভিউ ম্যানেজমেন্ট</h2>
          <p className="text-xs text-slate-500">
            Febspot প্ল্যাটফর্মের ই-বুক রিভিউ ও ডেমো ভিডিও পরিচালনা করুন (URL: https://www.febspot.com)
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন ভিডিও যুক্ত করুন</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(v => {
          const linkedBook = products.find(p => p.id === v.relatedProductId);

          return (
            <div
              key={v.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video bg-slate-900">
                  <img
                    src={v.thumbnailUrl}
                    alt={v.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 left-2 bg-rose-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                    Febspot
                  </span>
                  {v.duration && (
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                      {v.duration}
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-2">{v.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{v.description}</p>
                  {linkedBook && (
                    <div className="pt-1 text-[11px] text-blue-900 font-semibold truncate">
                      সংযুক্ত বই: {linkedBook.title}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={v.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1"
                >
                  <span>Febspot-এ দেখুন</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(v)}
                    className="p-1.5 text-slate-500 hover:text-blue-900 rounded-lg hover:bg-slate-200"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(v.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-slate-900">Febspot ভিডিও যুক্ত/এডিট</h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ভিডিও শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={current.title || ''}
                  onChange={(e) => setCurrent({ ...current, title: e.target.value })}
                  placeholder="যেমন: ফ্রিল্যান্সিং গাইডলাইন বই রিভিউ ও ডেমো"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Febspot ভিডিও লিঙ্ক *</label>
                <input
                  type="url"
                  required
                  value={current.videoUrl || ''}
                  onChange={(e) => setCurrent({ ...current, videoUrl: e.target.value })}
                  placeholder="https://www.febspot.com/..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">সংশ্লিষ্ট ই-বুক সিলেক্ট করুন</label>
                <select
                  value={current.relatedProductId || ''}
                  onChange={(e) => setCurrent({ ...current, relatedProductId: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none"
                >
                  <option value="">কোনো বই সংযুক্ত নেই</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ভিডিওর দৈর্ঘ্য</label>
                  <input
                    type="text"
                    value={current.duration || '08:30'}
                    onChange={(e) => setCurrent({ ...current, duration: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">থাম্বনেইল URL</label>
                  <input
                    type="url"
                    value={current.thumbnailUrl || ''}
                    onChange={(e) => setCurrent({ ...current, thumbnailUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">সংক্ষিপ্ত বিবরণ</label>
                <textarea
                  rows={2}
                  value={current.description || ''}
                  onChange={(e) => setCurrent({ ...current, description: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none"
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
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow-sm"
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
