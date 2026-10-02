import { Router } from "express";
import { prisma } from "../config/database";
import { verifyPassword } from "../utils/password";
import { signToken } from "../utils/jwt";
import { loginSchema } from "../validators/auth.validator";
import { validate } from "../middleware/validate";
import { authLimiter } from "../middleware/rateLimit";
const r = Router();
r.post("/login", authLimiter, validate(loginSchema), async (req, res) => {
  const { email, password } = req.body;
  const u = await prisma.user.findUnique({ where: { email } });
  if (!u || !(await verifyPassword(password, u.passwordHash))) return res.status(401).json({ error: "Invalid credentials" });
  const token = signToken({ userId: u.id, email: u.email, role: u.role as any });
  res.json({ token, user: { id: u.id, email: u.email, role: u.role, name: u.name } });
});
export default r;
