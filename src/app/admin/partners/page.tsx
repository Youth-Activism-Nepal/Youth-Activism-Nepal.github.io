"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch, getAdminToken } from "@/lib/adminClient";

type Partner = {
  id?: string;
  _mongoId?: string;
  image?: string;
  name: string;
  url?: string;
  description?: string;
};

export default function AdminPartnersPage() {
  const router = useRouter();
  const [items, setItems] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Partner>({
    name: "",
    image: "",
    url: "",
    description: "",
  });

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    void loadItems();
  }, [router]);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminFetch("/admin/partners", { method: "GET" });
      if (!res.ok) throw new Error(`Failed to load partners (${res.status})`);
      const data = (await res.json()) as any[];
      const normalized: Partner[] = data.map((doc) => ({
        ...doc,
        _mongoId: doc.id ?? doc._id,
      }));
      setItems(normalized);
    } catch (err: any) {
      setError(err.message || "Failed to load partners");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      image: "",
      url: "",
      description: "",
    });
  };

  const handleEdit = (p: Partner) => {
    setEditingId(p._mongoId ?? p.id ?? null);
    setForm({
      name: p.name,
      image: p.image,
      url: p.url,
      description: p.description,
    });
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Delete this partner? This cannot be undone.")) return;
    try {
      const res = await adminFetch(`/admin/partners/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete partner");
      await loadItems();
      if (editingId === id) resetForm();
    } catch (err: any) {
      alert(err.message || "Failed to delete partner");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: Partner = {
      name: form.name,
      image: form.image || undefined,
      url: form.url || undefined,
      description: form.description || undefined,
    };

    try {
      const method = editingId ? "PUT" : "POST";
      const path = editingId ? `/admin/partners/${editingId}` : "/admin/partners";
      const res = await adminFetch(path, {
        method,
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.detail || "Failed to save partner");
      }
      await loadItems();
      resetForm();
    } catch (err: any) {
      setError(err.message || "Failed to save partner");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-offWhite px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-textBlue">
              Partners
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              Manage organizations that appear on the partners page.
            </p>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="text-xs md:text-sm border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50"
          >
            New partner
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-3 border border-gray-100 rounded-lg p-4"
          >
            <h2 className="text-sm font-semibold text-textBlue mb-1">
              {editingId ? "Edit partner" : "Create partner"}
            </h2>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                className="w-full border rounded-md px-2 py-1.5 text-sm"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Logo URL
              </label>
              <input
                className="w-full border rounded-md px-2 py-1.5 text-sm"
                value={form.image ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, image: e.target.value }))
                }
                placeholder="https://…"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Website URL
              </label>
              <input
                className="w-full border rounded-md px-2 py-1.5 text-sm"
                value={form.url ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, url: e.target.value }))
                }
                placeholder="https://partner.org"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full border rounded-md px-2 py-1.5 text-sm min-h-[80px]"
                value={form.description ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Optional short description"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-2 py-1.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-4 py-1.5 rounded-md text-sm font-semibold bg-primaryRed text-white hover:bg-red-700 disabled:opacity-60"
            >
              {saving ? "Saving…" : editingId ? "Update partner" : "Create partner"}
            </button>
          </form>

          <div className="border border-gray-100 rounded-lg p-4 overflow-auto max-h-[70vh] text-xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-textBlue">
                Existing partners
              </h2>
              <button
                type="button"
                onClick={loadItems}
                className="text-xs text-primaryRed hover:underline"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <p className="text-gray-500">Loading…</p>
            ) : items.length === 0 ? (
              <p className="text-gray-500">No partners added yet.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border px-2 py-1 text-left">Name</th>
                    <th className="border px-2 py-1 text-left">Website</th>
                    <th className="border px-2 py-1">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((p, index) => (
                    <tr
                      key={p._mongoId ?? p.id ?? `${p.name}-${index}`}
                      className="hover:bg-gray-50"
                    >
                      <td className="border px-2 py-1">
                        <div className="font-semibold truncate max-w-[160px]">
                          {p.name}
                        </div>
                        {p.description && (
                          <div className="text-[10px] text-gray-500 truncate max-w-[200px]">
                            {p.description}
                          </div>
                        )}
                      </td>
                      <td className="border px-2 py-1">
                        {p.url ? (
                          <span className="truncate inline-block max-w-[140px]">
                            {p.url}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="border px-2 py-1 text-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(p)}
                          className="text-[11px] text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(p._mongoId ?? p.id)
                          }
                          className="text-[11px] text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

