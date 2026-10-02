import { Router } from "express";
import { prisma } from "../config/database";

const router = Router();

router.get("/", async (_req, res) => {
  const rows = await prisma.content.findMany();
  const map = rows.reduce((acc: any, r) => {
    acc[r.key] = r.value;
    return acc;
  }, {});
  res.json(map);
});

export default router;
