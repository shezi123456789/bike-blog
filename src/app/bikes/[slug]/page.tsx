import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function BikeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const bike = await prisma.bike.findUnique({
    where: { slug },
  });

  if (!bike || bike.status !== "published") {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/"
        className="font-data text-xs tracking-[0.2em] text-garage-accent uppercase hover:underline"
      >
        ← Back to all bikes
      </Link>

      <div className="mt-6 mb-10 border-b border-garage-border pb-8">
        <span className="font-data text-xs tracking-[0.2em] text-garage-accent uppercase">
          {bike.category}
        </span>
        <h1 className="font-display text-5xl font-bold uppercase tracking-tight mt-2">
          {bike.brand} {bike.name}
        </h1>
        <p className="font-body text-garage-muted mt-2">{bike.modelYear}</p>
      </div>

      <p className="font-body text-base leading-relaxed mb-10">
        {bike.description}
      </p>

      <div>
        <h2 className="font-data text-xs tracking-[0.2em] text-garage-accent uppercase mb-4">
          Spec Plate
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 border border-garage-border rounded-lg overflow-hidden font-data text-center bg-garage-surface">
          <div className="p-4 border-r border-b sm:border-b-0 border-garage-border">
            <p className="text-[10px] text-garage-muted uppercase tracking-wider">
              Engine
            </p>
            <p className="text-lg font-semibold mt-1">{bike.engineCc}cc</p>
          </div>
          <div className="p-4 border-b sm:border-b-0 sm:border-r border-garage-border">
            <p className="text-[10px] text-garage-muted uppercase tracking-wider">
              Power
            </p>
            <p className="text-lg font-semibold mt-1">
              {bike.powerHp ? `${bike.powerHp}hp` : "—"}
            </p>
          </div>
          <div className="p-4 border-r border-garage-border">
            <p className="text-[10px] text-garage-muted uppercase tracking-wider">
              Torque
            </p>
            <p className="text-lg font-semibold mt-1">
              {bike.torqueNm ? `${bike.torqueNm}Nm` : "—"}
            </p>
          </div>
          <div className="p-4 border-r border-b sm:border-b-0 border-garage-border">
            <p className="text-[10px] text-garage-muted uppercase tracking-wider">
              Top Speed
            </p>
            <p className="text-lg font-semibold mt-1">
              {bike.topSpeedKmh ? `${bike.topSpeedKmh}km/h` : "—"}
            </p>
          </div>
          <div className="p-4 border-b sm:border-b-0 sm:border-r border-garage-border">
            <p className="text-[10px] text-garage-muted uppercase tracking-wider">
              Weight
            </p>
            <p className="text-lg font-semibold mt-1">
              {bike.weightKg ? `${bike.weightKg}kg` : "—"}
            </p>
          </div>
          <div className="p-4">
            <p className="text-[10px] text-garage-muted uppercase tracking-wider">
              Price
            </p>
            <p className="text-lg font-semibold mt-1">
              {bike.price ? `${bike.price}` : "—"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
