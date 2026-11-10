"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import RichTextEditor from "@/components/editor/RichTextEditor";
import slugify from "slugify";

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [language, setLanguage] = useState<"id" | "en">("id");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "scheduled" | "archived">("draft");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from("articles").select("*").eq("id", id).single();
      if (error || !data) { setError(error?.message || "Article not found"); setLoading(false); return; }
      setTitle(data.title); setSlug(data.slug); setLanguage(data.language);
      setExcerpt(data.excerpt || ""); setContent(data.content || ""); setStatus(data.status);
      setSeoTitle(data.seo_title || ""); setSeoDescription(data.seo_description || "");
      setFeaturedImageUrl(data.featured_image_url || ""); setIsFeatured(data.is_featured || false);
      setLoading(false);
    }
    load();
  }, [id, supabase]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null);
    const readingTime = Math.max(1, Math.ceil(content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 200));
    const updates: any = {
      title, slug: slug || slugify(title, { lower: true, strict: true }), language, excerpt, content, status,
      seo_title: seoTitle || title, seo_description: seoDescription || excerpt,
      featured_image_url: featuredImageUrl || null, is_featured: isFeatured,
      reading_time_minutes: readingTime, updated_at: new Date().toISOString(),
    };
    if (status === "published") updates.published_at = new Date().toISOString();
    const { error: updateError } = await supabase.from("articles").update(updates).eq("id", id);
    if (updateError) { setError(updateError.message); setSaving(false); return; }
    router.push("/admin/articles"); router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Delete this article permanently?")) return;
    await supabase.from("articles").delete().eq("id", id);
    router.push("/admin/articles"); router.refresh();
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin/articles" className="text-sm text-slate-500 hover:text-slate-800">← Back to articles</Link>
          <h1 className="font-bold text-slate-900">Edit Article</h1>
          <button type="button" onClick={handleDelete} className="text-sm text-red-600 hover:text-red-800">Delete</button>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="rounded-lg bg-red-50 text-red-700 text-sm px-4 py-3">{error}</div>}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value as "id" | "en")} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                  <option value="id">Indonesian (id)</option><option value="en">English (en)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                  <option value="draft">Draft</option><option value="published">Published</option>
                  <option value="scheduled">Scheduled</option><option value="archived">Archived</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
              <input type="text" required value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt</label>
              <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
              <RichTextEditor content={content} onChange={setContent} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Featured Image URL</label>
              <input type="url" value={featuredImageUrl} onChange={(e) => setFeaturedImageUrl(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="featured" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="rounded border-slate-300" />
              <label htmlFor="featured" className="text-sm text-slate-700">Featured article</label>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h2 className="font-semibold text-slate-900">SEO</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">SEO Title</label>
              <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">SEO Description</label>
              <textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 disabled:opacity-50">{saving ? "Saving..." : "Save Changes"}</button>
            <Link href="/admin/articles" className="px-5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
