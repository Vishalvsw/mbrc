import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { EnquiryFile } from '../types';
import {
  X,
  CheckCircle2,
  Paperclip,
  Send,
  Loader2,
  FileText,
  MessageCircle
} from 'lucide-react';

interface EnquiryFormProps {
  onSubmitted?: (enquiryId: string) => void;
  isModal?: boolean;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ onSubmitted }) => {
  const { addEnquiry, prefilledWorkType, showToast, content, setActiveAppView, customerLogin } = useApp();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [workType, setWorkType] = useState(prefilledWorkType || 'Road Construction & Development');
  const [projectLocation, setProjectLocation] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<EnquiryFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const workTypes = [
    'Road Construction & Development',
    'Highway Infrastructure',
    'Earthwork & Site Development',
    'Concrete Works',
    'Retaining & Structural Works',
    'Asphalt & Bituminous Works',
    'Material Production',
    'Stone Crusher Supply',
    'M-Sand Supply',
    'Hot-Mix Asphalt Bulk Supply',
    'Heavy Equipment & Fleet Deployment'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files;
    if (!uploaded || uploaded.length === 0) return;

    const newFilesList: EnquiryFile[] = [];

    Array.from(uploaded).forEach((item) => {
      const f = item as File;
      if (f.size > 25 * 1024 * 1024) {
        showToast(`File ${f.name} exceeds 25MB limit. Skipped.`, 'error');
        return;
      }
      newFilesList.push({
        id: 'file-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
        name: f.name,
        size: (f.size / (1024 * 1024)).toFixed(2) + ' MB',
        type: f.type || 'application/octet-stream'
      });
    });

    setFiles((prev) => [...prev, ...newFilesList]);
    showToast(`${newFilesList.length} document(s) attached`);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  /* ============ SUBMIT — now async, hits the backend ============ */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast('Please provide your name', 'error');
      return;
    }
    if (!mobile.trim() || mobile.length < 8) {
      showToast('Please provide a valid mobile number', 'error');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      showToast('Please provide a valid email', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const generatedId = await addEnquiry({
        customerName: name.trim(),
        mobile: mobile.trim(),
        email: email.trim(),
        projectType: workType,
        projectLocation: projectLocation.trim() || undefined,
        message: message.trim() || 'Project inquiry submitted.',
        uploadedFiles: files
      });

      setSubmittedId(generatedId);
      if (onSubmitted) onSubmitted(generatedId);
    } catch (err) {
      // Toast already shown by addEnquiry
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setMobile('');
    setEmail('');
    setProjectLocation('');
    setMessage('');
    setFiles([]);
    setSubmittedId(null);
  };

  /* ============ CONFIRMATION SCREEN ============ */
  if (submittedId) {
    const rawWa = content.whatsappNumber.replace(/[^0-9]/g, '');
    const waText = encodeURIComponent(
      `Hello MBRC Team, I have submitted project requisition ${submittedId} regarding ${workType}. Name: ${name}, Mobile: ${mobile}.`
    );
    const waUrl = `https://wa.me/${rawWa}?text=${waText}`;

    return (
      <div className="p-8 rounded-sm bg-white border border-amber-500/40 text-center space-y-6 shadow-xl">
        <div className="w-14 h-14 rounded-sm bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 block">
            Requisition Submitted
          </span>
          <h3 className="text-xl font-black text-slate-950 font-display uppercase tracking-tight mt-1">
            Project Dossier Registered
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
            Your project details have been recorded. Our team will review and respond promptly.
          </p>
        </div>

        <div className="max-w-md mx-auto p-4 rounded-sm bg-[#0B111E] text-white border border-slate-800 text-left">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">
            Reference ID
          </div>
          <div className="text-2xl font-black font-mono text-[#D4AF37] tracking-wider">
            {submittedId}
          </div>
          <div className="text-[10px] text-slate-400 mt-2">
            Quote this reference in all correspondence.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-sm bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
          <button
            onClick={() => {
              customerLogin(email, submittedId);
              setActiveAppView('customer');
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-sm bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider"
          >
            Track in Client Portal
          </button>
        </div>

        <button
          onClick={handleReset}
          className="text-xs text-slate-500 hover:text-slate-900 underline uppercase tracking-wider"
        >
          Submit Another Requirement
        </button>
      </div>
    );
  }

  /* ============ FORM ============ */
  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Name + Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Mobile Number *
          </label>
          <input
            type="tel"
            required
            placeholder="+91 98450 12345"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono"
          />
        </div>
      </div>

      {/* Email + Project Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            placeholder="contact@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Service Required *
          </label>
          <select
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          >
            {workTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
          Project Location
        </label>
        <input
          type="text"
          placeholder="e.g. Bhalki, Bidar"
          value={projectLocation}
          onChange={(e) => setProjectLocation(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
          Project Details
        </label>
        <textarea
          rows={3}
          placeholder="Describe your scope — corridor length, tonnage, timeline..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        />
      </div>

      {/* File Attachment */}
      <div className="p-3 rounded-sm bg-slate-50 border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Paperclip className="w-3.5 h-3.5 text-amber-700" />
            <span>Attach BOQ / Drawings (Max 25MB)</span>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-[11px] font-bold text-amber-700 hover:text-amber-800 underline uppercase tracking-wider"
          >
            + Browse
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.dwg,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
          onChange={handleFileUpload}
          className="hidden"
        />

        {files.length > 0 ? (
          <div className="space-y-1.5 mt-2">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-2 rounded-sm bg-white border border-slate-200 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="text-slate-800 font-medium truncate">{file.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">({file.size})</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="text-rose-600 hover:text-rose-800 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-3 border border-dashed border-slate-300 rounded-sm text-center text-xs text-slate-500 cursor-pointer hover:bg-slate-100/60"
          >
            Click to attach PDF, Excel, or CAD drawings
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-sm bg-[#0B111E] hover:bg-slate-900 text-[#D4AF37] font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
            <span>Registering...</span>
          </>
        ) : (
          <>
            <span>Submit Project Requisition</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};