import { SiteHeaderEn, SiteFooterEn } from "@/components/layout/SiteHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the Business Insights website.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeaderEn />
      <main className="flex-1">
        <div className="bg-slate-100 py-10">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-slate-900">Terms & Conditions</h1>
            <p className="text-sm text-slate-500 mt-2">Last updated: November 2026</p>
          </div>
        </div>
        <article className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
          <p>By accessing and using the <strong>Business Insights</strong> website, you agree to the following terms and conditions.</p>
          <h2>1. Use of the Site</h2>
          <p>Content is provided for general information. You agree not to misuse the site or access admin areas without authorization.</p>
          <h2>2. Content</h2>
          <p>Articles and materials are protected by copyright. You may read and share links, but may not mass-reproduce content without written permission.</p>
          <h2>3. Not Professional Advice</h2>
          <p>Information is educational and does not constitute financial, legal, tax, or investment advice.</p>
          <h2>4. Third-Party Links</h2>
          <p>We are not responsible for external sites linked from this website.</p>
          <h2>5. Advertising and Affiliates</h2>
          <p>The site may display ads and affiliate links. We may earn commissions at no extra cost to you.</p>
          <h2>6. Limitation of Liability</h2>
          <p>To the extent permitted by law, Business Insights is not liable for losses arising from use of or reliance on the site or its content.</p>
          <h2>7. Changes</h2>
          <p>We may update these terms at any time. Continued use after changes means you accept the updated terms.</p>
          <h2>8. Contact</h2>
          <p>Questions can be sent via the <a href="/en/contact">Contact</a> page.</p>
        </article>
      </main>
      <SiteFooterEn />
    </div>
  );
}
