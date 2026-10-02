import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PublicPage } from '../types';
import { Menu, X, ArrowUpRight, Phone, HardHat, FileText, ChevronRight } from 'lucide-react';

export const Header: React.FC = () => {
  const { publicPage, setPublicPage, setIsEnquiryModalOpen, content } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: PublicPage }[] = [
    { label: 'HOME', page: 'home' },
    { label: 'ABOUT', page: 'about' },
    { label: 'SERVICES', page: 'services' },
    { label: 'CONTACT', page: 'contact' }
  ];

  const handleNavClick = (page: PublicPage) => {
    setMobileMenuOpen(false);
    setPublicPage(page);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-[#0B111E] border-b border-white/10 shadow-lg ${
          scrolled ? 'py-3.5 bg-[#0B111E]/95 backdrop-blur-md' : 'py-5'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <button
              id="header-brand-logo"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3.5 text-left group cursor-pointer"
            >
              {/* Architectural Gold & Charcoal Emblem */}
              <div className="relative w-11 h-11 rounded-sm bg-[#111928] border-2 border-[#D4AF37] p-0.5 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform shrink-0">
                <div className="w-full h-full rounded-sm border border-[#D4AF37]/30 flex flex-col items-center justify-center bg-[#0B111E]">
                  <span className="text-[7px] tracking-widest text-[#D4AF37] font-mono font-bold">EST</span>
                  <span className="font-display font-black text-xs tracking-tighter text-white">1972</span>
                  <span className="text-[6px] tracking-wider text-slate-300 font-bold">MBRC</span>
                </div>
              </div>

              <div className="leading-none">
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-[#D4AF37] transition-colors font-display">
                    MBRC & INFRASTRUCTURE
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-sm bg-white/5 border border-white/10 text-[#D4AF37] text-[9px] font-mono font-bold tracking-wider">
                    PVT. LTD.
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-1">
                  Engineered Heavy Construction & Materials
                </p>
              </div>
            </button>

            {/* Desktop Navigation: LOGO | HOME | ABOUT | SERVICES | CONTACT | GET A QUOTE */}
            <nav className="hidden lg:flex items-center gap-8 text-[12px] font-bold uppercase tracking-widest text-slate-200">
              {navItems.map((item) => {
                const isActive = publicPage === item.page;
                return (
                  <button
                    key={item.label}
                    id={`nav-link-${item.page}`}
                    onClick={() => handleNavClick(item.page)}
                    className={`relative py-1 cursor-pointer transition-all duration-200 ${
                      isActive
                        ? 'text-[#D4AF37]'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full" />
                    )}
                  </button>
                );
              })}

              {/* GET A QUOTE CTA */}
              <button
                id="header-get-quote-btn"
                onClick={() => setIsEnquiryModalOpen(true)}
                className="ml-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#D4AF37] hover:bg-[#E5B842] text-slate-950 text-xs font-black uppercase tracking-widest transition-all shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer"
              >
                <span>GET A QUOTE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </nav>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                id="header-mobile-quote-btn"
                onClick={() => setIsEnquiryModalOpen(true)}
                className="px-3 py-1.5 rounded-sm bg-[#D4AF37] text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1"
              >
                <span>QUOTE</span>
              </button>
              <button
                id="header-mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-sm bg-white/5 border border-white/10 text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A0E17] border-t border-white/10 px-4 py-6 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = publicPage === item.page;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.page)}
                    className={`flex items-center justify-between px-4 py-3 rounded-sm text-sm font-bold uppercase tracking-wider transition-colors text-left cursor-pointer ${
                      isActive
                        ? 'bg-white/10 text-[#D4AF37] border-l-2 border-[#D4AF37]'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                );
              })}

              <div className="pt-4 border-t border-white/10 mt-2 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsEnquiryModalOpen(true);
                  }}
                  className="w-full py-3.5 rounded-sm bg-[#D4AF37] text-slate-950 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-md"
                >
                  <FileText className="w-4 h-4" />
                  <span>GET A PROJECT QUOTE</span>
                </button>

                <a
                  href={`tel:${content.contactPhone}`}
                  className="w-full py-3 rounded-sm bg-white/5 border border-white/10 text-slate-200 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Call Us: {content.contactPhone}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Sticky Mobile CTA for "Get a Quote" */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden p-3 bg-[#0B111E]/95 backdrop-blur-md border-t border-white/10 flex items-center justify-between gap-3 shadow-2xl">
        <a
          href={`tel:${content.contactPhone}`}
          className="px-4 py-2.5 rounded-sm bg-white/10 border border-white/10 text-white text-xs font-bold flex items-center gap-2 shrink-0"
        >
          <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Call</span>
        </a>
        <button
          onClick={() => setIsEnquiryModalOpen(true)}
          className="flex-1 py-2.5 rounded-sm bg-[#D4AF37] text-slate-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
        >
          <span>GET A PROJECT QUOTE</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};
