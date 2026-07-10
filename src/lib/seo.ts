import type { Metadata } from "next";

export const siteConfig = {
    name: "Youth Activism Nepal",
    shortName: "YAN",
    description:
        "Youth Activism Nepal empowers young people through civic engagement, leadership development, community projects, and youth-led campaigns across Nepal.",
    url: "https://youthactivismnepal.org.np",
    ogImage: "/images/YANLOGO.png",
    email: "info@youthactivismnepal.org.np",
    phone: "+9779860563625",
    address: "Kanchanpur, Saptari, Nepal",
    keywords: [
        "Youth Activism Nepal",
        "youth activism Nepal",
        "Nepal youth organization",
        "youth leadership Nepal",
        "civic engagement Nepal",
        "community projects Nepal",
        "youth campaigns Nepal",
        "volunteer Nepal",
    ],
    socialLinks: [
        "https://www.facebook.com/youthactivismnepal",
        "https://www.linkedin.com/company/youth-activism-nepal/",
        "https://www.instagram.com/youthactivismnepal",
    ],
};

export function absoluteUrl(path = "/") {
    return new URL(path, siteConfig.url).toString();
}

type BuildMetadataOptions = {
    title: string;
    description: string;
    path?: string;
    keywords?: string[];
    robots?: Metadata["robots"];
};

export function buildMetadata({
    title,
    description,
    path = "/",
    keywords = [],
    robots,
}: BuildMetadataOptions): Metadata {
    const imageUrl = absoluteUrl(siteConfig.ogImage);

    return {
        title,
        description,
        keywords: [...siteConfig.keywords, ...keywords],
        alternates: {
            canonical: path,
        },
        openGraph: {
            title,
            description,
            url: absoluteUrl(path),
            siteName: siteConfig.name,
            locale: "en_US",
            type: "website",
            images: [
                {
                    url: imageUrl,
                    alt: `${siteConfig.name} logo`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
        },
        robots,
    };
}

export function getOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "NGO",
        name: siteConfig.name,
        url: siteConfig.url,
        logo: absoluteUrl(siteConfig.ogImage),
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.address,
            addressCountry: "NP",
        },
        sameAs: siteConfig.socialLinks,
    };
}

export function getWebsiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: "en",
    };
}
