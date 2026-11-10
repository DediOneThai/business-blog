import { SiteHeaderEn, SiteFooterEn } from "@/components/layout/SiteHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "About Business Insights — a bilingual platform for business ideas, entrepreneurship, and monetization.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeaderEn />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-brand-700 to-brand-900 text-white py-14">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold">About Us</h1>
            <p className="mt-3 text-brand-100">Practical business insights you can act on.</p>
          </div>
        </div>
        <article className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
          <h2>Who We Are</h2>
          <p><strong>Business Insights</strong> is a content platform covering business ideas, small business tips, online business, digital marketing, agriculture & livestock ventures, startup strategy, case studies, and passive income opportunities.</p>
          <p>We publish in both <strong>Indonesian</strong> and <strong>English</strong> so readers in local and international markets can find relevant insights.</p>
          <h2>Our Mission</h2>
          <p>To help aspiring entrepreneurs, SMEs, and professionals understand realistic business opportunities and strategies — without overpromising.</p>
          <h2>What We Cover</h2>
          <ul>
            <li>Business ideas and opportunities</li>
            <li>Small and medium enterprises (SMEs)</li>
            <li>Online business and e-commerce</li>
            <li>Digital marketing (SEO, social media, ads)</li>
            <li>Agriculture and livestock as businesses</li>
            <li>Business development tips & strategies</li>
            <li>Startups and scaling</li>
            <li>Real business case studies</li>
            <li>Passive income and monetization</li>
          </ul>
          <h2>Contact</h2>
          <p>For questions, partnerships, or feedback, please visit our <a href="/en/contact">Contact</a> page.</p>
        </article>
      </main>
      <SiteFooterEn />
    </div>
  );
}
