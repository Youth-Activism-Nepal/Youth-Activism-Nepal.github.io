'use client';

import React from "react";
import ImageCarousel from "@/components/ui/ImageCarousel"; // ✅ adjust path if needed
import { ITeam } from "@/app/projects/projectType";

interface ProjectSectionProps {
  project: ITeam;
}

const parseImages = (images: string[] | string | undefined): string[] => {
  if (Array.isArray(images)) return images.filter(Boolean);
  if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch {
      return [];
    }
  }
  return [];
};

const ProjectSection: React.FC<ProjectSectionProps> = ({ project }) => {
  const images = parseImages(project.images);
  const fallbackImage = project.image || "/images/YANLOGO.png";
  const showCarousel = images.length > 1;

  return (
    <section>
      <div className="flex flex-col justify-center items-center max-w-4xl mx-auto py-8">
        {showCarousel ? (
          <ImageCarousel images={images} />
        ) : (
          <img
            src={images[0] || fallbackImage}
            alt={project.name}
            style={{
              maxHeight: "50vh",
              width: "100%",
              objectFit: "contain",
              borderRadius: "0.5rem",
            }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/images/YANLOGO.png";
            }}
          />
        )}
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
};

export default ProjectSection;