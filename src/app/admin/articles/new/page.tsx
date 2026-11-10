"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import RichTextEditor from "@/components/editor/RichTextEditor";
import slugify from "slugify";

export default function NewArticlePage() {
  const router = useRouter();
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [language, setLanguage] = useState<"id" | "en">("id");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === slugify(title, { lower: true, strict: true })) {
      setSlug(slugify(val, { lower: true, strict: true }));
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setError("Not authenticated"); setLoading(false); return; }
    const readingTime = Math.max(1, Math.ceil(content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 200));
    const { data, error: insertError } = await supabase.from("articles").insert({
      title, slug: slug || slugify(title, { lower: true, strict: true }), language, excerpt, content, status,
      seo_title: seoTitle || title, seo_description: seoDescription || excerpt,
      featured_image_url: featuredImageUrl || null, is_featured: isFeatured, author_id: user.id,
      published_at: status === "published" ? new Date().toISOString() : null, reading_time_minutes: readingTime,
    }).select("id").single();
    if (insertError) { setError(insertError.message); setLoading(false); return; }
    router.push(`/admin/articles/${data.id}`);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin/articles" className="text-sm text-slate-500 hover:text-slate-800">← Back to articles</Link>
          <h1 className="font-bold text-slate-900">New Article</h1>
          <div className="w-24" />
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
                  <option value="id">Indonesian (id)</option>
                  <option value="en">English (en)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as "draft" | "published")} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input type="text" required value={title} onChange={(e) => handleTitleChange(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Judul artikel" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
              <input type="text" required value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt</label>
              <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Ringkasan singkat..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
              <RichTextEditor content={content} onChange={setContent} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Featured Image URL</label>
              <input type="url" value={featuredImageUrl} onChange={(e) => setFeaturedImageUrl(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="https://..." />
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
              <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Defaults to title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">SEO Description</label>
              <textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Defaults to excerpt" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 disabled:opacity-50">
              {loading ? "Saving..." : status === "published" ? "Publish" : "Save Draft"}
            </button>
            <Link href="/admin/articles" className="px-5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
