import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { AdsterraConfig, AdBannerUnit } from '../types';
import {
  Megaphone,
  CheckCircle2,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  Save
} from 'lucide-react';

export const AdminAdsterra: React.FC = () => {
  const { adsterraConfig, updateAdsterraConfig } = useStore();
  const [config, setConfig] = useState<AdsterraConfig>({
    popunderEnabled: Boolean(adsterraConfig?.popunderEnabled || adsterraConfig?.popunder?.enabled),
    popunderScript: adsterraConfig?.popunderScript || adsterraConfig?.popunder?.scriptCode || '',
    popunder: {
      enabled: Boolean(adsterraConfig?.popunder?.enabled ?? adsterraConfig?.popunderEnabled),
      scriptCode: adsterraConfig?.popunder?.scriptCode || adsterraConfig?.popunderScript || ''
    },
    socialBarEnabled: Boolean(adsterraConfig?.socialBarEnabled || adsterraConfig?.socialBar?.enabled),
    socialBarScript: adsterraConfig?.socialBarScript || adsterraConfig?.socialBar?.scriptCode || '',
    socialBar: {
      enabled: Boolean(adsterraConfig?.socialBar?.enabled ?? adsterraConfig?.socialBarEnabled),
      scriptCode: adsterraConfig?.socialBar?.scriptCode || adsterraConfig?.socialBarScript || ''
    },
    banners: adsterraConfig?.banners || []
  });
  const [saved, setSaved] = useState(false);

  const handleTogglePopunder = () => {
    const nextState = !config.popunder?.enabled;
    setConfig(prev => ({
      ...prev,
      popunderEnabled: nextState,
      popunder: {
        enabled: nextState,
        scriptCode: prev.popunder?.scriptCode || ''
      }
    }));
  };

  const handleToggleSocialBar = () => {
    const nextState = !config.socialBar?.enabled;
    setConfig(prev => ({
      ...prev,
      socialBarEnabled: nextState,
      socialBar: {
        enabled: nextState,
        scriptCode: prev.socialBar?.scriptCode || ''
      }
    }));
  };

  const handleBannerChange = (index: number, field: keyof AdBannerUnit, value: any) => {
    setConfig(prev => {
      const banners = [...prev.banners];
      banners[index] = { ...banners[index], [field]: value };
      return { ...prev, banners };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAdsterraConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">Adsterra বিজ্ঞাপন নেটওয়ার্ক সেটিংস</h2>
          <p className="text-xs text-slate-500">
            Adsterra Popunder, Social Bar এবং ব্যানার অ্যাড কোড বা স্ক্রিপ্ট ডাইনামিকালি নিয়ন্ত্রণ করুন
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>পরিবর্তন সংরক্ষণ করুন</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Adsterra সেটিংস সফলভাবে আপডেট ও সংরক্ষিত হয়েছে!</span>
        </div>
      )}

      {/* Popunder & Social Bar Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Popunder Ad */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-indigo-600" />
              <div>
                <h3 className="font-bold text-sm text-slate-900">Popunder Ads</h3>
                <span className="text-[11px] text-slate-400">নতুন ট্যাবে স্বয়ংক্রিয় বিজ্ঞাপন প্রদর্শনী</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleTogglePopunder}
              className="text-2xl transition-colors cursor-pointer"
            >
              {config.popunder?.enabled ? (
                <ToggleRight className="w-8 h-8 text-blue-900" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-300" />
              )}
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Adsterra Popunder Script Code
            </label>
            <textarea
              rows={3}
              value={config.popunder?.scriptCode || ''}
              onChange={(e) => {
                const val = e.target.value;
                setConfig(prev => ({
                  ...prev,
                  popunderScript: val,
                  popunder: { enabled: Boolean(prev.popunder?.enabled), scriptCode: val }
                }));
              }}
              placeholder="<script type='text/javascript' src='//your-adsterra-popunder.js'></script>"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] text-slate-800 outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* Social Bar Ad */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <div>
                <h3 className="font-bold text-sm text-slate-900">Social Bar / Push Ads</h3>
                <span className="text-[11px] text-slate-400">স্ক্রিনের নিচে ভাসমান নোটিফিকেশন বার</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleSocialBar}
              className="text-2xl transition-colors cursor-pointer"
            >
              {config.socialBar?.enabled ? (
                <ToggleRight className="w-8 h-8 text-blue-900" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-300" />
              )}
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Social Bar Script Code
            </label>
            <textarea
              rows={3}
              value={config.socialBar?.scriptCode || ''}
              onChange={(e) => {
                const val = e.target.value;
                setConfig(prev => ({
                  ...prev,
                  socialBarScript: val,
                  socialBar: { enabled: Boolean(prev.socialBar?.enabled), scriptCode: val }
                }));
              }}
              placeholder="<script type='text/javascript' src='//your-adsterra-socialbar.js'></script>"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] text-slate-800 outline-none focus:border-blue-600"
            />
          </div>
        </div>

      </div>

      {/* Banner Units Configuration */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-sm sm:text-base text-slate-900">
          ব্যানার বিজ্ঞাপন প্লেসমেন্টসমূহ (Banner Ads Placements)
        </h3>
        <p className="text-xs text-slate-500">
          ওয়েবসাইটের বিভিন্ন স্থানে দেখানো ব্যানারের সাইজ, স্ক্রিপ্ট কোড বা বিকল্প ইমেজ ব্যানার সেট করুন
        </p>

        <div className="space-y-4 pt-2">
          {config.banners.map((banner, idx) => (
            <div
              key={banner.id}
              className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                    {banner.placement}
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    সাইজ: {banner.size}
                  </span>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-xs font-semibold text-slate-700">
                    {banner.enabled ? 'সক্রিয় (Active)' : 'বন্ধ (Disabled)'}
                  </span>
                  <input
                    type="checkbox"
                    checked={banner.enabled}
                    onChange={(e) => handleBannerChange(idx, 'enabled', e.target.checked)}
                    className="rounded text-blue-900"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Adsterra Script বা HTML কোড
                  </label>
                  <textarea
                    rows={2}
                    value={banner.code || banner.htmlCode || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      handleBannerChange(idx, 'code', val);
                      handleBannerChange(idx, 'htmlCode', val);
                    }}
                    placeholder="<!-- Adsterra 728x90 Banner code -->"
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-[11px] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    বিকল্প ব্যানার ইমেজ URL (Fallback / Direct Link)
                  </label>
                  <input
                    type="url"
                    value={banner.imageUrl || ''}
                    onChange={(e) => handleBannerChange(idx, 'imageUrl', e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl outline-none"
                  />
                  <input
                    type="url"
                    value={banner.targetUrl || ''}
                    onChange={(e) => handleBannerChange(idx, 'targetUrl', e.target.value)}
                    placeholder="টার্গেট লিঙ্ক: https://..."
                    className="w-full px-3 py-1.5 mt-1.5 bg-white border border-slate-300 rounded-xl outline-none text-[11px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
