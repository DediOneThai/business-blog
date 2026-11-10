import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const stats = [
    { label: "Total Articles", value: "—", href: "/admin/articles" },
    { label: "Published", value: "—", href: "/admin/articles?status=published" },
    { label: "Drafts", value: "—", href: "/admin/articles?status=draft" },
    { label: "Active Ads", value: "—", href: "/admin/monetization" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin/dashboard" className="font-bold text-brand-700">
              Admin
            </Link>
            <nav className="hidden md:flex items-center gap-4 text-sm text-slate-600">
              <Link href="/admin/dashboard" className="hover:text-brand-600">
                Dashboard
              </Link>
              <Link href="/admin/articles" className="hover:text-brand-600">
                Articles
              </Link>
              <Link href="/admin/categories" className="hover:text-brand-600">
                Categories
              </Link>
              <Link href="/admin/media" className="hover:text-brand-600">
                Media
              </Link>
              <Link href="/admin/monetization" className="hover:text-brand-600 font-medium text-brand-600">
                Monetization
              </Link>
              <Link href="/admin/analytics" className="hover:text-brand-600">
                Analytics
              </Link>
              <Link href="/admin/settings" className="hover:text-brand-600">
                Settings
              </Link>
            </nav>
          </div>
          <form action="/auth/signout" method="post">
            <button type="submit" className="text-sm text-slate-500 hover:text-slate-800">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-500 mb-8">
          Welcome back. Manage content, ads, and analytics from here.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-brand-300 transition-colors"
            >
              <div className="text-2xl font-bold text-slate-900">{s.value}</div>
              <div className="text-sm text-slate-500 mt-1">{s.label}</div>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-3">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                href="/admin/articles/new"
                className="block w-full text-left px-4 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700"
              >
                + New Article
              </Link>
              <Link
                href="/admin/monetization"
                className="block w-full text-left px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium hover:bg-slate-50"
              >
                Manage Ad Scripts
              </Link>
              <Link
                href="/admin/analytics"
                className="block w-full text-left px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium hover:bg-slate-50"
              >
                Manage Analytics / Histats
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-3">System Status</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-slate-600">Global Ads</span>
                <span className="text-green-600 font-medium">Enabled</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-600">Global Analytics</span>
                <span className="text-green-600 font-medium">Enabled</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-600">Database</span>
                <span className="text-green-600 font-medium">Connected</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
