import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full space-y-10">
        {/* Header */}
        <section className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Full-Stack RBAC Demo App
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A demo application built with Next.js, Node.js, JWT-based Role
            Based Access Control, and server-side pagination.
          </p>
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* RBAC */}
          <div className="bg-white rounded-xl shadow p-6 space-y-3">
            <h2 className="text-lg font-semibold">🔐 RBAC Demo</h2>
            <p className="text-sm text-gray-600">
              Authenticate users with different roles and access protected
              backend APIs using Bearer tokens.
            </p>
            <p className="text-xs text-gray-500">
              Access: All Roles
            </p>
            <Link
              href="/rbac"
              className="inline-block mt-2 text-sm text-blue-600 hover:underline"
            >
              Open RBAC Demo →
            </Link>
          </div>

          {/* Users */}
          <div className="bg-white rounded-xl shadow p-6 space-y-3">
            <h2 className="text-lg font-semibold">👥 Users Management</h2>
            <p className="text-sm text-gray-600">
              Server-side pagination with protected routes accessible
              only to authorized roles.
            </p>
            <p className="text-xs text-gray-500">
              Access: Admin Only
            </p>
            <Link
              href="/users"
              className="inline-block mt-2 text-sm text-blue-600 hover:underline"
            >
              View Users →
            </Link>
          </div>

          {/* Version */}
          <div className="bg-white rounded-xl shadow p-6 space-y-3">
            <h2 className="text-lg font-semibold">⚙️ API Version</h2>
            <p className="text-sm text-gray-600">
              Public endpoint to verify backend health and versioning.
            </p>
            <p className="text-xs text-gray-500">
              Access: Public
            </p>
            <Link
              href="/version"
              className="inline-block mt-2 text-sm text-blue-600 hover:underline"
            >
              Check Version →
            </Link>
          </div>

          {/* Coming Soon */}
          <div className="bg-white rounded-xl shadow p-6 space-y-3 opacity-70">
            <h2 className="text-lg font-semibold">🚧 Coming Soon</h2>
            <p className="text-sm text-gray-600">
              More features like filtering, audit logs, and analytics
              will be added next.
            </p>
            <p className="text-xs text-gray-500">
              Stay tuned
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400">
          Built with Next.js · Node.js · JWT · RBAC · Pagination
        </footer>
      </div>
    </main>
  );
}
