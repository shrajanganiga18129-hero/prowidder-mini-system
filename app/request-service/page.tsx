"use client";

import { useState } from "react";

export default function RequestServicePage() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    description: "",
    serviceId: "1",
  });

  const [message, setMessage] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setMessage("");

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        serviceId: Number(formData.serviceId),
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Lead submitted successfully");

      setFormData({
        name: "",
        phone: "",
        city: "",
        description: "",
        serviceId: "1",
      });

    } else {

      setMessage(
        data.error || "Something went wrong"
      );
    }
  }

  return (

    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Request Service
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value,
            })
          }
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={(e) =>
            setFormData({
              ...formData,
              city: e.target.value,
            })
          }
          className="w-full border p-3 rounded"
          required
        />

        <select
          value={formData.serviceId}
          onChange={(e) =>
            setFormData({
              ...formData,
              serviceId: e.target.value,
            })
          }
          className="w-full border p-3 rounded"
        >

          <option value="1">
            Service 1
          </option>

          <option value="2">
            Service 2
          </option>

          <option value="3">
            Service 3
          </option>

        </select>

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          className="w-full border p-3 rounded"
          rows={4}
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Submit Lead
        </button>

      </form>

      {message && (

        <p className="mt-4">
          {message}
        </p>
      )}

    </div>
  );
}