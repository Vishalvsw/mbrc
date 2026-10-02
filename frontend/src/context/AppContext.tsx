import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Project, MediaItem, Enquiry, CompanyContent, LeadershipMember,
  ServiceItem, MachineryItem, QualitySafetyData, ActiveAppView,
  PublicPage, EnquiryStatus
} from '../types';
import { initialCompanyContent, initialQualitySafetyData } from '../data/initialData';
import { api, setToken, clearToken, getToken } from '../lib/api';

interface Toast { id: string; message: string; type: 'success' | 'info' | 'error'; }

interface AppContextType {
  activeAppView: ActiveAppView;
  setActiveAppView: (view: ActiveAppView) => void;
  publicPage: PublicPage;
  setPublicPage: (page: PublicPage, serviceId?: string | null) => void;
  selectedServiceId: string | null;
  setSelectedServiceId: (id: string | null) => void;
  scrollToSection: (sectionId: string) => void;

  content: CompanyContent;
  updateContent: (newContent: Partial<CompanyContent>) => void;
  resetContentToDefault: () => void;

  qualitySafety: QualitySafetyData;
  updateQualitySafety: (newData: Partial<QualitySafetyData>) => void;

  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;
  togglePublishService: (id: string) => void;

  machinery: MachineryItem[];
  addMachinery: (item: Omit<MachineryItem, 'id'>) => void;
  updateMachinery: (item: MachineryItem) => void;
  deleteMachinery: (id: string) => void;
  togglePublishMachinery: (id: string) => void;

  leadership: LeadershipMember[];
  addLeadership: (member: Omit<LeadershipMember, 'id'>) => void;
  updateLeadership: (member: LeadershipMember) => void;
  deleteLeadership: (id: string) => void;
  togglePublishLeadership: (id: string) => void;

  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, patch: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  mediaItems: MediaItem[];
  addMediaItem: (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => void;
  updateMediaItem: (id: string, patch: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;
  setSelectedMedia: (item: MediaItem | null) => void;

  enquiries: Enquiry[];
  addEnquiry: (data: Omit<Enquiry, 'id' | 'date' | 'status'>) => Promise<string>;
  updateEnquiryStatus: (id: string, status: EnquiryStatus, adminNotes?: string) => void;
  deleteEnquiry: (id: string) => void;

  isAdminAuthenticated: boolean;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => void;

  customerUser: { name: string; email: string; phone?: string; enquiryId?: string } | null;
  customerLogin: (email: string, enquiryId: string) => void;
  customerLogout: () => void;

  selectedProject: Project | null;
  setSelectedProject: (p: Project | null) => void;
  selectedDirector: LeadershipMember | null;
  setSelectedDirector: (d: LeadershipMember | null) => void;
  isEnquiryModalOpen: boolean;
  setIsEnquiryModalOpen: (v: boolean) => void;
  prefilledWorkType: string;
  setPrefilledWorkType: (v: string) => void;

  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  resetEnquiriesAndMediaToDefault: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeAppView, setActiveAppView] = useState<ActiveAppView>('website');
  const [publicPage, setPublicPageInternal] = useState<PublicPage>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const [content, setContent] = useState<CompanyContent>(initialCompanyContent);
  const [qualitySafety, setQualitySafety] = useState<QualitySafetyData>(initialQualitySafetyData);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [machinery, setMachinery] = useState<MachineryItem[]>([]);
  const [leadership, setLeadership] = useState<LeadershipMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(!!getToken());
  const [customerUser, setCustomerUser] = useState<{ name: string; email: string; phone?: string; enquiryId?: string } | null>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [selectedDirector, setSelectedDirector] = useState<LeadershipMember | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);
  const [prefilledWorkType, setPrefilledWorkType] = useState<string>('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [c, s, p, l, m] = await Promise.all([
          api.getContent().catch(() => null),
          api.getServices().catch(() => []),
          api.getProjects().catch(() => []),
          api.getLeadership().catch(() => []),
          api.getMedia().catch(() => []),
        ]);
        if (c) {
          setContent((prev) => ({
            ...prev,
            heroHeadline: (c as any).hero_headline || prev.heroHeadline,
            heroTagline: (c as any).hero_tagline || prev.heroTagline,
            cinNumber: (c as any).cin_number || prev.cinNumber,
            contactPhone: (c as any).contact_phone || prev.contactPhone,
            contactEmail: (c as any).contact_email || prev.contactEmail,
            contactAddress: (c as any).contact_address || prev.contactAddress,
            workingHours: (c as any).working_hours || prev.workingHours,
            managingDirectorName: (c as any).managing_director || prev.managingDirectorName,
            whatsappNumber: (c as any).whatsapp_number || prev.whatsappNumber,
          }));
        }
        setServices(s || []);
        setProjects(p || []);
        setLeadership(l || []);
        setMediaItems(m || []);
      } catch (err) {
        console.error('Failed to load public data:', err);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isAdminAuthenticated) return;
    (async () => {
      try {
        const { enquiries: list } = await api.adminGetEnquiries({ limit: 200 });
        setEnquiries(list as Enquiry[]);
      } catch (err) {
        console.error('Failed to load admin data:', err);
      }
    })();
  }, [isAdminAuthenticated]);

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  };

  const setPublicPage = (page: PublicPage, serviceId?: string | null) => {
    setPublicPageInternal(page);
    setSelectedServiceId(serviceId ?? null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const updateContent = (newContent: Partial<CompanyContent>) => setContent((prev) => ({ ...prev, ...newContent }));
  const resetContentToDefault = () => setContent(initialCompanyContent);
  const updateQualitySafety = (newData: Partial<QualitySafetyData>) => setQualitySafety((prev) => ({ ...prev, ...newData }));

  const addService = (s: Omit<ServiceItem, 'id'>) => setServices((prev) => [...prev, { ...(s as ServiceItem), id: `s-${Date.now()}` }]);
  const updateService = (s: ServiceItem) => setServices((prev) => prev.map((x) => (x.id === s.id ? s : x)));
  const deleteService = (id: string) => setServices((prev) => prev.filter((x) => x.id !== id));
  const togglePublishService = (id: string) => setServices((prev) => prev.map((x) => (x.id === id ? { ...x, published: !x.published } : x)));

  const addMachinery = (m: Omit<MachineryItem, 'id'>) => setMachinery((prev) => [...prev, { ...(m as MachineryItem), id: `m-${Date.now()}` }]);
  const updateMachinery = (m: MachineryItem) => setMachinery((prev) => prev.map((x) => (x.id === m.id ? m : x)));
  const deleteMachinery = (id: string) => setMachinery((prev) => prev.filter((x) => x.id !== id));
  const togglePublishMachinery = (id: string) => setMachinery((prev) => prev.map((x) => (x.id === id ? { ...x, published: !x.published } : x)));

  const addLeadership = (l: Omit<LeadershipMember, 'id'>) => setLeadership((prev) => [...prev, { ...(l as LeadershipMember), id: `l-${Date.now()}` }]);
  const updateLeadership = (l: LeadershipMember) => setLeadership((prev) => prev.map((x) => (x.id === l.id ? l : x)));
  const deleteLeadership = (id: string) => setLeadership((prev) => prev.filter((x) => x.id !== id));
  const togglePublishLeadership = (id: string) => setLeadership((prev) => prev.map((x) => (x.id === id ? { ...x, published: !x.published } : x)));

  const addProject = (p: Omit<Project, 'id'>) => setProjects((prev) => [...prev, { ...(p as Project), id: `p-${Date.now()}` }]);
  const updateProject = (id: string, patch: Partial<Project>) => setProjects((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const deleteProject = (id: string) => setProjects((prev) => prev.filter((x) => x.id !== id));

  const addMediaItem = (m: Omit<MediaItem, 'id' | 'uploadedAt'>) =>
    setMediaItems((prev) => [...prev, { ...(m as MediaItem), id: `m-${Date.now()}`, uploadedAt: new Date().toISOString().slice(0, 10) }]);
  const updateMediaItem = (id: string, patch: Partial<MediaItem>) => setMediaItems((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const deleteMediaItem = (id: string) => setMediaItems((prev) => prev.filter((x) => x.id !== id));

  const addEnquiry = async (data: Omit<Enquiry, 'id' | 'date' | 'status'>): Promise<string> => {
    try {
      const res = await api.submitEnquiry({
        customerName: data.customerName,
        company: data.company,
        mobile: data.mobile,
        email: data.email,
        projectType: data.projectType,
        projectLocation: data.projectLocation,
        message: data.message,
      });
      if (isAdminAuthenticated) {
        const { enquiries: list } = await api.adminGetEnquiries({ limit: 200 });
        setEnquiries(list as Enquiry[]);
      }
      return res.referenceId;
    } catch (err: any) {
      showToast(err.message || 'Failed to submit enquiry', 'error');
      throw err;
    }
  };

  const updateEnquiryStatus = async (id: string, status: EnquiryStatus, adminNotes?: string) => {
    try {
      await api.adminUpdateEnquiry(id, { status, adminNotes });
      setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status, adminNotes: adminNotes ?? e.adminNotes } : e)));
      showToast('Enquiry updated');
    } catch (err: any) {
      showToast(err.message || 'Update failed', 'error');
    }
  };

  const deleteEnquiry = async (id: string) => {
    try {
      await api.adminDeleteEnquiry(id);
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      showToast('Enquiry deleted');
    } catch (err: any) {
      showToast(err.message || 'Delete failed', 'error');
    }
  };

  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await api.login(email, password);
      setToken(res.token);
      setIsAdminAuthenticated(true);
      showToast('Welcome back, admin');
      return true;
    } catch (err: any) {
      showToast(err.message || 'Login failed', 'error');
      return false;
    }
  };

  const adminLogout = () => {
    clearToken();
    setIsAdminAuthenticated(false);
    setEnquiries([]);
    showToast('Signed out');
  };

  const customerLogin = (email: string, enquiryId: string) => setCustomerUser({ name: email, email, enquiryId });
  const customerLogout = () => setCustomerUser(null);

  const resetEnquiriesAndMediaToDefault = () => {
    setEnquiries([]);
    setMediaItems([]);
    showToast('Reset local data');
  };

  const value: AppContextType = {
    activeAppView, setActiveAppView, publicPage, setPublicPage,
    selectedServiceId, setSelectedServiceId, scrollToSection,
    content, updateContent, resetContentToDefault,
    qualitySafety, updateQualitySafety,
    services, addService, updateService, deleteService, togglePublishService,
    machinery, addMachinery, updateMachinery, deleteMachinery, togglePublishMachinery,
    leadership, addLeadership, updateLeadership, deleteLeadership, togglePublishLeadership,
    projects, addProject, updateProject, deleteProject,
    mediaItems, addMediaItem, updateMediaItem, deleteMediaItem, setSelectedMedia,
    enquiries, addEnquiry, updateEnquiryStatus, deleteEnquiry,
    isAdminAuthenticated, adminLogin, adminLogout,
    customerUser, customerLogin, customerLogout,
    selectedProject, setSelectedProject, selectedDirector, setSelectedDirector,
    isEnquiryModalOpen, setIsEnquiryModalOpen, prefilledWorkType, setPrefilledWorkType,
    toasts, showToast, resetEnquiriesAndMediaToDefault,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
