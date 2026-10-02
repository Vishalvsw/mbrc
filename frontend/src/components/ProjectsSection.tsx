import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProjectCategory, Project } from '../types';
import { MapPin, Calendar, ArrowRight, Compass, Filter, Search } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { projects, setSelectedProject } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'PWD',
    'KKRDB',
    'Highway Infrastructure',
    'MDR Roads',
    'SH Roads',
    'Rural Connectivity',
    'Road Improvement',
    'Resurfacing',
    'Retaining Structures',
    'Drainage',
    'Concrete Works',
    'Earthwork',
    'Material Production'
  ];

  // Filter published projects only for public website
  const publishedProjects = projects.filter((p) => p.published);

  const filteredProjects = publishedProjects.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.projectType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-orange-50 border border-orange-200 text-[10px] font-black uppercase tracking-widest text-[#C2410C] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF671F]"></span>
              ಕಾಮಗಾರಿಗಳ ಪಟ್ಟಿ • Public Works & Highway Track Record
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002147] tracking-tight font-display uppercase">
              Featured Infrastructure Projects
            </h2>
          </div>
          <div className="max-w-md text-sm text-slate-600 font-normal leading-relaxed">
            Showcasing over 500+ kilometers of engineered roadways, state highway packages, industrial quarry logistics, and KKRDB connectivity corridors.
          </div>
        </div>

        {/* Search & Categories Toolbar */}
        <div className="space-y-4 mb-10">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by project name, highway, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-white border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#002147] transition-colors shadow-sm"
            />
          </div>

          {/* Category Filter Pills (Scrollable horizontally) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`project-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}-btn`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#002147] text-white shadow-sm font-black'
                    : 'bg-white text-slate-700 hover:text-[#002147] border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-sm bg-white border border-slate-200 text-slate-500 shadow-sm">
            No projects found matching current criteria. Try selecting "All" or altering search terms.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-sm bg-white border border-slate-200 hover:border-[#FF671F] overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                    <img
                      src={project.images[0] || '/photo/riyaz.png'}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/80 via-transparent to-transparent" />

                    {/* Category pill */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-sm bg-[#002147]/95 text-amber-300 border border-white/20 backdrop-blur-sm shadow-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* Completion Year */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-sm bg-white/95 text-[11px] font-mono text-slate-800 border border-slate-200 shadow-sm">
                      <Calendar className="w-3 h-3 text-[#FF671F]" />
                      {project.completionYear}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-[#C2410C] font-bold uppercase tracking-wider mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FF671F] shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-[#002147] font-display mb-1 line-clamp-2">
                      {project.name}
                    </h3>

                    <p className="text-xs text-slate-500 font-semibold mb-2">
                      {project.projectType}
                    </p>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3 font-normal">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="px-5 pb-4 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                    {project.lengthKm ? `Length: ${project.lengthKm}` : (project.valueCr || 'Turnkey EPC')}
                  </div>
                  <button
                    id={`view-project-details-${project.id}-btn`}
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest text-[#FF671F] hover:text-[#C2410C] transition-colors cursor-pointer"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
