export type ProjectCategory = 
  | 'PWD'
  | 'KKRDB'
  | 'Highway Infrastructure'
  | 'MDR Roads'
  | 'SH Roads'
  | 'Rural Connectivity'
  | 'Road Improvement'
  | 'Resurfacing'
  | 'Retaining Structures'
  | 'Drainage'
  | 'Concrete Works'
  | 'Earthwork'
  | 'Material Production';

export type MediaCategory = 
  | 'Projects'
  | 'Machinery'
  | 'Plants'
  | 'Team'
  | 'Legacy'
  | 'Documents';

export type EnquiryStatus = 
  | 'NEW'
  | 'CONTACTED'
  | 'IN PROGRESS'
  | 'QUOTATION SENT'
  | 'WON'
  | 'LOST'
  | 'CLOSED'
  | 'New'
  | 'Contacted'
  | 'In Progress'
  | 'Quotation Sent'
  | 'Won'
  | 'Lost'
  | 'Closed';

export type PublicPage = 'home' | 'about' | 'services' | 'contact';

export interface ProjectDocument {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  projectType: string;
  category: ProjectCategory;
  description: string;
  images: string[];
  videos?: string[];
  documents?: ProjectDocument[];
  completionYear: number | string;
  client?: string;
  startDate?: string;
  completionDate?: string;
  lengthKm?: string;
  valueCr?: string;
  status: 'Completed' | 'In Progress' | 'Mobilizing';
  featured?: boolean;
  published: boolean;
  scopeHighlights?: string[];
}

export interface MediaItem {
  id: string;
  title: string;
  category: MediaCategory;
  type: 'image' | 'video' | 'document';
  url: string;
  thumbnailUrl?: string;
  description?: string;
  fileSize?: string;
  uploadedAt: string;
  published: boolean;
  altText?: string;
}

export interface EnquiryFile {
  id: string;
  name: string;
  size: string;
  type: string;
  dataUrl?: string;
}

export interface Enquiry {
  id: string; // Unique Reference Number e.g. MBRC-2026-0001
  customerName: string;
  company?: string;
  mobile: string;
  email: string;
  projectType: string;
  projectLocation?: string;
  estimatedBudget?: string;
  expectedStartDate?: string;
  message: string;
  preferredContactMethod?: 'Phone' | 'Email' | 'WhatsApp';
  uploadedFiles: EnquiryFile[];
  date: string;
  status: EnquiryStatus;
  adminNotes?: string;
}

export interface LeadershipMember {
  id: string;
  name: string;
  title: string; // Position
  focus?: string[];
  statement?: string;
  bio: string;
  image: string;
  experienceYears?: number;
  highlightPoints?: string[];
  socialLink?: string;
  published?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  description: string;
  iconName?: string;
  subServices: string[]; // Key Points / What We Deliver
  image: string;
  gallery?: string[];
  processSteps?: { step: string; title: string; desc: string }[];
  specifications?: { label: string; value: string }[];
  seoTitle?: string;
  seoDescription?: string;
  published: boolean;
  order?: number;
}

export interface InfrastructureFacility {
  id: string;
  name: string;
  location: string;
  tagline: string;
  capacity: string;
  description: string;
  keySpecs: { label: string; value: string }[];
  features: string[];
  image: string;
}

export interface MachineryItem {
  id: string;
  name: string;
  category: string;
  model?: string;
  specs: string;
  description?: string;
  quantity?: string;
  image: string;
  images?: string[];
  status?: 'Operational' | 'Deployed on Site' | 'Available for Contract' | 'Maintenance';
  published?: boolean;
}

export interface Milestone {
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  highlights: string[];
  image?: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface QualitySafetyData {
  qualityPolicy: string;
  safetyPolicy: string;
  executionCommitment: string;
  certifications: { id: string; title: string; issuer: string; year: string; verified?: boolean }[];
  safetyRules: string[];
  documents: { id: string; title: string; size: string; type: string; url: string }[];
}

export interface CompanyContent {
  heroTagline: string;
  heroHeadline: string;
  heroSecondary: string;
  heroDescription: string;
  heroBgImage: string;
  companyOverview: string;
  companyShortDesc: string;
  whyChooseUs: WhyChooseUsItem[];
  aboutMission: string;
  aboutVision: string;
  coreValues: { title: string; description: string; icon: string }[];
  qualityStatement: string;
  safetyStatement: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  whatsappNumber: string;
  workingHours: string;
  managingDirectorName: string;
  cinNumber: string;
  headquarters: string;
  googleMapsEmbedUrl: string;
}

export type ActiveAppView = 'website' | 'admin' | 'customer';
