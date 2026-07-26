import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminPage() {
  const bikes = await prisma.bike.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10 border-b border-garage-border pb-6">
        <div>
          <p className="font-data text-xs tracking-[0.3em] text-garage-accent uppercase mb-2">
            Admin
          </p>
          <h1 className="font-display text-4xl font-bold uppercase tracking-tight">
            Bikes
          </h1>
        </div>
        <Link
          href="/admin/new"
          className="font-body text-sm px-5 py-2.5 rounded-md bg-garage-accent text-garage-black font-semibold hover:opacity-90 transition-opacity"
        >
          + Add New Bike
        </Link>
      </div>

      {bikes.length === 0 ? (
        <p className="font-body text-garage-muted">
          No bikes yet. Add your first one.
        </p>
      ) : (
        <div className="border border-garage-border rounded-lg overflow-hidden">
          <table className="w-full font-body text-sm">
            <thead>
              <tr className="bg-garage-surface text-left border-b border-garage-border">
                <th className="p-4 font-data text-xs uppercase tracking-wider text-garage-muted">
                  Name
                </th>
                <th className="p-4 font-data text-xs uppercase tracking-wider text-garage-muted">
                  Brand
                </th>
                <th className="p-4 font-data text-xs uppercase tracking-wider text-garage-muted">
                  Year
                </th>
                <th className="p-4 font-data text-xs uppercase tracking-wider text-garage-muted">
                  Status
                </th>
                <th className="p-4 font-data text-xs uppercase tracking-wider text-garage-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bikes.map((bike) => (
                <tr
                  key={bike.id}
                  className="border-b border-garage-border last:border-0 hover:bg-garage-surface/50 transition-colors"
                >
                  <td className="p-4">{bike.name}</td>
                  <td className="p-4 text-garage-muted">{bike.brand}</td>
                  <td className="p-4 text-garage-muted">{bike.modelYear}</td>
                  <td className="p-4">
                    <span
                      className={`font-data text-[10px] uppercase tracking-wider px-2 py-1 rounded ${
                        bike.status === "published"
                          ? "bg-garage-accent/20 text-garage-accent"
                          : "bg-garage-border text-garage-muted"
                      }`}
                    >
                      {bike.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link
                      href={`/admin/${bike.id}`}
                      className="text-garage-accent hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
