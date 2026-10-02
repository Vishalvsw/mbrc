import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();
const s = z.object({
  NODE_ENV: z.enum(["development","production","test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  FRONTEND_URL: z.string().default("http://localhost:3000"),
  CORS_ORIGINS: z.string().default("http://localhost:3000"),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default("7d"),
  BCRYPT_ROUNDS: z.coerce.number().default(10),
  CLOUDINARY_CLOUD_NAME: z.string().default(""),
  CLOUDINARY_API_KEY: z.string().default(""),
  CLOUDINARY_API_SECRET: z.string().default(""),
  CLOUDINARY_FOLDER: z.string().default("mbrc"),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000),
  RATE_LIMIT_MAX: z.coerce.number().default(100),
  ENQUIRY_RATE_LIMIT_MAX: z.coerce.number().default(5),
  MAX_FILE_SIZE_MB: z.coerce.number().default(25),
});
const p = s.safeParse(process.env);
if (!p.success) { console.error("Invalid env:", p.error.flatten().fieldErrors); process.exit(1); }
export const env = p.data;
