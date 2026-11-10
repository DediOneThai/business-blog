import Link from "next/link";
import AdSlot from "@/components/ads/AdSlot";

export const metadata = {
  title: "Beranda",
  description:
    "Ide bisnis, tips usaha kecil, bisnis online, pemasaran digital, dan strategi monetisasi.",
};

export default function HomePageId() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/id" className="text-xl font-bold text-brand-700">
            Business Insights
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            <Link href="/id" className="hover:text-brand-600">Beranda</Link>
            <Link href="/id/kategori" className="hover:text-brand-600">Kategori</Link>
            <Link href="/id/tentang" className="hover:text-brand-600">Tentang</Link>
            <Link href="/id/kontak" className="hover:text-brand-600">Kontak</Link>
            <Link href="/en" className="px-3 py-1 rounded-full border border-slate-300 text-xs hover:bg-slate-50">EN</Link>
          </nav>
        </div>
      </header>

      <AdSlot placement="below_nav" />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-brand-700 to-brand-900 text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Ide Bisnis & Tips Usaha
            </h1>
            <p className="text-lg md:text-xl text-brand-100 max-w-2xl mx-auto">
              Wawasan praktis untuk membangun, mengembangkan, dan memonetisasi bisnis Anda.
            </p>
          </div>
        </section>

        <AdSlot placement="homepage_top" className="max-w-6xl mx-auto px-4 my-8" />

        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Artikel Terbaru</h2>
            <Link href="/id/artikel" className="text-brand-600 text-sm font-medium hover:underline">
              Lihat semua →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <article
                key={i}
                className="rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-slate-100" />
                <div className="p-5">
                  <span className="text-xs font-medium text-brand-600 uppercase tracking-wide">
                    Ide Bisnis
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900 line-clamp-2">
                    Contoh Judul Artikel Bisnis {i}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                    Ringkasan singkat artikel yang akan diganti dengan data aktual dari database setelah integrasi penuh.
                  </p>
                  <time className="mt-4 block text-xs text-slate-400">10 Nov 2026</time>
                </div>
              </article>
            ))}
          </div>
        </section>

        <AdSlot placement="homepage_between" className="max-w-6xl mx-auto px-4 my-8" />

        <section className="bg-slate-50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Kategori Bisnis</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Ide Bisnis",
                "Usaha Kecil",
                "Bisnis Online",
                "Pemasaran Digital",
                "Pertanian & Peternakan",
                "Tips & Strategi",
                "Startup",
                "Pendapatan Pasif",
              ].map((cat) => (
                <Link
                  key={cat}
                  href={`/id/kategori/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-lg bg-white border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:border-brand-400 hover:text-brand-700 transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <AdSlot placement="homepage_bottom" className="max-w-6xl mx-auto px-4 my-8" />
      </main>

      <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">Business Insights</h3>
            <p className="text-sm">
              Platform konten bisnis dan entrepreneurship berbahasa Indonesia & Inggris.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/id" className="hover:text-white">Beranda</Link></li>
              <li><Link href="/id/tentang" className="hover:text-white">Tentang</Link></li>
              <li><Link href="/id/kontak" className="hover:text-white">Kontak</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/id/kebijakan-privasi" className="hover:text-white">Kebijakan Privasi</Link></li>
              <li><Link href="/id/syarat-ketentuan" className="hover:text-white">Syarat & Ketentuan</Link></li>
              <li><Link href="/id/disclaimer" className="hover:text-white">Disclaimer</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Bahasa</h4>
            <div className="flex gap-2">
              <Link href="/id" className="px-3 py-1 rounded bg-brand-600 text-white text-sm">ID</Link>
              <Link href="/en" className="px-3 py-1 rounded border border-slate-600 text-sm hover:bg-slate-800">EN</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 text-center text-xs text-slate-500 py-4">
          © {new Date().getFullYear()} Business Insights. All rights reserved.
        </div>
      </footer>

      <AdSlot placement="footer" />
    </div>
  );
}
