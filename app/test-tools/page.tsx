"use client";

import { useState } from "react";

export default function TestToolsPage() {

  const [message, setMessage] = useState("");

  async function resetQuota() {

    const res = await fetch(
      "/api/webhook/reset-quota",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idempotencyKey:
            "reset-" + Date.now(),
        }),
      }
    );

    const data = await res.json();

    setMessage(data.message || "Quota reset");
  }

  async function testIdempotency() {

    const key = "same-key";

    await fetch(
      "/api/webhook/reset-quota",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idempotencyKey: key,
        }),
      }
    );

    const res = await fetch(
      "/api/webhook/reset-quota",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idempotencyKey: key,
        }),
      }
    );

    const data = await res.json();

    setMessage(
      data.message ||
      "Idempotency tested"
    );
  }

  async function generateLeads() {

    const requests = [];

    for (let i = 0; i < 10; i++) {

      requests.push(

        fetch("/api/leads", {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: `Test User ${i}`,
            phone:
              `99999999${i}`,
            city: "Mumbai",
            description:
              "Test lead",
            serviceId:
              (i % 3) + 1,
          }),
        })
      );
    }

    await Promise.all(requests);

    setMessage(
      "10 concurrent leads generated"
    );
  }

  return (

    <div className="p-6 max-w-xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Test Tools
      </h1>

      <div className="space-y-4">

        <button
          onClick={resetQuota}
          className="bg-black text-white px-4 py-3 rounded w-full"
        >
          Reset Provider Quota
        </button>

        <button
          onClick={testIdempotency}
          className="bg-black text-white px-4 py-3 rounded w-full"
        >
          Call Webhook Multiple Times
        </button>

        <button
          onClick={generateLeads}
          className="bg-black text-white px-4 py-3 rounded w-full"
        >
          Generate 10 Leads Instantly
        </button>

      </div>

      {message && (

        <p className="mt-6">
          {message}
        </p>
      )}

    </div>
  );
}