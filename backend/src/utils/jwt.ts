import jwt from "jsonwebtoken";
import { env } from "../env";
import type { AuthPayload } from "../middleware/auth";
export const signToken = (p: AuthPayload) => jwt.sign(p, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN } as any);
export const verifyToken = (t: string) => jwt.verify(t, env.JWT_SECRET) as AuthPayload;
