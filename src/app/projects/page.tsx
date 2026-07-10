import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Past Projects",
    description:
        "Browse completed projects and past initiatives from Youth Activism Nepal.",
    path: "/projects",
    keywords: ["past projects Nepal", "Youth Activism Nepal projects", "completed youth initiatives Nepal"],
});

export default function Page() {
    return <ProjectsPageClient />;
}
