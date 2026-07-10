import type { Metadata } from "next";
import ProjectPageClient from "./ProjectPageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Project Details",
    description:
        "Read detailed information about Youth Activism Nepal projects, campaigns, and field activities.",
    path: "/project",
    keywords: ["Youth Activism Nepal project", "Nepal youth project details"],
});

export default function Page() {
    return <ProjectPageClient />;
}
