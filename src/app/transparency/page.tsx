import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import TransparencyPageClient from "./TransparencyPageClient";

export const metadata: Metadata = buildMetadata({
  title: "Transparency",
  description: "Financial reports and transparency information from Youth Activism Nepal.",
  path: "/transparency",
  keywords: ["Youth Activism Nepal financial reports", "nonprofit transparency Nepal"],
});

export default function TransparencyPage() {
  return <TransparencyPageClient />;
}
