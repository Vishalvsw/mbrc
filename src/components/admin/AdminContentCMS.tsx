import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CompanyContent, ServiceItem, MachineryItem, LeadershipMember } from '../../types';
import {
  Save,
  RotateCcw,
  Building,
  ShieldCheck,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Layers,
  Truck,
  Users,
  Award,
  HardHat,
  Eye,
  EyeOff
} from 'lucide-react';

type CmsSubTab = 'hero' | 'about' | 'services' | 'machinery' | 'leadership' | 'quality';

export const AdminContentCMS: React.FC = () => {
  const {
    content,
    updateContent,
    resetContentToDefault,
    showToast,
    services,
    addService,
    updateService,
    deleteService,
    togglePublishService,
    machinery,
    addMachinery,
    updateMachinery,
    deleteMachinery,
    togglePublishMachinery,
    leadership,
    addLeadership,
    updateLeadership,
    deleteLeadership,
    togglePublishLeadership,
    qualitySafety,
    updateQualitySafety
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<CmsSubTab>('hero');
  const [formData, setFormData] = useState<CompanyContent>({ ...content });

  // State for Service modal/edit
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceShortDesc, setServiceShortDesc] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceSubServices, setServiceSubServices] = useState('');
  const [serviceImage, setServiceImage] = useState('');

  // State for Machinery modal/edit
  const [editingMachinery, setEditingMachinery] = useState<MachineryItem | null>(null);
  const [isMachineryModalOpen, setIsMachineryModalOpen] = useState(false);
  const [machName, setMachName] = useState('');
  const [machCategory, setMachCategory] = useState('Earthmoving & Excavation');
  const [machModel, setMachModel] = useState('');
  const [machQuantity, setMachQuantity] = useState('2 Units');
  const [machSpecs, setMachSpecs] = useState('');
  const [machImage, setMachImage] = useState('');

  // State for Leadership modal/edit
  const [editingLeader, setEditingLeader] = useState<LeadershipMember | null>(null);
  const [isLeaderModalOpen, setIsLeaderModalOpen] = useState(false);
  const [leaderName, setLeaderName] = useState('');
  const [leaderTitle, setLeaderTitle] = useState('Executive Director');
  const [leaderBio, setLeaderBio] = useState('');
  const [leaderStatement, setLeaderStatement] = useState('');
  const [leaderExp, setLeaderExp] = useState(15);
  const [leaderImage, setLeaderImage] = useState('');

  // Quality & Safety form state
  const [qualityForm, setQualityForm] = useState(qualitySafety);

  const handleContentChange = (field: keyof CompanyContent, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent(formData);
    showToast('Website content updated live!');
  };

  const handleResetContent = () => {
    if (window.confirm('Reset company content back to original defaults?')) {
      resetContentToDefault();
      setFormData({ ...content });
      showToast('Restored default company content');
    }
  };

  // Service save
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    const subs = serviceSubServices.split('\n').filter((s) => s.trim().length > 0);
    if (editingService) {
      updateService({
        ...editingService,
        title: serviceTitle,
        shortDesc: serviceShortDesc,
        description: serviceDesc,
        subServices: subs,
        image: serviceImage || editingService.image
      });
    } else {
      addService({
        title: serviceTitle,
        shortDesc: serviceShortDesc,
        description: serviceDesc,
        subServices: subs,
        image: serviceImage || '/photo/riyaz.png',
        published: true
      });
    }
    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  // Machinery save
  const handleSaveMachinery = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMachinery) {
      updateMachinery({
        ...editingMachinery,
        name: machName,
        category: machCategory,
        model: machModel,
        quantity: machQuantity,
        specs: machSpecs,
        image: machImage || editingMachinery.image
      });
    } else {
      addMachinery({
        name: machName,
        category: machCategory,
        model: machModel,
        quantity: machQuantity,
        specs: machSpecs,
        image: machImage || '/photo/riyaz.png',
        published: true,
        status: 'Operational'
      });
    }
    setIsMachineryModalOpen(false);
    setEditingMachinery(null);
  };

  // Leadership save
  const handleSaveLeader = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLeader) {
      updateLeadership({
        ...editingLeader,
        name: leaderName,
        title: leaderTitle,
        bio: leaderBio,
        statement: leaderStatement,
        experienceYears: leaderExp,
        image: leaderImage || editingLeader.image
      });
    } else {
      addLeadership({
        name: leaderName,
        title: leaderTitle,
        bio: leaderBio,
        statement: leaderStatement,
        experienceYears: leaderExp,
        image: leaderImage || '/photo/riyaz.png',
        published: true
      });
    }
    setIsLeaderModalOpen(false);
    setEditingLeader(null);
  };

  return (
    <div className="space-y-6">
      {/* CMS Navigation Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight">
            Corporate Website CMS
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-light">
            Manage hero positioning, company vision, services, heavy equipment, and board leadership.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetContent}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold uppercase tracking-widest border border-white/10 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
            <span>Reset Content Defaults</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs Selector */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 border-b border-white/10">
        {[
          { id: 'hero', label: 'Hero & Identity', icon: <Building className="w-3.5 h-3.5" /> },
          { id: 'about', label: 'About & Vision', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
          { id: 'services', label: `Services (${services.length})`, icon: <Layers className="w-3.5 h-3.5" /> },
          { id: 'machinery', label: `Fleet & Plants (${machinery.length})`, icon: <Truck className="w-3.5 h-3.5" /> },
          { id: 'leadership', label: `Directors (${leadership.length})`, icon: <Users className="w-3.5 h-3.5" /> },
          { id: 'quality', label: 'Quality & Safety', icon: <Award className="w-3.5 h-3.5" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as CmsSubTab)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-all ${
              activeSubTab === tab.id
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'bg-[#1E293B] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* SUB-TAB 1: HERO & IDENTITY */}
      {activeSubTab === 'hero' && (
        <form onSubmit={handleSaveContent} className="space-y-6">
          <div className="p-6 rounded-sm bg-[#1E293B] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500">
              Hero Headlines & Positioning
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-300 mb-1">
                  Primary Hero Headline
                </label>
                <input
                  type="text"
                  value={formData.heroHeadline}
                  onChange={(e) => handleContentChange('heroHeadline', e.target.value)}
                  className="w-full px-3 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-300 mb-1">
                  Hero Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={formData.heroTagline}
                  onChange={(e) => handleContentChange('heroTagline', e.target.value)}
                  className="w-full px-3 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-300 mb-1">
                  Hero Description
                </label>
                <textarea
                  rows={3}
                  value={formData.heroDescription}
                  onChange={(e) => handleContentChange('heroDescription', e.target.value)}
                  className="w-full px-3 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-sm bg-[#1E293B] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500">
              Official Corporate Identifiers & Contact Coordinates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-300 mb-1">
                  Corporate Identity Number (CIN)
                </label>
                <input
                  type="text"
                  value={formData.cinNumber}
                  onChange={(e) => handleContentChange('cinNumber', e.target.value)}
                  className="w-full px-3 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-amber-400 font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-300 mb-1">
                  Managing Director Name
                </label>
                <input
                  type="text"
                  value={formData.managingDirectorName}
                  onChange={(e) => handleContentChange('managingDirectorName', e.target.value)}
                  className="w-full px-3 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-300 mb-1">
                  Official Contact Phone
                </label>
                <input
                  type="text"
                  value={formData.contactPhone}
                  onChange={(e) => handleContentChange('contactPhone', e.target.value)}
                  className="w-full px-3 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-300 mb-1">
                  Official Contact Email
                </label>
                <input
                  type="text"
                  value={formData.contactEmail}
                  onChange={(e) => handleContentChange('contactEmail', e.target.value)}
                  className="w-full px-3 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold uppercase text-slate-300 mb-1">
                  Registered Address
                </label>
                <input
                  type="text"
                  value={formData.contactAddress}
                  onChange={(e) => handleContentChange('contactAddress', e.target.value)}
                  className="w-full px-3 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Save Identity & Hero Settings</span>
          </button>
        </form>
      )}

      {/* SUB-TAB 2: ABOUT & VISION */}
      {activeSubTab === 'about' && (
        <form onSubmit={handleSaveContent} className="space-y-6">
          <div className="p-6 rounded-sm bg-[#1E293B] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500">
              Company Overview & Story
            </h3>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-300 mb-1">
                Company Overview (Home & About)
              </label>
              <textarea
                rows={4}
                value={formData.companyOverview}
                onChange={(e) => handleContentChange('companyOverview', e.target.value)}
                className="w-full px-3 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-300 mb-1">
                  Corporate Mission
                </label>
                <textarea
                  rows={3}
                  value={formData.aboutMission}
                  onChange={(e) => handleContentChange('aboutMission', e.target.value)}
                  className="w-full px-3 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-300 mb-1">
                  Corporate Vision
                </label>
                <textarea
                  rows={3}
                  value={formData.aboutVision}
                  onChange={(e) => handleContentChange('aboutVision', e.target.value)}
                  className="w-full px-3 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Save About & Vision Settings</span>
          </button>
        </form>
      )}

      {/* SUB-TAB 3: SERVICES CMS */}
      {activeSubTab === 'services' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-white uppercase font-display">
                Services & Capabilities Catalog
              </h3>
              <p className="text-xs text-slate-400">Add, edit, or publish engineering capabilities.</p>
            </div>
            <button
              onClick={() => {
                setEditingService(null);
                setServiceTitle('');
                setServiceShortDesc('');
                setServiceDesc('');
                setServiceSubServices('Tender Specifications Execution\nRigid Quality Control\nOn-time Handover');
                setServiceImage('/photo/riyaz.png');
                setIsServiceModalOpen(true);
              }}
              className="px-4 py-2 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Service</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((srv) => (
              <div key={srv.id} className="p-4 rounded-sm bg-[#1E293B] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-amber-500 font-bold uppercase">SERVICE ID: {srv.id}</span>
                    <button
                      onClick={() => togglePublishService(srv.id)}
                      className={`text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase cursor-pointer ${
                        srv.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {srv.published ? 'Published' : 'Draft'}
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{srv.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">{srv.shortDesc}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setEditingService(srv);
                      setServiceTitle(srv.title);
                      setServiceShortDesc(srv.shortDesc);
                      setServiceDesc(srv.description);
                      setServiceSubServices(srv.subServices.join('\n'));
                      setServiceImage(srv.image);
                      setIsServiceModalOpen(true);
                    }}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete service "${srv.title}"?`)) {
                        deleteService(srv.id);
                      }
                    }}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: MACHINERY & FLEET CMS */}
      {activeSubTab === 'machinery' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-white uppercase font-display">
                Machinery & Heavy Equipment Fleet
              </h3>
              <p className="text-xs text-slate-400">Manage plant assets and machinery specs.</p>
            </div>
            <button
              onClick={() => {
                setEditingMachinery(null);
                setMachName('');
                setMachCategory('Earthmoving & Excavation');
                setMachModel('2023 Heavy Duty');
                setMachQuantity('2 Units');
                setMachSpecs('High-capacity hydraulic system with GPS telematics');
                setMachImage('/photo/riyaz.png');
                setIsMachineryModalOpen(true);
              }}
              className="px-4 py-2 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Equipment</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {machinery.map((m) => (
              <div key={m.id} className="p-4 rounded-sm bg-[#1E293B] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-amber-500 uppercase font-bold">{m.category}</span>
                    <button
                      onClick={() => togglePublishMachinery(m.id)}
                      className={`text-[9px] px-1.5 py-0.5 rounded-sm font-bold uppercase cursor-pointer ${
                        m.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {m.published ? 'Live' : 'Hidden'}
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-white">{m.name}</h4>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">{m.quantity} • {m.model}</div>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2">{m.specs}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-3">
                  <button
                    onClick={() => {
                      setEditingMachinery(m);
                      setMachName(m.name);
                      setMachCategory(m.category);
                      setMachModel(m.model || '');
                      setMachQuantity(m.quantity || '1 Unit');
                      setMachSpecs(m.specs);
                      setMachImage(m.image);
                      setIsMachineryModalOpen(true);
                    }}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete equipment "${m.name}"?`)) {
                        deleteMachinery(m.id);
                      }
                    }}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: LEADERSHIP CMS */}
      {activeSubTab === 'leadership' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-white uppercase font-display">
                Board of Directors & Management
              </h3>
              <p className="text-xs text-slate-400">Manage director profiles, statements, and operational experience.</p>
            </div>
            <button
              onClick={() => {
                setEditingLeader(null);
                setLeaderName('');
                setLeaderTitle('Executive Director');
                setLeaderBio('');
                setLeaderStatement('Committed to engineering precision and rapid project handover.');
                setLeaderExp(15);
                setLeaderImage('/photo/riyaz.png');
                setIsLeaderModalOpen(true);
              }}
              className="px-4 py-2 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Director</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leadership.map((l) => (
              <div key={l.id} className="p-4 rounded-sm bg-[#1E293B] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img src={l.image} alt={l.name} className="w-12 h-12 rounded-sm object-cover border border-white/10" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{l.name}</h4>
                      <div className="text-xs text-amber-400 uppercase font-bold">{l.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{l.experienceYears}+ Yrs Experience</div>
                    </div>
                  </div>
                  {l.statement && (
                    <blockquote className="text-xs italic text-slate-300 border-l-2 border-amber-500 pl-2 mb-2">
                      “{l.statement}”
                    </blockquote>
                  )}
                  <p className="text-xs text-slate-400 line-clamp-2">{l.bio}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-3">
                  <button
                    onClick={() => {
                      setEditingLeader(l);
                      setLeaderName(l.name);
                      setLeaderTitle(l.title);
                      setLeaderBio(l.bio);
                      setLeaderStatement(l.statement || '');
                      setLeaderExp(l.experienceYears || 15);
                      setLeaderImage(l.image);
                      setIsLeaderModalOpen(true);
                    }}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete profile for "${l.name}"?`)) {
                        deleteLeadership(l.id);
                      }
                    }}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 6: QUALITY & SAFETY */}
      {activeSubTab === 'quality' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateQualitySafety(qualityForm);
            showToast('Quality & Safety policies saved successfully!');
          }}
          className="space-y-6"
        >
          <div className="p-6 rounded-sm bg-[#1E293B] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-500">
              Corporate Quality & Safety Directives
            </h3>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-300 mb-1">
                Quality Policy Statement
              </label>
              <textarea
                rows={3}
                value={qualityForm.qualityPolicy}
                onChange={(e) => setQualityForm({ ...qualityForm, qualityPolicy: e.target.value })}
                className="w-full px-3 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-300 mb-1">
                Safety Policy Statement
              </label>
              <textarea
                rows={3}
                value={qualityForm.safetyPolicy}
                onChange={(e) => setQualityForm({ ...qualityForm, safetyPolicy: e.target.value })}
                className="w-full px-3 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-300 mb-1">
                Execution Commitment
              </label>
              <textarea
                rows={2}
                value={qualityForm.executionCommitment}
                onChange={(e) => setQualityForm({ ...qualityForm, executionCommitment: e.target.value })}
                className="w-full px-3 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Save Quality & Safety Directives</span>
          </button>
        </form>
      )}

      {/* SERVICE MODAL */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-[#1E293B] border border-white/10 rounded-sm w-full max-w-lg p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={() => setIsServiceModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={serviceTitle}
                  onChange={(e) => setServiceTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-white/10 rounded-sm text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Short Description</label>
                <input
                  type="text"
                  required
                  value={serviceShortDesc}
                  onChange={(e) => setServiceShortDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-white/10 rounded-sm text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  required
                  value={serviceDesc}
                  onChange={(e) => setServiceDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-white/10 rounded-sm text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">
                  Sub-services / Deliverables (One per line)
                </label>
                <textarea
                  rows={3}
                  value={serviceSubServices}
                  onChange={(e) => setServiceSubServices(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-white/10 rounded-sm text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Image URL</label>
                <input
                  type="text"
                  value={serviceImage}
                  onChange={(e) => setServiceImage(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-white/10 rounded-sm text-white"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 bg-white/10 rounded-sm text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-amber-500 text-slate-950 font-bold rounded-sm uppercase">
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MACHINERY MODAL */}
      {isMachineryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-[#1E293B] border border-white/10 rounded-sm w-full max-w-lg p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                {editingMachinery ? 'Edit Equipment' : 'Add New Equipment'}
              </h3>
              <button onClick={() => setIsMachineryModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMachinery} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Equipment Name</label>
                <input
                  type="text"
                  required
                  value={machName}
                  onChange={(e) => setMachName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-white/10 rounded-sm text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={machCategory}
                    onChange={(e) => setMachCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0F172A] border border-white/10 rounded-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Quantity</label>
                  <input
                    type="text"
                    required
                    value={machQuantity}
                    onChange={(e) => setMachQuantity(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0F172A] border border-white/10 rounded-sm text-white font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Model / Make</label>
                <input
                  type="text"
                  value={machModel}
                  onChange={(e) => setMachModel(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-white/10 rounded-sm text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Technical Specs</label>
                <textarea
                  rows={2}
                  required
                  value={machSpecs}
                  onChange={(e) => setMachSpecs(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-white/10 rounded-sm text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Image URL</label>
                <input
                  type="text"
                  value={machImage}
                  onChange={(e) => setMachImage(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-white/10 rounded-sm text-white"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsMachineryModalOpen(false)}
                  className="px-4 py-2 bg-white/10 rounded-sm text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-amber-500 text-slate-950 font-bold rounded-sm uppercase">
                  Save Equipment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LEADERSHIP MODAL */}
      {isLeaderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-[#1E293B] border border-white/10 rounded-sm w-full max-w-lg p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                {editingLeader ? 'Edit Director' : 'Add New Director'}
              </h3>
              <button onClick={() => setIsLeaderModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLeader} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={leaderName}
                  onChange={(e) => setLeaderName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-white/10 rounded-sm text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Designation</label>
                  <input
                    type="text"
                    required
                    value={leaderTitle}
                    onChange={(e) => setLeaderTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0F172A] border border-white/10 rounded-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    required
                    value={leaderExp}
                    onChange={(e) => setLeaderExp(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#0F172A] border border-white/10 rounded-sm text-white font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Director Statement</label>
                <input
                  type="text"
                  value={leaderStatement}
                  onChange={(e) => setLeaderStatement(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-white/10 rounded-sm text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Biography</label>
                <textarea
                  rows={3}
                  required
                  value={leaderBio}
                  onChange={(e) => setLeaderBio(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-white/10 rounded-sm text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Photo URL</label>
                <input
                  type="text"
                  value={leaderImage}
                  onChange={(e) => setLeaderImage(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-white/10 rounded-sm text-white"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLeaderModalOpen(false)}
                  className="px-4 py-2 bg-white/10 rounded-sm text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-amber-500 text-slate-950 font-bold rounded-sm uppercase">
                  Save Director
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
