const API_URL = (import.meta as any).env?.VITE_API_URL || "http://localhost:4000/api";

export const getToken = () => localStorage.getItem("mbrc_token");
export const setToken = (t: string) => localStorage.setItem("mbrc_token", t);
export const clearToken = () => localStorage.removeItem("mbrc_token");

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (res.status === 204) return undefined as T;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as any)?.error || `Request failed: ${res.status}`);
  return data as T;
}

export const api = {
  getContent: () => request<Record<string, string>>("/content"),
  getServices: () => request<any[]>("/services"),
  getProjects: () => request<any[]>("/projects"),
  getProject: (id: string) => request<any>(`/projects/${id}`),
  getMedia: (category?: string) => request<any[]>(`/media${category ? `?category=${category}` : ""}`),
  getLeadership: () => request<any[]>("/leadership"),
  submitEnquiry: (payload: any) => request<{ referenceId: string; id: string }>("/enquiries", { method: "POST", body: JSON.stringify(payload) }),
  trackEnquiry: (query: string) => request<any>("/enquiries/track", { method: "POST", body: JSON.stringify({ query }) }),
  login: (email: string, password: string) => request<{ token: string; user: any }>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  adminGetEnquiries: (params?: Record<string, any>) => {
    const qs = params ? "?" + new URLSearchParams(params as any).toString() : "";
    return request<{ enquiries: any[]; total: number }>(`/admin/enquiries${qs}`);
  },
  adminUpdateEnquiry: (id: string, data: { status?: string; adminNotes?: string }) =>
    request<any>(`/admin/enquiries/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  adminDeleteEnquiry: (id: string) => request<void>(`/admin/enquiries/${id}`, { method: "DELETE" }),
};
