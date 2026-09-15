import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Project,
  MediaItem,
  Enquiry,
  CompanyContent,
  LeadershipMember,
  ServiceItem,
  MachineryItem,
  QualitySafetyData,
  ActiveAppView,
  PublicPage,
  EnquiryStatus
} from '../types';
import {
  initialCompanyContent,
  initialProjects,
  initialMedia,
  initialEnquiries,
  initialLeadership,
  initialServices,
  initialMachinery,
  initialQualitySafetyData
} from '../data/initialData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  // Navigation
  activeAppView: ActiveAppView;
  setActiveAppView: (view: ActiveAppView) => void;
  publicPage: PublicPage;
  setPublicPage: (page: PublicPage, serviceId?: string | null) => void;
  selectedServiceId: string | null;
  setSelectedServiceId: (id: string | null) => void;
  scrollToSection: (sectionId: string) => void;

  // Company Content
  content: CompanyContent;
  updateContent: (newContent: Partial<CompanyContent>) => void;
  resetContentToDefault: () => void;

  // Quality & Safety
  qualitySafety: QualitySafetyData;
  updateQualitySafety: (newData: Partial<QualitySafetyData>) => void;

  // Services (CMS driven)
  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;
  togglePublishService: (id: string) => void;

  // Machinery (CMS driven)
  machinery: MachineryItem[];
  addMachinery: (item: Omit<MachineryItem, 'id'>) => void;
  updateMachinery: (item: MachineryItem) => void;
  deleteMachinery: (id: string) => void;
  togglePublishMachinery: (id: string) => void;

  // Leadership (CMS driven)
  leadership: LeadershipMember[];
  addLeadership: (member: Omit<LeadershipMember, 'id'>) => void;
  updateLeadership: (member: LeadershipMember) => void;
  deleteLeadership: (id: string) => void;
  togglePublishLeadership: (id: string) => void;

  // Projects (CMS driven)
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  togglePublishProject: (id: string) => void;

  // Media Library (CMS driven)
  mediaItems: MediaItem[];
  addMediaItem: (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => void;
  updateMediaItem: (id: string, updates: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;
  togglePublishMedia: (id: string) => void;

  // Enquiries & Inquiries Management
  enquiries: Enquiry[];
  addEnquiry: (enquiryData: Omit<Enquiry, 'id' | 'date' | 'status'>) => string;
  updateEnquiryStatus: (id: string, status: EnquiryStatus, adminNotes?: string) => void;
  deleteEnquiry: (id: string) => void;
  resetEnquiriesAndMediaToDefault: () => void;

  // Modals & Active Selections
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  selectedMedia: MediaItem | null;
  setSelectedMedia: (media: MediaItem | null) => void;
  selectedDirector: LeadershipMember | null;
  setSelectedDirector: (director: LeadershipMember | null) => void;
  isEnquiryModalOpen: boolean;
  setIsEnquiryModalOpen: (open: boolean) => void;
  prefilledWorkType: string;
  setPrefilledWorkType: (type: string) => void;

  // Authentication
  isAdminAuthenticated: boolean;
  adminLogin: (pass: string) => boolean;
  adminLogout: () => void;
  customerUser: { name: string; email: string; phone?: string; enquiryId?: string } | null;
  customerLogin: (email: string, enquiryId?: string) => boolean;
  customerLogout: () => void;

  // Notifications
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeAppView, setActiveAppView] = useState<ActiveAppView>('website');
  const [publicPage, setPublicPageInternal] = useState<PublicPage>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Load state from localStorage or fallback
  const [content, setContent] = useState<CompanyContent>(() => {
    const saved = localStorage.getItem('mbrc_content_v3');
    return saved ? JSON.parse(saved) : initialCompanyContent;
  });

  const [qualitySafety, setQualitySafety] = useState<QualitySafetyData>(() => {
    const saved = localStorage.getItem('mbrc_quality_v3');
    return saved ? JSON.parse(saved) : initialQualitySafetyData;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('mbrc_services_v3');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [machinery, setMachinery] = useState<MachineryItem[]>(() => {
    const saved = localStorage.getItem('mbrc_machinery_v3');
    return saved ? JSON.parse(saved) : initialMachinery;
  });

  const [leadership, setLeadership] = useState<LeadershipMember[]>(() => {
    const saved = localStorage.getItem('mbrc_leadership_v3');
    return saved ? JSON.parse(saved) : initialLeadership;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('mbrc_projects_v3');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem('mbrc_media_v4') || localStorage.getItem('mbrc_media_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 8) {
          return parsed;
        }
      } catch (e) {}
    }
    return initialMedia;
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem('mbrc_enquiries_v4') || localStorage.getItem('mbrc_enquiries_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 6) {
          return parsed;
        }
      } catch (e) {}
    }
    return initialEnquiries;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('mbrc_admin_auth') === 'true';
  });

  const [customerUser, setCustomerUser] = useState<{ name: string; email: string; phone?: string; enquiryId?: string } | null>(() => {
    const saved = localStorage.getItem('mbrc_customer_auth');
    return saved ? JSON.parse(saved) : null;
  });

  // Modals & detail views
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [selectedDirector, setSelectedDirector] = useState<LeadershipMember | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);
  const [prefilledWorkType, setPrefilledWorkType] = useState<string>('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mbrc_content_v3', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem('mbrc_quality_v3', JSON.stringify(qualitySafety));
  }, [qualitySafety]);

  useEffect(() => {
    localStorage.setItem('mbrc_services_v3', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('mbrc_machinery_v3', JSON.stringify(machinery));
  }, [machinery]);

  useEffect(() => {
    localStorage.setItem('mbrc_leadership_v3', JSON.stringify(leadership));
  }, [leadership]);

  useEffect(() => {
    localStorage.setItem('mbrc_projects_v3', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('mbrc_media_v4', JSON.stringify(mediaItems));
  }, [mediaItems]);

  useEffect(() => {
    localStorage.setItem('mbrc_enquiries_v4', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('mbrc_admin_auth', String(isAdminAuthenticated));
  }, [isAdminAuthenticated]);

  useEffect(() => {
    if (customerUser) {
      localStorage.setItem('mbrc_customer_auth', JSON.stringify(customerUser));
    } else {
      localStorage.removeItem('mbrc_customer_auth');
    }
  }, [customerUser]);

  // Toast notification
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const setPublicPage = (page: PublicPage, serviceId?: string | null) => {
    setPublicPageInternal(page);
    if (serviceId !== undefined) {
      setSelectedServiceId(serviceId);
    }
    if (activeAppView !== 'website') {
      setActiveAppView('website');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    if (activeAppView !== 'website') {
      setActiveAppView('website');
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  // Content Operations
  const updateContent = (newContent: Partial<CompanyContent>) => {
    setContent((prev) => ({ ...prev, ...newContent }));
    showToast('Corporate settings & website content saved successfully', 'success');
  };

  const resetContentToDefault = () => {
    setContent(initialCompanyContent);
    showToast('Restored default corporate content', 'info');
  };

  // Quality & Safety Operations
  const updateQualitySafety = (newData: Partial<QualitySafetyData>) => {
    setQualitySafety((prev) => ({ ...prev, ...newData }));
    showToast('Quality & Safety policies updated', 'success');
  };

  // Services Operations
  const addService = (serviceData: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...serviceData,
      id: 'srv-' + Date.now().toString(36)
    };
    setServices((prev) => [newService, ...prev]);
    showToast(`Service "${newService.title}" created`, 'success');
  };

  const updateService = (updated: ServiceItem) => {
    setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    showToast(`Service "${updated.title}" updated`, 'success');
  };

  const deleteService = (id: string) => {
    const target = services.find((s) => s.id === id);
    setServices((prev) => prev.filter((s) => s.id !== id));
    showToast(`Service "${target?.title || id}" removed`, 'info');
  };

  const togglePublishService = (id: string) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextState = !s.published;
          showToast(`Service "${s.title}" is now ${nextState ? 'Published' : 'Draft'}`);
          return { ...s, published: nextState };
        }
        return s;
      })
    );
  };

  // Machinery Operations
  const addMachinery = (itemData: Omit<MachineryItem, 'id'>) => {
    const newItem: MachineryItem = {
      ...itemData,
      id: 'mach-' + Date.now().toString(36)
    };
    setMachinery((prev) => [newItem, ...prev]);
    showToast(`Machinery "${newItem.name}" added`, 'success');
  };

  const updateMachinery = (updated: MachineryItem) => {
    setMachinery((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    showToast(`Machinery "${updated.name}" updated`, 'success');
  };

  const deleteMachinery = (id: string) => {
    const target = machinery.find((m) => m.id === id);
    setMachinery((prev) => prev.filter((m) => m.id !== id));
    showToast(`Machinery "${target?.name || id}" removed`, 'info');
  };

  const togglePublishMachinery = (id: string) => {
    setMachinery((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const next = !m.published;
          showToast(`Machinery "${m.name}" ${next ? 'Published' : 'Hidden'}`);
          return { ...m, published: next };
        }
        return m;
      })
    );
  };

  // Leadership Operations
  const addLeadership = (memberData: Omit<LeadershipMember, 'id'>) => {
    const newMember: LeadershipMember = {
      ...memberData,
      id: 'lead-' + Date.now().toString(36)
    };
    setLeadership((prev) => [...prev, newMember]);
    showToast(`Leadership profile for "${newMember.name}" created`, 'success');
  };

  const updateLeadership = (updated: LeadershipMember) => {
    setLeadership((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    showToast(`Leadership profile "${updated.name}" updated`, 'success');
  };

  const deleteLeadership = (id: string) => {
    const target = leadership.find((l) => l.id === id);
    setLeadership((prev) => prev.filter((l) => l.id !== id));
    showToast(`Profile "${target?.name || id}" deleted`, 'info');
  };

  const togglePublishLeadership = (id: string) => {
    setLeadership((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          const next = !l.published;
          return { ...l, published: next };
        }
        return l;
      })
    );
  };

  // Projects Operations
  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProj: Project = {
      ...projectData,
      id: 'proj-' + Date.now().toString(36)
    };
    setProjects((prev) => [newProj, ...prev]);
    showToast(`Project "${newProj.name}" created successfully`, 'success');
  };

  const updateProject = (updated: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Project "${updated.name}" updated`, 'success');
  };

  const deleteProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast(`Project "${target?.name || id}" removed`, 'info');
  };

  const togglePublishProject = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newState = !p.published;
          showToast(`Project "${p.name}" is now ${newState ? 'Published' : 'Unpublished'}`);
          return { ...p, published: newState };
        }
        return p;
      })
    );
  };

  // Media Operations
  const addMediaItem = (itemData: Omit<MediaItem, 'id' | 'uploadedAt'>) => {
    const newItem: MediaItem = {
      ...itemData,
      id: 'med-' + Date.now().toString(36),
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    setMediaItems((prev) => [newItem, ...prev]);
    showToast(`Media "${newItem.title}" uploaded to library`, 'success');
  };

  const deleteMediaItem = (id: string) => {
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
    showToast('Media item deleted', 'info');
  };

  const togglePublishMedia = (id: string) => {
    setMediaItems((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const next = !m.published;
          showToast(`Media "${m.title}" is now ${next ? 'Visible' : 'Hidden'}`);
          return { ...m, published: next };
        }
        return m;
      })
    );
  };

  const updateMediaItem = (id: string, updates: Partial<MediaItem>) => {
    setMediaItems((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          return { ...m, ...updates };
        }
        return m;
      })
    );
  };

  // Enquiry Operations — Generates UNIQUE Reference Number e.g. MBRC-2026-0005
  const addEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'date' | 'status'>): string => {
    const currentYear = new Date().getFullYear();
    const sequenceNumber = enquiries.length + 1;
    const formattedSequence = String(sequenceNumber).padStart(4, '0');
    const enquiryId = `MBRC-${currentYear}-${formattedSequence}`;

    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: enquiryId,
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'New'
    };

    setEnquiries((prev) => [newEnquiry, ...prev]);
    showToast(`Inquiry ${enquiryId} submitted successfully! Reference ID generated.`, 'success');
    return enquiryId;
  };

  const updateEnquiryStatus = (id: string, status: EnquiryStatus, adminNotes?: string) => {
    setEnquiries((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          return {
            ...e,
            status,
            adminNotes: adminNotes !== undefined ? adminNotes : e.adminNotes
          };
        }
        return e;
      })
    );
    showToast(`Inquiry ${id} updated to status "${status}"`, 'success');
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    showToast(`Inquiry ${id} deleted`, 'info');
  };

  const resetEnquiriesAndMediaToDefault = () => {
    setEnquiries(initialEnquiries);
    setMediaItems(initialMedia);
    localStorage.setItem('mbrc_media_v4', JSON.stringify(initialMedia));
    localStorage.setItem('mbrc_enquiries_v4', JSON.stringify(initialEnquiries));
    showToast('Inquiries pipeline and Media library refreshed with master records', 'success');
  };

  // Auth Operations
  const adminLogin = (pass: string) => {
    if (pass === 'mbrc2021' || pass === 'admin123' || pass === 'admin' || pass === 'mbrc') {
      setIsAdminAuthenticated(true);
      showToast('Authenticated: Welcome to MBRC Administration CMS', 'success');
      return true;
    }
    showToast('Invalid administrative passcode. Please try again.', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    setActiveAppView('website');
    showToast('Admin session logged out successfully', 'info');
  };

  const customerLogin = (email: string, enquiryId?: string) => {
    if (!email || !email.includes('@')) {
      showToast('Please provide a valid email address', 'error');
      return false;
    }
    const name = email.split('@')[0].replace('.', ' ');
    setCustomerUser({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email,
      enquiryId
    });
    showToast('Signed in to Client Tracking Portal', 'success');
    return true;
  };

  const customerLogout = () => {
    setCustomerUser(null);
    setActiveAppView('website');
    showToast('Client session signed out', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activeAppView,
        setActiveAppView,
        publicPage,
        setPublicPage,
        selectedServiceId,
        setSelectedServiceId,
        scrollToSection,

        content,
        updateContent,
        resetContentToDefault,

        qualitySafety,
        updateQualitySafety,

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

        projects,
        addProject,
        updateProject,
        deleteProject,
        togglePublishProject,

        mediaItems,
        addMediaItem,
        updateMediaItem,
        deleteMediaItem,
        togglePublishMedia,

        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        resetEnquiriesAndMediaToDefault,

        selectedProject,
        setSelectedProject,
        selectedMedia,
        setSelectedMedia,
        selectedDirector,
        setSelectedDirector,
        isEnquiryModalOpen,
        setIsEnquiryModalOpen,
        prefilledWorkType,
        setPrefilledWorkType,

        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        customerUser,
        customerLogin,
        customerLogout,

        toasts,
        showToast
      }}
    >
      {children}

      {/* Global Toast System */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-sm shadow-2xl text-xs font-semibold flex items-center gap-3 border ${
              toast.type === 'success'
                ? 'bg-[#0B111E] text-white border-amber-500/60 shadow-amber-500/10'
                : toast.type === 'error'
                ? 'bg-rose-950 text-white border-rose-600'
                : 'bg-slate-900 text-white border-slate-700'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                toast.type === 'success'
                  ? 'bg-amber-400'
                  : toast.type === 'error'
                  ? 'bg-rose-400'
                  : 'bg-blue-400'
              }`}
            />
            <span className="flex-1">{toast.message}</span>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
