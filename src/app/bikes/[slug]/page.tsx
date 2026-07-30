import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

async function createComment(formData: FormData) {
  "use server";

  const bikeId = formData.get("bikeId");
  const name = formData.get("name");
  const content = formData.get("content");

  if (
    typeof bikeId !== "string" ||
    typeof name !== "string" ||
    typeof content !== "string"
  ) {
    redirect("/");
  }

  const trimmedName = name.trim();
  const trimmedContent = content.trim();

  if (!trimmedName || !trimmedContent) {
    redirect("/");
  }

  const bike = await prisma.bike.findUnique({ where: { id: bikeId } });

  if (!bike) {
    redirect("/");
  }

  const user = await prisma.user.create({
    data: {
      name: trimmedName,
    },
  });

  await prisma.comment.create({
    data: {
      content: trimmedContent,
      bikeId: bike.id,
      userId: user.id,
    },
  });

  revalidatePath(`/bikes/${bike.slug}`);
  revalidatePath("/");
  redirect(`/bikes/${bike.slug}`);
}

export default async function BikeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const bike = await prisma.bike.findUnique({
    where: { slug },
    include: {
      comments: {
        orderBy: { createdAt: "desc" },
        include: { user: true },
      },
    },
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

      <div className="mt-6 mb-8">
        <span className="font-data text-xs tracking-[0.2em] text-garage-accent uppercase">
          {bike.category}
        </span>
        <h1 className="font-display text-5xl font-bold uppercase tracking-tight mt-2">
          {bike.brand} {bike.name}
        </h1>
        <p className="font-body text-garage-muted mt-2">{bike.modelYear}</p>
      </div>

      {bike.imageUrl && (
        <div className="mb-10 rounded-lg overflow-hidden border border-garage-border bg-garage-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bike.imageUrl}
            alt={`${bike.brand} ${bike.name}`}
            className="w-full max-h-[420px] object-cover"
          />
        </div>
      )}

      <div className="border-b border-garage-border pb-8 mb-10">
        <p className="font-body text-base leading-relaxed">
          {bike.description}
        </p>
      </div>

      <div className="mb-10">
        <h2 className="font-data text-xs tracking-[0.2em] text-garage-accent uppercase mb-4">
          Leave a comment
        </h2>
        <form
          action={createComment}
          className="rounded-lg border border-garage-border bg-garage-surface p-5 space-y-4"
        >
          <input type="hidden" name="bikeId" value={bike.id} />
          <div>
            <label className="mb-2 block font-data text-[10px] uppercase tracking-[0.2em] text-garage-muted">
              Your name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full rounded border border-garage-border bg-garage-black px-3 py-2 text-sm text-garage-text outline-none focus:border-garage-accent"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="mb-2 block font-data text-[10px] uppercase tracking-[0.2em] text-garage-muted">
              Comment
            </label>
            <textarea
              name="content"
              rows={4}
              required
              className="w-full rounded border border-garage-border bg-garage-black px-3 py-2 text-sm text-garage-text outline-none focus:border-garage-accent"
              placeholder="Share your thoughts about this bike"
            />
          </div>
          <button
            type="submit"
            className="rounded bg-garage-accent px-4 py-2 font-data text-xs uppercase tracking-[0.2em] text-garage-black transition hover:opacity-90"
          >
            Post comment
          </button>
        </form>
      </div>

      <div>
        <h2 className="font-data text-xs tracking-[0.2em] text-garage-accent uppercase mb-4">
          Comments ({bike.comments.length})
        </h2>
        {bike.comments.length === 0 ? (
          <p className="font-body text-garage-muted">
            No comments yet. Be the first to leave one.
          </p>
        ) : (
          <div className="space-y-4">
            {bike.comments.map((comment) => (
              <article
                key={comment.id}
                className="rounded-lg border border-garage-border bg-garage-surface p-4"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="font-data text-xs uppercase tracking-[0.2em] text-garage-accent">
                    {comment.user.name || "Guest"}
                  </p>
                  <p className="font-body text-xs text-garage-muted">
                    {new Date(comment.createdAt).toLocaleDateString("en", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <p className="font-body text-sm leading-relaxed text-garage-text">
                  {comment.content}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
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
