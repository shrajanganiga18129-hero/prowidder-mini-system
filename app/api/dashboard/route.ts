import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    const providers =
      await prisma.provider.findMany({
        include: {
          assignedLeads: {
            include: {
              lead: true,
            },
          },
        },
      });

    return NextResponse.json(providers);

  } catch (error) {

    return NextResponse.json(
      {
        error: "Failed to fetch dashboard data",
      },
      {
        status: 500,
      }
    );
  }
}