import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  const providers =
    await prisma.provider.findMany({
      include: {
        assignedLeads: {
          include: {
            lead: true
          }
        }
      }
    });

  return NextResponse.json(providers);
}