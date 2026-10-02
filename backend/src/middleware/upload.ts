import multer from "multer";
import { env } from "../env";
import { AppError } from "./error";
const OK = ["image/jpeg","image/png","image/webp","image/gif","application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024, files: 10 },
  fileFilter: (_r, f, cb) => OK.includes(f.mimetype) ? cb(null, true) : cb(new AppError(400, `Type not allowed: ${f.mimetype}`)),
});
