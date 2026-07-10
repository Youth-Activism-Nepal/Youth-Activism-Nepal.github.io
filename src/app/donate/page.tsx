import type { Metadata } from "next";
import DonatePageClient from "./DonatePageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Donate",
    description:
        "Support Youth Activism Nepal by funding youth-led projects, civic learning, and community opportunities across Nepal.",
    path: "/donate",
    keywords: ["donate Nepal nonprofit", "support youth organization Nepal", "fund youth projects Nepal"],
});

export default function Page() {
    return <DonatePageClient />;
}
