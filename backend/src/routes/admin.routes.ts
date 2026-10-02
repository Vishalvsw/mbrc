import { Router } from "express";
import { prisma } from "../config/database";
import { requireAdmin } from "../middleware/auth";
import { upload } from "../middleware/upload";
import { uploadFile } from "../services/upload.service";
import { updateEnquirySchema } from "../validators/enquiry.validator";
import { validate } from "../middleware/validate";

const r = Router();
r.use(requireAdmin);

/* ENQUIRIES */
r.get("/enquiries", async (req, res) => {
  const { status, search, limit = 100, offset = 0 } = req.query;
  const where: any = {};
  if (status && status !== "All") where.status = status;
  if (search) where.OR = [
    { referenceId: { contains: String(search), mode: "insensitive" } },
    { customerName: { contains: String(search), mode: "insensitive" } },
    { company: { contains: String(search), mode: "insensitive" } },
    { mobile: { contains: String(search) } },
    { email: { contains: String(search), mode: "insensitive" } },
  ];
  const [enquiries, total] = await Promise.all([
    prisma.enquiry.findMany({ where, include: { files: true }, orderBy: { createdAt: "desc" }, take: +limit, skip: +offset }),
    prisma.enquiry.count({ where }),
  ]);
  res.json({ enquiries, total });
});

r.get("/enquiries/:id", async (req, res) => {
  const e = await prisma.enquiry.findUnique({ where: { id: req.params.id }, include: { files: true } });
  if (!e) return res.status(404).json({ error: "Not found" });
  res.json(e);
});

r.patch("/enquiries/:id", validate(updateEnquirySchema), async (req, res) => {
  res.json(await prisma.enquiry.update({ where: { id: req.params.id }, data: req.body }));
});

r.delete("/enquiries/:id", async (req, res) => {
  await prisma.enquiry.delete({ where: { id: req.params.id } });
  res.status(204).end();
});

/* MEDIA */
r.get("/media", async (req, res) => {
  const { category } = req.query;
  const where: any = {};
  if (category && category !== "All") where.category = category;
  res.json(await prisma.mediaItem.findMany({ where, orderBy: { createdAt: "desc" } }));
});

r.post("/media", upload.single("file"), async (req, res) => {
  const { title, description, type, category, url, fileSize } = req.body;
  let finalUrl = url;
  let finalFileSize = fileSize;
  if (req.file) {
    const result = await uploadFile(req.file.buffer, req.file.originalname, category || "media");
    finalUrl = result.url;
    finalFileSize = `${(result.bytes / 1024 / 1024).toFixed(2)} MB`;
  }
  if (!finalUrl) return res.status(400).json({ error: "File or URL required" });
  const item = await prisma.mediaItem.create({
    data: {
      title: title || "Untitled",
      description: description || null,
      type: type || "image",
      category: category || "Projects",
      url: finalUrl,
      fileSize: finalFileSize || null,
      published: true,
    },
  });
  res.status(201).json(item);
});

r.patch("/media/:id", async (req, res) => {
  const { title, description, category, published, displayOrder } = req.body;
  res.json(await prisma.mediaItem.update({
    where: { id: req.params.id },
    data: {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(category !== undefined && { category }),
      ...(published !== undefined && { published }),
      ...(displayOrder !== undefined && { displayOrder }),
    },
  }));
});

r.delete("/media/:id", async (req, res) => {
  await prisma.mediaItem.delete({ where: { id: req.params.id } });
  res.status(204).end();
});

export default r;
