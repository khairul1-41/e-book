import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SiteSettings } from '../types';
import { exportFullWebsiteZip } from './zipExportService';
import {
  Settings,
  Save,
  CheckCircle2,
  Download,
  FileCode,
  Globe,
  Phone,
  Mail,
  Share2,
  AlertTriangle,
  FolderArchive
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useStore();
  const [formData, setFormData] = useState<SiteSettings>({ ...settings });
  const [saved, setSaved] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportDone, setExportDone] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleZipDownload = async () => {
    try {
      setIsExporting(true);
      await exportFullWebsiteZip();
      setExportDone(true);
      setTimeout(() => setExportDone(false), 5000);
    } catch (err) {
      console.error('Failed to export ZIP:', err);
      alert('ZIP তৈরিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">ওয়েবসাইট ও সিস্টেম সেটিংস</h2>
          <p className="text-xs text-slate-500">
            সাইটের নাম, যোগাযোগ নম্বর, সোশ্যাল মিডিয়া, নোটিশ বার এবং কোড এক্সপোর্ট
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>সেটিংস সেভ করুন</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>সাইটের সেটিংস সফলভাবে আপডেট ও সংরক্ষিত হয়েছে!</span>
        </div>
      )}

      {/* ZIP Export Highlight Card */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-blue-900/50 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
              <FolderArchive className="w-4 h-4 text-amber-300" />
              <span>Full Website Code Export (Production ZIP)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              সম্পূর্ণ ওয়েবসাইট কোড ফাইলস ZIP হিসেবে ডাউনলোড করুন
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              এক ক্লিকে Drem Shop-এর সম্পূর্ণ রিঅ্যাক্ট সোর্স ফাইল, পেজেস, কম্পোনেন্টস, ফায়ারবেস কনফিগ, Netlify ফাইলস এবং বিস্তারিত ডিপ্লয়মেন্ট নির্দেশনাসহ ক্লিন ZIP ফাইল তৈরি করে ডাউনলোড করুন।
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-center gap-2">
            <button
              onClick={handleZipDownload}
              disabled={isExporting}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-amber-500/20 flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>ZIP ফাইল প্রস্তুত হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Download Full Website Code (ZIP)</span>
                </>
              )}
            </button>

            {exportDone && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ZIP ফাইল সফলভাবে ডাউনলোড হয়েছে!</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* General Identity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-sm sm:text-base text-slate-900 border-b border-slate-100 pb-2">
            ১. সাধারণ ব্র্যান্ডিং ও বিবরণ (General Branding)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">ওয়েবসাইটের নাম (Site Title)</label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">ট্যাগলাইন (Tagline)</label>
              <input
                type="text"
                value={formData.siteTagline}
                onChange={(e) => setFormData({ ...formData, siteTagline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 outline-none"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-slate-700 mb-1">অ্যানাউন্সমেন্ট বার মেসেজ</label>
            <input
              type="text"
              value={formData.announcementBarText}
              onChange={(e) => setFormData({ ...formData, announcementBarText: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 outline-none"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={formData.announcementBarEnabled}
                onChange={(e) => setFormData({ ...formData, announcementBarEnabled: e.target.checked })}
                className="rounded text-blue-900"
              />
              <span className="font-semibold text-slate-700">অ্যানাউন্সমেন্ট বার চালু রাখুন</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={formData.maintenanceMode}
                onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
                className="rounded text-rose-600"
              />
              <span className="font-semibold text-rose-700">মেইনটেন্যান্স মোড (Maintenance Mode)</span>
            </label>
          </div>
        </div>

        {/* Contact & Support */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-sm sm:text-base text-slate-900 border-b border-slate-100 pb-2">
            ২. কাস্টমার সাপোর্ট ও যোগাযোগের তথ্য
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">হোয়াটসঅ্যাপ নম্বর (WhatsApp)</label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">হটলাইন ফোন নম্বর</label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">অফিসিয়াল সাপোর্ট ইমেইল</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-slate-700 mb-1">অফিস ঠিকানা</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-sm sm:text-base text-slate-900 border-b border-slate-100 pb-2">
            ৩. সোশ্যাল মিডিয়া ও ভিডিও লিঙ্ক
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">ফেসবুক পেজ URL</label>
              <input
                type="url"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Febspot চ্যানেল URL</label>
              <input
                type="url"
                value={formData.febspotChannelUrl}
                onChange={(e) => setFormData({ ...formData, febspotChannelUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">ইউটিউব চ্যানেল URL</label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>
          </div>
        </div>

      </form>

    </div>
  );
};
