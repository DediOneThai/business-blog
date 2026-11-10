import { SiteHeaderEn, SiteFooterEn } from "@/components/layout/SiteHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Business Insights privacy policy regarding data, cookies, and advertising.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeaderEn />
      <main className="flex-1">
        <div className="bg-slate-100 py-10">
          <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
            <p className="text-sm text-slate-500 mt-2">Last updated: November 2026</p>
          </div>
        </div>
        <article className="max-w-3xl mx-auto px-4 py-12 prose prose-slate">
          <p>This Privacy Policy explains how <strong>Business Insights</strong> collects, uses, and protects information when you visit this website.</p>
          <h2>1. Information We Collect</h2>
          <p>We may collect technical data, data you submit voluntarily (contact form), and data from cookies.</p>
          <h2>2. Cookies and Tracking</h2>
          <p>This site may use cookies for analytics (Histats, Google Analytics) and ads (AdSense, Adsterra). Third-party cookies are managed by the respective providers.</p>
          <h2>3. Advertising</h2>
          <p>We may display ads from third-party networks. Ad providers may use cookies to serve more relevant ads. Manage preferences in your browser settings.</p>
          <h2>4. How We Use Data</h2>
          <p>Data is used to operate and improve the site, analyze traffic, display advertising, and respond to messages.</p>
          <h2>5. Sharing of Data</h2>
          <p>We do not sell your personal data. Data may be processed by service providers under their own policies.</p>
          <h2>6. Security</h2>
          <p>We take reasonable steps to protect data. No internet transmission is 100% secure.</p>
          <h2>7. Changes</h2>
          <p>This policy may be updated. Changes will be posted on this page with an updated date.</p>
          <h2>8. Contact</h2>
          <p>For privacy-related questions, contact us via the <a href="/en/contact">Contact</a> page.</p>
        </article>
      </main>
      <SiteFooterEn />
    </div>
  );
}
