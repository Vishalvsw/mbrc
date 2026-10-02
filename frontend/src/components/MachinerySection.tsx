import React, { useState } from 'react';
import { initialMachinery } from '../data/initialData';
import { MachineryItem } from '../types';
import { Truck, Layers, Wrench, ShieldCheck, Check } from 'lucide-react';

export const MachinerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Road Construction Equipment' | 'Material & Plant Infrastructure'>('All');

  const filteredMachinery = selectedCategory === 'All'
    ? initialMachinery
    : initialMachinery.filter((m) => m.category === selectedCategory);

  return (
    <section id="machinery" className="py-20 bg-white text-slate-800 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-50 border border-orange-200 text-[10px] font-black uppercase tracking-widest text-[#C2410C] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF671F]"></span>
              ಯಂತ್ರೋಪಕರಣಗಳ ಸಂಪನ್ಮೂಲ • Heavy Mechanization & Fleet Strength
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002147] tracking-tight font-display uppercase">
              Machinery & Equipment Fleet
            </h2>
          </div>
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="filter-machinery-all-btn"
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[#002147] text-white shadow-sm font-black'
                  : 'bg-slate-100 text-slate-700 hover:text-[#002147] border border-slate-200'
              }`}
            >
              All Assets ({initialMachinery.length})
            </button>
            <button
              id="filter-machinery-road-btn"
              onClick={() => setSelectedCategory('Road Construction Equipment')}
              className={`px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                selectedCategory === 'Road Construction Equipment'
                  ? 'bg-[#002147] text-white shadow-sm font-black'
                  : 'bg-slate-100 text-slate-700 hover:text-[#002147] border border-slate-200'
              }`}
            >
              Road Fleet
            </button>
            <button
              id="filter-machinery-plant-btn"
              onClick={() => setSelectedCategory('Material & Plant Infrastructure')}
              className={`px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                selectedCategory === 'Material & Plant Infrastructure'
                  ? 'bg-[#002147] text-white shadow-sm font-black'
                  : 'bg-slate-100 text-slate-700 hover:text-[#002147] border border-slate-200'
              }`}
            >
              Plants & Infrastructure
            </button>
          </div>
        </div>

        {/* Machinery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMachinery.map((item) => (
            <div
              key={item.id}
              className="rounded-sm bg-white border border-slate-200 hover:border-[#FF671F] overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/70 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-sm bg-[#002147]/95 backdrop-blur-sm text-amber-300 border border-white/20 shadow-sm">
                      {item.category === 'Road Construction Equipment' ? 'Road Fleet' : 'Industrial Plant'}
                    </span>
                  </div>

                  {/* Quantity Pill */}
                  <div className="absolute bottom-3 right-3">
                    <span className="text-xs font-black font-mono px-2.5 py-1 rounded-sm bg-[#FF671F] text-white shadow-md">
                      {item.quantity}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base sm:text-lg font-black text-[#002147] font-display mb-1">
                    {item.name}
                  </h3>
                  <div className="text-xs font-bold text-[#C2410C] mb-2 uppercase tracking-wider text-[11px]">
                    {item.model}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {item.specs}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-4 pt-2.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-[11px] text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#046A38]" />
                  Company-Owned & Calibrated
                </span>
                <span className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold">Available on Site</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
