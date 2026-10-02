import { Router } from "express";
import { prisma } from "../config/database";
import { generateEnquiryReference } from "../utils/reference";
import { createEnquirySchema, trackEnquirySchema } from "../validators/enquiry.validator";
import { validate } from "../middleware/validate";
import { enquiryLimiter } from "../middleware/rateLimit";
const r = Router();
r.use(enquiryLimiter);
r.post("/", validate(createEnquirySchema), async (req, res) => {
  const ref = await generateEnquiryReference();
  const e = await prisma.enquiry.create({ data: { ...req.body, referenceId: ref, status: "New" } });
  res.status(201).json({ referenceId: e.referenceId, id: e.id });
});
r.post("/track", validate(trackEnquirySchema), async (req, res) => {
  const { query } = req.body;
  const e = await prisma.enquiry.findFirst({
    where: { OR: [{ referenceId: query }, { mobile: { contains: query } }, { email: query.toLowerCase() }] },
    include: { files: true },
  });
  if (!e) return res.status(404).json({ error: "Not found" });
  res.json(e);
});
export default r;
