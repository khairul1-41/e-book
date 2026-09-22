import React from 'react';
import {
  Download,
  ShieldCheck,
  Zap,
  Headphones,
  Award,
  Lock
} from 'lucide-react';

export const TrustBenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Download,
      title: 'ইনস্ট্যান্ট ডিজিটাল ডাউনলোড',
      desc: 'পেমেন্ট সম্পন্ন হওয়ার সাথে সাথে নিরাপদ PDF/EPUB ফাইল আপনার ডিভাইসে ডাউনলোড করুন।'
    },
    {
      icon: ShieldCheck,
      title: '১০০% অরিজিনাল ও ভেরিফাইড',
      desc: 'প্রতিটি বইয়ের কনটেন্ট সংশ্লিষ্ট লেখক ও প্রকাশকের কপিরাইট লাইসেন্স দ্বারা সুরক্ষিত।'
    },
    {
      icon: Lock,
      title: 'নিরাপদ পেমেন্ট গেটওয়ে',
      desc: 'বিকাশ, নগদ, রকেট এবং কার্ডের মাধ্যমে সম্পূর্ণ এনক্রিপ্টেড পেমেন্ট ট্রানজেকশন।'
    },
    {
      icon: Headphones,
      title: '২৪/৭ কাস্টমার সাপোর্ট',
      desc: 'ডাউনলোড বা পেমেন্ট সংক্রান্ত যেকোনো সমস্যায় হোয়াটসঅ্যাপ ও ফোনে সার্বক্ষণিক সহায়তা।'
    }
  ];

  return (
    <section id="trust-section" className="py-14 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            কেন Drem Shop সেরা?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            ডিজিটাল বই কেনায় আমাদের বিশ্বস্ত সেবাসমূহ
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-colors flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
