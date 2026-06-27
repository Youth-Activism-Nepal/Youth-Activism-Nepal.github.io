"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { adminFetch, getAdminToken } from "@/lib/adminClient";
import { normalizeBlog, type Blog as ApiBlog } from "@/lib/apiClient";

type Blog = ApiBlog & {
  _mongoId?: string;
  images?: string[] | string | null;
};

export default function AdminBlogsPage() {
  const router = useRouter();
  const [items, setItems] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Blog>({
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
    youtubeLink: "",
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
      const res = await adminFetch("/admin/blogs", { method: "GET" });
      if (!res.ok) throw new Error(`Failed to load blogs (${res.status})`);
      const raw = await res.json();
      const data = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];
      const normalized: Blog[] = data.map((doc: any, index: number) => {
        const blog = normalizeBlog(doc, index);
        return {
          ...blog,
          _mongoId: blog.mongoId,
        };
      });
      setItems(normalized);
    } catch (err: any) {
      setError(err.message || "Failed to load blogs");
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
      youtubeLink: "",
    });
  };

  const handleEdit = (blog: Blog) => {
    setEditingId(blog._mongoId ?? blog.id ?? null);
    setForm({
      ...blog,
      id: blog.id ?? "",
      images: Array.isArray(blog.images)
        ? blog.images.join("\n")
        : typeof blog.images === "string"
        ? blog.images
        : "",
    });
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Delete this blog? This cannot be undone.")) return;
    try {
      const res = await adminFetch(`/admin/blogs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete blog");
      await loadItems();
      if (editingId === id) resetForm();
    } catch (err: any) {
      alert(err.message || "Failed to delete blog");
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

    const payload: Blog = {
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
      youtubeLink: form.youtubeLink || undefined,
      images: imagesPayload,
    };

    try {
      const method = editingId ? "PUT" : "POST";
      const path = editingId ? `/admin/blogs/${editingId}` : "/admin/blogs";
      const res = await adminFetch(path, {
        method,
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.detail || "Failed to save blog");
      }
      await loadItems();
      resetForm();
    } catch (err: any) {
      setError(err.message || "Failed to save blog");
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
              Blogs
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              These items power the blogs list and detail pages.
            </p>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="text-xs md:text-sm border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50"
          >
            New blog
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-3 border border-gray-100 rounded-lg p-4"
          >
            <h2 className="text-sm font-semibold text-textBlue mb-1">
              {editingId ? "Edit blog" : "Create blog"}
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
                  placeholder="first-blog-post"
                  required
                />
                <p className="mt-1 text-[11px] text-gray-500">
                  For IT/admin: this ID is the slug used in frontend URLs,
                  for example /blog?slug=first-blog-post. Use lowercase,
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
                  placeholder="Author, category, or short descriptor"
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
                YouTube link
              </label>
              <input
                className="w-full border rounded-md px-2 py-1.5 text-sm"
                value={form.youtubeLink ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, youtubeLink: e.target.value }))
                }
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <p className="mt-1 text-[11px] text-gray-500">
                If provided, the blog detail page will embed this video.
              </p>
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
              <RichTextEditor
                label="Content"
                value={form.content ?? ""}
                onChange={(value) =>
                  setForm((f) => ({ ...f, content: value }))
                }
                placeholder="Blog content shown on the detail page"
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
                placeholder="#blog #update …"
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
              {saving ? "Saving…" : editingId ? "Update blog" : "Create blog"}
            </button>
          </form>

          <div className="border border-gray-100 rounded-lg p-4 overflow-auto max-h-[70vh] text-xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-textBlue">
                Existing blogs
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
              <p className="text-gray-500">No blogs created yet.</p>
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
                  {items.map((blog, index) => (
                    <tr
                      key={blog._mongoId ?? blog.id ?? `${blog.name}-${blog.role}-${index}`}
                      className="hover:bg-gray-50"
                    >
                      <td className="border px-2 py-1">
                        <div className="break-all max-w-[160px] text-[11px] text-gray-700">
                          {blog.id && String(blog.id).trim() !== "" ? (
                            String(blog.id)
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </div>
                      </td>
                      <td className="border px-2 py-1">
                        <div className="font-semibold truncate max-w-[160px]">
                          {blog.name || "Untitled"}
                        </div>
                        {blog.heading && (
                          <div className="text-[10px] text-gray-500 truncate max-w-[200px]">
                            {blog.heading}
                          </div>
                        )}
                      </td>
                      <td className="border px-2 py-1">
                        {blog.role || <span className="text-gray-400">—</span>}
                      </td>
                      <td className="border px-2 py-1">
                        {blog.badge || <span className="text-gray-400">—</span>}
                      </td>
                      <td className="border px-2 py-1 text-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(blog)}
                          className="text-[11px] text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(blog._mongoId ?? blog.id)}
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
