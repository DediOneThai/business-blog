import Link from "next/link";
import AdSlot from "@/components/ads/AdSlot";

export const metadata = {
  title: "Home",
  description:
    "Business ideas, small business tips, online business, digital marketing, and monetization strategies.",
};

export default function HomePageEn() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/en" className="text-xl font-bold text-brand-700">
            Business Insights
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            <Link href="/en" className="hover:text-brand-600">Home</Link>
            <Link href="/en/category" className="hover:text-brand-600">Categories</Link>
            <Link href="/en/about" className="hover:text-brand-600">About</Link>
            <Link href="/en/contact" className="hover:text-brand-600">Contact</Link>
            <Link href="/id" className="px-3 py-1 rounded-full border border-slate-300 text-xs hover:bg-slate-50">ID</Link>
          </nav>
        </div>
      </header>

      <AdSlot placement="below_nav" />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-brand-700 to-brand-900 text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Business Ideas & Entrepreneurship Tips
            </h1>
            <p className="text-lg md:text-xl text-brand-100 max-w-2xl mx-auto">
              Practical insights to build, grow, and monetize your business.
            </p>
          </div>
        </section>

        <AdSlot placement="homepage_top" className="max-w-6xl mx-auto px-4 my-8" />

        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Latest Articles</h2>
            <Link href="/en/article" className="text-brand-600 text-sm font-medium hover:underline">
              View all →
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
                    Business Ideas
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900 line-clamp-2">
                    Sample Business Article Title {i}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                    Short summary that will be replaced with real data from the database once full integration is complete.
                  </p>
                  <time className="mt-4 block text-xs text-slate-400">Nov 10, 2026</time>
                </div>
              </article>
            ))}
          </div>
        </section>

        <AdSlot placement="homepage_between" className="max-w-6xl mx-auto px-4 my-8" />

        <section className="bg-slate-50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Business Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Business Ideas",
                "Small Business",
                "Online Business",
                "Digital Marketing",
                "Agriculture & Livestock",
                "Tips & Strategies",
                "Startup",
                "Passive Income",
              ].map((cat) => (
                <Link
                  key={cat}
                  href={`/en/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
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
              Professional business and entrepreneurship content platform in Indonesian & English.
            </p>
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
        <div className="border-t border-slate-800 text-center text-xs text-slate-500 py-4">
          © {new Date().getFullYear()} Business Insights. All rights reserved.
        </div>
      </footer>

      <AdSlot placement="footer" />
    </div>
  );
}
