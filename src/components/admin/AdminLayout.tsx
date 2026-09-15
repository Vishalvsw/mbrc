import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminDashboard } from './AdminDashboard';
import { AdminProjects } from './AdminProjects';
import { AdminMedia } from './AdminMedia';
import { AdminEnquiries } from './AdminEnquiries';
import { AdminContentCMS } from './AdminContentCMS';
import {
  LayoutDashboard,
  FolderKanban,
  Image as ImageIcon,
  Inbox,
  FileEdit,
  LogOut,
  Globe,
  ShieldCheck,
  Lock
} from 'lucide-react';

type AdminTab = 'dashboard' | 'projects' | 'media' | 'enquiries' | 'content';

export const AdminLayout: React.FC = () => {
  const { adminLogout, setActiveAppView, enquiries } = useApp();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'enquiries', label: 'Inquiries & Leads', icon: <Inbox className="w-4 h-4" />, badge: newEnquiriesCount },
    { id: 'projects', label: 'Project Portfolio', icon: <FolderKanban className="w-4 h-4" /> },
    { id: 'content', label: 'Corporate CMS & Catalog', icon: <FileEdit className="w-4 h-4" /> },
    { id: 'media', label: 'Media Library', icon: <ImageIcon className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-200 flex flex-col font-sans">
      {/* Admin Top Bar */}
      <header className="sticky top-0 z-40 bg-[#0B111E] border-b border-white/10 shadow-lg px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-sm bg-[#111928] border border-[#D4AF37] flex flex-col items-center justify-center">
              <span className="font-display font-black text-xs text-white">MBRC</span>
              <span className="text-[6px] font-mono text-[#D4AF37] font-bold">CMS</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-white text-sm tracking-tight uppercase">
                  MBRC & Infrastructure
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm bg-white/5 text-[#D4AF37] border border-[#D4AF37]/30">
                  Operations Console
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block font-normal">
                Class-I EPC Contractor • Administrative & Content Management System
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveAppView('website')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer border border-white/10"
            >
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Public Website</span>
            </button>

            <button
              onClick={adminLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer border border-rose-800/40"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Navigation Tabs */}
      <div className="bg-[#0B111E]/80 border-b border-white/10 px-4 sm:px-8 py-2 sticky top-[57px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#D4AF37] text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-sm text-[10px] font-mono font-bold ${
                      isActive ? 'bg-slate-950 text-[#D4AF37]' : 'bg-[#D4AF37] text-slate-950'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Admin Body Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
        {activeTab === 'dashboard' && <AdminDashboard onNavigateTab={setActiveTab} />}
        {activeTab === 'enquiries' && <AdminEnquiries />}
        {activeTab === 'projects' && <AdminProjects />}
        {activeTab === 'content' && <AdminContentCMS />}
        {activeTab === 'media' && <AdminMedia />}
      </main>
    </div>
  );
};
