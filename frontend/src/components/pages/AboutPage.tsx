import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { initialMilestones, initialInfrastructure } from '../../data/initialData';
import {
  ShieldCheck,Award,Users,Factory,CheckCircle2,HardHat,ArrowRight,MapPin,ChevronRight,Target,Eye,Sparkles,
  Clock
} from 'lucide-react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

export const AboutPage: React.FC = () => {
  const {
    content,
    leadership,
    machinery,
    setSelectedDirector,
    setIsEnquiryModalOpen
  } = useApp();

  const publishedLeadership = leadership.filter((l) => l.published !== false).slice(0, 3);
  const topMachinery = machinery.filter((m) => m.published !== false).slice(0, 3);
  const topPlants = initialInfrastructure.slice(0, 3);
  const recentMilestones = initialMilestones.slice(-3);

  return (
    <div className="w-full bg-white text-slate-900 overflow-x-hidden">

      {/* ============ 1. HERO ============ */}
      <div className="relative bg-[#0B111E] text-white py-16 sm:py-24 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/photo/riyaz.png"
            alt="MBRC Infrastructure"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B111E] via-[#0B111E]/85 to-[#0B111E]/60" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8"
        >
          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight uppercase text-white max-w-4xl leading-tight"
          >
            Built on Integrity.<br />
            <span className="bg-gradient-to-r from-[#D4AF37] to-amber-200 bg-clip-text text-transparent">
              Backed by 52+ Years of Engineering.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-slate-300 mt-6 max-w-2xl leading-relaxed"
          >
            From foundational highway earthworks in 1972 to today's integrated captive crushing and automated batching complexes — MBRC represents generational mastery in infrastructure execution.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-slate-400 font-mono"
          >
            <div>
              <span className="text-slate-500 uppercase block text-[10px]">CIN</span>
              <span className="text-white font-bold">{content.cinNumber}</span>
            </div>
            <div className="text-white/20">|</div>
            <div>
              <span className="text-slate-500 uppercase block text-[10px]">Registration</span>
              <span className="text-white font-bold">Class-I EPC Contractor</span>
            </div>
            <div className="text-white/20">|</div>
            <div>
              <span className="text-slate-500 uppercase block text-[10px]">HQ</span>
              <span className="text-white font-bold">{content.headquarters}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ============ 2. PHILOSOPHY (merged Mission + Vision) ============ */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="lg:col-span-7 space-y-6"
            >
              <motion.h2
                variants={fadeUp}
                className="text-2xl sm:text-3xl font-black text-slate-950 font-display tracking-tight uppercase"
              >
                Autonomous Infrastructure Engineering
              </motion.h2>

              <motion.p variants={fadeUp} className="text-sm text-slate-700 leading-relaxed">
                Unlike contractors that rely on fragmented third-party subcontractors, MBRC is built on autonomous production. We own and control the full lifecycle: from mining hard basalt at our captive quarry to precision gradation at our 3-stage crushing plant, automated batching, and laying via electronic sensor pavers.
              </motion.p>

              <motion.p variants={fadeUp} className="text-sm text-slate-700 leading-relaxed">
                This asset-backed approach guarantees two outcomes for departmental authorities and corporate concessionaires: absolute adherence to technical specifications and zero project downtime.
              </motion.p>

              <motion.div variants={fadeUp} className="pt-4">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    52-YEAR HERITAGE
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {recentMilestones.map((m) => (
                    <div key={m.year} className="border-l-2 border-amber-400 pl-3">
                      <div className="text-lg font-black font-mono text-[#D4AF37]">
                        {m.year}
                      </div>
                      <div className="text-[11px] font-bold text-slate-900 leading-tight mt-1">
                        {m.title}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="lg:col-span-5 space-y-4"
            >
              {/* FIXED: added relative + absolute img */}
              <motion.div variants={fadeUp} className="relative rounded-sm overflow-hidden border border-slate-300 shadow-xl aspect-[4/3] bg-slate-100">
                <img
                  src="/photo/riyaz.png"
                  alt="MBRC Corporate"
                  className="absolute inset-0 w-full h-full object-cover object-center filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B111E] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block">
                    MBRC Headquarters
                  </span>
                  <span className="text-sm font-bold">Field Operations & Leadership</span>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="p-5 rounded-sm bg-white border border-slate-200 flex items-start gap-3"
              >
                <Target className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1">
                    Mission
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {content.aboutMission}
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="p-5 rounded-sm bg-[#0B111E] text-white border border-slate-800 flex items-start gap-3"
              >
                <Eye className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                    Vision
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {content.aboutVision}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ 3. LEADERSHIP ============ */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-3.5 h-3.5 text-amber-700" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  BOARD OF DIRECTORS
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-display tracking-tight uppercase">
                Executive Leadership
              </h2>
            </motion.div>
            <motion.p variants={fadeUp} className="text-xs text-slate-600 max-w-md">
              Every director is an active, field-experienced leader — not a boardroom figurehead.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {publishedLeadership.map((member, i) => (
              <motion.div
                key={member.id}
                variants={fadeUp}
                custom={i}
                className="group p-5 rounded-sm bg-slate-50 border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all"
              >
                {/* FIXED: added relative + absolute img, changed bg */}
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden mb-5 bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-sm bg-[#0B111E]/90 border border-white/10 text-[9px] font-mono text-[#D4AF37] font-bold">
                    {member.experienceYears ? `${member.experienceYears}+ Yrs` : 'Executive'}
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

                <button
                  onClick={() => setSelectedDirector(member)}
                  className="w-full mt-2 py-2 rounded-sm bg-white hover:bg-slate-900 border border-slate-300 hover:border-slate-900 text-slate-900 hover:text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Full Profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ 4. INFRASTRUCTURE SNAPSHOT ============ */}
      <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="max-w-2xl mb-12"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-3">
              <Factory className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">
                CAPTIVE ASSETS
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-4xl font-black text-white font-display tracking-tight uppercase"
            >
              Plants & Heavy Fleet
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xs sm:text-sm text-slate-300 mt-2">
              Automated manufacturing and modern equipment calibrated for MoRTH-grade surface smoothness.
            </motion.p>
          </motion.div>

          {/* Plants */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            {topPlants.map((plant) => (
              <motion.div
                key={plant.id}
                variants={fadeUp}
                className="rounded-sm bg-[#0B111E] border border-white/10 hover:border-[#D4AF37]/60 overflow-hidden transition-all"
              >
                {/* FIXED: added relative + absolute img, cleaner aspect */}
                <div className="relative aspect-[4/3] bg-slate-700 overflow-hidden">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center"
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
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {plant.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Machinery strip */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {topMachinery.map((mach) => (
              <motion.div
                key={mach.id}
                variants={fadeUp}
                className="p-4 rounded-sm bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 transition-all flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 
                flex items-center justify-center shrink-0">
                  <HardHat className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                    {mach.category}
                  </div>
                  <div className="text-xs text-white font-semibold truncate">
                    {mach.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {mach.quantity || '1'} Unit{mach.quantity && mach.quantity > 1 ? 's' : ''}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ 5. SINGLE CTA ============ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="w-12 h-12 mx-auto rounded-sm bg-amber-50 border border-amber-200 flex items-center justify-center mb-6"
            >
              <Award className="w-6 h-6 text-amber-700" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-4xl font-black text-slate-950 font-display tracking-tight uppercase mb-4"
            >
              Partner with a Field-Proven Contractor
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-sm text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed"
            >
              Discuss highway expansion, rural connectivity packages, or captive aggregate supply directly with our leadership.
            </motion.p>

            <motion.button
              variants={fadeUp}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsEnquiryModalOpen(true)}
              className="px-8 py-4 rounded-sm bg-[#0B111E] hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2"
            >
              <span>Start Your Enquiry</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};