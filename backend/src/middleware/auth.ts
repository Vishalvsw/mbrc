import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";
export interface AuthPayload { userId: string; email: string; role: "admin" | "client"; }
export interface AuthRequest extends Request { user?: AuthPayload; }
export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const h = req.headers.authorization;
  if (!h?.startsWith("Bearer ")) return res.status(401).json({ error: "Authentication required" });
  try { req.user = jwt.verify(h.slice(7), env.JWT_SECRET) as AuthPayload; next(); }
  catch { res.status(401).json({ error: "Invalid token" }); }
}
export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  requireAuth(req, res, () => {
    if (req.user?.role !== "admin") return res.status(403).json({ error: "Admin only" });
    next();
  });
}
