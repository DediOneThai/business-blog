import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdSlot from "@/components/ads/AdSlot";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("title, seo_title, seo_description, excerpt, featured_image_url")
    .eq("slug", slug)
    .eq("language", "id")
    .eq("status", "published")
    .single();

  if (!data) return { title: "Artikel tidak ditemukan" };

  return {
    title: data.seo_title || data.title,
    description: data.seo_description || data.excerpt || undefined,
    openGraph: {
      title: data.seo_title || data.title,
      description: data.seo_description || data.excerpt || undefined,
      images: data.featured_image_url ? [data.featured_image_url] : undefined,
    },
  };
}

export default async function ArticlePageId({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("language", "id")
    .eq("status", "published")
    .single();

  if (!article) notFound();

  const { data: related } = await supabase
    .from("articles")
    .select("id, title, slug, excerpt, featured_image_url, published_at")
    .eq("language", "id")
    .eq("status", "published")
    .neq("id", article.id)
    .order("published_at", { ascending: false })
    .limit(3);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/id" className="text-xl font-bold text-brand-700">Business Insights</Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            <Link href="/id" className="hover:text-brand-600">Beranda</Link>
            <Link href="/en" className="px-3 py-1 rounded-full border border-slate-300 text-xs hover:bg-slate-50">EN</Link>
          </nav>
        </div>
      </header>
      <AdSlot placement="below_nav" />
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 py-10">
          <div className="mb-6">
            <time className="text-sm text-slate-500">{article.published_at ? formatDate(article.published_at) : ""}</time>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">{article.title}</h1>
            {article.excerpt && <p className="mt-4 text-lg text-slate-600">{article.excerpt}</p>}
            <div className="mt-3 text-sm text-slate-400">{article.reading_time_minutes} menit baca</div>
          </div>
          {article.featured_image_url && (
            <img src={article.featured_image_url} alt={article.featured_image_alt || article.title} className="w-full rounded-xl mb-8 aspect-video object-cover" />
          )}
          <AdSlot placement="before_content" className="my-6" />
          <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: article.content || "" }} />
          <AdSlot placement="after_content" className="my-8" />
        </article>
        {related && related.length > 0 && (
          <section className="bg-slate-50 py-12">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Artikel Terkait</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((r: any) => (
                  <Link key={r.id} href={`/id/artikel/${r.slug}`} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                    {r.featured_image_url && <img src={r.featured_image_url} alt="" className="aspect-video object-cover w-full" />}
                    <div className="p-4"><h3 className="font-semibold text-slate-900 line-clamp-2">{r.title}</h3></div>
                  </Link>
                ))}
              </div>
              <AdSlot placement="between_related" className="mt-8" />
            </div>
          </section>
        )}
      </main>
      <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 py-8 text-center text-sm">
        <Link href="/id" className="text-brand-400 hover:text-white">← Kembali ke Beranda</Link>
      </footer>
      <AdSlot placement="footer" />
    </div>
  );
}
