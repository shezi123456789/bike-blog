"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBikePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiQuery, setAiQuery] = useState("");

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
    imageUrl: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleAiFill() {
    if (!aiQuery.trim()) return;
    setAiLoading(true);

    try {
      const res = await fetch("/api/ai/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bikeName: aiQuery }),
      });
      const data = await res.json();

      if (data.error) {
        alert("AI couldn't extract data. Try a more specific bike name.");
        return;
      }

      setForm((prev) => ({
        ...prev,
        name: data.name ?? "",
        brand: data.brand ?? "",
        modelYear: data.modelYear ? String(data.modelYear) : "",
        category: data.category ?? "",
        engineCc: data.engineCc ? String(data.engineCc) : "",
        powerHp: data.powerHp ? String(data.powerHp) : "",
        torqueNm: data.torqueNm ? String(data.torqueNm) : "",
        topSpeedKmh: data.topSpeedKmh ? String(data.topSpeedKmh) : "",
        weightKg: data.weightKg ? String(data.weightKg) : "",
        price: data.price ? String(data.price) : "",
        description: data.description ?? "",
      }));
    } catch (err) {
      alert("Something went wrong calling the AI.");
    } finally {
      setAiLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/bikes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);
    router.push("/admin");
  }

  const inputClass =
    "w-full bg-garage-black border border-garage-border rounded-md px-3 py-2.5 text-sm font-body placeholder:text-garage-muted focus:outline-none focus:border-garage-accent transition-colors";

  return (
    <main className="max-w-lg mx-auto px-6 py-16">
      <p className="font-data text-xs tracking-[0.3em] text-garage-accent uppercase mb-2">
        Admin
      </p>
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight mb-8">
        Add New Bike
      </h1>

      <div className="border border-dashed border-garage-border rounded-lg p-5 mb-8 bg-garage-surface">
        <p className="font-body text-sm text-garage-muted mb-3">
          Type a bike name and let AI fill the form. Review everything before
          saving.
        </p>
        <div className="flex gap-2">
          <input
            placeholder="e.g. Yamaha R15 V4"
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            className={inputClass}
          />
          <button
            type="button"
            onClick={handleAiFill}
            disabled={aiLoading}
            className="font-body text-sm px-5 py-2.5 rounded-md bg-garage-accent text-garage-black font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
          >
            {aiLoading ? "Thinking..." : "Fill with AI"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          placeholder="Name (e.g. R15)"
          value={form.name}
          onChange={handleChange}
          required
          className={inputClass}
        />
        <input
          name="brand"
          placeholder="Brand (e.g. Yamaha)"
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
          placeholder="Category (e.g. Sport)"
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
          placeholder="Power (HP) - optional"
          value={form.powerHp}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="torqueNm"
          placeholder="Torque (Nm) - optional"
          value={form.torqueNm}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="topSpeedKmh"
          placeholder="Top Speed (km/h) - optional"
          value={form.topSpeedKmh}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="weightKg"
          placeholder="Weight (kg) - optional"
          value={form.weightKg}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="price"
          placeholder="Price - optional"
          value={form.price}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="imageUrl"
          placeholder="Image URL - optional (paste a link)"
          value={form.imageUrl}
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

        <button
          type="submit"
          disabled={loading}
          className="font-body text-sm px-5 py-3 rounded-md bg-garage-accent text-garage-black font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
        >
          {loading ? "Saving..." : "Save Bike"}
        </button>
      </form>
    </main>
  );
}
