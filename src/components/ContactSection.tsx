import React from 'react';
import { useApp } from '../context/AppContext';
import { EnquiryForm } from './EnquiryForm';
import {
  MapPin,
  Phone,
  Mail,
  UserCheck,
  ShieldAlert,
  MessageSquare,
  ArrowUpRight,
  ExternalLink,
  PhoneCall,
  Navigation
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { content, setIsEnquiryModalOpen } = useApp();

  const handleCall = () => {
    window.location.href = `tel:${content.contactPhone.replace(/\s+/g, '')}`;
  };

  const handleWhatsApp = () => {
    const rawNumber = content.contactPhone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent('Hello MBRC & Infrastructure team, I would like to inquire regarding road infrastructure / materials supply.');
    window.open(`https://wa.me/${rawNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-white text-slate-800 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-50 border border-orange-200 text-[10px] font-black uppercase tracking-widest text-[#C2410C] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF671F]"></span>
              ಸಂಪರ್ಕ ಮತ್ತು ವಿಚಾರಣೆ • Corporate Liaison & Registered Office
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002147] tracking-tight font-display uppercase">
              Connect with MBRC Engineering
            </h2>
          </div>
          <div className="max-w-md text-sm text-slate-600 font-normal leading-relaxed">
            Reach our registered headquarters in Bhatambra, Bhalki, or coordinate directly with our materials crushing and batching operations.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Corporate Information & Quick Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-sm bg-slate-50 border border-slate-200 shadow-sm space-y-5">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-black text-[#FF671F] block mb-1">
                  Registered Corporate Office
                </span>
                <h3 className="text-xl font-black text-[#002147] font-display uppercase tracking-tight">
                  MBRC & Infrastructure Private Limited
                </h3>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-sm bg-white border border-slate-200 flex items-center justify-center text-[#FF671F] shrink-0 mt-0.5 shadow-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase tracking-wider font-bold">Office Address</span>
                    <span className="text-slate-800 leading-relaxed font-medium">{content.contactAddress}</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-sm bg-white border border-slate-200 flex items-center justify-center text-[#FF671F] shrink-0 mt-0.5 shadow-xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase tracking-wider font-bold">Direct Phone</span>
                    <a
                      href={`tel:${content.contactPhone.replace(/\s+/g, '')}`}
                      className="text-[#002147] hover:text-[#FF671F] font-bold transition-colors font-mono"
                    >
                      {content.contactPhone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-sm bg-white border border-slate-200 flex items-center justify-center text-[#FF671F] shrink-0 mt-0.5 shadow-xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase tracking-wider font-bold">Official Email</span>
                    <a
                      href={`mailto:${content.contactEmail}`}
                      className="text-[#002147] hover:text-[#FF671F] font-semibold transition-colors"
                    >
                      {content.contactEmail}
                    </a>
                  </div>
                </div>

                {/* Managing Director & CIN */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-sm bg-white border border-slate-200 flex items-center justify-center text-[#046A38] shrink-0 mt-0.5 shadow-xs">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase tracking-wider font-bold">Managing Director</span>
                    <span className="text-slate-900 font-bold">{content.managingDirectorName}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                  <div className="w-9 h-9 rounded-sm bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF671F] shrink-0 mt-0.5">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase tracking-wider font-bold">Corporate Identity (CIN)</span>
                    <span className="text-[#002147] font-mono font-bold">{content.cinNumber}</span>
                  </div>
                </div>
              </div>

              {/* Direct Instant Action Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-3">
                <button
                  id="contact-call-now-btn"
                  onClick={handleCall}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-sm bg-white hover:bg-slate-100 text-slate-800 text-xs font-black uppercase tracking-widest transition-colors cursor-pointer border border-slate-300 shadow-xs"
                >
                  <PhoneCall className="w-4 h-4 text-[#FF671F]" />
                  <span>Call Now</span>
                </button>

                <button
                  id="contact-whatsapp-btn"
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-sm bg-[#046A38] hover:bg-[#03542c] text-white text-xs font-black uppercase tracking-widest transition-colors cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Interactive Google Maps Visualizer */}
            <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between mb-2.5 text-xs">
                <span className="font-black uppercase tracking-wider text-[#002147] flex items-center gap-1.5 text-[11px]">
                  <Navigation className="w-3.5 h-3.5 text-[#FF671F]" />
                  Bhatambra & Bhalki Headquarters
                </span>
                <a
                  href="https://maps.google.com/?q=Bhatambra,Bhalki,Bidar,Karnataka"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#FF671F] hover:underline flex items-center gap-1 text-[11px] font-black uppercase tracking-wider"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              
              <div className="rounded-sm overflow-hidden aspect-16/9 bg-slate-200 border border-slate-200 relative">
                <iframe
                  title="MBRC Headquarters Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121703.1166347598!2d77.1000000!3d18.0400000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcf63e5272a9e33%3A0x6b7bb8d3b8793fa8!2sBhalki%2C%20Karnataka%20585328!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0 contrast-105 opacity-90 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Customer Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-sm bg-white border border-slate-200 shadow-md">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-orange-50 text-[#C2410C] border border-orange-200 text-[10px] font-black uppercase tracking-widest mb-2">
                  <span>Direct Contracting Portal</span>
                </div>
                <h3 className="text-2xl font-black text-[#002147] font-display uppercase tracking-tight">
                  Submit Official Project Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                  Fill out project parameters and upload technical documents or tender schedules for rapid estimation.
                </p>
              </div>

              <EnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
