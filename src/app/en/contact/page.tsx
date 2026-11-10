"use client";

import { useState } from "react";
import { SiteHeaderEn, SiteFooterEn } from "@/components/layout/SiteHeader";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setName(""); setEmail(""); setMessage("");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeaderEn />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-brand-700 to-brand-900 text-white py-14">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Contact</h1>
            <p className="mt-3 text-brand-100">Have a question or want to work together? Get in touch.</p>
          </div>
        </div>
        <div className="max-w-xl mx-auto px-4 py-12">
          {sent ? (
            <div className="rounded-xl bg-green-50 border border-green-200 text-green-800 px-6 py-8 text-center">
              <p className="font-semibold">Message sent</p>
              <p className="text-sm mt-1">Thank you. We will reply as soon as possible (form simulation).</p>
              <button type="button" onClick={() => setSent(false)} className="mt-4 text-sm text-brand-600 hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-xl border border-slate-200 p-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <button type="submit" className="w-full rounded-lg bg-brand-600 text-white py-2.5 text-sm font-semibold hover:bg-brand-700">Send Message</button>
              <p className="text-xs text-slate-400 text-center">This form is a demonstration. Connect an email service or Supabase for production use.</p>
            </form>
          )}
        </div>
      </main>
      <SiteFooterEn />
    </div>
  );
}
