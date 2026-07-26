import { prisma } from "@/lib/prisma";

export default async function Home() {
  const bikes = await prisma.bike.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main style={{ padding: "40px" }}>
      <h1
        style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "24px" }}
      >
        Bike Blog
      </h1>

      {bikes.length === 0 ? (
        <p>No bikes added yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {bikes.map((bike) => (
            <div
              key={bike.id}
              style={{
                border: "1px solid #333",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <h2 style={{ fontSize: "20px", fontWeight: "600" }}>
                {bike.brand} {bike.name} ({bike.modelYear})
              </h2>
              <p style={{ opacity: 0.8, marginTop: "4px" }}>
                {bike.category} · {bike.engineCc}cc
              </p>
              <p style={{ marginTop: "8px" }}>{bike.description}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
