import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request) {

  const body = await req.json();

  const key = body.idempotencyKey;

  const exists =
    await prisma.webhookEvent.findUnique({
      where: {
        idempotencyKey: key
      }
    });

  if (exists) {
    return NextResponse.json({
      message: "Already processed"
    });
  }

  await prisma.webhookEvent.create({
    data: {
      idempotencyKey: key
    }
  });

  await prisma.provider.updateMany({
    data: {
      monthlyQuota: 10
    }
  });

  return NextResponse.json({
    success: true
  });
}


