import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: scripts } = await supabase
    .from("analytics_integrations")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: globalSetting } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "analytics_global_enabled")
    .single();

  const globalEnabled =
    globalSetting?.value === true || globalSetting?.value === "true";

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
              <Link href="/admin/monetization" className="hover:text-brand-600">
                Monetization
              </Link>
              <Link href="/admin/analytics" className="text-brand-600 font-medium">
                Analytics
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Analytics & Tracking Scripts
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage Histats, Google Analytics 4, GTM, and other tracking scripts.
            </p>
          </div>
          <Link
            href="/admin/analytics/new"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700"
          >
            + Add Script
          </Link>
        </div>

        <div
          className={`mb-6 rounded-xl border p-4 flex items-center justify-between ${
            globalEnabled
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div>
            <div className="font-medium text-slate-900">
              Global Analytics Switch
            </div>
            <div className="text-sm text-slate-600">
              {globalEnabled
                ? "Enabled tracking scripts are loading on public pages."
                : "All analytics are disabled site-wide."}
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              globalEnabled
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {globalEnabled ? "ON" : "OFF"}
          </span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Provider</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Placement</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Exclude Admin</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {!scripts || scripts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-slate-400">
                    No analytics scripts configured. Add your Histats or GA4 tracking code to get started.
                  </td>
                </tr>
              ) : (
                scripts.map((s: any) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{s.name}</td>
                    <td className="px-4 py-3 text-slate-600 uppercase text-xs font-medium">{s.provider}</td>
                    <td className="px-4 py-3 text-slate-600">{s.placement}</td>
                    <td className="px-4 py-3 text-slate-600">{s.exclude_admin ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          s.enabled
                            ? "bg-green-100 text-green-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {s.enabled ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/analytics/${s.id}`}
                        className="text-brand-600 hover:underline font-medium"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-900">
          <strong>Histats tip:</strong> Paste the complete tracking script exactly as provided by Histats.
          The system preserves the original code and does not modify tracking parameters.
          Default recommended placement is <code className="bg-amber-100 px-1 rounded">footer</code>.
        </div>
      </main>
    </div>
  );
}
