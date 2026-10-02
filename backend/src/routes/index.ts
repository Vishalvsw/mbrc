import { Router } from "express";
import authRoutes from "./auth.routes";
import enquiryRoutes from "./enquiry.routes";
import projectRoutes from "./project.routes";
import mediaRoutes from "./media.routes";
import serviceRoutes from "./service.routes";
import leadershipRoutes from "./leadership.routes";
import contentRoutes from "./content.routes";
import adminRoutes from "./admin.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/enquiries", enquiryRoutes);
router.use("/projects", projectRoutes);
router.use("/media", mediaRoutes);
router.use("/services", serviceRoutes);
router.use("/leadership", leadershipRoutes);
router.use("/content", contentRoutes);
router.use("/admin", adminRoutes);

export default router;
