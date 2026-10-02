import React from 'react';
import { useApp } from '../../context/AppContext';
import { EnquiryForm } from '../EnquiryForm';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { content } = useApp();

  const rawWa = content.whatsappNumber.replace(/[^0-9]/g, '');
  const waDirectUrl = `https://wa.me/${rawWa}?text=Hello%20MBRC%20Team%2C%20I%20would%20like%20to%20inquire%20about%20a%20construction%20project%20or%20material%20supply.`;

  return (
    <div className="w-full bg-white text-slate-900">

      {/* HERO */}
      <div className="bg-[#0B111E] text-white py-16 sm:py-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-white/5 border border-white/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-4">
            <span>Get in Touch</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight uppercase text-white max-w-3xl leading-tight">
            Contact & Tender Inquiries
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mt-4 max-w-2xl leading-relaxed">
            Reach our headquarters or submit your project drawings to receive formal pricing and scheduling commitments.
          </p>
        </div>
      </div>

      {/* CONTACT + FORM */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* LEFT — Contact Details */}
            <div className="lg:col-span-5 space-y-6">

              <div className="bg-white p-6 sm:p-8 rounded-sm border border-slate-200 shadow-sm space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block mb-1">
                    Headquarters
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
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Address</span>
                      <p className="font-medium text-slate-900 mt-0.5 leading-relaxed">
                        {content.contactAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-sm bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-amber-800" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Phone</span>
                      <a
                        href={`tel:${content.contactPhone}`}
                        className="font-bold text-slate-900 hover:text-amber-700 font-mono mt-0.5 block"
                      >
                        {content.contactPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-sm bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-amber-800" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Email</span>
                      <a
                        href={`mailto:${content.contactEmail}`}
                        className="font-bold text-slate-900 hover:text-amber-700 mt-0.5 block"
                      >
                        {content.contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-sm bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-amber-800" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">Working Hours</span>
                      <p className="font-medium text-slate-900 mt-0.5">{content.workingHours}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <a
                    href={waDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-sm bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Plant Info */}
              <div className="bg-[#0B111E] text-white p-6 rounded-sm border border-slate-800 space-y-3">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block">
                  Industrial Dispatch Complex
                </span>
                <h4 className="text-sm font-bold text-white uppercase">
                  Riyaz Stone Crusher & M-Sand Facilities
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Located at Khudavandpoor Village, Bhalki Taluka, Bidar District. Continuous 24/7 weighbridge and tipper loading.
                </p>
                <div className="text-[11px] text-[#D4AF37] font-mono font-bold pt-1">
                  Weighbridge: 100 MT Electronic
                </div>
              </div>
            </div>

            {/* RIGHT — Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-8 rounded-sm border border-slate-200 shadow-sm">
                <div className="mb-6">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                    Project Requisition
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 font-display uppercase tracking-tight">
                    Submit Project Specifications
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Fill out the parameters below to generate an official MBRC reference number.
                  </p>
                </div>

                <EnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-display tracking-tight uppercase">
              Headquarters & Operational Bases
            </h2>
            <p className="text-xs text-slate-600 mt-2">
              Bhatambra, Bhalki, Bidar District, Karnataka
            </p>
          </div>

          <div className="rounded-sm overflow-hidden border border-slate-300 shadow-md h-[400px] w-full bg-slate-100">
            <iframe
              title="MBRC Headquarters Map"
              src={content.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};