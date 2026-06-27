'use client';

import React from "react";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { IBlog } from "@/app/blogs/blogType";

interface BlogSectionProps {
  blog: IBlog;
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

const getYouTubeEmbedUrl = (value?: string): string | null => {
  if (!value) return null;

  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtube.com" || host === "m.youtube.com") {
      const videoId = url.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (host === "youtu.be") {
      const videoId = url.pathname.replace(/^\/+/, "").split("/")[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (host === "youtube-nocookie.com") {
      return value;
    }
  } catch {
    return null;
  }

  return null;
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

const BlogSection: React.FC<BlogSectionProps> = ({ blog }) => {
  const images = parseImages(blog.images);
  const fallbackImage = blog.image || "/images/YANLOGO.png";
  const showCarousel = images.length > 1;
  const youtubeEmbedUrl = getYouTubeEmbedUrl(blog.youtubeLink);
  const sanitizedContent = sanitizeHtml(blog.content ?? "");
  const hasRichText = /<[^>]+>/.test(blog.content ?? "");

  return (
    <section>
      <div className="flex flex-col justify-center items-center max-w-4xl mx-auto py-8">
        {showCarousel ? (
          <ImageCarousel images={images} />
        ) : (
          <img
            src={images[0] || fallbackImage}
            alt={blog.name}
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
        {youtubeEmbedUrl && (
          <div className="w-full mb-8">
            <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={youtubeEmbedUrl}
                title={blog.name ? `${blog.name} video` : "Blog video"}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {blog.heading && (
          <p className="font-bold text-3xl text-center bg-clip-text bg-gradient-to-r from-green-600 to-green-950">
            {blog.heading}
          </p>
        )}

        {blog.subheading && (
          <p className="w-full font-semibold text-2xl text-center text-cs50Yellow mt-3">
            {blog.subheading}
          </p>
        )}

        {hasRichText ? (
          <div
            className="rich-text-content w-full pt-4 text-sm text-textBlue font-light"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        ) : (
          blog.content?.split("\n").map((para, i) => (
            <p key={i} className="text-sm text-textBlue text-justify font-light pt-4">
              {para.trim()}
            </p>
          ))
        )}

        {blog.hashtags && (
          <p className="text-sm text-textBlue text-justify font-light pt-4">
            <strong>{blog.hashtags}</strong>
          </p>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
