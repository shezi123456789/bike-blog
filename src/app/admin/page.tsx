import { prisma } from "@/lib/prisma";

export default async function Home() {
  const bikes = await prisma.bike.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-12 border-b border-garage-border pb-8">
        <p className="font-data text-xs tracking-[0.3em] text-garage-accent uppercase mb-2">
          Est. Garage Archive
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight uppercase">
          Bike Blog
        </h1>
        <p className="font-body text-garage-muted mt-3 max-w-md">
          Specs, stories, and everything worth knowing before you throw a leg
          over.
        </p>
      </header>

      {bikes.length === 0 ? (
        <p className="font-body text-garage-muted">
          No bikes published yet. Check back soon.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {bikes.map((bike) => (
            <article
              key={bike.id}
              className="border border-garage-border rounded-lg overflow-hidden bg-garage-surface hover:border-garage-accent transition-colors"
            >
              <div className="p-5">
                <span className="font-data text-[10px] tracking-[0.2em] text-garage-accent uppercase">
                  {bike.category}
                </span>
                <h2 className="font-display text-2xl font-semibold uppercase mt-1">
                  {bike.brand} {bike.name}
                </h2>
                <p className="font-body text-sm text-garage-muted mt-1">
                  {bike.modelYear}
                </p>
                <p className="font-body text-sm mt-3 leading-relaxed">
                  {bike.description}
                </p>
              </div>

              <div className="grid grid-cols-3 border-t border-garage-border font-data text-center">
                <div className="p-3 border-r border-garage-border">
                  <p className="text-[10px] text-garage-muted uppercase tracking-wider">
                    Engine
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    {bike.engineCc}cc
                  </p>
                </div>
                <div className="p-3 border-r border-garage-border">
                  <p className="text-[10px] text-garage-muted uppercase tracking-wider">
                    Power
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    {bike.powerHp ? `${bike.powerHp}hp` : "—"}
                  </p>
                </div>
                <div className="p-3">
                  <p className="text-[10px] text-garage-muted uppercase tracking-wider">
                    Top Speed
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    {bike.topSpeedKmh ? `${bike.topSpeedKmh}km/h` : "—"}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
