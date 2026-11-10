import { SiteHeaderId, SiteFooterId } from "@/components/layout/SiteHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Tentang Business Insights — platform konten bisnis, entrepreneurship, dan monetisasi berbahasa Indonesia & Inggris.",
};

export default function TentangPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeaderId />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-brand-700 to-brand-900 text-white py-14">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Tentang Kami</h1>
            <p className="mt-3 text-brand-100">Membangun wawasan bisnis yang praktis dan dapat ditindaklanjuti.</p>
          </div>
        </div>
        <article className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
          <h2>Siapa Kami</h2>
          <p><strong>Business Insights</strong> adalah platform konten yang membahas ide bisnis, tips usaha kecil, bisnis online, pemasaran digital, pertanian & peternakan, strategi startup, studi kasus, serta peluang pendapatan pasif.</p>
          <p>Kami menyajikan artikel dalam dua bahasa — <strong>Indonesia</strong> dan <strong>Inggris</strong> — agar pembaca di pasar lokal maupun internasional dapat memperoleh insight yang relevan.</p>
          <h2>Misi</h2>
          <p>Membantu calon pengusaha, pelaku UMKM, dan profesional memahami peluang usaha serta strategi yang realistis, tanpa janji berlebihan.</p>
          <h2>Apa yang Kami Bahas</h2>
          <ul>
            <li>Ide bisnis dan peluang usaha</li>
            <li>Usaha kecil dan menengah (UMKM)</li>
            <li>Bisnis online dan e-commerce</li>
            <li>Pemasaran digital (SEO, media sosial, iklan)</li>
            <li>Pertanian dan peternakan sebagai bisnis</li>
            <li>Tips & strategi pengembangan usaha</li>
            <li>Startup dan skala bisnis</li>
            <li>Studi kasus bisnis nyata</li>
            <li>Pendapatan pasif dan monetisasi</li>
          </ul>
          <h2>Kontak</h2>
          <p>Untuk pertanyaan, kerja sama, atau masukan, silakan kunjungi halaman <a href="/id/kontak">Kontak</a>.</p>
        </article>
      </main>
      <SiteFooterId />
    </div>
  );
}
