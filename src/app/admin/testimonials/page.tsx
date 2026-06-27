"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch, getAdminToken } from "@/lib/adminClient";
import { normalizeTestimonial, type Testimonial as ApiTestimonial } from "@/lib/apiClient";

type Testimonial = ApiTestimonial & {
  _mongoId?: string;
};

export default function AdminTestimonialsPage() {
  const router = useRouter();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Testimonial>({
    name: "",
    image: "",
    social_url: "",
    involvement: "",
    testimonial: "",
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
      const res = await adminFetch("/admin/testimonials", { method: "GET" });
      if (!res.ok) throw new Error(`Failed to load testimonials (${res.status})`);
      const data = (await res.json()) as any[];
      const normalized: Testimonial[] = data.map((doc) => {
        const testimonial = normalizeTestimonial(doc);
        return {
          ...testimonial,
          _mongoId: testimonial.mongoId ?? testimonial.id,
        };
      });
      setItems(normalized);
    } catch (err: any) {
      setError(err.message || "Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      image: "",
      social_url: "",
      involvement: "",
      testimonial: "",
    });
  };

  const handleEdit = (item: Testimonial) => {
    setEditingId(item._mongoId ?? item.id ?? null);
    setForm({
      name: item.name,
      image: item.image ?? "",
      social_url: item.social_url ?? "",
      involvement: item.involvement ?? "",
      testimonial: item.testimonial,
    });
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Delete this testimonial? This cannot be undone.")) return;
    try {
      const res = await adminFetch(`/admin/testimonials/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete testimonial");
      await loadItems();
      if (editingId === id) resetForm();
    } catch (err: any) {
      alert(err.message || "Failed to delete testimonial");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      name: form.name,
      image: form.image || undefined,
      social_url: form.social_url || undefined,
      involvement: form.involvement || undefined,
      testimonial: form.testimonial,
    };

    try {
      const method = editingId ? "PUT" : "POST";
      const path = editingId
        ? `/admin/testimonials/${editingId}`
        : "/admin/testimonials";
      const res = await adminFetch(path, {
        method,
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.detail || "Failed to save testimonial");
      }
      await loadItems();
      resetForm();
    } catch (err: any) {
      setError(err.message || "Failed to save testimonial");
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
              Testimonials
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              Manage the testimonial carousel shown on the home page.
            </p>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="text-xs md:text-sm border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50"
          >
            New testimonial
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-3 border border-gray-100 rounded-lg p-4"
          >
            <h2 className="text-sm font-semibold text-textBlue mb-1">
              {editingId ? "Edit testimonial" : "Create testimonial"}
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
                Picture URL
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
                Social media link
              </label>
              <input
                className="w-full border rounded-md px-2 py-1.5 text-sm"
                value={form.social_url ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, social_url: e.target.value }))
                }
                placeholder="https://instagram.com/... or https://linkedin.com/..."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                What they were involved with
              </label>
              <input
                className="w-full border rounded-md px-2 py-1.5 text-sm"
                value={form.involvement ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, involvement: e.target.value }))
                }
                placeholder="Workshop participant, volunteer, partner, etc."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Testimonial
              </label>
              <textarea
                className="w-full border rounded-md px-2 py-1.5 text-sm min-h-[140px]"
                value={form.testimonial}
                onChange={(e) =>
                  setForm((f) => ({ ...f, testimonial: e.target.value }))
                }
                required
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
              {saving ? "Saving…" : editingId ? "Update testimonial" : "Create testimonial"}
            </button>
          </form>

          <div className="border border-gray-100 rounded-lg p-4 overflow-auto max-h-[70vh] text-xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-textBlue">
                Existing testimonials
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
              <p className="text-gray-500">No testimonials added yet.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border px-2 py-1 text-left">Name</th>
                    <th className="border px-2 py-1 text-left">Involvement</th>
                    <th className="border px-2 py-1 text-left">Social</th>
                    <th className="border px-2 py-1">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr
                      key={item._mongoId ?? item.id ?? `${item.name}-${index}`}
                      className="hover:bg-gray-50"
                    >
                      <td className="border px-2 py-1">
                        <div className="font-semibold truncate max-w-[160px]">
                          {item.name}
                        </div>
                      </td>
                      <td className="border px-2 py-1">
                        <div className="truncate max-w-[220px]">
                          {item.involvement || <span className="text-gray-400">—</span>}
                        </div>
                      </td>
                      <td className="border px-2 py-1">
                        <div className="truncate max-w-[180px]">
                          {item.social_url ? (
                            <a
                              href={item.social_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Link
                            </a>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </div>
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
                          onClick={() => handleDelete(item._mongoId ?? item.id)}
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
