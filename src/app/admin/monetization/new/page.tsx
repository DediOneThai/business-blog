"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { AD_PLACEMENTS } from "@/types";

export default function NewAdPage() {
  const router = useRouter();
  const supabase = createClient();
  const [name, setName] = useState("");
  const [provider, setProvider] = useState("adsterra");
  const [scriptType, setScriptType] = useState<"html" | "javascript" | "script_tag">("html");
  const [scriptCode, setScriptCode] = useState("");
  const [placement, setPlacement] = useState("homepage_top");
  const [deviceTarget, setDeviceTarget] = useState<"all" | "desktop" | "mobile">("all");
  const [enabled, setEnabled] = useState(false);
  const [priority, setPriority] = useState(0);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data: { user } } = await supabase.auth.getUser();
    const { error: insertError } = await supabase.from("advertising_scripts").insert({
      name, provider, script_type: scriptType, script_code: scriptCode, placement,
      device_target: deviceTarget, enabled, priority, notes: notes || null, created_by: user?.id || null,
    });
    if (insertError) { setError(insertError.message); setLoading(false); return; }
    router.push("/admin/monetization");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin/monetization" className="text-sm text-slate-500 hover:text-slate-800">← Back</Link>
          <h1 className="font-bold text-slate-900">Add Advertisement</h1>
          <div className="w-16" />
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="rounded-lg bg-red-50 text-red-700 text-sm px-4 py-3">{error}</div>}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Internal Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="e.g. Adsterra Native Homepage" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Provider</label>
                <select value={provider} onChange={(e) => setProvider(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                  <option value="adsterra">Adsterra</option>
                  <option value="adsense">Google AdSense</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Script Type</label>
                <select value={scriptType} onChange={(e) => setScriptType(e.target.value as any)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                  <option value="html">HTML</option>
                  <option value="javascript">JavaScript</option>
                  <option value="script_tag">Script Tag</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Placement</label>
              <select value={placement} onChange={(e) => setPlacement(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                {AD_PLACEMENTS.map((p) => (<option key={p.value} value={p.value}>{p.label}</option>))}
              </select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Device Target</label>
                <select value={deviceTarget} onChange={(e) => setDeviceTarget(e.target.value as any)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                  <option value="all">All devices</option>
                  <option value="desktop">Desktop only</option>
                  <option value="mobile">Mobile only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                <input type="number" value={priority} onChange={(e) => setPriority(Number(e.target.value))} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ad Script / Embed Code</label>
              <p className="text-xs text-slate-500 mb-2">Paste complete HTML/JS from Adsterra/AdSense. Stored as text, never executed in admin.</p>
              <textarea required value={scriptCode} onChange={(e) => setScriptCode(e.target.value)} rows={10} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono code-editor" placeholder="<!-- paste ad code here -->" spellCheck={false} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="enabled" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} className="rounded border-slate-300" />
              <label htmlFor="enabled" className="text-sm text-slate-700">Enable this ad immediately</label>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 disabled:opacity-50">{loading ? "Saving..." : "Save Advertisement"}</button>
            <Link href="/admin/monetization" className="px-5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
