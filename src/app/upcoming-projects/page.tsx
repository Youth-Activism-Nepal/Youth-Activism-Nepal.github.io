import type { Metadata } from "next";
import UpcomingProjectsPageClient from "./UpcomingProjectsPageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Upcoming Projects",
    description:
        "See what Youth Activism Nepal is preparing next and follow projects before they launch.",
    path: "/upcoming-projects",
    keywords: ["upcoming projects Nepal", "future youth initiatives Nepal", "next Youth Activism Nepal projects"],
});

export default function Page() {
    return <UpcomingProjectsPageClient />;
}
