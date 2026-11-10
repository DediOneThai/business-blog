import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AD_PLACEMENTS } from "@/types";

export default async function MonetizationPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: ads } = await supabase
    .from("advertising_scripts")
    .select("*")
    .order("priority", { ascending: false });

  const { data: globalSetting } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "ads_global_enabled")
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
              <Link href="/admin/monetization" className="text-brand-600 font-medium">
                Monetization
              </Link>
              <Link href="/admin/analytics" className="hover:text-brand-600">
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
              Advertisement Manager
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage Adsterra, AdSense, and other ad scripts without redeploying.
            </p>
          </div>
          <Link
            href="/admin/monetization/new"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700"
          >
            + Add Advertisement
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
              Global Advertising Switch
            </div>
            <div className="text-sm text-slate-600">
              {globalEnabled
                ? "All enabled ads are currently live on the public site."
                : "All ads are disabled site-wide (emergency switch)."}
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
                <th className="text-left px-4 py-3 font-medium text-slate-600">Device</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {!ads || ads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-slate-400">
                    No advertisements yet. Click &quot;Add Advertisement&quot; to paste your first Adsterra or AdSense code.
                  </td>
                </tr>
              ) : (
                ads.map((ad: any) => {
                  const placementLabel =
                    AD_PLACEMENTS.find((p) => p.value === ad.placement)?.label ||
                    ad.placement;
                  return (
                    <tr key={ad.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{ad.name}</td>
                      <td className="px-4 py-3 text-slate-600 capitalize">{ad.provider}</td>
                      <td className="px-4 py-3 text-slate-600">{placementLabel}</td>
                      <td className="px-4 py-3 text-slate-600 capitalize">{ad.device_target}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                            ad.enabled
                              ? "bg-green-100 text-green-800"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {ad.enabled ? "Enabled" : "Disabled"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/admin/monetization/${ad.id}`}
                          className="text-brand-600 hover:underline font-medium"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-2">Supported Networks</h2>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Adsterra (Social Bar, Native, Display, Popunder)</li>
              <li>• Google AdSense (publisher ID + ad units)</li>
              <li>• Any HTML / JavaScript embed code</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-2">Security Notes</h2>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Scripts are stored as text and never executed in admin.</li>
              <li>• Only enabled scripts appear on the public site.</li>
              <li>• Global emergency switch available in Settings.</li>
              <li>• Never share service-role keys.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
