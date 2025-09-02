'use client';

import { useEffect, useMemo, useState } from "react";
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

export default function ProjectPage() {
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

  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-10">
        {state === "loading" && <Spinner />}
        {state === "done" && data && <ProjectSection project={data} />}
      </main>
    </>
  );
}
