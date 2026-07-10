import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Youth Activism Nepal",
    description:
        "Explore Youth Activism Nepal's mission, activities, youth leadership work, and community impact across Nepal.",
    path: "/",
    keywords: ["youth development Nepal", "Nepal nonprofit", "youth-led initiatives"],
});

export default function Page() {
    return <HomePageClient />;
}
