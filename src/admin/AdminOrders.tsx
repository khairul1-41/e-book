import React, { useState, useEffect } from 'react';
import { fetchOrders, updateOrder } from '../firebase/dbService';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  FileText,
  Phone,
  Mail,
  RefreshCw,
  X,
  CreditCard
} from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { formatPrice } = useStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const list = await fetchOrders();
    setOrders(list);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (
    order: Order,
    newStatus?: Order['orderStatus'],
    newPayment?: Order['paymentStatus']
  ) => {
    const updated: Order = {
      ...order,
      orderStatus: newStatus || order.orderStatus,
      paymentStatus: newPayment || order.paymentStatus
    };
    await updateOrder(updated);
    setOrders(prev => prev.map(o => o.id === order.id ? updated : o));
    if (selectedOrder?.id === order.id) {
      setSelectedOrder(updated);
    }
  };

  const filtered = orders.filter(o => {
    const matchesStatus = statusFilter === 'all' || o.orderStatus === statusFilter;
    const q = search.toLowerCase().trim();
    const matchesSearch = !q ||
      o.orderNumber.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerPhone.toLowerCase().includes(q) ||
      o.customerEmail.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">অর্ডার ও লেনদেন ম্যানেজমেন্ট</h2>
          <p className="text-xs text-slate-500">গ্রাহকের ক্রয়কৃত ই-বুক অর্ডার যাচাই, স্ট্যাটাস পরিবর্তন ও ট্রানজেকশন অনুমোদন</p>
        </div>

        <button
          onClick={loadData}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 self-start sm:self-auto transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>রিফ্রেশ করুন</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="অর্ডার আইডি, ফোন বা নাম খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-600 outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500">ফিল্টার:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none cursor-pointer"
          >
            <option value="all">সকল অর্ডার</option>
            <option value="pending">পেন্ডিং (Pending)</option>
            <option value="processing">প্রসেসিং (Processing)</option>
            <option value="completed">সম্পন্ন (Completed)</option>
            <option value="cancelled">বাতিল (Cancelled)</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">অর্ডার নং</th>
                <th className="py-3.5 px-4">তারিখ</th>
                <th className="py-3.5 px-4">গ্রাহক</th>
                <th className="py-3.5 px-4">বই সংখ্যা</th>
                <th className="py-3.5 px-4">মোট বিল</th>
                <th className="py-3.5 px-4">পেমেন্ট গেটওয়ে</th>
                <th className="py-3.5 px-4">অর্ডার স্ট্যাটাস</th>
                <th className="py-3.5 px-4 text-right">বিস্তারিত</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map(order => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-900">
                    {order.orderNumber}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{order.customerName}</div>
                    <div className="text-[11px] text-slate-400">{order.customerPhone}</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    {order.items.length} টি
                  </td>
                  <td className="py-3 px-4 font-black text-slate-900">
                    {formatPrice(order.total ?? order.totalAmount ?? 0)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      order.paymentStatus === 'paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.paymentMethod} • {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
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
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-2.5 py-1 bg-blue-50 text-blue-900 hover:bg-blue-100 rounded-lg font-bold text-[11px] transition-colors"
                    >
                      ভিউ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-8 border border-slate-200 overflow-hidden flex flex-col relative max-h-[90vh]">
            
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  অর্ডার বিস্তারিত: {selectedOrder.orderNumber}
                </h3>
                <span className="text-[11px] text-slate-400">
                  তারিখ: {new Date(selectedOrder.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-6 text-xs text-slate-700">
              
              {/* Customer info & Transaction */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">গ্রাহক তথ্য</span>
                  <h4 className="font-bold text-slate-900 text-sm">{selectedOrder.customerName}</h4>
                  <p className="flex items-center gap-1.5 text-slate-600">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedOrder.customerPhone}</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-slate-600">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{selectedOrder.customerEmail}</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">পেমেন্ট ও ট্রানজেকশন</span>
                  <div className="font-bold text-slate-900">
                    মেথড: <span className="uppercase text-blue-900">{selectedOrder.paymentMethod}</span>
                  </div>
                  {selectedOrder.transactionId && (
                    <div className="font-mono bg-white px-2 py-1 rounded border border-slate-200 text-blue-950 font-bold">
                      TrxID: {selectedOrder.transactionId}
                    </div>
                  )}
                  <div className="text-[11px] font-semibold text-slate-600">
                    মোট বিল: <strong className="text-slate-900 text-sm">{formatPrice(selectedOrder.total ?? selectedOrder.totalAmount ?? 0)}</strong>
                  </div>
                </div>
              </div>

              {/* Items Purchased */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-2">
                  অর্ডারে থাকা ই-বুকসমূহ
                </h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between"
                    >
                      <div>
                        <h5 className="font-bold text-slate-900">{item.productTitle}</h5>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {formatPrice(item.price)} × {item.quantity}
                        </span>
                      </div>
                      <a
                        href={item.downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-blue-700 hover:underline"
                      >
                        ডাউনলোড লিঙ্ক &rarr;
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Controls */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  স্ট্যাটাস আপডেট করুন
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">অর্ডার স্ট্যাটাস</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateStatus(selectedOrder, 'completed')}
                        className={`flex-1 py-2 rounded-xl font-bold text-xs transition-colors ${
                          selectedOrder.orderStatus === 'completed'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        Completed
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedOrder, 'cancelled')}
                        className={`flex-1 py-2 rounded-xl font-bold text-xs transition-colors ${
                          selectedOrder.orderStatus === 'cancelled'
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        Cancelled
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">পেমেন্ট স্ট্যাটাস</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateStatus(selectedOrder, undefined, 'paid')}
                        className={`flex-1 py-2 rounded-xl font-bold text-xs transition-colors ${
                          selectedOrder.paymentStatus === 'paid'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        Mark as Paid
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedOrder, undefined, 'refunded')}
                        className={`flex-1 py-2 rounded-xl font-bold text-xs transition-colors ${
                          selectedOrder.paymentStatus === 'refunded'
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        Refunded
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
              >
                বন্ধ করুন
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
