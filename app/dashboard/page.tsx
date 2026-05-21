"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {

  const [providers, setProviders] = useState<any[]>([]);

  async function fetchDashboard() {

    const res = await fetch("/api/dashboard");

    const data = await res.json();

    setProviders(data);
  }

  useEffect(() => {

    fetchDashboard();

    const interval = setInterval(() => {
      fetchDashboard();
    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Provider Dashboard
      </h1>

      <div className="grid gap-6">

        {providers.map((provider) => {

          const leadsCount =
            provider.assignedLeads.length;

          const remainingQuota =
            provider.monthlyQuota - leadsCount;

          return (

            <div
              key={provider.id}
              className="border p-4 rounded-lg"
            >

              <h2 className="text-xl font-semibold mb-2">
                {provider.name}
              </h2>

              <p>
                Leads Received: {leadsCount}
              </p>

              <p>
                Remaining Quota: {remainingQuota}
              </p>

              <div className="mt-4">

                <h3 className="font-semibold mb-2">
                  Assigned Leads
                </h3>

                {provider.assignedLeads.length === 0 ? (
                  <p>No leads assigned</p>
                ) : (

                  <div className="space-y-2">

                    {provider.assignedLeads.map(
                      (assignment:any) => (

                      <div
                        key={assignment.id}
                        className="border p-2 rounded"
                      >

                        <p>
                          Name: {assignment.lead.name}
                        </p>

                        <p>
                          Phone: {assignment.lead.phone}
                        </p>

                        <p>
                          City: {assignment.lead.city}
                        </p>

                        <p>
                          Service ID:
                          {" "}
                          {assignment.lead.serviceId}
                        </p>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}