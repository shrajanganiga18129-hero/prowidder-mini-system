import { prisma } from "@/lib/prisma";
import { allocateLead } from "@/lib/allocateLead";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const lead = await prisma.lead.create({
      data: body,
    });

    await allocateLead(
      lead.id,
      lead.serviceId
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error:any) {

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 400 }
    );
  }
}