import app from "./app";
import { env } from "./env";
import { logger } from "./utils/logger";
import { prisma } from "./config/database";
async function boot() {
  try {
    await prisma.$connect();
    logger.info("✅ Database connected");
    const srv = app.listen(env.PORT, () => logger.info(`🚀 MBRC API on http://localhost:${env.PORT}`));
    const down = async (s: string) => { logger.info(`${s} — shutting down`); srv.close(async () => { await prisma.$disconnect(); process.exit(0); }); };
    process.on("SIGTERM", () => down("SIGTERM"));
    process.on("SIGINT", () => down("SIGINT"));
  } catch (e) { logger.error({ e }, "❌ Failed to start"); process.exit(1); }
}
boot();
