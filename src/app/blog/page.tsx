import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Blog Article",
    description:
        "Read individual blog articles and updates published by Youth Activism Nepal.",
    path: "/blog",
    keywords: ["Youth Activism Nepal article", "Nepal youth blog post"],
});

export default function Page() {
    return <BlogPageClient />;
}
