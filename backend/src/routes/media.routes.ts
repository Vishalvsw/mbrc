import { Router } from "express";
import { prisma } from "../config/database";

const router = Router();

router.get("/", async (req, res) => {
  const { category } = req.query;
  const where: any = { published: true };
  if (category) where.category = category;

  const media = await prisma.mediaItem.findMany({
    where,
    orderBy: { displayOrder: "asc" },
  });
  res.json(media);
});

router.get("/:id", async (req, res) => {
  const item = await prisma.mediaItem.findUnique({
    where: { id: req.params.id },
  });
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

export default router;
