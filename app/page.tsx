export default function HomePage() {

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        Prowidder Mini Lead Distribution System
      </h1>

      <p className="text-xl mb-10">
        Full Stack Developer Assignment Project
      </p>

      <div className="space-y-6">

        <a
          href="/request-service"
          className="block p-6 bg-white rounded-lg shadow hover:bg-gray-50"
        >
          <h2 className="text-2xl font-semibold">
            Request Service
          </h2>

          <p className="text-gray-600 mt-2">
            Customer lead submission form
          </p>
        </a>

        <a
          href="/dashboard"
          className="block p-6 bg-white rounded-lg shadow hover:bg-gray-50"
        >
          <h2 className="text-2xl font-semibold">
            Provider Dashboard
          </h2>

          <p className="text-gray-600 mt-2">
            View provider leads and quotas
          </p>
        </a>

        <a
          href="/test-tools"
          className="block p-6 bg-white rounded-lg shadow hover:bg-gray-50"
        >
          <h2 className="text-2xl font-semibold">
            Test Tools
          </h2>

          <p className="text-gray-600 mt-2">
            Webhook and concurrency testing
          </p>
        </a>

      </div>
    </div>
  );
}