import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import {
  X,
  User,
  ShoppingBag,
  BookOpen,
  Heart,
  Download,
  LogOut,
  Mail,
  Lock,
  Phone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const UserAccountModal: React.FC = () => {
  const {
    isAccountOpen,
    setIsAccountOpen,
    products,
    wishlist,
    addToCart,
    downloadBookFile,
    setReadingBook,
    formatPrice
  } = useStore();

  const {
    currentUser,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile
  } = useAuth();

  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [activeTab, setActiveTab] = useState<'books' | 'orders' | 'wishlist' | 'profile'>('books');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  if (!isAccountOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const res = await login(email, password, 'customer');
    if (!res.success) {
      setAuthError(res.message || 'Login failed.');
    } else {
      setAuthSuccess('সফলভাবে লগইন হয়েছে!');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const res = await register(name, email, phone, password);
    if (!res.success) {
      setAuthError(res.message || 'Registration failed.');
    } else {
      setAuthSuccess('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!');
    }
  };

  // Purchased books
  const purchasedBookIds = currentUser?.purchasedBooks || [];
  const myBooks = products.filter(p => purchasedBookIds.includes(p.id));

  // Wishlist books
  const wishlistBooks = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8 border border-slate-200 overflow-hidden flex flex-col relative max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center">
              <User className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                {isAuthenticated ? `স্বাগতম, ${currentUser?.displayName}` : 'কাস্টমার অ্যাকাউন্ট'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {isAuthenticated ? 'আপনার কেনা ই-বুক এবং অর্ডার ট্র্যাক করুন' : 'লগইন বা নতুন অ্যাকাউন্ট তৈরি করুন'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 flex-1">
          
          {!isAuthenticated ? (
            /* Authentication Screens */
            <div className="max-w-md mx-auto space-y-5">
              
              {/* Tab Selector */}
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setAuthError('');
                  }}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    authMode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  লগইন (Sign In)
                </button>
                <button
                  onClick={() => {
                    setAuthMode('register');
                    setAuthError('');
                  }}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    authMode === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  নতুন অ্যাকাউন্ট (Sign Up)
                </button>
              </div>

              {authError && (
                <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl flex items-center gap-2 border border-rose-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {authSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl flex items-center gap-2 border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{authSuccess}</span>
                </div>
              )}

              {authMode === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      ইমেইল অ্যাড্রেস
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      পাসওয়ার্ড
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                  >
                    লগইন করুন
                  </button>

                  <div className="text-center pt-2">
                    <p className="text-[11px] text-slate-500">
                      ডেমো টেস্টের জন্য যেকোনো ইমেইল দিয়ে সহজেই প্রবেশ করতে পারেন।
                    </p>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      আপনার পূর্ণ নাম
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="সাকিব আহমেদ"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      মোবাইল নম্বর
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="017XXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      ইমেইল অ্যাড্রেস
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:border-blue-600 outline-none"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                  >
                    রেজিস্ট্রেশন সম্পন্ন করুন
                  </button>
                </form>
              )}

            </div>
          ) : (
            /* Logged in User Dashboard */
            <div className="space-y-6">
              
              {/* Navigation Tabs */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 flex-wrap gap-2">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveTab('books')}
                    className={`pb-2 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeTab === 'books'
                        ? 'border-blue-900 text-blue-900'
                        : 'border-transparent text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>আমার কেনা বই ({myBooks.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`pb-2 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeTab === 'wishlist'
                        ? 'border-blue-900 text-blue-900'
                        : 'border-transparent text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                    <span>উইশলিস্ট ({wishlistBooks.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`pb-2 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeTab === 'profile'
                        ? 'border-blue-900 text-blue-900'
                        : 'border-transparent text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>প্রোফাইল</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {(currentUser?.role === 'super_admin' || currentUser?.role === 'manager' || currentUser?.role === 'editor') && (
                    <a
                      href="#/admin"
                      onClick={() => setIsAccountOpen(false)}
                      className="text-xs text-blue-900 hover:text-blue-800 font-bold flex items-center gap-1 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      <span>এডমিন প্যানেল</span>
                    </a>
                  )}
                  <button
                    onClick={logout}
                    className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>লগআউট</span>
                  </button>
                </div>
              </div>

              {/* Tab 1: My Purchased E-Books */}
              {activeTab === 'books' && (
                <div className="space-y-3">
                  {myBooks.length === 0 ? (
                    <div className="p-8 bg-slate-50 rounded-2xl text-center space-y-2 border border-slate-200">
                      <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
                      <h4 className="text-xs font-bold text-slate-800">এখনও কোনো বই কেনা হয়নি</h4>
                      <p className="text-[11px] text-slate-500">
                        যেকোনো বই কিনে এখানে আজীবন ডাউনলোড ও পড়ার সুযোগ উপভোগ করুন।
                      </p>
                    </div>
                  ) : (
                    myBooks.map((book) => (
                      <div
                        key={book.id}
                        className="p-3.5 bg-white rounded-2xl border border-slate-200 flex items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-12 h-16 object-cover rounded-lg shrink-0 shadow-xs"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold text-emerald-700 uppercase">
                              অনুমোদিত লাইসেন্স
                            </span>
                            <h4 className="text-xs font-bold text-slate-900 truncate">
                              {book.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 truncate">{book.author} • {book.fileFormat}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setIsAccountOpen(false);
                              setReadingBook(book);
                            }}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg"
                          >
                            পড়ুন
                          </button>
                          <button
                            onClick={() => downloadBookFile(book)}
                            className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>ডাউনলোড</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab 2: Wishlist */}
              {activeTab === 'wishlist' && (
                <div className="space-y-3">
                  {wishlistBooks.length === 0 ? (
                    <div className="p-8 bg-slate-50 rounded-2xl text-center space-y-2 border border-slate-200">
                      <Heart className="w-8 h-8 text-slate-400 mx-auto" />
                      <h4 className="text-xs font-bold text-slate-800">পছন্দের তালিকায় কোনো বই নেই</h4>
                    </div>
                  ) : (
                    wishlistBooks.map((book) => (
                      <div
                        key={book.id}
                        className="p-3.5 bg-white rounded-2xl border border-slate-200 flex items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-12 h-16 object-cover rounded-lg shrink-0 shadow-xs"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate">
                              {book.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 truncate">{book.author}</p>
                            <span className="text-xs font-extrabold text-blue-900">
                              {formatPrice(book.discountPrice || book.price)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => addToCart(book)}
                          className="px-3.5 py-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-lg shrink-0 shadow-xs"
                        >
                          কার্টে যোগ করুন
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab 3: Profile */}
              {activeTab === 'profile' && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">নাম:</span>
                    <strong className="text-slate-900 text-sm">{currentUser?.displayName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">ইমেইল:</span>
                    <strong className="text-slate-900">{currentUser?.email}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">মোবাইল নম্বর:</span>
                    <strong className="text-slate-900">{currentUser?.phone || 'সংযুক্ত নেই'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">মেম্বারশিপ টাইপ:</span>
                    <strong className="text-emerald-700 capitalize">{currentUser?.role} Member</strong>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
