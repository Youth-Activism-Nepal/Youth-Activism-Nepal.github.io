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

const ALLOWED_TAGS = new Set([
  "a",
  "b",
  "blockquote",
  "br",
  "em",
  "h2",
  "h3",
  "h4",
  "i",
  "li",
  "ol",
  "p",
  "strong",
  "u",
  "ul",
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "target", "rel"]),
};

const sanitizeHtml = (html: string): string => {
  if (typeof window === "undefined" || !html.trim()) return "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const cleanNode = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) return;

    if (node.nodeType !== Node.ELEMENT_NODE) {
      node.parentNode?.removeChild(node);
      return;
    }

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    if (!ALLOWED_TAGS.has(tag)) {
      const parent = el.parentNode;
      if (!parent) return;
      while (el.firstChild) {
        parent.insertBefore(el.firstChild, el);
      }
      parent.removeChild(el);
      return;
    }

    Array.from(el.attributes).forEach((attr) => {
      const allowed = ALLOWED_ATTRS[tag];
      if (!allowed?.has(attr.name)) {
        el.removeAttribute(attr.name);
      }
    });

    if (tag === "a") {
      const href = el.getAttribute("href") ?? "";
      if (!/^https?:\/\//i.test(href) && !href.startsWith("/")) {
        el.removeAttribute("href");
      } else {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
    }

    Array.from(el.childNodes).forEach(cleanNode);
  };

  Array.from(doc.body.childNodes).forEach(cleanNode);
  return doc.body.innerHTML;
};

const ProjectSection: React.FC<ProjectSectionProps> = ({ project }) => {
  const images = parseImages(project.images);
  const fallbackImage = project.image || "/images/YANLOGO.png";
  const showCarousel = images.length > 1;
  const sanitizedContent = sanitizeHtml(project.content ?? "");
  const hasRichText = /<[^>]+>/.test(project.content ?? "");

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

        {hasRichText ? (
          <div
            className="rich-text-content w-full pt-4 text-sm text-textBlue font-light"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        ) : (
          project.content?.split("\n").map((para, i) => (
            <p key={i} className="text-sm text-textBlue text-justify font-light pt-4">
              {para.trim()}
            </p>
          ))
        )}

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
