import { Router } from "express";
import { prisma } from "../config/database";

const router = Router();

router.get("/", async (_req, res) => {
  const projects = await prisma.project.findMany({
    where: { published: true },
    include: { images: true },
    orderBy: { displayOrder: "asc" },
  });
  res.json(projects);
});

router.get("/:id", async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { id: req.params.id },
    include: { images: true },
  });
  if (!project) return res.status(404).json({ error: "Not found" });
  res.json(project);
});

export default router;
