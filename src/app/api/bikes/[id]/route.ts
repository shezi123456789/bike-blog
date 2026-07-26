import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const bike = await prisma.bike.findUnique({ where: { id } });
  return NextResponse.json(bike);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();

  const bike = await prisma.bike.update({
    where: { id },
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
      status: body.status,
    },
  });

  return NextResponse.json(bike);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.bike.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
