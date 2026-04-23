'use client';

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProjectSection from "@/app/project/ProjectSection";
import type { ITeam } from "@/app/projects/projectType";
import { API_BASE_URL } from "@/config/api";

const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function Spinner() {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
    </div>
  );
}

/**
 * Page component only sets up Suspense (required for useSearchParams)
 */
export default function ProjectPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Suspense fallback={<Spinner />}>
        <ProjectPageInner />
      </Suspense>
    </main>
  );
}

/**
 * All hooks that depend on search params live inside the Suspense boundary.
 */
function ProjectPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = useMemo(() => searchParams.get("slug") ?? "", [searchParams]);

  const [data, setData] = useState<ITeam | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "error" | "done">("idle");

  // redirect if slug missing
  useEffect(() => {
    if (!slug) router.replace("/projects");
  }, [slug, router]);

  useEffect(() => {
    if (!slug) return;
    let alive = true;

    (async () => {
      try {
        setState("loading");
        const res = await fetch(
          `${API_BASE_URL}/data/Projects/${encodeURIComponent(slug)}`,
          { cache: "no-store" }
        );
        if (res.ok) {
          const json = await res.json();
          const project =
            json?.project ??
            json?.data ??
            (json && typeof json === "object" ? json : null);

          if (alive && project) {
            setData(project);
            setState("done");
            return;
          }
        }

        const listRes = await fetch(`${API_BASE_URL}/data/Projects`, {
          cache: "no-store",
        });
        if (!listRes.ok) throw new Error(`HTTP ${listRes.status}`);

        const listJson = await listRes.json();
        const list = Array.isArray(listJson?.data) ? listJson.data : [];
        const project = list.find((item: any) => {
          const candidateName =
            typeof item?.name === "string" && item.name.trim()
              ? item.name
              : "";
          return (
            item?.id === slug ||
            item?._id === slug ||
            toSlug(candidateName) === slug
          );
        });

        if (alive && project) {
          setData(project as ITeam);
          setState("done");
        } else if (alive) {
          router.replace("/projects");
        }
      } catch (e) {
        console.error("Failed to fetch project:", e);
        if (alive) router.replace("/projects");
      }
    })();

    return () => {
      alive = false;
    };
  }, [slug, router]);

  if (!slug) return null;

  if (state === "loading") return <Spinner />;
  if (state === "done" && data) return <ProjectSection project={data} />;

  return null;
}
