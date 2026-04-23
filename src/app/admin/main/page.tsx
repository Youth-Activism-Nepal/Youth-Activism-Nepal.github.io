"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch, getAdminToken } from "@/lib/adminClient";

type MainItem = {
  id?: string; // backend _id or slug; we will also normalize _mongoId for updates
  _mongoId?: string;
  order?: number | null;
  together?: string;
  heading?: string;
  subheading?: string;
  text?: string;
  image?: string;
  height?: number | null;
  height_vh?: number | null;
  isHtml?: boolean | null;
};

export default function AdminMainPage() {
  const router = useRouter();
  const [items, setItems] = useState<MainItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<MainItem>({
    order: null,
    together: "",
    heading: "",
    subheading: "",
    text: "",
    image: "",
    height_vh: 80,
    isHtml: false,
  });

  const parseOrder = (value: unknown): number | null => {
    if (value === null || value === undefined || value === "") return null;
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
  };

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
      const res = await adminFetch("/admin/main", { method: "GET" });
      if (!res.ok) {
        throw new Error(`Failed to load items (${res.status})`);
      }
      const raw = await res.json();
      const data = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];
      const normalized: MainItem[] = data.map((doc: any) => ({
        ...doc,
        _mongoId: doc.id ?? doc._id,
        order: parseOrder(
          doc.order ?? doc.Order ?? doc.sort_order ?? doc.sortOrder
        ),
      }));
      const sorted = normalized.sort((a, b) => {
        const orderA =
          a.order !== null && a.order !== undefined
            ? Number(a.order)
            : Number.MAX_SAFE_INTEGER;
        const orderB =
          b.order !== null && b.order !== undefined
            ? Number(b.order)
            : Number.MAX_SAFE_INTEGER;
        if (orderA !== orderB) return orderA - orderB;
        return (a.heading ?? "").localeCompare(b.heading ?? "");
      });
      setItems(sorted);
    } catch (err: any) {
      setError(err.message || "Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      order: null,
      together: "",
      heading: "",
      subheading: "",
      text: "",
      image: "",
      height_vh: 80,
      isHtml: false,
    });
  };

  const handleEdit = (item: MainItem) => {
    setEditingId(item._mongoId ?? item.id ?? null);
    setForm({
      order: parseOrder(item.order),
      together: item.together ?? "",
      heading: item.heading ?? "",
      subheading: item.subheading ?? "",
      text: item.text ?? "",
      image: item.image ?? "",
      height_vh: item.height_vh ?? (item.height as number | null) ?? 80,
      isHtml: item.isHtml ?? false,
    });
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Delete this section? This cannot be undone.")) return;
    try {
      const res = await adminFetch(`/admin/main/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete");
      }
      await loadItems();
      if (editingId === id) resetForm();
    } catch (err: any) {
      alert(err.message || "Failed to delete");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: MainItem = {
      order:
        form.order !== null && form.order !== undefined
          ? Number(form.order)
          : undefined,
      together: form.together || undefined,
      heading: form.heading || undefined,
      subheading: form.subheading || undefined,
      text: form.text || undefined,
      image: form.image || undefined,
      height_vh:
        form.height_vh !== null && form.height_vh !== undefined
          ? Number(form.height_vh)
          : undefined,
      isHtml: !!form.isHtml,
    };

    try {
      const method = editingId ? "PUT" : "POST";
      const path = editingId ? `/admin/main/${editingId}` : "/admin/main";

      const res = await adminFetch(path, {
        method,
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.detail || "Failed to save section");
      }

      await loadItems();
      resetForm();
    } catch (err: any) {
      setError(err.message || "Failed to save section");
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
              Homepage Sections
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              These items power the main sections on the About page.
            </p>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="text-xs md:text-sm border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50"
          >
            New section
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-3 border border-gray-100 rounded-lg p-4"
          >
            <h2 className="text-sm font-semibold text-textBlue mb-1">
              {editingId ? "Edit section" : "Create section"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Order
                </label>
                <input
                  type="number"
                  className="w-full border rounded-md px-2 py-1.5 text-sm"
                  value={form.order ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      order:
                        e.target.value === "" ? null : Number(e.target.value),
                    }))
                  }
                  placeholder="1"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Group tag (`together`)
                </label>
                <input
                  className="w-full border rounded-md px-2 py-1.5 text-sm"
                  value={form.together ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, together: e.target.value }))
                  }
                  placeholder="Optional grouping key"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Height (vh)
                </label>
                <input
                  type="number"
                  className="w-full border rounded-md px-2 py-1.5 text-sm"
                  value={form.height_vh ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      height_vh:
                        e.target.value === "" ? null : Number(e.target.value),
                    }))
                  }
                  placeholder="80"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Heading
              </label>
              <input
                className="w-full border rounded-md px-2 py-1.5 text-sm"
                value={form.heading ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, heading: e.target.value }))
                }
                placeholder="Main heading"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Subheading
              </label>
              <input
                className="w-full border rounded-md px-2 py-1.5 text-sm"
                value={form.subheading ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, subheading: e.target.value }))
                }
                placeholder="Optional subheading"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Image URL
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

            <div className="flex items-center gap-2">
              <input
                id="isHtml"
                type="checkbox"
                checked={!!form.isHtml}
                onChange={(e) =>
                  setForm((f) => ({ ...f, isHtml: e.target.checked }))
                }
              />
              <label
                htmlFor="isHtml"
                className="text-xs text-gray-700 select-none"
              >
                Treat text as HTML (for custom layouts)
              </label>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Text / HTML
              </label>
              <textarea
                className="w-full border rounded-md px-2 py-1.5 text-sm min-h-[120px]"
                value={form.text ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, text: e.target.value }))
                }
                placeholder={
                  form.isHtml
                    ? "<p>Rich HTML content…</p>"
                    : "Plain text shown on the page"
                }
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
              {saving ? "Saving…" : editingId ? "Update section" : "Create section"}
            </button>
          </form>

          <div className="border border-gray-100 rounded-lg p-4 overflow-auto max-h-[70vh] text-xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-textBlue">
                Existing sections
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
              <p className="text-gray-500">No sections created yet.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border px-2 py-1 text-left">Heading</th>
                    <th className="border px-2 py-1 text-left">Group</th>
                    <th className="border px-2 py-1 text-left">Height</th>
                    <th className="border px-2 py-1">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => {
                    const parsedOrder = parseOrder(item.order);
                    return (
                    <tr
                      key={
                        item._mongoId ??
                        item.id ??
                        `${item.heading}-${item.together}-${index}`
                      }
                      className="hover:bg-gray-50"
                    >
                      <td className="border px-2 py-1">
                        {parsedOrder ?? <span className="text-gray-400">—</span>}
                      </td>
                      <td className="border px-2 py-1">
                        <div className="font-semibold truncate max-w-[160px]">
                          {item.heading || "Untitled"}
                        </div>
                        {item.subheading && (
                          <div className="text-[10px] text-gray-500 truncate max-w-[200px]">
                            {item.subheading}
                          </div>
                        )}
                      </td>
                      <td className="border px-2 py-1">
                        {item.together || <span className="text-gray-400">—</span>}
                      </td>
                      <td className="border px-2 py-1">
                        {item.height_vh ?? item.height ?? "—"}
                      </td>
                      <td className="border px-2 py-1 text-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="text-[11px] text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(item._mongoId ?? item.id)
                          }
                          className="text-[11px] text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

