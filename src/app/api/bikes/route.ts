import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const bikes = await prisma.bike.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(bikes);
}

function slugify(brand: string, name: string) {
  return `${brand}-${name}`
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const baseSlug = slugify(body.brand, body.name);

  let slug = baseSlug;
  let counter = 1;
  while (await prisma.bike.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  const bike = await prisma.bike.create({
    data: {
      name: body.name,
      slug,
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
      imageUrl: body.imageUrl || null,
      status: "draft",
    },
  });

  return NextResponse.json(bike);
}
