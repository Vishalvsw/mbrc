import { prisma } from "../config/database";
import { hashPassword } from "../utils/password";
import { logger } from "../utils/logger";

async function main() {
  logger.info("🌱 Seeding...");
  const email = process.env.ADMIN_EMAIL || "admin@mbrc.com";
  const pass = process.env.ADMIN_PASSWORD || "mbrc2021";
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash: await hashPassword(pass), role: "admin", name: "MBRC Admin" },
  });
  logger.info(`👤 Admin: ${email} / ${pass}`);

  const defaults: Record<string,string> = {
    hero_headline: "Building Infrastructure. Connecting Communities.",
    hero_tagline: "Class-I EPC Contractor",
    cin_number: "U45200KA2021PTC123456",
    contact_phone: "+91 98450 12345",
    contact_email: "contact@mbrc.com",
    contact_address: "Khudavandpoor, Bhalki, Bidar, Karnataka",
    working_hours: "Mon–Sat, 9:00 AM – 6:00 PM",
    managing_director: "Riyaz Ahmed",
    whatsapp_number: "+919845012345",
  };
  for (const [key, value] of Object.entries(defaults))
    await prisma.content.upsert({ where: { key }, update: {}, create: { key, value } });
  logger.info(`📝 ${Object.keys(defaults).length} content entries`);
  logger.info("✅ Seed complete");
}
main().catch((e) => { logger.error({ e }, "❌ Seed failed"); process.exit(1); }).finally(() => prisma.$disconnect());
