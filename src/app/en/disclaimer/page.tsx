import { SiteHeaderEn, SiteFooterEn } from "@/components/layout/SiteHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Content and business results disclaimer for Business Insights.",
};

export default function DisclaimerPageEn() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeaderEn />
      <main className="flex-1">
        <div className="bg-slate-100 py-10">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-slate-900">Disclaimer</h1>
            <p className="text-sm text-slate-500 mt-2">Last updated: November 2026</p>
          </div>
        </div>
        <article className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
          <p>All content on <strong>Business Insights</strong> is provided for informational and educational purposes only.</p>
          <h2>No Guarantee of Results</h2>
          <p>We do not guarantee that any business idea, strategy, or tip discussed will produce profits. Outcomes depend on many factors beyond our control.</p>
          <h2>Not Professional Advice</h2>
          <p>Content is not financial, legal, tax, accounting, or investment advice. Consult qualified professionals before making important decisions.</p>
          <h2>Accuracy of Information</h2>
          <p>We strive for accuracy but do not guarantee completeness, timeliness, or fitness of content for any particular purpose.</p>
          <h2>User Responsibility</h2>
          <p>You are solely responsible for decisions and actions taken based on information on this site.</p>
        </article>
      </main>
      <SiteFooterEn />
    </div>
  );
}
