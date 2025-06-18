// src/app/projects/[slug]/page.tsx

import Image from "next/image";
import { notFound } from "next/navigation";
import { ITeam } from "@/app/projects/projectType";

async function getProject(slug: string): Promise<ITeam | null> {
  const res = await fetch("http://data.youthactivismnepal.org.np/data/Projects", {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  const matched = data.data.find(
    (item: ITeam) => item.id?.toLowerCase() === slug.toLowerCase()
  );

  return matched ?? null;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>; // params is a Promise
}) {
  const { slug } = await params; // await params here

  const project = await getProject(slug);
  if (!project) return notFound();

  return (
    <section>
      <div className="flex flex-col justify-center items-center max-w-4xl mx-auto py-8">
        <Image
          src={project.image || "/images/YANLOGO.png"}
          alt={project.name}
          width={400}
          height={400}
          quality={100}
          className="rounded-lg w-full h-auto"
        />
      </div>

      <div className="flex flex-col justify-center items-center m-10 px-4 max-w-4xl mx-auto">
        {project.heading && (
          <p className="font-bold text-3xl text-center bg-clip-text bg-gradient-to-r from-green-600 to-green-950">
            {project.heading}
          </p>
        )}

        {project.subheading && (
          <p className="w-full font-semibold text-2xl text-center text-cs50Yellow mt-3">
            {project.subheading}
          </p>
        )}

        {project.content?.split("\n").map((para, i) => (
          <p key={i} className="text-sm text-textBlue text-justify font-light pt-4">
            {para.trim()}
          </p>
        ))}

        {project.hashtags && (
          <p className="text-sm text-textBlue text-justify font-light pt-4">
            <strong>{project.hashtags}</strong>
          </p>
        )}
      </div>
    </section>
  );
}