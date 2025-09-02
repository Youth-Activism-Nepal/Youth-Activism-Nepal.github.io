// app/projects/[slug]/page.tsx
import ProjectSection from "@/app/projects/[slug]/ProjectSection";
import { ITeam } from "@/app/projects/projectType";

interface Props {
  params: { slug: string };
}

async function getProject(slug: string): Promise<ITeam | null> {
  const res = await fetch(`https://data.youthactivismnepal.org.np/data/Projects/${slug}`, { cache: "no-store" });
  const json = await res.json();
  return json.project ?? null;
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject(params.slug);

  if (!project) {
    return (
      <main className="py-10 text-center text-red-600">
        <h1>Failed to load project</h1>
        <p>Project data not found</p>
      </main>
    );
  }

  return (
    <main className="py-10">
      <ProjectSection project={project} />
    </main>
  );
}