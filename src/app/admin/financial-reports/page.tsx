"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch, getAdminToken } from "@/lib/adminClient";
import { normalizeFinancialReport, type FinancialReport } from "@/lib/apiClient";

type ReportForm = Omit<FinancialReport, "id" | "mongoId">;
const emptyForm: ReportForm = { title: "", organization: "", fiscal_year: "", drive_url: "", report_type: "", description: "", report_date: "", published: true };

export default function AdminFinancialReportsPage() {
  const router = useRouter();
  const [items, setItems] = useState<FinancialReport[]>([]);
  const [form, setForm] = useState<ReportForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getAdminToken()) { router.replace("/admin/login"); return; }
    void loadItems();
  }, [router]);

  async function loadItems() {
    try {
      setLoading(true);
      const response = await adminFetch("/admin/financial-reports");
      if (!response.ok) throw new Error(`Failed to load reports (${response.status})`);
      setItems((await response.json()).map(normalizeFinancialReport));
    } catch (err: any) { setError(err.message || "Failed to load reports"); }
    finally { setLoading(false); }
  }

  function resetForm() { setEditingId(null); setForm(emptyForm); setError(null); }

  function editItem(item: FinancialReport) {
    setEditingId(item.mongoId ?? item.id ?? null);
    setForm({ title: item.title, organization: item.organization, fiscal_year: item.fiscal_year, drive_url: item.drive_url, report_type: item.report_type ?? "", description: item.description ?? "", report_date: item.report_date ?? "", published: item.published });
  }

  async function removeItem(id?: string) {
    if (!id || !window.confirm("Delete this financial report? This cannot be undone.")) return;
    const response = await adminFetch(`/admin/financial-reports/${id}`, { method: "DELETE" });
    if (!response.ok) { setError("Failed to delete report"); return; }
    await loadItems();
    if (editingId === id) resetForm();
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setSaving(true); setError(null);
    try {
      const path = editingId ? `/admin/financial-reports/${editingId}` : "/admin/financial-reports";
      const response = await adminFetch(path, { method: editingId ? "PUT" : "POST", body: JSON.stringify({ ...form, report_type: form.report_type || undefined, description: form.description || undefined, report_date: form.report_date || undefined }) });
      if (!response.ok) { const body = await response.json().catch(() => ({})); throw new Error(body?.detail || "Failed to save report"); }
      await loadItems(); resetForm();
    } catch (err: any) { setError(err.message || "Failed to save report"); }
    finally { setSaving(false); }
  }

  const update = (key: keyof ReportForm, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));

  return <div className="min-h-screen bg-offWhite px-4 py-8"><div className="mx-auto max-w-6xl rounded-lg bg-white p-6 shadow-md md:p-8">
    <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center"><div><h1 className="text-xl font-bold text-textBlue md:text-2xl">Financial Reports</h1><p className="text-xs text-gray-500 md:text-sm">Manage published Google Drive links.</p></div><button type="button" onClick={resetForm} className="rounded-md border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50">New report</button></div>
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <form onSubmit={submit} className="space-y-3 rounded-lg border border-gray-100 p-4"><h2 className="text-sm font-semibold text-textBlue">{editingId ? "Edit report" : "Create report"}</h2>
        {([['title','Title'],['organization','Organization'],['fiscal_year','Fiscal year'],['drive_url','Google Drive URL'],['report_type','Report type'],['report_date','Report date']] as [keyof ReportForm,string][]).map(([key,label]) => <div key={key}><label className="mb-1 block text-xs font-medium text-gray-700">{label}</label><input className="w-full rounded-md border px-2 py-1.5 text-sm" value={form[key] as string} onChange={(e) => update(key, e.target.value)} required={['title','organization','fiscal_year','drive_url'].includes(key)} placeholder={key === 'drive_url' ? 'https://drive.google.com/...' : ''} /></div>)}
        <div><label className="mb-1 block text-xs font-medium text-gray-700">Description</label><textarea className="min-h-[80px] w-full rounded-md border px-2 py-1.5 text-sm" value={form.description} onChange={(e) => update('description', e.target.value)} /></div>
        <label className="flex items-center gap-2 text-sm text-textBlue"><input type="checkbox" checked={form.published} onChange={(e) => update('published', e.target.checked)} /> Published publicly</label>
        {error && <p className="rounded-md border border-red-100 bg-red-50 px-2 py-1.5 text-xs text-red-600">{error}</p>}<button disabled={saving} className="rounded-md bg-primaryRed px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-60">{saving ? 'Saving…' : editingId ? 'Update report' : 'Create report'}</button>
      </form>
      <div className="max-h-[70vh] overflow-auto rounded-lg border border-gray-100 p-4 text-xs"><div className="mb-3 flex items-center justify-between"><h2 className="text-sm font-semibold text-textBlue">Existing reports</h2><button type="button" onClick={loadItems} className="text-xs text-primaryRed hover:underline">Refresh</button></div>{loading ? <p className="text-gray-500">Loading…</p> : items.length === 0 ? <p className="text-gray-500">No reports added yet.</p> : <table className="w-full border-collapse"><thead><tr className="bg-gray-50"><th className="border px-2 py-1 text-left">Report</th><th className="border px-2 py-1">Status</th><th className="border px-2 py-1">Actions</th></tr></thead><tbody>{items.map((item) => <tr key={item.mongoId ?? item.id} className="hover:bg-gray-50"><td className="border px-2 py-1"><div className="font-semibold">{item.title}</div><div className="text-[10px] text-gray-500">{item.organization} · {item.fiscal_year}</div></td><td className="border px-2 py-1 text-center">{item.published ? 'Published' : 'Draft'}</td><td className="space-x-2 border px-2 py-1 text-center"><button type="button" onClick={() => editItem(item)} className="text-[11px] text-blue-600 hover:underline">Edit</button><button type="button" onClick={() => removeItem(item.mongoId ?? item.id)} className="text-[11px] text-red-600 hover:underline">Delete</button></td></tr>)}</tbody></table>}</div>
    </div>
  </div></div>;
}
