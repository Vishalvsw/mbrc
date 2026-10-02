import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, KeyRound, Lock, Mail, Loader2 } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { adminLogin, setActiveAppView } = useApp();
  const [email, setEmail] = useState('admin@mbrc.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await adminLogin(email, password);
    setLoading(false);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-10 bg-slate-100">
      <div className="w-full max-w-md space-y-6 p-8 rounded-sm bg-white border-t-4 border-[#002147] border border-slate-300 shadow-lg">
        <div className="text-center">
          <div className="w-14 h-14 rounded-sm bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF671F] mx-auto mb-3">
            <Shield className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-[#002147] font-display uppercase tracking-tight">
            Staff Admin Portal
          </h2>
          <p className="text-xs text-slate-600 mt-1">MBRC & Infrastructure Pvt. Ltd.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#FF671F]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#FF671F] font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-sm bg-[#002147] hover:bg-[#001733] disabled:opacity-50 text-white font-black text-xs uppercase tracking-widest transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4 text-amber-300" />
                <span>Authenticate</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-200 text-center">
          <button
            onClick={() => setActiveAppView('website')}
            className="text-xs text-slate-500 hover:text-[#002147] transition-colors"
          >
            ← Return to Public Website
          </button>
        </div>
      </div>
    </div>
  );
};
