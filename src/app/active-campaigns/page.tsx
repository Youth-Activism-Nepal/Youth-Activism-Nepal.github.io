import type { Metadata } from "next";
import ActiveCampaignsPageClient from "./ActiveCampaignsPageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
    title: "Active Campaigns",
    description:
        "Follow the campaigns and live initiatives Youth Activism Nepal is actively running now.",
    path: "/active-campaigns",
    keywords: ["active campaigns Nepal", "live youth initiatives Nepal", "current nonprofit campaigns Nepal"],
});

export default function Page() {
    return <ActiveCampaignsPageClient />;
}
