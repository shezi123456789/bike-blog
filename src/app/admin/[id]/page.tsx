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

  if (loadingData) {
    return <main style={{ padding: "40px" }}>Loading...</main>;
  }

  return (
    <main style={{ padding: "40px", maxWidth: "500px" }}>
      <h1
        style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Edit Bike
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="brand"
          placeholder="Brand"
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
          placeholder="Category"
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
          placeholder="Power (HP)"
          value={form.powerHp}
          onChange={handleChange}
        />
        <input
          name="torqueNm"
          placeholder="Torque (Nm)"
          value={form.torqueNm}
          onChange={handleChange}
        />
        <input
          name="topSpeedKmh"
          placeholder="Top Speed (km/h)"
          value={form.topSpeedKmh}
          onChange={handleChange}
        />
        <input
          name="weightKg"
          placeholder="Weight (kg)"
          value={form.weightKg}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
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

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: "10px", marginTop: "8px" }}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <button
        onClick={handleDelete}
        style={{
          padding: "10px",
          marginTop: "16px",
          color: "red",
          border: "1px solid red",
        }}
      >
        Delete Bike
      </button>
    </main>
  );
}
