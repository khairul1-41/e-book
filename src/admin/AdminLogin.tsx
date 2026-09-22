import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import {
  Lock,
  Mail,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  AlertCircle,
  KeyRound,
  ExternalLink
} from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (!res.success) {
        setError(res.message || 'Invalid credentials or inactive account.');
      } else {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (presetEmail: string, role: UserRole) => {
    setError('');
    setLoading(true);
    const res = await login(presetEmail, 'admin123456', role);
    setLoading(false);
    if (res.success) {
      onSuccess();
    } else {
      setError(res.message || 'Quick login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-white relative">
      
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/30">
            <BookOpen className="w-8 h-8 text-amber-300" />
          </div>
        </div>

        <h2 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Drem Shop — অ্যাডমিন প্যানেল
        </h2>
        <p className="mt-1 text-center text-xs sm:text-sm text-slate-400">
          প্রবেশ করতে আপনার অ্যাডমিনিস্ট্রেটর ক্রেডেনশিয়াল দিন
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-slate-900 py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-800">
          
          {error && (
            <div className="mb-5 p-3.5 bg-rose-950/80 border border-rose-800 text-rose-300 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                অ্যাডমিন ইমেইল
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="admin@dremshop.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>লগইন হচ্ছে...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করুন</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Buttons for convenience */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3 text-center">
              এক ক্লিকে ডেমো টেস্ট লগইন:
            </span>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@dremshop.com', 'super_admin')}
                className="py-2 px-2 rounded-xl bg-blue-950/60 hover:bg-blue-900 border border-blue-800 text-[11px] font-bold text-blue-300 text-center transition-colors cursor-pointer"
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('manager@dremshop.com', 'manager')}
                className="py-2 px-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-[11px] font-bold text-emerald-300 text-center transition-colors cursor-pointer"
              >
                Manager
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('editor@dremshop.com', 'editor')}
                className="py-2 px-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-800 text-[11px] font-bold text-purple-300 text-center transition-colors cursor-pointer"
              >
                Editor
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="#/"
              className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 transition-colors"
            >
              <span>কাস্টমার ওয়েবসাইটে ফিরে যান</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
