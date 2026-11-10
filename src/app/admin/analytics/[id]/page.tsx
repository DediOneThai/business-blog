"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function EditAnalyticsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [provider, setProvider] = useState("histats");
  const [scriptCode, setScriptCode] = useState("");
  const [placement, setPlacement] = useState<"head" | "body_start" | "footer">("footer");
  const [enabled, setEnabled] = useState(false);
  const [excludeAdmin, setExcludeAdmin] = useState(true);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("analytics_integrations")
        .select("*")
        .eq("id", id)
        .single();
      if (error || !data) {
        setError(error?.message || "Not found");
        setLoading(false);
        return;
      }
      setName(data.name);
      setProvider(data.provider);
      setScriptCode(data.script_code);
      setPlacement(data.placement);
      setEnabled(data.enabled);
      setExcludeAdmin(data.exclude_admin);
      setNotes(data.notes || "");
      setLoading(false);
    }
    load();
  }, [id, supabase]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const { error: updateError } = await supabase
      .from("analytics_integrations")
      .update({
        name, provider, script_code: scriptCode, placement, enabled,
        exclude_admin: excludeAdmin, notes: notes || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
    if (updateError) { setError(updateError.message); setSaving(false); return; }
    router.push("/admin/analytics");
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Delete this analytics script?")) return;
    await supabase.from("analytics_integrations").delete().eq("id", id);
    router.push("/admin/analytics");
    router.refresh();
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin/analytics" className="text-sm text-slate-500 hover:text-slate-800">← Back</Link>
          <h1 className="font-bold text-slate-900">Edit Analytics Script</h1>
          <button type="button" onClick={handleDelete} className="text-sm text-red-600">Delete</button>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="rounded-lg bg-red-50 text-red-700 text-sm px-4 py-3">{error}</div>}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Provider</label>
                <select value={provider} onChange={(e) => setProvider(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                  <option value="histats">Histats</option>
                  <option value="ga4">Google Analytics 4</option>
                  <option value="gtm">Google Tag Manager</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Placement</label>
                <select value={placement} onChange={(e) => setPlacement(e.target.value as any)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                  <option value="head">Head</option>
                  <option value="body_start">Body start</option>
                  <option value="footer">Footer</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tracking Script</label>
              <p className="text-xs text-slate-500 mb-2">Stored as text only — never executed in admin.</p>
              <textarea required value={scriptCode} onChange={(e) => setScriptCode(e.target.value)} rows={10} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono code-editor" spellCheck={false} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} className="rounded border-slate-300" /> Enabled
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={excludeAdmin} onChange={(e) => setExcludeAdmin(e.target.checked)} className="rounded border-slate-300" /> Exclude admin pages
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 disabled:opacity-50">{saving ? "Saving..." : "Save Changes"}</button>
            <Link href="/admin/analytics" className="px-5 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
