import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { EnquiryFile } from '../types';
import {
  Upload,
  X,
  CheckCircle2,
  Paperclip,
  Send,
  Loader2,
  FileText,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  MapPin,
  Building
} from 'lucide-react';

interface EnquiryFormProps {
  onSubmitted?: (enquiryId: string) => void;
  isModal?: boolean;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({ onSubmitted, isModal = false }) => {
  const { addEnquiry, prefilledWorkType, showToast, content, setActiveAppView, customerLogin } = useApp();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [workType, setWorkType] = useState(prefilledWorkType || 'Road Construction & Development');
  const [estimatedBudget, setEstimatedBudget] = useState('₹1 Cr – ₹5 Cr');
  const [expectedStartDate, setExpectedStartDate] = useState('');
  const [preferredContactMethod, setPreferredContactMethod] = useState<'Phone' | 'Email' | 'WhatsApp'>('Phone');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<EnquiryFile[]>([]);
  const [uploading, setUploading] = useState(false);
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
    'Stone Crusher Supply (40mm / 20mm / 10mm)',
    'Manufactured Sand (M-Sand) Supply',
    'Washed M-Sand Supply',
    'Concrete Batching Plant Supply (RMC)',
    'Hot-Mix Asphalt Bulk Supply',
    'Heavy Equipment & Fleet Deployment'
  ];

  const budgetTiers = [
    'Under ₹1 Crore',
    '₹1 Cr – ₹5 Cr',
    '₹5 Cr – ₹15 Cr',
    '₹15 Cr – ₹50 Cr',
    '₹50 Cr+ (Large Infrastructure Package)',
    'To be Estimated from BOQ'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files;
    if (!uploaded || uploaded.length === 0) return;

    setUploading(true);

    setTimeout(() => {
      const newFilesList: EnquiryFile[] = [];

      Array.from(uploaded).forEach((item) => {
        const f = item as File;
        if (f.size > 25 * 1024 * 1024) {
          showToast(`File ${f.name} exceeds 25MB limit. Skipped.`, 'error');
          return;
        }

        const sizeMb = (f.size / (1024 * 1024)).toFixed(2) + ' MB';
        newFilesList.push({
          id: 'file-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
          name: f.name,
          size: sizeMb,
          type: f.type || 'application/octet-stream'
        });
      });

      setFiles((prev) => [...prev, ...newFilesList]);
      setUploading(false);
      showToast(`${newFilesList.length} tender document(s) attached`);
    }, 500);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast('Please provide your name', 'error');
      return;
    }
    if (!mobile.trim() || mobile.length < 8) {
      showToast('Please provide a valid contact mobile number', 'error');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      showToast('Please provide a valid corporate or official email', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = addEnquiry({
        customerName: name.trim(),
        company: company.trim() || undefined,
        mobile: mobile.trim(),
        email: email.trim(),
        projectType: workType,
        projectLocation: projectLocation.trim() || undefined,
        estimatedBudget,
        expectedStartDate: expectedStartDate || undefined,
        preferredContactMethod,
        message: message.trim() || 'Official project inquiry submitted.',
        uploadedFiles: files
      });

      setSubmittedId(generatedId);
      setIsSubmitting(false);

      if (onSubmitted) {
        onSubmitted(generatedId);
      }
    }, 600);
  };

  const handleReset = () => {
    setName('');
    setCompany('');
    setMobile('');
    setEmail('');
    setProjectLocation('');
    setMessage('');
    setFiles([]);
    setSubmittedId(null);
  };

  // Instant Inquiry Confirmation Screen
  if (submittedId) {
    const rawWa = content.whatsappNumber.replace(/[^0-9]/g, '');
    const waText = encodeURIComponent(
      `Hello MBRC Team, I have submitted project requisition reference ${submittedId} regarding ${workType}. Name: ${name}, Mobile: ${mobile}.`
    );
    const waUrl = `https://wa.me/${rawWa}?text=${waText}`;

    return (
      <div className="p-8 sm:p-10 rounded-sm bg-white border border-amber-500/40 text-center space-y-6 shadow-xl">
        <div className="w-16 h-16 rounded-sm bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 block">
            OFFICIAL REQUISITION SUBMITTED
          </span>
          <h3 className="text-2xl font-black text-slate-950 font-display uppercase tracking-tight mt-1">
            Project Dossier Registered
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
            Your project details and documents have been securely recorded. Our technical team and executive directors will review your parameters promptly.
          </p>
        </div>

        {/* Unique Reference Number Badge */}
        <div className="max-w-md mx-auto p-5 rounded-sm bg-[#0B111E] text-white border border-slate-800 text-left">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="uppercase text-[10px] tracking-wider font-bold">Unique Reference ID</span>
            <span className="text-[#D4AF37] font-bold text-[10px] uppercase tracking-wider">Status: New Requisition</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-[#D4AF37] tracking-wider">
            {submittedId}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Please quote this reference number in all official correspondence and phone discussions.
          </div>
        </div>

        {/* Quick Action Links */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-sm bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect via WhatsApp</span>
          </a>

          <button
            onClick={() => {
              customerLogin(email, submittedId);
              setActiveAppView('customer');
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-sm bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Track in Client Portal</span>
          </button>
        </div>

        <div className="pt-2">
          <button
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-900 underline uppercase tracking-wider"
          >
            Submit Another Project Requirement
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Row 1: Name & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Ramesh Patil / Chief Engineer"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Company / Organization / Department
          </label>
          <input
            type="text"
            placeholder="e.g. Infrastructure Concessions Ltd / PWD"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
          />
        </div>
      </div>

      {/* Row 2: Phone & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Phone / Mobile Number *
          </label>
          <input
            type="tel"
            required
            placeholder="e.g. +91 98450 12345"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors font-mono"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Official Email Address *
          </label>
          <input
            type="email"
            required
            placeholder="e.g. contact@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
          />
        </div>
      </div>

      {/* Row 3: Project Type & Estimated Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Project Type / Service Required *
          </label>
          <select
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
          >
            {workTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Estimated Budget Range
          </label>
          <select
            value={estimatedBudget}
            onChange={(e) => setEstimatedBudget(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
          >
            {budgetTiers.map((tier) => (
              <option key={tier} value={tier}>
                {tier}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 4: Project Location & Expected Start Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Project Location / Taluk / District
          </label>
          <input
            type="text"
            placeholder="e.g. Bhalki, Bidar, or State Highway Link"
            value={projectLocation}
            onChange={(e) => setProjectLocation(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
            Expected Project Start Date
          </label>
          <input
            type="date"
            value={expectedStartDate}
            onChange={(e) => setExpectedStartDate(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
          />
        </div>
      </div>

      {/* Row 5: Detailed Message / Scope */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
          Detailed Message / Tender Specifications / BOQ Notes
        </label>
        <textarea
          rows={3}
          placeholder="Please describe corridor length, required concrete grades, aggregate metric tonnage, or timeline constraints..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-sm bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
        />
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          Preferred Contact Method
        </label>
        <div className="flex items-center gap-4 text-xs">
          {(['Phone', 'Email', 'WhatsApp'] as const).map((method) => (
            <label key={method} className="flex items-center gap-1.5 cursor-pointer text-slate-700">
              <input
                type="radio"
                name="preferredContactMethod"
                value={method}
                checked={preferredContactMethod === method}
                onChange={() => setPreferredContactMethod(method)}
                className="text-amber-600 focus:ring-amber-500"
              />
              <span>{method}</span>
            </label>
          ))}
        </div>
      </div>

      {/* File Attachment Support */}
      <div className="p-4 rounded-sm bg-slate-50 border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Paperclip className="w-3.5 h-3.5 text-amber-700" />
            <span>Attach BOQ, Tender Drawings, or Specifications (Max 25MB)</span>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-[11px] font-bold text-amber-700 hover:text-amber-800 underline uppercase tracking-wider cursor-pointer"
          >
            + Browse Files
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
          <div className="space-y-1.5 mt-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-2 rounded-sm bg-white border border-slate-200 text-xs"
              >
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="text-slate-800 font-medium truncate">{file.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">({file.size})</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-3 border border-dashed border-slate-300 rounded-sm text-center text-xs text-slate-500 cursor-pointer hover:bg-slate-100/60 transition-colors"
          >
            Drag and drop or click to attach architectural PDF, Excel BOQ, or CAD DWG drawings
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-sm bg-[#0B111E] hover:bg-slate-900 text-[#D4AF37] font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
            <span>REGISTERING REQUISITION...</span>
          </>
        ) : (
          <>
            <span>SUBMIT OFFICIAL PROJECT REQUISITION</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};
