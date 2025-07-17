// app/projects/[slug]/page.tsx
import React from "react";
import ProjectSection from "@/app/projects/[slug]/ProjectSection";
import { ITeam } from "@/app/projects/projectType";

async function getProjectBySlug(slug: string): Promise<ITeam> {
  const res = await fetch(`https://data.youthactivismnepal.org.np/data/Projects/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch project data");
  }

  const json = await res.json();

  if (!json.project) {
    throw new Error("Project data not found");
  }

  return json.project;
}

export async function generateStaticParams() {
  const res = await fetch("https://data.youthactivismnepal.org.np/data/Projects/");
  if (!res.ok) {
    throw new Error("Failed to fetch projects list");
  }

  const json = await res.json();
  const projects = json.data;

  if (!Array.isArray(projects)) {
    throw new Error("Projects data is not an array");
  }

  return projects.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    return (
      <main className="py-10">
        <ProjectSection project={project} />
      </main>
    );
  } catch (error) {
    return (
      <main className="py-10 text-center text-red-600">
        <h1>Failed to load project</h1>
        <p>{(error as Error).message}</p>
      </main>
    );
  }
}