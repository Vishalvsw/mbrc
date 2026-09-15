import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, KeyRound, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { adminLogin, setActiveAppView } = useApp();
  const [passcode, setPasscode] = useState('mbrc2021');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    adminLogin(passcode);
  };

  const handleQuickDemoAccess = () => {
    adminLogin('mbrc2021');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-10 bg-slate-100">
      <div className="w-full max-w-md space-y-6 p-8 rounded-sm bg-white border-t-4 border-[#002147] border border-slate-300 shadow-lg">
        <div className="text-center">
          <div className="w-14 h-14 rounded-sm bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF671F] mx-auto mb-3 shadow-xs">
            <Shield className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#C2410C] mb-1">
            <span>ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್ ಆಡಳಿತ • Official Administrative Portal</span>
          </div>
          <h2 className="text-2xl font-black text-[#002147] font-display uppercase tracking-tight">
            Staff Administrative Portal
          </h2>
          <p className="text-xs text-slate-600 mt-1 font-normal">
            MBRC & Infrastructure Private Limited — Content & Operations CMS
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-1.5">
              Administrative Access Key
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter admin passcode"
                className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF671F] transition-colors font-mono"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1 font-normal">
              <span>Demo access key:</span>
              <code className="text-[#C2410C] font-mono bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded-sm text-[10px] font-bold">mbrc2021</code>
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-sm bg-[#002147] hover:bg-[#001733] text-white font-black text-xs uppercase tracking-widest transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-amber-300" />
              <span>Authenticate & Enter CMS</span>
            </button>
          </div>
        </form>

        {/* Quick 1-Click Access for Evaluators */}
        <div className="pt-4 border-t border-slate-200">
          <button
            onClick={handleQuickDemoAccess}
            className="w-full py-2.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-300"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#046A38]" />
            <span>1-Click Authorize (Staff Demo)</span>
          </button>

          <div className="text-center mt-3">
            <button
              onClick={() => setActiveAppView('website')}
              className="text-xs text-slate-500 hover:text-[#002147] transition-colors font-medium"
            >
              ← Return to Public Corporate Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
