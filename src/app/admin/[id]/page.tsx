"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditBikePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    modelYear: "",
    category: "",
    engineCc: "",
    powerHp: "",
    torqueNm: "",
    topSpeedKmh: "",
    weightKg: "",
    price: "",
    description: "",
    status: "draft",
  });

  useEffect(() => {
    async function loadBike() {
      const res = await fetch(`/api/bikes/${id}`);
      const bike = await res.json();
      setForm({
        name: bike.name ?? "",
        brand: bike.brand ?? "",
        modelYear: String(bike.modelYear ?? ""),
        category: bike.category ?? "",
        engineCc: String(bike.engineCc ?? ""),
        powerHp: bike.powerHp ? String(bike.powerHp) : "",
        torqueNm: bike.torqueNm ? String(bike.torqueNm) : "",
        topSpeedKmh: bike.topSpeedKmh ? String(bike.topSpeedKmh) : "",
        weightKg: bike.weightKg ? String(bike.weightKg) : "",
        price: bike.price ? String(bike.price) : "",
        description: bike.description ?? "",
        status: bike.status ?? "draft",
      });
      setLoadingData(false);
    }
    loadBike();
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch(`/api/bikes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);
    router.push("/admin");
  }

  async function handleDelete() {
    const confirmed = confirm("Delete this bike? This cannot be undone.");
    if (!confirmed) return;

    await fetch(`/api/bikes/${id}`, { method: "DELETE" });
    router.push("/admin");
  }

  const inputClass =
    "w-full bg-garage-black border border-garage-border rounded-md px-3 py-2.5 text-sm font-body placeholder:text-garage-muted focus:outline-none focus:border-garage-accent transition-colors";

  if (loadingData) {
    return (
      <main className="max-w-lg mx-auto px-6 py-16">
        <p className="font-body text-garage-muted">Loading...</p>
      </main>
    );
  }

  return (
    <main className="max-w-lg mx-auto px-6 py-16">
      <p className="font-data text-xs tracking-[0.3em] text-garage-accent uppercase mb-2">
        Admin
      </p>
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight mb-8">
        Edit Bike
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className={inputClass}
        />
        <input
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          required
          className={inputClass}
        />
        <input
          name="modelYear"
          placeholder="Model Year"
          value={form.modelYear}
          onChange={handleChange}
          required
          className={inputClass}
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
          className={inputClass}
        />
        <input
          name="engineCc"
          placeholder="Engine CC"
          value={form.engineCc}
          onChange={handleChange}
          required
          className={inputClass}
        />
        <input
          name="powerHp"
          placeholder="Power (HP)"
          value={form.powerHp}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="torqueNm"
          placeholder="Torque (Nm)"
          value={form.torqueNm}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="topSpeedKmh"
          placeholder="Top Speed (km/h)"
          value={form.topSpeedKmh}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="weightKg"
          placeholder="Weight (kg)"
          value={form.weightKg}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className={inputClass}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          rows={4}
          className={inputClass}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="font-body text-sm px-5 py-3 rounded-md bg-garage-accent text-garage-black font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <button
        onClick={handleDelete}
        className="font-body text-sm w-full mt-4 px-5 py-3 rounded-md border border-garage-accent text-garage-accent hover:bg-garage-accent hover:text-garage-black transition-colors"
      >
        Delete Bike
      </button>
    </main>
  );
}
