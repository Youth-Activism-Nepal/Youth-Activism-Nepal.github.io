import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

const routes = [
    "/",
    "/team",
    "/partners",
    "/projects",
    "/active-campaigns",
    "/upcoming-projects",
    "/blogs",
    "/blog",
    "/project",
    "/donate",
];

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    return routes.map((route) => ({
        url: `${siteConfig.url}${route}`,
        lastModified: now,
        changeFrequency: route === "/" ? "weekly" : "monthly",
        priority: route === "/" ? 1 : route === "/donate" ? 0.9 : 0.8,
    }));
}
