import Link from "next/link";

export function SiteHeaderId() {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/id" className="text-xl font-bold text-brand-700">Business Insights</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link href="/id" className="hover:text-brand-600">Beranda</Link>
          <Link href="/id/tentang" className="hover:text-brand-600">Tentang</Link>
          <Link href="/id/kontak" className="hover:text-brand-600">Kontak</Link>
          <Link href="/en" className="px-3 py-1 rounded-full border border-slate-300 text-xs hover:bg-slate-50">EN</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteHeaderEn() {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/en" className="text-xl font-bold text-brand-700">Business Insights</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link href="/en" className="hover:text-brand-600">Home</Link>
          <Link href="/en/about" className="hover:text-brand-600">About</Link>
          <Link href="/en/contact" className="hover:text-brand-600">Contact</Link>
          <Link href="/id" className="px-3 py-1 rounded-full border border-slate-300 text-xs hover:bg-slate-50">ID</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooterId() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">Business Insights</h3>
          <p className="text-sm">Platform konten bisnis dan entrepreneurship berbahasa Indonesia & Inggris.</p>
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
      <div className="border-t border-slate-800 text-center text-xs text-slate-500 py-4">© {new Date().getFullYear()} Business Insights. All rights reserved.</div>
    </footer>
  );
}

export function SiteFooterEn() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">Business Insights</h3>
          <p className="text-sm">Professional business and entrepreneurship content platform in Indonesian & English.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/en" className="hover:text-white">Home</Link></li>
            <li><Link href="/en/about" className="hover:text-white">About</Link></li>
            <li><Link href="/en/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/en/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/en/terms" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link href="/en/disclaimer" className="hover:text-white">Disclaimer</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Language</h4>
          <div className="flex gap-2">
            <Link href="/id" className="px-3 py-1 rounded border border-slate-600 text-sm hover:bg-slate-800">ID</Link>
            <Link href="/en" className="px-3 py-1 rounded bg-brand-600 text-white text-sm">EN</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 text-center text-xs text-slate-500 py-4">© {new Date().getFullYear()} Business Insights. All rights reserved.</div>
    </footer>
  );
}
