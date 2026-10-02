import { z } from "zod";
export const createEnquirySchema = z.object({
  customerName: z.string().min(2).max(255),
  company: z.string().max(255).optional(),
  mobile: z.string().min(8).max(20),
  email: z.string().email(),
  projectType: z.string().min(2).max(100),
  projectLocation: z.string().max(255).optional(),
  message: z.string().max(5000).optional(),
});
export const updateEnquirySchema = z.object({
  status: z.enum(["New","Contacted","In Progress","Quotation Sent","Won","Lost","Closed"]).optional(),
  adminNotes: z.string().max(10000).optional(),
});
export const trackEnquirySchema = z.object({ query: z.string().min(3) });
