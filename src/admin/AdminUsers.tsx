import React, { useState, useEffect } from 'react';
import { fetchUsers, updateUser } from '../firebase/dbService';
import { useAuth } from '../context/AuthContext';
import { UserProfile, UserRole } from '../types';
import {
  Users,
  ShieldCheck,
  UserCheck,
  UserX,
  RefreshCw,
  Clock,
  Key
} from 'lucide-react';

export const AdminUsers: React.FC = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const list = await fetchUsers();
    setUsers(list);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRoleChange = async (targetUser: UserProfile, newRole: UserRole) => {
    if (currentUser?.role !== 'super_admin') {
      alert('শুধুমাত্র Super Admin রোল পরিবর্তন করতে পারবেন।');
      return;
    }
    const updated = { ...targetUser, role: newRole };
    await updateUser(updated);
    setUsers(prev => prev.map(u => u.uid === targetUser.uid ? updated : u));
  };

  const handleToggleActive = async (targetUser: UserProfile) => {
    if (currentUser?.role !== 'super_admin') {
      alert('শুধুমাত্র Super Admin ব্যবহারকারী নিষ্ক্রিয় করতে পারবেন।');
      return;
    }
    const updated = { ...targetUser, isActive: !targetUser.isActive };
    await updateUser(updated);
    setUsers(prev => prev.map(u => u.uid === targetUser.uid ? updated : u));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">ব্যবহারকারী ও অ্যাডমিন রোলস</h2>
          <p className="text-xs text-slate-500">
            স্টাফ রোল (Super Admin, Manager, Editor) ও গ্রাহকদের একাউন্ট পরিচালনা করুন
          </p>
        </div>

        <button
          onClick={loadData}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>রিফ্রেশ</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">ব্যবহারকারী</th>
                <th className="py-3.5 px-4">ইমেইল ও ফোন</th>
                <th className="py-3.5 px-4">বর্তমান রোল</th>
                <th className="py-3.5 px-4">কেনার সংখ্যা</th>
                <th className="py-3.5 px-4">স্ট্যাটাস</th>
                <th className="py-3.5 px-4 text-right">রোল পরিবর্তন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {users.map((u) => (
                <tr key={u.uid} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center text-xs">
                        {u.displayName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{u.displayName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{u.uid}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>{u.email}</div>
                    <div className="text-[11px] text-slate-400">{u.phone || 'N/A'}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      u.role === 'super_admin'
                        ? 'bg-blue-100 text-blue-900 border border-blue-200'
                        : u.role === 'manager'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        : u.role === 'editor'
                        ? 'bg-purple-100 text-purple-900 border border-purple-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {u.purchasedBookIds?.length || 0} টি বই
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {u.isActive ? 'Active' : 'Deactivated'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u, e.target.value as UserRole)}
                        disabled={currentUser?.role !== 'super_admin'}
                        className="px-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none cursor-pointer disabled:opacity-50"
                      >
                        <option value="customer">Customer</option>
                        <option value="editor">Editor</option>
                        <option value="manager">Manager</option>
                        <option value="super_admin">Super Admin</option>
                      </select>

                      <button
                        onClick={() => handleToggleActive(u)}
                        disabled={currentUser?.role !== 'super_admin' || u.uid === currentUser?.uid}
                        className={`p-1.5 rounded-lg text-xs font-semibold ${
                          u.isActive
                            ? 'text-rose-600 hover:bg-rose-50'
                            : 'text-emerald-600 hover:bg-emerald-50'
                        } disabled:opacity-30`}
                        title={u.isActive ? 'Deactivate user' : 'Activate user'}
                      >
                        {u.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
