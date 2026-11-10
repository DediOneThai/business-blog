import { SiteHeaderId, SiteFooterId } from "@/components/layout/SiteHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: "Syarat dan ketentuan penggunaan situs Business Insights.",
};

export default function SyaratKetentuanPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeaderId />
      <main className="flex-1">
        <div className="bg-slate-100 py-10">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-slate-900">Syarat & Ketentuan</h1>
            <p className="text-sm text-slate-500 mt-2">Terakhir diperbarui: November 2026</p>
          </div>
        </div>
        <article className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
          <p>Dengan mengakses dan menggunakan situs <strong>Business Insights</strong>, Anda menyetujui syarat dan ketentuan berikut.</p>
          <h2>1. Penggunaan Situs</h2>
          <p>Konten di situs ini disediakan untuk informasi umum. Anda setuju untuk tidak menyalahgunakan situs, termasuk mencoba mengakses area admin tanpa izin.</p>
          <h2>2. Konten</h2>
          <p>Artikel, gambar, dan materi lain dilindungi hak cipta. Anda boleh membaca dan membagikan tautan, tetapi tidak boleh menyalin ulang konten secara massal tanpa izin tertulis.</p>
          <h2>3. Bukan Saran Profesional</h2>
          <p>Informasi di situs ini bersifat edukatif dan tidak merupakan saran keuangan, hukum, pajak, atau investasi.</p>
          <h2>4. Tautan Pihak Ketiga</h2>
          <p>Situs dapat berisi tautan ke situs eksternal. Kami tidak bertanggung jawab atas konten atau kebijakan privasi situs tersebut.</p>
          <h2>5. Iklan dan Afiliasi</h2>
          <p>Situs dapat menampilkan iklan dan tautan afiliasi. Kami dapat menerima komisi dari pembelian melalui tautan tersebut, tanpa biaya tambahan bagi Anda.</p>
          <h2>6. Batasan Tanggung Jawab</h2>
          <p>Sejauh diizinkan hukum, Business Insights tidak bertanggung jawab atas kerugian yang timbul dari penggunaan situs atau mengandalkan konten di dalamnya.</p>
          <h2>7. Perubahan</h2>
          <p>Kami dapat mengubah syarat ini kapan saja. Penggunaan berkelanjutan setelah perubahan berarti Anda menerima syarat yang diperbarui.</p>
          <h2>8. Kontak</h2>
          <p>Pertanyaan mengenai syarat ini dapat dikirim melalui halaman <a href="/id/kontak">Kontak</a>.</p>
        </article>
      </main>
      <SiteFooterId />
    </div>
  );
}
