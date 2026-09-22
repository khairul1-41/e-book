import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { fetchOrders, fetchUsers } from '../firebase/dbService';
import { Order, UserProfile } from '../types';
import {
  DollarSign,
  ShoppingBag,
  BookOpen,
  Users,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Download,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { products, formatPrice, settings } = useStore();
  const { currentUser } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [ordList, userList] = await Promise.all([fetchOrders(), fetchUsers()]);
        setOrders(ordList);
        setUsers(userList);
      } catch (e) {
        console.error('Error loading dashboard stats:', e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => {
    const amount = o.total ?? o.totalAmount ?? 0;
    return o.paymentStatus === 'paid' ? sum + amount : sum;
  }, 0);

  const pendingOrders = orders.filter(o => o.orderStatus === 'pending' || o.paymentStatus === 'pending');
  const completedOrders = orders.filter(o => o.orderStatus === 'completed');

  // Top selling products
  const topSelling = [...products].sort((a, b) => b.salesCount - a.salesCount).slice(0, 5);

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Drem Shop কন্ট্রোল প্যানেল
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            শুভ দিন, {currentUser?.displayName}!
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
            আপনার রোল: <strong className="text-amber-300 capitalize">{currentUser?.role?.replace('_', ' ')}</strong>। এখান থেকে আপনি স্টোরের সমস্ত বিক্রয়, ই-বুক, কাস্টমার অর্ডার ও বিজ্ঞাপন পর্যবেক্ষণ করতে পারবেন।
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => onNavigate('products')}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            + নতুন ই-বুক যুক্ত করুন
          </button>
          <button
            onClick={() => onNavigate('orders')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-colors"
          >
            অর্ডার তালিকা
          </button>
        </div>
      </div>

      {/* 4 Core Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Stat 1: Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold block">মোট সংগৃহীত রেভিনিউ</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              {formatPrice(totalRevenue)}
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-0.5 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>সফল পেমেন্টসমূহ</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 2: Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold block">মোট অর্ডার</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              {orders.length} টি
            </span>
            <span className="text-[11px] text-blue-700 font-semibold mt-1 block">
              {completedOrders.length} টি সম্পন্ন
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 3: Total E-Books */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold block">লাইভ ই-বুক ক্যাটালগ</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              {products.length} টি
            </span>
            <span className="text-[11px] text-slate-500 font-medium mt-1 block">
              সব ক্যাটাগরি মিলিয়ে
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Stat 4: Pending Action Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold block">পেন্ডিং যাচাই অর্ডার</span>
            <span className="text-2xl font-black text-rose-600 mt-1 block">
              {pendingOrders.length} টি
            </span>
            <button
              onClick={() => onNavigate('orders')}
              className="text-[11px] text-rose-700 font-semibold underline mt-1 block hover:text-rose-900"
            >
              এখনই চেক করুন &rarr;
            </button>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Middle Grid: Recent Orders & Top Selling Books */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">
              সাম্প্রতিক অর্ডারসমূহ (Recent Orders)
            </h3>
            <button
              onClick={() => onNavigate('orders')}
              className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1"
            >
              <span>সকল অর্ডার দেখুন</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">অর্ডার আইডি</th>
                  <th className="py-3 px-4">কাস্টমার</th>
                  <th className="py-3 px-4">বই</th>
                  <th className="py-3 px-4">মোট টাকা</th>
                  <th className="py-3 px-4">পেমেন্ট</th>
                  <th className="py-3 px-4">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {orders.slice(0, 6).map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-900">
                      {order.orderNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{order.customerName}</div>
                      <div className="text-[11px] text-slate-400">{order.customerPhone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="truncate max-w-[150px] block" title={order.items[0]?.productTitle}>
                        {order.items[0]?.productTitle}
                        {order.items.length > 1 && ` (+${order.items.length - 1})`}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {formatPrice(order.total ?? order.totalAmount ?? 0)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        order.paymentStatus === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.paymentMethod} ({order.paymentStatus})
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        order.orderStatus === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.orderStatus === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling E-Books Widget */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-slate-900">
                শীর্ষ বিক্রিত বই (Top Selling)
              </h3>
              <span className="text-[11px] text-slate-400">বিক্রয়ের সংখ্যা</span>
            </div>

            <div className="space-y-3">
              {topSelling.map((book, i) => (
                <div key={book.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-10 h-14 object-cover rounded-lg shrink-0 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {book.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate">{book.author}</p>
                    <span className="text-xs font-extrabold text-blue-900 mt-0.5 block">
                      {formatPrice(book.discountPrice || book.price)}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-extrabold text-emerald-700 block">
                      {book.salesCount} টি
                    </span>
                    <span className="text-[10px] text-slate-400">বিক্রীত</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <button
              onClick={() => onNavigate('products')}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
            >
              সকল বই ম্যানেজ করুন
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
