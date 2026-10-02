import rateLimit from "express-rate-limit";
import { env } from "../env";
export const globalLimiter = rateLimit({ windowMs: env.RATE_LIMIT_WINDOW_MS, max: env.RATE_LIMIT_MAX });
export const enquiryLimiter = rateLimit({ windowMs: 900000, max: env.ENQUIRY_RATE_LIMIT_MAX });
export const authLimiter = rateLimit({ windowMs: 900000, max: 10 });
