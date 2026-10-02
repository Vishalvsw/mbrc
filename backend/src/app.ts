import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { env } from "./env";
import { logger } from "./utils/logger";
import routes from "./routes";
import { errorHandler } from "./middleware/error";
import { globalLimiter } from "./middleware/rateLimit";
const app = express();
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGINS.split(","), credentials: true }));
app.use(pinoHttp({ logger }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(globalLimiter);
// ---------- Root: API index ----------
app.get("/", (_req, res) => {
  res.json({
    name: "MBRC & Infrastructure API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      health: "GET /health",
      content: "GET /api/content",
      services: "GET /api/services",
      projects: "GET /api/projects",
      leadership: "GET /api/leadership",
      media: "GET /api/media",
      submitEnquiry: "POST /api/enquiries",
      login: "POST /api/auth/login",
    },
  });
});

// ---------- Health check ----------
app.get("/health", (_req, res) => res.json({ ok: true, ts: Date.now() }));

// ---------- API routes ----------
app.use("/api", routes);
app.use(errorHandler);
export default app;
