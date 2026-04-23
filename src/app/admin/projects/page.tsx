"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch, getAdminToken } from "@/lib/adminClient";

type Project = {
  id?: string;
  apiId?: unknown;
  _mongoId?: string;
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  extra?: Record<string, unknown> | null;
  name?: string;
  badge?: string;
  role?: string;
  heading?: string;
  subheading?: string;
  content?: string;
  hashtags?: string;
  images?: string[] | string | null;
};

export default function AdminProjectsPage() {
  const router = useRouter();
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Project>({
    id: "",
    name: "",
    badge: "",
    role: "",
    heading: "",
    subheading: "",
    content: "",
    hashtags: "",
    image: "",
    images: "",
    url: "",
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
      const res = await adminFetch("/admin/projects", { method: "GET" });
      if (!res.ok) throw new Error(`Failed to load projects (${res.status})`);
      const raw = await res.json();
      const data = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];
      const normalized: Project[] = data.map((doc: any) => ({
        ...doc,
        apiId: doc?.id,
        _mongoId: doc?._id,
      }));
      setItems(normalized);
    } catch (err: any) {
      setError(err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      id: "",
      name: "",
      badge: "",
      role: "",
      heading: "",
      subheading: "",
      content: "",
      hashtags: "",
      image: "",
      images: "",
      url: "",
    });
  };

  const handleEdit = (p: Project) => {
    setEditingId(p._mongoId ?? p.id ?? null);
    setForm({
      ...p,
      id: p.id ?? "",
      images: Array.isArray(p.images)
        ? p.images.join("\n")
        : typeof p.images === "string"
        ? p.images
        : "",
    });
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Delete this project? This cannot be undone.")) return;
    try {
      const res = await adminFetch(`/admin/projects/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete project");
      await loadItems();
      if (editingId === id) resetForm();
    } catch (err: any) {
      alert(err.message || "Failed to delete project");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    let imagesPayload: string[] | undefined;
    if (typeof form.images === "string") {
      const lines = form.images
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      imagesPayload = lines.length ? lines : undefined;
    } else if (Array.isArray(form.images)) {
      imagesPayload = form.images;
    }

    const payload: Project = {
      id: form.id || undefined,
      name: form.name || undefined,
      badge: form.badge || undefined,
      role: form.role || undefined,
      heading: form.heading || undefined,
      subheading: form.subheading || undefined,
      content: form.content || undefined,
      hashtags: form.hashtags || undefined,
      image: form.image || undefined,
      url: form.url || undefined,
      images: imagesPayload,
    };

    try {
      const method = editingId ? "PUT" : "POST";
      const path = editingId ? `/admin/projects/${editingId}` : "/admin/projects";
      const res = await adminFetch(path, {
        method,
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.detail || "Failed to save project");
      }
      await loadItems();
      resetForm();
    } catch (err: any) {
      setError(err.message || "Failed to save project");
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
              Projects
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              These items power the projects list and detail pages.
            </p>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="text-xs md:text-sm border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50"
          >
            New project
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-3 border border-gray-100 rounded-lg p-4"
          >
            <h2 className="text-sm font-semibold text-textBlue mb-1">
              {editingId ? "Edit project" : "Create project"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  ID (slug)
                </label>
                <input
                  className="w-full border rounded-md px-2 py-1.5 text-sm"
                  value={form.id ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, id: e.target.value }))
                  }
                  placeholder="john-galt-school"
                  required
                />
                <p className="mt-1 text-[11px] text-gray-500">
                  For IT/admin: this ID is the slug used in frontend URLs,
                  for example /project?slug=john-galt-school. Use lowercase,
                  numbers, and hyphens only.
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  className="w-full border rounded-md px-2 py-1.5 text-sm"
                  value={form.name ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Badge
                </label>
                <input
                  className="w-full border rounded-md px-2 py-1.5 text-sm"
                  value={form.badge ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, badge: e.target.value }))
                  }
                  placeholder="Optional small label"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input
                  className="w-full border rounded-md px-2 py-1.5 text-sm"
                  value={form.role ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, role: e.target.value }))
                  }
                  placeholder="Your role in this project"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Primary image URL
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
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Additional image URLs (one per line)
              </label>
              <textarea
                className="w-full border rounded-md px-2 py-1.5 text-sm min-h-[80px]"
                value={typeof form.images === "string" ? form.images : ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, images: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Heading (detail page)
              </label>
              <input
                className="w-full border rounded-md px-2 py-1.5 text-sm"
                value={form.heading ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, heading: e.target.value }))
                }
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
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                className="w-full border rounded-md px-2 py-1.5 text-sm min-h-[120px]"
                value={form.content ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                placeholder="Project description shown on the detail page"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Hashtags
              </label>
              <input
                className="w-full border rounded-md px-2 py-1.5 text-sm"
                value={form.hashtags ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, hashtags: e.target.value }))
                }
                placeholder="#youth #activism …"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                External URL
              </label>
              <input
                className="w-full border rounded-md px-2 py-1.5 text-sm"
                value={form.url ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, url: e.target.value }))
                }
                placeholder="Optional read more link"
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
              {saving ? "Saving…" : editingId ? "Update project" : "Create project"}
            </button>
          </form>

          <div className="border border-gray-100 rounded-lg p-4 overflow-auto max-h-[70vh] text-xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-textBlue">
                Existing projects
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
              <p className="text-gray-500">No projects created yet.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border px-2 py-1 text-left">ID (slug)</th>
                    <th className="border px-2 py-1 text-left">Name</th>
                    <th className="border px-2 py-1 text-left">Role</th>
                    <th className="border px-2 py-1 text-left">Badge</th>
                    <th className="border px-2 py-1">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((p, index) => (
                    <tr
                      key={p._mongoId ?? p.id ?? `${p.name}-${p.role}-${index}`}
                      className="hover:bg-gray-50"
                    >
                      <td className="border px-2 py-1">
                        <div className="break-all max-w-[160px] text-[11px] text-gray-700">
                          {p.apiId !== undefined && p.apiId !== null && String(p.apiId).trim() !== "" ? (
                            String(p.apiId)
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </div>
                      </td>
                      <td className="border px-2 py-1">
                        <div className="font-semibold truncate max-w-[160px]">
                          {p.name || "Untitled"}
                        </div>
                        {p.heading && (
                          <div className="text-[10px] text-gray-500 truncate max-w-[200px]">
                            {p.heading}
                          </div>
                        )}
                      </td>
                      <td className="border px-2 py-1">
                        {p.role || <span className="text-gray-400">—</span>}
                      </td>
                      <td className="border px-2 py-1">
                        {p.badge || <span className="text-gray-400">—</span>}
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

