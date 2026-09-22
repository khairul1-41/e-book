import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, ShieldCheck, FileText, RefreshCw, Download, Copyright } from 'lucide-react';

export const LegalModal: React.FC = () => {
  const { legalModalType, setLegalModalType, settings } = useStore();

  if (!legalModalType) return null;

  const titles = {
    privacy: 'Privacy Policy (গোপনীয়তা নীতি)',
    terms: 'Terms & Conditions (ব্যবহারের শর্তাবলী)',
    refund: 'Refund Policy (রিফান্ড নীতি)',
    download: 'E-Book Download Policy (ই-বুক ডাউনলোড নির্দেশিকা)',
    copyright: 'Copyright & Licensing (কপিরাইট ও স্বত্বাধিকার)'
  };

  const icons = {
    privacy: ShieldCheck,
    terms: FileText,
    refund: RefreshCw,
    download: Download,
    copyright: Copyright
  };

  const Icon = icons[legalModalType];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8 border border-slate-200 overflow-hidden flex flex-col relative max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-900 text-white flex items-center justify-center">
              <Icon className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">{titles[legalModalType]}</h3>
              <p className="text-[11px] text-slate-500">{settings.siteName} অফিসিয়াল নীতিমালা</p>
            </div>
          </div>

          <button
            onClick={() => setLegalModalType(null)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
          {legalModalType === 'privacy' && (
            <>
              <p>
                <strong>{settings.siteName}</strong> ব্যবহারকারীদের ব্যক্তিগত গোপনীয়তা রক্ষা করতে বদ্ধপরিকর। আমাদের ওয়েবসাইটে আপনার প্রদান করা নাম, ফোন নম্বর এবং ইমেইল অ্যাড্রেস শুধুমাত্র অর্ডার সম্পন্ন করা এবং ডিজিটাল ই-বুক ফাইল ডেলিভারি দেওয়ার উদ্দেশ্যে ব্যবহার করা হয়।
              </p>
              <h4 className="font-bold text-slate-900 text-sm">১. তথ্য সংগ্রহ ও ব্যবহার</h4>
              <p>
                আমরা কোনো আর্থিক তথ্য যেমন পাসওয়ার্ড, বিকাশ বা কার্ডের পিন (PIN) সংরক্ষণ করি না। সমস্ত লেনদেন সরাসরি মোবাইল ব্যাংকিং গেটওয়ের মাধ্যমে নিরাপদে পরিচালিত হয়।
              </p>
              <h4 className="font-bold text-slate-900 text-sm">২. তথ্যের নিরাপত্তা</h4>
              <p>
                আপনার তথ্য কোনো তৃতীয় পক্ষের কাছে হস্তান্তর বা বিক্রি করা হয় না। গ্রাহক যেকোনো সময় তার অ্যাকাউন্ট বা ডাটা ডিলিটের জন্য আমাদের সাপোর্টে যোগাযোগ করতে পারেন।
              </p>
            </>
          )}

          {legalModalType === 'terms' && (
            <>
              <p>
                <strong>{settings.siteName}</strong>-এ স্বাগতম। এই ওয়েবসাইটের যেকোনো সেবা গ্রহণ করার পূর্বে অনুগ্রহ করে নিম্নোক্ত শর্তাবলী মনোযোগ সহকারে পড়ুন:
              </p>
              <h4 className="font-bold text-slate-900 text-sm">১. ডিজিটাল ফাইল লাইসেন্স</h4>
              <p>
                ক্রয়কৃত ই-বুক শুধুমাত্র ব্যক্তিগত ব্যবহারের জন্য প্রযোজ্য। কোনো ই-বুক অননুমোদিতভাবে ফটোকপি, পুনঃমুদ্রণ, টেলিগ্রাম বা ফেসবুকে প্রকাশ করা আইনত দণ্ডনীয়।
              </p>
              <h4 className="font-bold text-slate-900 text-sm">২. দাম ও পরিবর্তন</h4>
              <p>
                ওয়েবসাইটে উল্লেখিত বইয়ের মূল্য কর্তৃপক্ষ যেকোনো সময় সংশোধন বা বিশেষ অফার প্রদান করার অধিকার সংরক্ষণ করে।
              </p>
            </>
          )}

          {legalModalType === 'refund' && (
            <>
              <p>
                যেহেতু <strong>{settings.siteName}</strong> সম্পূর্ণ ডিজিটাল পণ্য (E-Book) সরবরাহ করে, তাই ফাইল ডাউনলোড হওয়ার পর সাধারণত কোনো রিফান্ড প্রযোজ্য নয়।
              </p>
              <h4 className="font-bold text-slate-900 text-sm">যেসব ক্ষেত্রে রিফান্ড প্রযোজ্য:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>যদি পেমেন্ট সম্পন্ন হওয়ার পরও ভুল ফাইল ডাউনলোড হয় অথবা ফাইল করাপ্ট (Corrupted) থাকে এবং আমাদের সাপোর্ট টিম ২৪ ঘণ্টার মধ্যে তা সমাধান করতে ব্যর্থ হয়।</li>
                <li>গ্রাহকের অজান্তে যদি একই বইয়ের জন্য সিস্টেমে ভুলবশত দ্বিগুণ টাকা কেটে নেওয়া হয়।</li>
              </ul>
              <p className="text-slate-500 pt-2">
                রিফান্ডের আবেদনের জন্য ট্রানজেকশন আইডিসহ আমাদের সাপোর্ট ইমেইল বা হোয়াটসঅ্যাপে যোগাযোগ করুন।
              </p>
            </>
          )}

          {legalModalType === 'download' && (
            <>
              <h4 className="font-bold text-slate-900 text-sm">ই-বুক ডাউনলোড সংক্রান্ত নির্দেশিকা</h4>
              <ol className="list-decimal pl-5 space-y-2">
                <li>বিকাশ বা নগদে পেমেন্ট নিশ্চিত করার সাথে সাথেই স্ক্রিনে <strong>"ডাউনলোড করুন"</strong> বোতামটি চলে আসবে।</li>
                <li>একই সাথে আপনার অর্ডারে দেওয়া ইমেইল অ্যাড্রেসে ডাউনলোড লিংক ও কনফার্মেশন পাঠানো হয়।</li>
                <li>আপনার তৈরি করা অ্যাকাউন্টের <strong>"আমার কেনা বই"</strong> ট্যাবে সবসময় আপনার সংগ্রহ সংরক্ষিত থাকবে এবং আপনি যেকোনো ডিভাইস থেকে আনলিমিটেড বার ডাউনলোড করতে পারবেন।</li>
              </ol>
            </>
          )}

          {legalModalType === 'copyright' && (
            <>
              <p>
                <strong>{settings.siteName}</strong>-এ প্রকাশিত সকল ই-বুকের স্বত্বাধিকার সংশ্লিষ্ট লেখক ও প্রকাশকের। আমরা কপিরাইট আইন কঠোরভাবে মেনে চলি।
              </p>
              <p>
                যদি কোনো কপিরাইট স্বত্বাধিকারী মনে করেন যে তাদের কোনো উপাদান অনুমতি ছাড়া প্রকাশিত হয়েছে, তবে প্রয়োজনীয় প্রমাণাদিসহ সরাসরি আমাদের সাথে যোগাযোগ করার অনুরোধ জানানো হচ্ছে। আমরা ২৪ ঘণ্টার মধ্যে যথাযথ ব্যবস্থা গ্রহণ করব।
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setLegalModalType(null)}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
          >
            বুঝেছি ও বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
};
