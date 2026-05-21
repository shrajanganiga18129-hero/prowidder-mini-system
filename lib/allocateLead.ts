import { prisma } from "./prisma";

const pools: Record<number, number[]> = {
  1: [2,3,4],
  2: [6,7,8],
  3: [2,3,5,6,7,8]
};

const mandatory: Record<number, number[]> = {
  1: [1],
  2: [5],
  3: [1,4]
};

export async function allocateLead(leadId:number, serviceId:number) {

  return prisma.$transaction(async (tx) => {

    const assigned = new Set<number>();

    const mandatoryProviders = mandatory[serviceId];

    for (const providerId of mandatoryProviders) {

      const provider = await tx.provider.findUnique({
        where: { id: providerId },
        include: {
          assignedLeads: true
        }
      });

      if (
        provider &&
        provider.assignedLeads.length < provider.monthlyQuota
      ) {
        assigned.add(providerId);

        await tx.leadAssignment.create({
          data: {
            leadId,
            providerId,
          },
        });
      }
    }

    const remaining = 3 - assigned.size;

    if (remaining <= 0) return;

    const state = await tx.allocationState.findUnique({
      where: { id: 1 },
    });

    const pool = pools[serviceId];

    let index =
      serviceId === 1
        ? state!.service1Idx
        : serviceId === 2
        ? state!.service2Idx
        : state!.service3Idx;

    let count = 0;

    while (count < remaining) {

      const providerId = pool[index % pool.length];

      index++;

      if (assigned.has(providerId))
        continue;

      const provider = await tx.provider.findUnique({
        where: { id: providerId },
        include: {
          assignedLeads: true
        }
      });

      if (
        provider &&
        provider.assignedLeads.length < provider.monthlyQuota
      ) {

        assigned.add(providerId);

        await tx.leadAssignment.create({
          data: {
            leadId,
            providerId,
          },
        });

        count++;
      }
    }

    if (serviceId === 1) {
      await tx.allocationState.update({
        where: { id: 1 },
        data: { service1Idx: index },
      });
    }

    if (serviceId === 2) {
      await tx.allocationState.update({
        where: { id: 1 },
        data: { service2Idx: index },
      });
    }

    if (serviceId === 3) {
      await tx.allocationState.update({
        where: { id: 1 },
        data: { service3Idx: index },
      });
    }
  });
}