import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopStatusBar } from './components/TopStatusBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// 4 Primary Public Pages
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { ContactPage } from './components/pages/ContactPage';

// Global Modals
import { DirectorProfileModal } from './components/DirectorProfileModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { MediaLightboxModal } from './components/MediaLightboxModal';
import { EnquiryFormModal } from './components/EnquiryFormModal';

// Admin and Client Portals
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { ClientPortal } from './components/client/ClientPortal';

const MainAppContent: React.FC = () => {
  const { activeAppView, publicPage, isAdminAuthenticated, toasts } = useApp();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans antialiased selection:bg-[#D4AF37] selection:text-slate-950">
      {/* Top corporate status bar with phone, email, portal switchers */}
      <TopStatusBar />

      {/* Conditional Rendering based on App View */}
      {activeAppView === 'website' && (
        <>
          <Header />
          <main className="flex-1">
            {publicPage === 'home' && <HomePage />}
            {publicPage === 'about' && <AboutPage />}
            {publicPage === 'services' && <ServicesPage />}
            {publicPage === 'contact' && <ContactPage />}
          </main>
          <Footer />
        </>
      )}

      {activeAppView === 'admin' && (
        <div className="flex-1 flex flex-col">
          {!isAdminAuthenticated ? <AdminLogin /> : <AdminLayout />}
        </div>
      )}

      {activeAppView === 'customer' && (
        <div className="flex-1 flex flex-col">
          <ClientPortal />
          <Footer />
        </div>
      )}

      {/* Global Toast Notifications */}
      {toasts.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`pointer-events-auto px-4 py-2.5 rounded-sm shadow-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 border animate-in slide-in-from-bottom-2 ${
                toast.type === 'success'
                  ? 'bg-emerald-900 text-white border-emerald-500'
                  : toast.type === 'error'
                  ? 'bg-rose-950 text-white border-rose-500'
                  : 'bg-[#0B111E] text-white border-[#D4AF37]'
              }`}
            >
              <span>{toast.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Global Interactive Modals */}
      <DirectorProfileModal />
      <ProjectDetailModal />
      <MediaLightboxModal />
      <EnquiryFormModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
