import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MediaCategory, MediaItem } from '../../types';
import {
  Upload,
  Search,
  Trash2,
  Eye,
  EyeOff,
  Download,
  Plus,
  X,
  FileText,
  Image as ImageIcon,
  Video,
  Check
} from 'lucide-react';

export const AdminMedia: React.FC = () => {
  const { mediaItems, addMediaItem, updateMediaItem, deleteMediaItem, setSelectedMedia, showToast } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Upload Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<MediaCategory>('Projects');
  const [type, setType] = useState<'image' | 'video' | 'document'>('image');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [fileSize, setFileSize] = useState('2.4 MB');

  const categories: (MediaCategory | 'All')[] = [
    'All',
    'Projects',
    'Machinery',
    'Plants',
    'Team',
    'Legacy',
    'Documents'
  ];

  const filteredMedia = mediaItems.filter((m) => {
    const matchesCat = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesSearch =
      search === '' ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      (m.description && m.description.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !url.trim()) {
      showToast('Title and Media URL are required', 'error');
      return;
    }

    addMediaItem({
      title,
      category,
      type,
      url,
      description: description.trim() || undefined,
      fileSize,
      published: true
    });

    // Reset
    setTitle('');
    setUrl('');
    setDescription('');
    setIsUploadModalOpen(false);
  };

  const togglePublished = (item: MediaItem) => {
    updateMediaItem(item.id, { published: !item.published });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight">
            Media & Asset Library
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-light">
            Manage high-resolution images, aerial videos, plant photos, and client-downloadable tender documents.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-xs uppercase tracking-widest transition-colors cursor-pointer shadow-md"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New Asset</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search media files by title or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-[#1E293B] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-900 font-black'
                  : 'bg-[#1E293B] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="rounded-sm bg-[#1E293B] border border-white/10 overflow-hidden shadow-lg flex flex-col justify-between group"
          >
            <div>
              {/* Asset Preview */}
              <div
                onClick={() => setSelectedMedia(item)}
                className="relative aspect-video bg-[#0F172A] overflow-hidden cursor-pointer"
              >
                {item.type === 'document' ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-[#0F172A]">
                    <FileText className="w-8 h-8 text-amber-500 mb-1" />
                    <span className="text-[11px] text-slate-300 font-bold uppercase line-clamp-1">{item.title}</span>
                    <span className="text-[9px] text-slate-500 font-mono mt-0.5">{item.fileSize || 'PDF'}</span>
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                  />
                )}

                <div className="absolute top-2 left-2">
                  <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm bg-[#0F172A]/90 text-amber-500 border border-white/10">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Asset Meta */}
              <div className="p-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-tight line-clamp-1">
                  {item.title}
                </h4>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-light">
                  <span className="font-mono">{item.uploadedAt}</span>
                  <span className="uppercase font-mono text-[9px] text-amber-500">{item.type}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-3 pt-0 border-t border-white/5 flex items-center justify-between mt-2">
              <button
                onClick={() => togglePublished(item)}
                className={`text-[9px] font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer ${
                  item.published ? 'text-emerald-400' : 'text-slate-500'
                }`}
              >
                {item.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                <span>{item.published ? 'Public' : 'Hidden'}</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSelectedMedia(item)}
                  className="p-1.5 rounded-sm bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 cursor-pointer"
                  title="Preview"
                >
                  <Eye className="w-3 h-3" />
                </button>
                <button
                  onClick={() => deleteMediaItem(item.id)}
                  className="p-1.5 rounded-sm bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white transition-colors cursor-pointer border border-rose-500/30"
                  title="Delete"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-sm bg-[#1E293B] border border-white/10 shadow-2xl p-6 text-slate-100">
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-sm bg-white/5 text-slate-400 hover:text-white border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-white font-display uppercase tracking-tight mb-4">
              Add Media Asset to Library
            </h3>

            <form onSubmit={handleUploadSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">
                  Asset Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. VSI Crusher Secondary Cone Unit"
                  className="w-full px-3.5 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as MediaCategory)}
                    className="w-full px-3.5 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Projects">Projects</option>
                    <option value="Machinery">Machinery</option>
                    <option value="Plants">Plants</option>
                    <option value="Team">Team</option>
                    <option value="Legacy">Legacy</option>
                    <option value="Documents">Documents</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">
                    File Type *
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="document">Document (PDF)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">
                  URL / Image Source *
                </label>
                <input
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="/photo/riyaz.png"
                  className="w-full px-3.5 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">
                  Description / Caption
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional context or notes..."
                  className="w-full px-3.5 py-2 rounded-sm bg-[#0F172A] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-sm bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold uppercase tracking-widest cursor-pointer border border-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-xs uppercase tracking-widest cursor-pointer shadow-md"
                >
                  Add to Library
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
