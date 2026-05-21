import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  await prisma.service.createMany({
    data: [
      { name: "Service 1" },
      { name: "Service 2" },
      { name: "Service 3" },
    ],
    skipDuplicates: true,
  });

  const providers = [];

  for (let i = 1; i <= 8; i++) {
    providers.push({
      name: `Provider ${i}`,
    });
  }

  await prisma.provider.createMany({
    data: providers,
    skipDuplicates: true,
  });

  await prisma.allocationState.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });
}

main();