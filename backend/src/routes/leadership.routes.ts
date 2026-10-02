import { Router } from "express";
import { prisma } from "../config/database";

const router = Router();

router.get("/", async (_req, res) => {
  const leaders = await prisma.leadership.findMany({
    where: { published: true },
    orderBy: { displayOrder: "asc" },
  });
  res.json(leaders);
});

export default router;
