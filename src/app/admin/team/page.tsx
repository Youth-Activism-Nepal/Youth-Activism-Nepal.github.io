"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch, getAdminToken } from "@/lib/adminClient";

type TeamMember = {
  id?: string;
  _mongoId?: string;
  image?: string;
  badge?: string;
  name: string;
  role: string;
  year: number;
};

export default function AdminTeamPage() {
  const router = useRouter();
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<TeamMember>({
    name: "",
    role: "",
    year: new Date().getFullYear(),
    image: "",
    badge: "",
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
      const res = await adminFetch("/admin/team", { method: "GET" });
      if (!res.ok) throw new Error(`Failed to load team (${res.status})`);
      const data = (await res.json()) as any[];
      const normalized: TeamMember[] = data.map((doc) => ({
        ...doc,
        _mongoId: doc.id ?? doc._id,
      }));
      setItems(normalized);
    } catch (err: any) {
      setError(err.message || "Failed to load team");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      role: "",
      year: new Date().getFullYear(),
      image: "",
      badge: "",
    });
  };

  const handleEdit = (m: TeamMember) => {
    setEditingId(m._mongoId ?? m.id ?? null);
    setForm({
      name: m.name,
      role: m.role,
      year: m.year,
      image: m.image,
      badge: m.badge,
    });
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Delete this member? This cannot be undone.")) return;
    try {
      const res = await adminFetch(`/admin/team/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete member");
      await loadItems();
      if (editingId === id) resetForm();
    } catch (err: any) {
      alert(err.message || "Failed to delete member");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: TeamMember = {
      name: form.name,
      role: form.role,
      year: Number(form.year),
      image: form.image || undefined,
      badge: form.badge || undefined,
    };

    try {
      const method = editingId ? "PUT" : "POST";
      const path = editingId ? `/admin/team/${editingId}` : "/admin/team";
      const res = await adminFetch(path, {
        method,
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.detail || "Failed to save member");
      }
      await loadItems();
      resetForm();
    } catch (err: any) {
      setError(err.message || "Failed to save member");
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
              Team
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              Manage current and past team members.
            </p>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="text-xs md:text-sm border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50"
          >
            New member
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-3 border border-gray-100 rounded-lg p-4"
          >
            <h2 className="text-sm font-semibold text-textBlue mb-1">
              {editingId ? "Edit member" : "Create member"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  Role
                </label>
                <input
                  className="w-full border rounded-md px-2 py-1.5 text-sm"
                  value={form.role}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, role: e.target.value }))
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  className="w-full border rounded-md px-2 py-1.5 text-sm"
                  value={form.year}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      year: Number(e.target.value),
                    }))
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
                  placeholder="Optional"
                />
              </div>
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
              {saving ? "Saving…" : editingId ? "Update member" : "Create member"}
            </button>
          </form>

          <div className="border border-gray-100 rounded-lg p-4 overflow-auto max-h-[70vh] text-xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-textBlue">
                Existing team members
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
              <p className="text-gray-500">No team members added yet.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border px-2 py-1 text-left">Name</th>
                    <th className="border px-2 py-1 text-left">Role</th>
                    <th className="border px-2 py-1 text-left">Year</th>
                    <th className="border px-2 py-1">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((m, index) => (
                    <tr
                      key={m._mongoId ?? m.id ?? `${m.name}-${m.year}-${index}`}
                      className="hover:bg-gray-50"
                    >
                      <td className="border px-2 py-1">
                        <div className="font-semibold truncate max-w-[160px]">
                          {m.name}
                        </div>
                        {m.badge && (
                          <div className="text-[10px] text-gray-500 truncate max-w-[200px]">
                            {m.badge}
                          </div>
                        )}
                      </td>
                      <td className="border px-2 py-1">{m.role}</td>
                      <td className="border px-2 py-1">{m.year}</td>
                      <td className="border px-2 py-1 text-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(m)}
                          className="text-[11px] text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(m._mongoId ?? m.id)
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

