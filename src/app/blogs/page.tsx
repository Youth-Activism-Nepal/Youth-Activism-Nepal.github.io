import type { Metadata } from "next";
import BlogsPageClient from "./BlogsPageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Blogs",
    description:
        "Read stories, updates, and insights from Youth Activism Nepal on youth engagement, projects, and community action.",
    path: "/blogs",
    keywords: ["Nepal youth blog", "community stories Nepal", "youth activism articles"],
});

export default function Page() {
    return <BlogsPageClient />;
}
