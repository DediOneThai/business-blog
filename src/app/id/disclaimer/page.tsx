import { SiteHeaderId, SiteFooterId } from "@/components/layout/SiteHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer konten dan hasil bisnis di Business Insights.",
};

export default function DisclaimerPageId() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeaderId />
      <main className="flex-1">
        <div className="bg-slate-100 py-10">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-slate-900">Disclaimer</h1>
            <p className="text-sm text-slate-500 mt-2">Terakhir diperbarui: November 2026</p>
          </div>
        </div>
        <article className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
          <p>Seluruh konten di <strong>Business Insights</strong> disediakan hanya untuk tujuan informasi dan edukasi.</p>
          <h2>Tidak Ada Jaminan Hasil</h2>
          <p>Kami tidak menjamin bahwa ide bisnis, strategi, atau tips yang dibahas akan menghasilkan keuntungan. Hasil usaha sangat bergantung pada banyak faktor di luar kendali kami.</p>
          <h2>Bukan Saran Profesional</h2>
          <p>Konten bukan merupakan saran keuangan, hukum, pajak, akuntansi, atau investasi. Konsultasikan dengan profesional yang berkualifikasi sebelum mengambil keputusan penting.</p>
          <h2>Akurasi Informasi</h2>
          <p>Kami berupaya menyajikan informasi yang akurat, namun tidak menjamin kelengkapan, ketepatan waktu, atau kesesuaian konten untuk tujuan tertentu.</p>
          <h2>Tanggung Jawab Pengguna</h2>
          <p>Anda bertanggung jawab penuh atas keputusan dan tindakan yang diambil berdasarkan informasi di situs ini.</p>
        </article>
      </main>
      <SiteFooterId />
    </div>
  );
}
