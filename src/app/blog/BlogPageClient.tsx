'use client';

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BlogSection from "@/app/blog/BlogSection";
import type { IBlog } from "@/app/blogs/blogType";
import { getBlogBySlug, getBlogs } from "@/lib/apiClient";

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

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Suspense fallback={<Spinner />}>
        <BlogPageInner />
      </Suspense>
    </main>
  );
}

function BlogPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = useMemo(() => searchParams.get("slug") ?? "", [searchParams]);

  const [data, setData] = useState<IBlog | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "error" | "done">("idle");

  useEffect(() => {
    if (!slug) router.replace("/blogs");
  }, [slug, router]);

  useEffect(() => {
    if (!slug) return;
    let alive = true;

    (async () => {
      try {
        setState("loading");
        const blog = await getBlogBySlug(slug);
        if (alive && blog) {
          setData(blog as IBlog);
          setState("done");
          return;
        }

        const list = await getBlogs();
        const fallbackBlog = list.find((item: any) => {
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

        if (alive && fallbackBlog) {
          setData(fallbackBlog as IBlog);
          setState("done");
        } else if (alive) {
          router.replace("/blogs");
        }
      } catch (e) {
        console.error("Failed to fetch blog:", e);
        if (alive) router.replace("/blogs");
      }
    })();

    return () => {
      alive = false;
    };
  }, [slug, router]);

  if (!slug) return null;

  if (state === "loading") return <Spinner />;
  if (state === "done" && data) return <BlogSection blog={data} />;

  return null;
}
