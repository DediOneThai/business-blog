import { SiteHeaderId, SiteFooterId } from "@/components/layout/SiteHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi Business Insights mengenai data, cookie, dan iklan.",
};

export default function KebijakanPrivasiPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeaderId />
      <main className="flex-1">
        <div className="bg-slate-100 py-10">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-slate-900">Kebijakan Privasi</h1>
            <p className="text-sm text-slate-500 mt-2">Terakhir diperbarui: November 2026</p>
          </div>
        </div>
        <article className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
          <p>Kebijakan Privasi ini menjelaskan bagaimana <strong>Business Insights</strong> mengumpulkan, menggunakan, dan melindungi informasi saat Anda mengunjungi situs ini.</p>
          <h2>1. Informasi yang Kami Kumpulkan</h2>
          <p>Kami dapat mengumpulkan:</p>
          <ul>
            <li>Data teknis (alamat IP, jenis browser, perangkat, halaman yang dikunjungi)</li>
            <li>Data yang Anda kirim secara sukarela (misalnya formulir kontak: nama, email, pesan)</li>
            <li>Data dari cookie dan teknologi serupa</li>
          </ul>
          <h2>2. Cookie dan Pelacakan</h2>
          <p>Situs ini dapat menggunakan cookie untuk analisis (misalnya Histats, Google Analytics) dan untuk menampilkan iklan (misalnya Google AdSense, Adsterra). Cookie pihak ketiga dikelola oleh penyedia layanan masing-masing.</p>
          <h2>3. Iklan</h2>
          <p>Kami dapat menampilkan iklan dari jaringan pihak ketiga. Penyedia iklan dapat menggunakan cookie untuk menayangkan iklan yang lebih relevan. Anda dapat mengelola preferensi cookie melalui pengaturan browser.</p>
          <h2>4. Penggunaan Data</h2>
          <p>Data digunakan untuk mengoperasikan dan meningkatkan situs, menganalisis lalu lintas, menampilkan iklan, dan membalas pesan yang Anda kirim.</p>
          <h2>5. Berbagi Data</h2>
          <p>Kami tidak menjual data pribadi Anda. Data dapat diproses oleh penyedia layanan (hosting, analytics, jaringan iklan) sesuai kebijakan mereka.</p>
          <h2>6. Keamanan</h2>
          <p>Kami berupaya melindungi data dengan praktik yang wajar. Namun, tidak ada transmisi internet yang 100% aman.</p>
          <h2>7. Perubahan</h2>
          <p>Kebijakan ini dapat diperbarui. Perubahan akan dipublikasikan di halaman ini dengan tanggal pembaruan.</p>
          <h2>8. Kontak</h2>
          <p>Untuk pertanyaan terkait privasi, hubungi kami melalui halaman <a href="/id/kontak">Kontak</a>.</p>
        </article>
      </main>
      <SiteFooterId />
    </div>
  );
}
