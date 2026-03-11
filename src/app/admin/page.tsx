"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearAdminToken, getAdminToken } from "@/lib/adminClient";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      setHasToken(false);
      router.replace("/admin/login");
    } else {
      setHasToken(true);
    }
  }, [router]);

  const handleLogout = () => {
    clearAdminToken();
    router.push("/admin/login");
  };

  if (hasToken === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offWhite">
        <p className="text-textBlue">Checking session…</p>
      </div>
    );
  }

  if (!hasToken) {
    return null;
  }

  return (
    <div className="min-h-screen bg-offWhite px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-textBlue mb-1">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Manage homepage content, projects, team, and partners.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-red-600 border border-red-200 rounded-md px-3 py-1.5 hover:bg-red-50"
          >
            Log out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminCard
            title="Homepage Sections"
            description="Edit the main sections, texts, and images that appear on the About page."
            href="/admin/main"
          />
          <AdminCard
            title="Projects"
            description="Create and update projects shown on the projects page and carousel."
            href="/admin/projects"
          />
          <AdminCard
            title="Team"
            description="Manage current and past team members."
            href="/admin/team"
          />
          <AdminCard
            title="Partners"
            description="Manage organizations that appear in the partners page."
            href="/admin/partners"
          />
        </div>
      </div>
    </div>
  );
}

type AdminCardProps = {
  title: string;
  description: string;
  href: string;
};

function AdminCard({ title, description, href }: AdminCardProps) {
  return (
    <Link
      href={href}
      className="block border border-gray-200 rounded-lg p-5 hover:border-primaryRed hover:shadow-md transition"
    >
      <h2 className="text-lg font-semibold text-textBlue mb-1">{title}</h2>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <span className="text-sm font-semibold text-primaryRed">
        Open &rarr;
      </span>
    </Link>
  );
}

