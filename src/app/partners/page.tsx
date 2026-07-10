import type { Metadata } from "next";
import PartnersPageClient from "./PartnersPageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Partners",
    description:
        "See the organizations and collaborators working with Youth Activism Nepal to expand youth impact in Nepal.",
    path: "/partners",
    keywords: ["Youth Activism Nepal partners", "Nepal partner organizations", "nonprofit collaboration Nepal"],
});

export default function Page() {
    return <PartnersPageClient />;
}
