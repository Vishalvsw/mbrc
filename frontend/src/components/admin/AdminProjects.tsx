import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project, ProjectCategory } from '../../types';
import {
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Check,
  X,
  MapPin,
  Calendar,
  FolderKanban,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

export const AdminProjects: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject, showToast } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('PWD');
  const [location, setLocation] = useState('');
  const [projectType, setProjectType] = useState('Road Construction');
  const [description, setDescription] = useState('');
  const [client, setClient] = useState('State PWD Division');
  const [completionYear, setCompletionYear] = useState('2024');
  const [lengthKm, setLengthKm] = useState('14.2 km');
  const [valueCr, setValueCr] = useState('₹18.5 Cr');
  const [status, setStatus] = useState<'Completed' | 'Ongoing' | 'Upcoming'>('Completed');
  const [imageUrl, setImageUrl] = useState('');
  const [published, setPublished] = useState(true);

  const categories: ProjectCategory[] = [
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

  const handleOpenCreate = () => {
    setEditingProjectId(null);
    setName('');
    setCategory('PWD');
    setLocation('Bhalki, Bidar District');
    setProjectType('Road Widening & Asphalt Paving');
    setDescription('');
    setClient('Public Works Department (PWD)');
    setCompletionYear('2024');
    setLengthKm('12.5 km');
    setValueCr('₹14.2 Cr');
    setStatus('Completed');
    setImageUrl('/photo/riyaz.png');
    setPublished(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProjectId(project.id);
    setName(project.name);
    setCategory(project.category);
    setLocation(project.location);
    setProjectType(project.projectType);
    setDescription(project.description);
    setClient(project.client || 'State Agency');
    setCompletionYear(project.completionYear);
    setLengthKm(project.lengthKm || '');
    setValueCr(project.valueCr || '');
    setStatus(project.status);
    setImageUrl(project.images[0] || '');
    setPublished(project.published);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast('Project title is required', 'error');
      return;
    }

    if (editingProjectId) {
      updateProject(editingProjectId, {
        name,
        category,
        location,
        projectType,
        description,
        client,
        completionYear,
        lengthKm,
        valueCr,
        status,
        images: [imageUrl],
        published
      });
    } else {
      addProject({
        name,
        category,
        location,
        projectType,
        description,
        client,
        completionYear,
        lengthKm,
        valueCr,
        status,
        images: [imageUrl || '/photo/riyaz.png'],
        published
      });
    }

    setIsModalOpen(false);
  };

  const togglePublish = (project: Project) => {
    updateProject(project.id, { published: !project.published });
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight">
            Project Portfolio Management
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-light">
            Create, edit, publish, or archive road and civil infrastructure contracts.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-xs uppercase tracking-widest transition-colors cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Infrastructure Project</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="rounded-sm bg-[#1E293B] border border-white/10 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0F172A] text-slate-400 uppercase font-bold tracking-widest text-[10px] border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Project / Corridor</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Visibility</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0] || '/photo/riyaz.png'}
                        alt={p.name}
                        className="w-12 h-10 object-cover rounded-sm border border-white/10 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-white line-clamp-1">{p.name}</div>
                        <div className="text-[10px] text-slate-400 line-clamp-1 font-light">{p.projectType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                      <span className="truncate max-w-[130px] font-light">{p.location}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">
                    {p.completionYear}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-wider ${
                      p.status === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => togglePublish(p)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer ${
                        p.published
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {p.published ? (
                        <>
                          <Eye className="w-3 h-3" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-sm bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProject(p.id)}
                        className="p-1.5 rounded-sm bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white transition-colors cursor-pointer border border-rose-500/30"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-sm bg-[#1E293B] border border-white/10 shadow-2xl p-6 sm:p-8 text-slate-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-sm bg-white/5 text-slate-400 hover:text-white cursor-pointer border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white font-display uppercase tracking-tight mb-4">
              {editingProjectId ? 'Edit Infrastructure Project' : 'Create New Infrastructure Project'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">
                  Project Title / Corridor Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. MDR-42 Bhatambra to Bhalki Corridor Widening"
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Bhalki, Bidar District"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">
                    Completion Year
                  </label>
                  <input
                    type="text"
                    value={completionYear}
                    onChange={(e) => setCompletionYear(e.target.value)}
                    placeholder="2024"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">
                    Corridor Length
                  </label>
                  <input
                    type="text"
                    value={lengthKm}
                    onChange={(e) => setLengthKm(e.target.value)}
                    placeholder="e.g. 14.5 km"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">
                    Project Value
                  </label>
                  <input
                    type="text"
                    value={valueCr}
                    onChange={(e) => setValueCr(e.target.value)}
                    placeholder="e.g. ₹18.5 Cr"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">
                  Scope Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed engineering scope, asphalt layering, and deliverables..."
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">
                  Primary Image URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedCheck"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="rounded-sm bg-[#0F172A] border-white/20 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="publishedCheck" className="text-xs text-slate-300 font-medium cursor-pointer">
                  Publish immediately to public website
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-sm bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold uppercase tracking-widest cursor-pointer border border-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-xs uppercase tracking-widest cursor-pointer shadow-md"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
