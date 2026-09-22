import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Send } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <section className="py-14 bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800/50 text-amber-300 text-xs font-bold border border-blue-700/50 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>নতুন বই ও স্পেশাল কুপনের আপডেট</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          আমাদের নিউজলেটারে যুক্ত হোন
        </h2>

        <p className="text-slate-300 text-sm mt-2 max-w-lg mx-auto">
          প্রতি সপ্তাহে নতুন প্রকাশিত বইয়ের তথ্য, বিশেষ ডিসকাউন্ট এবং লেখক সাক্ষাৎকার সরাসরি আপনার ইনবক্সে পেতে সাবস্ক্রাইব করুন।
        </p>

        {subscribed ? (
          <div className="mt-6 p-4 bg-emerald-900/60 border border-emerald-500/60 rounded-2xl max-w-md mx-auto flex items-center justify-center gap-2 text-emerald-200 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>ধন্যবাদ! আপনি সফলভাবে নিউজলেটারে যুক্ত হয়েছেন।</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto flex gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                required
                placeholder="আপনার ইমেইল অ্যাড্রেস লিখুন..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 text-white placeholder-slate-400 text-xs rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>

            <button
              type="submit"
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>সাবস্ক্রাইব</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

      </div>
    </section>
  );
};
