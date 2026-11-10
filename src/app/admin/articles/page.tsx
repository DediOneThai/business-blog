import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { formatDate } from "@/lib/utils";

export default async function ArticlesAdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, slug, language, status, published_at, updated_at, is_featured")
    .order("updated_at", { ascending: false });

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin/dashboard" className="font-bold text-brand-700">Admin</Link>
            <nav className="hidden md:flex items-center gap-4 text-sm text-slate-600">
              <Link href="/admin/dashboard" className="hover:text-brand-600">Dashboard</Link>
              <Link href="/admin/articles" className="text-brand-600 font-medium">Articles</Link>
              <Link href="/admin/monetization" className="hover:text-brand-600">Monetization</Link>
              <Link href="/admin/analytics" className="hover:text-brand-600">Analytics</Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Articles</h1>
            <p className="text-slate-500 text-sm mt-1">Manage bilingual articles (Indonesian & English)</p>
          </div>
          <Link href="/admin/articles/new" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700">+ New Article</Link>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Title</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Lang</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-slate-600">Updated</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {!articles || articles.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-slate-400">No articles yet. Create your first article.</td></tr>
              ) : (
                articles.map((a: any) => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900 line-clamp-1">{a.title}</div>
                      <div className="text-xs text-slate-400">{a.slug}</div>
                    </td>
                    <td className="px-4 py-3"><span className="uppercase text-xs font-semibold text-slate-600">{a.language}</span></td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        a.status === "published" ? "bg-green-100 text-green-800" :
                        a.status === "draft" ? "bg-slate-100 text-slate-600" :
                        a.status === "scheduled" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
                      }`}>{a.status}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{formatDate(a.updated_at)}</td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/articles/${a.id}`} className="text-brand-600 hover:underline font-medium">Edit</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
