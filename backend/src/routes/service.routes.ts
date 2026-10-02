import { Router } from "express";
import { prisma } from "../config/database";

const router = Router();

router.get("/", async (_req, res) => {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { displayOrder: "asc" },
  });
  res.json(services);
});

export default router;
