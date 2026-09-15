import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import {
  initialMilestones,
  meaningOfMbrcData,
  initialInfrastructure
} from '../../data/initialData';
import {
  ShieldCheck,
  Award,
  Users,
  Factory,
  Truck,
  CheckCircle2,
  HardHat,
  ArrowRight,
  FileText,
  Clock,
  MapPin,
  ChevronRight,
  Shield,
  Briefcase,
  Sparkles,
  Target,
  Eye
} from 'lucide-react';

// ===== Animation variants =====
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export const AboutPage: React.FC = () => {
  const {
    content,
    leadership,
    machinery,
    qualitySafety,
    setSelectedDirector,
    setIsEnquiryModalOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'plants' | 'fleet'>('all');
  const publishedLeadership = leadership.filter((l) => l.published !== false);
  const publishedMachinery = machinery.filter((m) => m.published !== false);

  return (
    <div className="w-full bg-white text-slate-900 overflow-x-hidden">

      {/* ============ 1. ABOUT HERO BANNER (with your photo as background) ============ */}
      <div className="relative bg-[#0B111E] text-white py-16 sm:py-24 border-b border-white/10 overflow-hidden">
        {/* Your background photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="/photo/riyaz.png"
            alt="MBRC Infrastructure"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B111E] via-[#0B111E]/85 to-[#0B111E]/60" />
        </div>

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-white/5 border border-white/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-4 backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3" />
            <span>ABOUT MBRC & INFRASTRUCTURE</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight uppercase text-white max-w-4xl leading-tight"
          >
            Built on Integrity. <br />
            <span className="bg-gradient-to-r from-[#D4AF37] to-amber-200 bg-clip-text text-transparent">
              Backed by 52+ Years of Engineering.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-slate-300 mt-6 max-w-2xl leading-relaxed"
          >
            From the foundational highway earthworks executed by Late Maqbool Ahmed in 1972 to today's integrated captive crushing and automated batching complexes, MBRC represents generational mastery in infrastructure execution.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono"
          >
            <div>
              <span className="text-slate-500 uppercase block text-[10px]">CIN</span>
              <span className="text-white font-bold">{content.cinNumber}</span>
            </div>
            <div className="text-white/20">|</div>
            <div>
              <span className="text-slate-500 uppercase block text-[10px]">REGISTRATION</span>
              <span className="text-white font-bold">Class-I EPC Contractor (PWD)</span>
            </div>
            <div className="text-white/20">|</div>
            <div>
              <span className="text-slate-500 uppercase block text-[10px]">HEADQUARTERS</span>
              <span className="text-white font-bold">{content.headquarters}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ============ 2. COMPANY PHILOSOPHY (with your photo as a side image) ============ */}
      <section className="py-20 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            {/* Left narrative */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="lg:col-span-7 space-y-6"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white text-slate-800 text-[10px] font-bold uppercase tracking-widest border border-slate-200"
              >
                <span>CORPORATE PHILOSOPHY</span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-2xl sm:text-3xl font-black text-slate-950 font-display tracking-tight uppercase"
              >
                Autonomous Infrastructure Engineering
              </motion.h2>

              <motion.p variants={fadeUp} className="text-sm text-slate-700 leading-relaxed">
                Unlike contractors that rely heavily on fragmented third-party subcontractors and open-market aggregate brokers, MBRC is built on autonomous production. We own and control the full lifecycle: from mining hard basalt rock at our captive quarry to precision gradation at our 3-stage crushing plant, automated batching, and laying via electronic sensor pavers.
              </motion.p>

              <motion.p variants={fadeUp} className="text-sm text-slate-700 leading-relaxed">
                This asset-backed approach guarantees two critical outcomes for departmental authorities and corporate concessionaires: absolute adherence to technical specifications and zero project downtime.
              </motion.p>
            </motion.div>

            {/* Right column with YOUR PHOTO + mission/vision cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={scaleIn}
              className="lg:col-span-5 space-y-4"
            >
              {/* Your photo card */}
              <div className="relative rounded-sm overflow-hidden border border-slate-300 shadow-xl bg-slate-900 aspect-4/3 group">
                <img
                  src="/photo/riyaz.png"
                  alt="MBRC Corporate"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B111E] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block">
                    MBRC Headquarters
                  </span>
                  <span className="text-sm font-bold">Field Operations & Leadership</span>
                </div>
                <div className="absolute top-0 right-0 w-14 h-14 border-t-2 border-r-2 border-[#D4AF37]/60" />
              </div>

              {/* Mission Card */}
              <motion.div
                whileHover={{ y: -4 }}
                className="p-6 rounded-sm bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-amber-300 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-amber-700" />
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                    OUR MISSION
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-950 font-display mb-2">
                  Purity, Responsibility & Speed
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{content.aboutMission}</p>
              </motion.div>

              {/* Vision Card */}
              <motion.div
                whileHover={{ y: -4 }}
                className="p-6 rounded-sm bg-[#0B111E] text-white border border-slate-800 shadow-md"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                    OUR VISION
                  </span>
                </div>
                <h3 className="text-base font-bold text-white font-display mb-2">
                  South India's Most Trusted EPC Enterprise
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">{content.aboutVision}</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Core Values */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.h3
              variants={fadeUp}
              className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 pb-2 border-b border-slate-200"
            >
              OUR FIVE CORE VALUES
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {content.coreValues.map((val, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -6 }}
                  className="p-5 rounded-sm bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all"
                >
                  <div className="w-8 h-8 rounded-sm bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center font-bold text-xs mb-3 font-mono">
                    0{i + 1}
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                    {val.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{val.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ 3. MEANING OF MBRC ============ */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="max-w-2xl mb-12"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-100 text-slate-800 text-[10px] font-bold uppercase tracking-widest mb-3 border border-slate-200"
            >
              <span>FOUNDATION & IDENTITY</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl font-black text-slate-950 font-display tracking-tight uppercase"
            >
              The Meaning Behind Our Name
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xs sm:text-sm text-slate-600 mt-2">
              Every letter in MBRC honors the pillars of family honor, maternal blessing, dynamic leadership, and construction mastery.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {meaningOfMbrcData.map((item, i) => (
              <motion.div
                key={item.letter}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6 }}
                className="group p-6 rounded-sm bg-slate-50 border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all"
              >
                <div className="text-4xl font-black text-[#D4AF37] font-display mb-2 group-hover:scale-110 transition-transform origin-left">
                  {item.letter}
                </div>
                <h3 className="text-base font-bold text-slate-950 mb-1">{item.title}</h3>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-3">
                  {item.subtitle}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ 4. HISTORICAL MILESTONES ============ */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="max-w-2xl mb-12"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-200 text-slate-800 text-[10px] font-bold uppercase tracking-widest mb-3"
            >
              <Clock className="w-3 h-3" />
              <span>52-YEAR HERITAGE</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl font-black text-slate-950 font-display tracking-tight uppercase"
            >
              Historical Milestones (1972 – Today)
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {initialMilestones.map((m, i) => (
              <motion.div
                key={m.year}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6 }}
                className="p-6 rounded-sm bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xl font-black font-mono text-[#D4AF37] mb-2">{m.year}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    {m.badge}
                  </div>
                  <h3 className="text-sm font-bold text-slate-950 mb-3">{m.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{m.description}</p>
                </div>
                <ul className="space-y-1.5 pt-3 border-t border-slate-100 text-[11px] text-slate-700">
                  {m.highlights.slice(0, 3).map((h, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-amber-700 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ 5. LEADERSHIP ============ */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
          >
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-100 text-slate-800 text-[10px] font-bold uppercase tracking-widest mb-3 border border-slate-200">
                <Users className="w-3 h-3" />
                <span>BOARD OF DIRECTORS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-display tracking-tight uppercase">
                Executive Leadership & Ground Authority
              </h2>
            </motion.div>
            <motion.p variants={fadeUp} className="text-xs text-slate-600 max-w-md">
              Every director is an active, field-experienced leader supervising crushing operations, logistics, quality audits, or site execution.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {publishedLeadership.map((member, i) => (
              <motion.div
                key={member.id}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -8 }}
                className="group p-6 rounded-sm bg-slate-50 border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 rounded-sm overflow-hidden mb-5 bg-slate-800 border border-slate-200">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-sm bg-[#0B111E]/90 border border-white/10 text-[9px] font-mono text-[#D4AF37] font-bold">
                      {member.experienceYears
                        ? `${member.experienceYears}+ Yrs Experience`
                        : 'Executive Board'}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-950 group-hover:text-amber-700 transition-colors font-display">
                    {member.name}
                  </h3>
                  <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-3">
                    {member.title}
                  </div>

                  {member.statement && (
                    <blockquote className="text-xs italic text-slate-600 border-l-2 border-amber-400 pl-3 py-1 mb-3 bg-amber-50/50">
                      {member.statement}
                    </blockquote>
                  )}

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {member.bio}
                  </p>

                  {member.focus && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {member.focus.slice(0, 3).map((f, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-sm bg-white border border-slate-200 text-[10px] text-slate-700 font-medium"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setSelectedDirector(member)}
                    className="w-full py-2 rounded-sm bg-white hover:bg-slate-900 border border-slate-300 hover:border-slate-900 text-slate-900 hover:text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Full Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ 6. INFRASTRUCTURE ============ */}
      <section className="py-20 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="max-w-2xl mb-12"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-3"
            >
              <Factory className="w-3 h-3" />
              <span>REAL INDUSTRIAL ASSETS</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-4xl font-black text-white font-display tracking-tight uppercase"
            >
              Captive Infrastructure & Manufacturing Plants
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xs sm:text-sm text-slate-300 mt-2">
              Our automated manufacturing facilities in Khudavandpoor and central hubs guarantee complete material sovereignty.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {initialInfrastructure.map((plant, i) => (
              <motion.div
                key={plant.id}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6 }}
                className="rounded-sm bg-[#0B111E] border border-white/10 hover:border-[#D4AF37]/60 overflow-hidden flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="relative aspect-16/9 bg-slate-800 overflow-hidden">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#0B111E]/90 text-[10px] font-mono text-[#D4AF37] font-bold">
                      {plant.capacity}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-white mb-1">{plant.name}</h3>
                    <div className="text-[10px] text-slate-400 mb-3 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      <span>{plant.location}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {plant.description}
                    </p>
                    <div className="space-y-1 text-[11px] text-slate-400">
                      {plant.keySpecs.map((spec, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between border-b border-white/5 pb-1"
                        >
                          <span className="text-slate-500">{spec.label}:</span>
                          <span className="text-white font-semibold">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ 7. MACHINERY ============ */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-100 text-slate-800 text-[10px] font-bold uppercase tracking-widest mb-3 border border-slate-200">
                <Truck className="w-3 h-3" />
                <span>MECHANIZED FLEET</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-display tracking-tight uppercase">
                Heavy Machinery & Fleet Inventory
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} className="text-xs text-slate-500">
              Modern heavy equipment calibrated for extreme tolerances and MoRTH surface smoothness.
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {publishedMachinery.map((mach, i) => (
              <motion.div
                key={mach.id}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6 }}
                className="p-5 rounded-sm bg-slate-50 border border-slate-200 hover:border-amber-300 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/9 rounded-sm overflow-hidden mb-4 bg-slate-800 border border-slate-200">
                    <img
                      src={mach.image}
                      alt={mach.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    {mach.quantity && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#0B111E] text-white text-[10px] font-bold font-mono">
                        {mach.quantity}
                      </div>
                    )}
                  </div>
                  <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1">
                    {mach.category}
                  </div>
                  <h3 className="text-base font-bold text-slate-950 mb-1">{mach.name}</h3>
                  {mach.model && (
                    <div className="text-xs font-mono text-slate-500 mb-2">
                      Model: {mach.model}
                    </div>
                  )}
                  <p className="text-xs text-slate-600 mb-3">{mach.specs}</p>
                </div>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-bold">
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {mach.status || 'Operational'}
                  </span>
                  <span className="text-slate-500 uppercase">PWD Conforming</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ 8. QUALITY & SAFETY ============ */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="max-w-2xl mb-12"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-200 text-slate-800 text-[10px] font-bold uppercase tracking-widest mb-3"
            >
              <Shield className="w-3 h-3" />
              <span>UNCOMPROMISING STANDARDS</span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl font-black text-slate-950 font-display tracking-tight uppercase"
            >
              Quality Policy & Safety Framework
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          >
            <motion.div
              variants={fadeUp}
              className="p-6 rounded-sm bg-white border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-sm bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-950 uppercase font-display">
                  Corporate Quality Policy
                </h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {qualitySafety.qualityPolicy}
              </p>
              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Verified Certifications:
                </span>
                <div className="space-y-2">
                  {qualitySafety.certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex items-center justify-between p-2.5 rounded-sm bg-slate-50 border border-slate-200 text-xs hover:border-emerald-300 transition-colors"
                    >
                      <div>
                        <span className="font-bold text-slate-900 block">{cert.title}</span>
                        <span className="text-[10px] text-slate-500">
                          {cert.issuer} • Accredited {cert.year}
                        </span>
                      </div>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="p-6 rounded-sm bg-white border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-sm bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center">
                  <HardHat className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-950 uppercase font-display">
                  Safety Policy & Field Rules
                </h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {qualitySafety.safetyPolicy}
              </p>
              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Mandatory Field Protocols:
                </span>
                <ul className="space-y-2 text-xs text-slate-700">
                  {qualitySafety.safetyRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="p-6 rounded-sm bg-[#0B111E] text-white flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
                Execution Commitment
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                {qualitySafety.executionCommitment}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsEnquiryModalOpen(true)}
              className="px-6 py-3 rounded-sm bg-[#D4AF37] hover:bg-[#E5B842] text-slate-950 text-xs font-black uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap flex items-center gap-2"
            >
              <span>Request Compliance Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};