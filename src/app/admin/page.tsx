import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminPage() {
  const bikes = await prisma.bike.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main style={{ padding: "40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Admin — Bikes</h1>
        <Link
          href="/admin/new"
          style={{
            padding: "10px 16px",
            border: "1px solid #555",
            borderRadius: "6px",
          }}
        >
          + Add New Bike
        </Link>
      </div>

      {bikes.length === 0 ? (
        <p>No bikes yet. Add your first one.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #444" }}>
              <th style={{ padding: "8px" }}>Name</th>
              <th style={{ padding: "8px" }}>Brand</th>
              <th style={{ padding: "8px" }}>Year</th>
              <th style={{ padding: "8px" }}>Status</th>
              <th style={{ padding: "8px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bikes.map((bike) => (
              <tr key={bike.id} style={{ borderBottom: "1px solid #333" }}>
                <td style={{ padding: "8px" }}>{bike.name}</td>
                <td style={{ padding: "8px" }}>{bike.brand}</td>
                <td style={{ padding: "8px" }}>{bike.modelYear}</td>
                <td style={{ padding: "8px" }}>{bike.status}</td>
                <td style={{ padding: "8px" }}>
                  <Link
                    href={`/admin/${bike.id}`}
                    style={{ marginRight: "12px" }}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
