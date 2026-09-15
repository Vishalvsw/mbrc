import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Phone, Mail, MapPin, Clock, Lock, ArrowRight, UserCheck } from 'lucide-react';

export const TopStatusBar: React.FC = () => {
  const { activeAppView, setActiveAppView, isAdminAuthenticated, customerUser, content } = useApp();
  const [currentIstTime, setCurrentIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      setCurrentIstTime(new Intl.DateTimeFormat('en-IN', options).format(now) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0A0E17] text-slate-300 border-b border-white/10 text-xs py-2 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Left: Contact Info & Headquarters */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[11px]">
          <a
            href={`tel:${content.contactPhone}`}
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-mono font-medium">{content.contactPhone}</span>
          </a>

          <span className="hidden sm:inline text-white/20">|</span>

          <a
            href={`mailto:${content.contactEmail}`}
            className="hidden sm:flex items-center gap-1.5 hover:text-amber-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-amber-500" />
            <span>{content.contactEmail}</span>
          </a>

          <span className="hidden md:inline text-white/20">|</span>

          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>{content.headquarters}</span>
          </div>
        </div>

        {/* Right: Operational Status & Portals */}
        <div className="flex items-center gap-3 text-[11px]">
          <div className="hidden xl:flex items-center gap-1.5 text-slate-400 pr-2">
            <Clock className="w-3.5 h-3.5 text-amber-500/80" />
            <span className="font-mono text-[10px]">{currentIstTime}</span>
          </div>

          {/* Client Portal Link */}
          <button
            onClick={() => setActiveAppView(activeAppView === 'customer' ? 'website' : 'customer')}
            className={`px-2.5 py-1 rounded-sm text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border ${
              activeAppView === 'customer'
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 hover:border-amber-500/40'
            }`}
          >
            <UserCheck className="w-3 h-3 text-amber-400" />
            <span>{customerUser ? `Client: ${customerUser.name}` : 'Client Portal'}</span>
          </button>

          {/* Admin CMS Link */}
          <button
            onClick={() => setActiveAppView(activeAppView === 'admin' ? 'website' : 'admin')}
            className={`px-2.5 py-1 rounded-sm text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border ${
              activeAppView === 'admin'
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10 hover:border-amber-500/40'
            }`}
          >
            <Lock className="w-3 h-3 text-amber-400" />
            <span>{isAdminAuthenticated ? 'Admin CMS Active' : 'Admin CMS'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
