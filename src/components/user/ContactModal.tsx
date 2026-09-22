import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export const ContactModal: React.FC = () => {
  const { isContactOpen, setIsContactOpen, settings } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isContactOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setIsContactOpen(false);
    }, 2500);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hello Drem Shop Support, I need assistance regarding an e-book order.`);
    window.open(`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8 border border-slate-200 overflow-hidden flex flex-col relative max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-900 text-white flex items-center justify-center">
              <Mail className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">যোগাযোগ ও কাস্টমার কেয়ার</h3>
              <p className="text-[11px] text-slate-500">আমরা ২৪ ঘণ্টার মধ্যে সমাধান প্রদান করি</p>
            </div>
          </div>

          <button
            onClick={() => setIsContactOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Quick Connect Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleWhatsApp}
              className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-3 text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-950 block">হোয়াটসঅ্যাপ চ্যাট</span>
                <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">{settings.whatsappNumber}</span>
                <span className="text-[10px] text-emerald-600">তাত্ক্ষণিক মেসেজ পাঠান &rarr;</span>
              </div>
            </button>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-950 block">হটলাইন নম্বর</span>
                <span className="text-[11px] text-blue-700 font-medium block mt-0.5">{settings.contactPhone}</span>
                <span className="text-[10px] text-slate-500">প্রতিদিন সকাল ১০টা - রাত ১০টা</span>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          {sent ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-sm text-emerald-950">আপনার বার্তাটি সফলভাবে পৌঁছেছে!</h4>
              <p className="text-xs text-emerald-700">আমাদের সাপোর্ট টিম দ্রুত আপনার সাথে ইমেইলে যোগাযোগ করবে।</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                সরাসরি মেসেজ পাঠান
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">আপনার নাম *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="সাকিব আহমেদ"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ইমেইল অ্যাড্রেস *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">বিষয় (Subject)</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="যেমন: ই-বুক ডাউনলোড সংক্রান্ত সহায়তা"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">আপনার বার্তা লিখুন *</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="আপনার জিজ্ঞাসা বিস্তারিত লিখুন..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>মেসেজ পাঠান</span>
              </button>
            </form>
          )}

          {/* Office Address */}
          <div className="pt-4 border-t border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800">অফিস ঠিকানা:</strong> {settings.address} | ইমেইল: {settings.contactEmail}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
