"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBikePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
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

  return (
    <main style={{ padding: "40px", maxWidth: "500px" }}>
      <h1
        style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Add New Bike
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <input
          name="name"
          placeholder="Name (e.g. R15)"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="brand"
          placeholder="Brand (e.g. Yamaha)"
          value={form.brand}
          onChange={handleChange}
          required
        />
        <input
          name="modelYear"
          placeholder="Model Year"
          value={form.modelYear}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category (e.g. Sport)"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          name="engineCc"
          placeholder="Engine CC"
          value={form.engineCc}
          onChange={handleChange}
          required
        />
        <input
          name="powerHp"
          placeholder="Power (HP) - optional"
          value={form.powerHp}
          onChange={handleChange}
        />
        <input
          name="torqueNm"
          placeholder="Torque (Nm) - optional"
          value={form.torqueNm}
          onChange={handleChange}
        />
        <input
          name="topSpeedKmh"
          placeholder="Top Speed (km/h) - optional"
          value={form.topSpeedKmh}
          onChange={handleChange}
        />
        <input
          name="weightKg"
          placeholder="Weight (kg) - optional"
          value={form.weightKg}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price - optional"
          value={form.price}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          rows={4}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ padding: "10px", marginTop: "8px" }}
        >
          {loading ? "Saving..." : "Save Bike"}
        </button>
      </form>
    </main>
  );
}
