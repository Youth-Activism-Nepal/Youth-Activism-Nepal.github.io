"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAdminToken, getAdminToken } from "@/lib/adminClient";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    // Only read from localStorage on the client
    setIsAuthed(!!getAdminToken());
  }, []);

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    clearAdminToken();
    router.push("/admin/login");
  };

  // Always render; token checks are handled inside pages
  return (
    <div>
      {/* Admin sub-navbar, appears below main navbar */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <span className="font-semibold text-textBlue mr-2">
              Admin:
            </span>
            <NavLink href="/admin" active={isActive("/admin")}>
              Dashboard
            </NavLink>
            <NavLink href="/admin/main" active={isActive("/admin/main")}>
              Homepage
            </NavLink>
            <NavLink href="/admin/projects" active={isActive("/admin/projects")}>
              Projects
            </NavLink>
            <NavLink href="/admin/team" active={isActive("/admin/team")}>
              Team
            </NavLink>
            <NavLink href="/admin/partners" active={isActive("/admin/partners")}>
              Partners
            </NavLink>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm">
            {isAuthed ? (
              <button
                type="button"
                onClick={handleLogout}
                className="text-red-600 border border-red-200 rounded-md px-2 py-1 hover:bg-red-50"
              >
                Log out
              </button>
            ) : (
              <Link
                href="/admin/login"
                className="text-primaryRed border border-primaryRed/20 rounded-md px-2 py-1 hover:bg-primaryRed/5"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Admin page content */}
      <div>{children}</div>
    </div>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        "px-2 py-1 rounded-md",
        active
          ? "bg-primaryRed text-white"
          : "text-textBlue hover:bg-gray-100",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

