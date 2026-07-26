import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const bikes = await prisma.bike.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(bikes);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const bike = await prisma.bike.create({
    data: {
      name: body.name,
      brand: body.brand,
      modelYear: Number(body.modelYear),
      category: body.category,
      engineCc: Number(body.engineCc),
      powerHp: body.powerHp ? Number(body.powerHp) : null,
      torqueNm: body.torqueNm ? Number(body.torqueNm) : null,
      topSpeedKmh: body.topSpeedKmh ? Number(body.topSpeedKmh) : null,
      weightKg: body.weightKg ? Number(body.weightKg) : null,
      price: body.price ? Number(body.price) : null,
      description: body.description,
      status: "draft",
    },
  });

  return NextResponse.json(bike);
}
