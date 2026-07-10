import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: siteConfig.name,
        short_name: siteConfig.shortName,
        description: siteConfig.description,
        start_url: "/",
        display: "standalone",
        background_color: "#f4f4f4",
        theme_color: "#DB1920",
        icons: [
            {
                src: "/icon.svg",
                sizes: "any",
                type: "image/svg+xml",
            },
            {
                src: "/images/YANLOGO.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
