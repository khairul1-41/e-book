import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { exportFullWebsiteZip } from './zipExportService';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminCategories } from './AdminCategories';
import { AdminOrders } from './AdminOrders';
import { AdminReviews } from './AdminReviews';
import { AdminOffers } from './AdminOffers';
import { AdminVideos } from './AdminVideos';
import { AdminAdsterra } from './AdminAdsterra';
import { AdminUsers } from './AdminUsers';
import { AdminSettings } from './AdminSettings';
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  ShoppingBag,
  Star,
  Percent,
  Video,
  Megaphone,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Download,
  Menu,
  X,
  ShieldCheck,
  FolderArchive
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { reviews, settings } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const pendingReviewsCount = reviews.filter(r => r.status === 'pending').length;

  const handleZipDownload = async () => {
    try {
      setIsExporting(true);
      await exportFullWebsiteZip();
    } catch (err) {
      console.error('ZIP export error:', err);
      alert('ZIP তৈরিতে সমস্যা হয়েছে।');
    } finally {
      setIsExporting(false);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড (Dashboard)', icon: LayoutDashboard },
    { id: 'products', label: 'ই-বুক ক্যাটালগ (Products)', icon: BookOpen },
    { id: 'categories', label: 'ক্যাটাগরি (Categories)', icon: Layers },
    { id: 'orders', label: 'অর্ডার ও পেমেন্ট (Orders)', icon: ShoppingBag },
    { id: 'reviews', label: 'পাঠক রিভিউ (Reviews)', icon: Star, badge: pendingReviewsCount > 0 ? pendingReviewsCount : undefined },
    { id: 'offers', label: 'অফার ও কুপন (Coupons)', icon: Percent },
    { id: 'videos', label: 'Febspot ভিডিও (Videos)', icon: Video },
    { id: 'adsterra', label: 'Adsterra বিজ্ঞাপন (Ads)', icon: Megaphone },
    { id: 'users', label: 'ইউজার ও রোলস (Users)', icon: Users },
    { id: 'settings', label: 'সাইট সেটিংস ও ZIP (Settings)', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-black text-amber-300 text-sm shadow-sm">
              DS
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-white tracking-tight block leading-tight">
                {settings.siteName} Admin
              </span>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block -mt-0.5">
                কন্ট্রোল প্যানেল
              </span>
            </div>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick ZIP download button in header */}
          <button
            onClick={handleZipDownload}
            disabled={isExporting}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
            title="Download full project code as ZIP"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'তৈরি হচ্ছে...' : 'Download Code (ZIP)'}</span>
          </button>

          {/* View Live Store */}
          <a
            href="#/"
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
          >
            <span>লাইভ শপ দেখুন</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* Role badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-blue-950 text-blue-300 border border-blue-800 rounded-lg text-xs font-bold capitalize">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentUser?.role?.replace('_', ' ')}</span>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="p-1.5 sm:px-3 sm:py-1.5 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
            title="Log out from admin"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">লগআউট</span>
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
        
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs sticky top-20 space-y-1.5">
            <div className="px-3 py-2 mb-2 border-b border-slate-100 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center text-xs">
                {currentUser?.displayName?.charAt(0) || 'A'}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs text-slate-900 truncate">
                  {currentUser?.displayName}
                </div>
                <div className="text-[10px] text-slate-400 font-medium truncate">
                  {currentUser?.email}
                </div>
              </div>
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-1.5 py-0.5 bg-rose-500 text-white text-[10px] rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-4 mt-3 border-t border-slate-100">
              <button
                onClick={handleZipDownload}
                disabled={isExporting}
                className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-slate-900 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FolderArchive className="w-4 h-4 text-amber-700" />
                <span>Export Website ZIP</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            />
            <div className="relative bg-white w-72 max-w-[80vw] h-full p-5 shadow-2xl flex flex-col justify-between z-10 overflow-y-auto">
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-extrabold text-sm text-slate-900">অ্যাডমিন মেনু</span>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-blue-900 text-white'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 bg-rose-500 text-white text-[10px] rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button
                  onClick={handleZipDownload}
                  className="w-full py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
                >
                  Download Full Website (ZIP)
                </button>
                <button
                  onClick={logout}
                  className="w-full py-2 text-rose-600 text-xs font-bold"
                >
                  লগআউট করুন
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Content Pane */}
        <main className="flex-1 min-w-0">
          {activeTab === 'dashboard' && <AdminDashboard onNavigate={(t) => setActiveTab(t)} />}
          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'categories' && <AdminCategories />}
          {activeTab === 'orders' && <AdminOrders />}
          {activeTab === 'reviews' && <AdminReviews />}
          {activeTab === 'offers' && <AdminOffers />}
          {activeTab === 'videos' && <AdminVideos />}
          {activeTab === 'adsterra' && <AdminAdsterra />}
          {activeTab === 'users' && <AdminUsers />}
          {activeTab === 'settings' && <AdminSettings />}
        </main>

      </div>

    </div>
  );
};
