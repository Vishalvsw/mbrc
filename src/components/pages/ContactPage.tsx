import React from 'react';
import { useApp } from '../../context/AppContext';
import { EnquiryForm } from '../EnquiryForm';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Building,
  ShieldCheck,
  ExternalLink,
  Award,
  Navigation
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { content } = useApp();

  const rawWa = content.whatsappNumber.replace(/[^0-9]/g, '');
  const waDirectUrl = `https://wa.me/${rawWa}?text=Hello%20MBRC%20Team%2C%20I%20would%20like%20to%20inquire%20about%20a%20construction%20project%20or%20material%20supply.`;

  return (
    <div className="w-full bg-white text-slate-900">
      {/* 1. Contact Hero Banner */}
      <div className="bg-[#0B111E] text-white py-16 sm:py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-white/5 border border-white/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-4">
            <span>GET IN TOUCH WITH LEADERSHIP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight uppercase text-white max-w-4xl leading-tight">
            Contact & Tender Inquiries
          </h1>

          <p className="text-base sm:text-lg text-slate-300 mt-4 max-w-2xl leading-relaxed">
            Reach our administrative headquarters or submit your project drawings directly to receive formal pricing, scheduling, and captive plant capacity commitments.
          </p>
        </div>
      </div>

      {/* 2. Main Contact Grid (Coordinates + Form) */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column (5 cols): Corporate Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-sm border border-slate-200 shadow-sm space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block mb-1">
                    CORPORATE HEADQUARTERS
                  </span>
                  <h3 className="text-xl font-bold text-slate-950 font-display">
                    MBRC & Infrastructure Pvt. Ltd.
                  </h3>
                </div>

                <div className="space-y-4 text-xs text-slate-700">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-sm bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-amber-800" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Registered Address</span>
                      <p className="font-medium text-slate-900 mt-0.5 leading-relaxed">{content.contactAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-sm bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-amber-800" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Official Telephone</span>
                      <a href={`tel:${content.contactPhone}`} className="font-bold text-slate-900 hover:text-amber-700 font-mono mt-0.5 block">
                        {content.contactPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-sm bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-amber-800" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Official Communications</span>
                      <a href={`mailto:${content.contactEmail}`} className="font-bold text-slate-900 hover:text-amber-700 mt-0.5 block">
                        {content.contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-sm bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-amber-800" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Office & Dispatch Hours</span>
                      <p className="font-medium text-slate-900 mt-0.5">{content.workingHours}</p>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Action */}
                <div className="pt-2 border-t border-slate-100">
                  <a
                    href={waDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-sm bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp Directly</span>
                  </a>
                </div>
              </div>

              {/* Plant Locations Summary */}
              <div className="bg-[#0B111E] text-white p-6 rounded-sm border border-slate-800 shadow-md space-y-3">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block">
                  INDUSTRIAL DISPATCH COMPLEX
                </span>
                <h4 className="text-sm font-bold text-white uppercase">
                  Riyaz Stone Crusher & M-Sand Facilities
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Located at Khudavandpoor Village, Bhalki Taluka, Bidar District. Continuous 24/7 weighbridge and tipper loading operations.
                </p>
                <div className="text-[11px] text-[#D4AF37] font-mono font-bold pt-1">
                  Weighbridge Capacity: 100 MT Electronic
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): Comprehensive Project Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-8 rounded-sm border border-slate-200 shadow-sm">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-slate-100 text-slate-800 text-[10px] font-bold uppercase tracking-widest mb-2 border border-slate-200">
                    <span>FORMAL PROJECT REQUISITION</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 font-display uppercase tracking-tight">
                    Submit Project Specifications
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Fill out the parameters below to generate an official MBRC project reference number.
                  </p>
                </div>

                <EnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Location / Interactive Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-100 text-slate-800 text-[10px] font-bold uppercase tracking-widest mb-3 border border-slate-200">
                <span>GEOGRAPHIC PRESENCE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-display tracking-tight uppercase">
                Headquarters & Regional Operational Bases
              </h2>
            </div>
            <div className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
              <Navigation className="w-4 h-4 text-amber-700" />
              <span>Bhatambra, Bhalki, Bidar District, Karnataka</span>
            </div>
          </div>

          <div className="rounded-sm overflow-hidden border border-slate-300 shadow-md h-[400px] w-full bg-slate-100">
            <iframe
              title="MBRC Headquarters Map"
              src={content.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
