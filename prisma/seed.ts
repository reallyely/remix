import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  ["default"].map(
    async (location) =>
      await prisma.location.upsert({
        where: { title: location },
        create: {
          title: location,
        },
        update: { title: location },
      })
  );
  ["TS/SCI", "TS", "Secret"].map(
    async (clearance) =>
      await prisma.clearance.upsert({
        where: { title: clearance },
        create: {
          title: clearance,
        },
        update: { title: clearance },
      })
  );

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
