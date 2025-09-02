'use client';

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProjectSection from "@/app/project/ProjectSection";
import type { ITeam } from "@/app/projects/projectType";

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
          `https://data.youthactivismnepal.org.np/data/Projects/${slug}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const project =
          json?.project ??
          json?.data ??
          (json && typeof json === "object" ? json : null);

        if (alive && project) {
          setData(project);
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
