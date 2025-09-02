// app/projects/[slug]/page.tsx
"use client"
import React, { useEffect, useState } from "react";
import ProjectSection from "@/app/projects/[slug]/ProjectSection";
import { ITeam } from "@/app/projects/projectType";
import { useParams } from "next/navigation";

export default function ProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<ITeam | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`https://data.youthactivismnepal.org.np/data/Projects/${slug}`)
      .then((res) => res.json())
      .then((json) => {
        if (!json.project) {
          setError("Project data not found");
        } else {
          setProject(json.project);
        }
      })
      .catch(() => setError("Failed to fetch project data"));
  }, [slug]);

  if (error) {
    return (
      <main className="py-10 text-center text-red-600">
        <h1>Failed to load project</h1>
        <p>{error}</p>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="py-10 text-center">
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main className="py-10">
      <ProjectSection project={project} />
    </main>
  );
}