import { prisma } from "../config/database";
import { logger } from "../utils/logger";

// Import from copied frontend data
// @ts-ignore - allow importing outside tsconfig rootDir for seed
import {
  initialServices,
  initialProjects,
  initialLeadership,
  initialMedia,
  initialMachinery,
} from "./frontend-data";

async function seedServices() {
  logger.info("🌱 Seeding services...");
  for (const s of initialServices) {
    await prisma.service.upsert({
      where: { id: s.id },
      update: {
        title: s.title,
        shortDesc: s.shortDesc,
        description: s.description,
        iconName: s.iconName,
        imageUrl: s.image,
        subServices: s.subServices || [],
        specifications: (s as any).specifications || [],
        published: true,
      },
      create: {
        id: s.id,
        title: s.title,
        shortDesc: s.shortDesc,
        description: s.description,
        iconName: s.iconName,
        imageUrl: s.image,
        subServices: s.subServices || [],
        specifications: (s as any).specifications || [],
        published: true,
        displayOrder: 0,
      },
    });
  }
  logger.info(`✅ ${initialServices.length} services seeded`);
}

async function seedProjects() {
  logger.info("🌱 Seeding projects...");
  for (const p of initialProjects) {
    await prisma.project.upsert({
      where: { id: p.id },
      update: {
        name: p.name,
        category: p.category,
        location: p.location,
        projectType: p.projectType,
        description: p.description,
        client: p.client,
        completionYear: String(p.completionYear),
        lengthKm: p.lengthKm,
        valueCr: p.valueCr,
        status: p.status,
        published: p.published !== false,
      },
      create: {
        id: p.id,
        name: p.name,
        category: p.category,
        location: p.location,
        projectType: p.projectType,
        description: p.description,
        client: p.client,
        completionYear: String(p.completionYear),
        lengthKm: p.lengthKm,
        valueCr: p.valueCr,
        status: p.status,
        published: p.published !== false,
        displayOrder: 0,
      },
    });

    // Project images
    if (p.images && p.images.length > 0) {
      await prisma.projectImage.deleteMany({ where: { projectId: p.id } });
      await prisma.projectImage.createMany({
        data: p.images.map((url, idx) => ({
          projectId: p.id,
          imageUrl: url,
          displayOrder: idx,
        })),
      });
    }
  }
  logger.info(`✅ ${initialProjects.length} projects seeded`);
}

async function seedLeadership() {
  logger.info("🌱 Seeding leadership...");
  for (const l of initialLeadership) {
    await prisma.leadership.upsert({
      where: { id: l.id },
      update: {
        name: l.name,
        title: l.title,
        bio: l.bio,
        statement: l.statement,
        imageUrl: l.image,
        focusAreas: l.focus || [],
        experienceYears: l.experienceYears,
        published: true,
      },
      create: {
        id: l.id,
        name: l.name,
        title: l.title,
        bio: l.bio,
        statement: l.statement,
        imageUrl: l.image,
        focusAreas: l.focus || [],
        experienceYears: l.experienceYears,
        published: true,
        displayOrder: 0,
      },
    });
  }
  logger.info(`✅ ${initialLeadership.length} directors seeded`);
}

async function seedMedia() {
  logger.info("🌱 Seeding media...");
  for (const m of initialMedia) {
    await prisma.mediaItem.upsert({
      where: { id: m.id },
      update: {
        title: m.title,
        description: m.description,
        type: m.type,
        category: m.category,
        url: m.url,
        thumbnailUrl: m.thumbnailUrl,
        fileSize: m.fileSize,
        published: m.published !== false,
      },
      create: {
        id: m.id,
        title: m.title,
        description: m.description,
        type: m.type,
        category: m.category,
        url: m.url,
        thumbnailUrl: m.thumbnailUrl,
        fileSize: m.fileSize,
        published: m.published !== false,
        displayOrder: 0,
      },
    });
  }
  logger.info(`✅ ${initialMedia.length} media items seeded`);
}

async function seedMachinery() {
  logger.info("🌱 Seeding machinery...");
  // Machinery table doesn't exist in Prisma yet — this is a placeholder
  logger.info(`ℹ️  ${initialMachinery.length} machinery items (table not yet migrated)`);
}

async function main() {
  logger.info("════════════════════════════════════════");
  logger.info("🌱 MBRC Real Data Seed Starting");
  logger.info("════════════════════════════════════════");

  await seedServices();
  await seedProjects();
  await seedLeadership();
  await seedMedia();
  await seedMachinery();

  // Summary
  const [services, projects, leadership, media] = await Promise.all([
    prisma.service.count(),
    prisma.project.count(),
    prisma.leadership.count(),
    prisma.mediaItem.count(),
  ]);

  logger.info("════════════════════════════════════════");
  logger.info("📊 Database now contains:");
  logger.info(`   Services:   ${services}`);
  logger.info(`   Projects:   ${projects}`);
  logger.info(`   Leadership: ${leadership}`);
  logger.info(`   Media:      ${media}`);
  logger.info("════════════════════════════════════════");
  logger.info("✅ Seed complete");
}

main()
  .catch((e) => {
    logger.error({ e }, "❌ Seed failed");
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
