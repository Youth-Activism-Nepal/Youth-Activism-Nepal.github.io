import type { Metadata } from "next";
import TeamPageClient from "./TeamPageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Team",
    description:
        "Meet the team behind Youth Activism Nepal and the people leading its youth-focused programs and campaigns.",
    path: "/team",
    keywords: ["Youth Activism Nepal team", "Nepal youth leaders", "nonprofit team Nepal"],
});

export default function Page() {
    return <TeamPageClient />;
}
