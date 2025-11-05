"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import ImageCarousel from "@/components/ui/ImageCarousel"; // adjust path if needed

type MainItem = {
    id?: string;
    together?: string;
    heading?: string;
    subheading?: string;
    text?: string;
    image?: string;
    height?: string | number;
    height_vh?: string | number;
    isHtml?: boolean; // 👈 tells us if `text` should be treated as HTML
};

type Section =
    | { kind: "single"; items: MainItem[] }
    | { kind: "group"; together: string; items: MainItem[] }
    | { kind: "images" }; // special marker for the carousel section

export default function About() {
    const [items, setItems] = useState<MainItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>([]);

    // keep these so purge never removes bg classes we use dynamically
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _KEEP_THESE = "bg-white bg-gray-100";

    // Flexible height function
    const heightVH = (h: unknown) => {
        const n = Number.parseFloat(String(h));
        if (!Number.isFinite(n)) return 80;
        if (n >= 30 && n <= 200) return Math.round(n); // already vh-like
        if (n >= 1 && n <= 10) return 10 * (Math.round(n) + 1); // legacy 1–10
        return 80;
    };

    const sectionMinHeight = (section: Section) => {
        if (section.kind === "images") {
            // Let the images section size itself to its content
            return {};
        }

        const heights = section.items.map((it) =>
            heightVH(it?.height_vh ?? it?.height)
        );
        const maxH = heights.length ? Math.max(...heights) : 80;
        return { minHeight: `${maxH}vh` };
    };

    const getBgClass = (index: number) =>
        index % 2 === 0 ? "bg-white" : "bg-gray-100";

    // Fetch carousel images
    useEffect(() => {
        fetch("https://data.youthactivismnepal.org.np/data/Projects/")
            .then((res) => res.json())
            .then((data) => {
                if (data?.data?.length) {
                    const imageUrls = data.data
                        .map((project: any) => project.image)
                        .filter((url: string) => !!url);
                    setImages(imageUrls);
                }
            })
            .catch((err) => console.error("Error fetching project data:", err));
    }, []);

    // Fetch main sections
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(
                    "https://data.youthactivismnepal.org.np/data/Main",
                    { headers: { Accept: "application/json" } }
                );
                if (!res.ok)
                    throw new Error(
                        `Request failed: ${res.status} ${res.statusText}`
                    );
                const json = await res.json();

                const rawData = Array.isArray(json?.data) ? json.data : [];

                // 🔑 Normalize API shape → ensure isHtml is a proper boolean
                const data: MainItem[] = rawData.map((raw: any) => ({
                    ...raw,
                    isHtml:
                        typeof raw.isHtml === "boolean"
                            ? raw.isHtml
                            : raw.isHTML === true ||
                              raw.isHTML === "true" ||
                              raw.isHTML === 1,
                }));

                if (!cancelled) setItems(data);
            } catch (err: any) {
                if (!cancelled)
                    setError(err.message || "Failed to fetch data.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    // Group consecutive items with the same non-empty `together`
    // and treat { id: "Images" } as a special "images" section
    const sections: Section[] = useMemo(() => {
        const out: Section[] = [];
        let i = 0;

        while (i < items.length) {
            const current = items[i];
            const id = (current.id || "").trim().toLowerCase();

            // Special marker for the carousel section
            if (id === "images") {
                out.push({ kind: "images" });
                i++;
                continue;
            }

            const tag = (current.together || "").trim();

            if (tag) {
                const group: MainItem[] = [current];
                let j = i + 1;
                while (
                    j < items.length &&
                    (items[j].together || "").trim() === tag
                ) {
                    group.push(items[j]);
                    j++;
                }
                if (group.length > 1) {
                    out.push({ kind: "group", together: tag, items: group });
                    i = j;
                    continue;
                }
            }

            out.push({ kind: "single", items: [current] });
            i++;
        }

        return out;
    }, [items]);

    return (
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
            {/* Loading */}
            {loading && (
                <div
                    className="bg-white w-screen relative left-1/2 right-1/2 -mx-[50vw] flex items-center"
                    style={{ minHeight: "80vh" }}
                >
                    <div className="px-4 mx-auto sm:px-6 lg:px-8 w-full flex items-center justify-center py-10 max-w-7xl">
                        <p className="text-red-600 font-bold text-2xl">
                            Loading…
                        </p>
                    </div>
                </div>
            )}

            {/* Error */}
            {error && (
                <div
                    className="bg-white w-screen relative left-1/2 right-1/2 -mx-[50vw] flex items-center"
                    style={{ minHeight: "60vh" }}
                >
                    <div className="px-4 mx-auto sm:px-6 lg:px-8 w-full flex items-center justify-center py-10 max-w-7xl">
                        <p className="text-red-600 font-bold text-2xl">
                            Error: {error}
                        </p>
                    </div>
                </div>
            )}

            {/* Sections */}
            {!loading &&
                !error &&
                sections.map((section, sIdx) => {
                    const bgClass = getBgClass(sIdx);

                    // Special "Images" section: render Activities / Carousel here
                    if (section.kind === "images") {
                        return (
                            <div
                                key={`section-images-${sIdx}`}
                                className={`${bgClass} w-screen relative left-1/2 right-1/2 -mx-[50vw] flex items-center`}
                            >
                                <div className="px-4 sm:px-6 lg:px-8 xl:px-12 py-10 w-full max-w-7xl mx-auto">
                                    <div
                                        id="images"
                                        className="h-full text-center items-center bg-white p-6 sm:px-6 md:px-8 lg:px-24 xl:px-32 sm:mt-0 mt-10"
                                    >
                                        <div className="flex flex-col justify-center items-center m-10">
                                            <h1 className="flex text-5xl m-5 font-black items-center justify-center text-red-600 sm:text-3xl lg:text-5xl">
                                                Our Activities
                                            </h1>
                                            {images.length > 0 && (
                                                <div className="w-full mb-6">
                                                    <ImageCarousel
                                                        images={images}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    const isGroup = section.kind === "group";

                    // For single sections, detect image on the (only) item
                    const imgItemSingle =
                        !isGroup &&
                        section.items.find((it) => it.image?.trim());

                    // Any image in the section (used for spacing decisions)
                    const hasAnyImage = section.items.some((it) =>
                        it.image?.trim()
                    );

                    return (
                        <div
                            key={`section-${sIdx}-${section.kind}-${
                                "together" in section
                                    ? (section as any).together
                                    : "single"
                            }`}
                            className={`${bgClass} w-screen relative left-1/2 right-1/2 -mx-[50vw] flex items-center`}
                            style={sectionMinHeight(section)}
                        >
                            {/* Inner centered container with limited max width */}
                            <div className="px-4 sm:px-6 lg:px-8 xl:px-12 py-10 w-full max-w-7xl mx-auto">
                                <div
                                    className={[
                                        "flex w-full flex-col sm:flex-row items-center",
                                        isGroup
                                            ? "gap-8"
                                            : hasAnyImage
                                            ? "md:gap-0 lg:gap-8 xl:gap-11"
                                            : "",
                                    ].join(" ")}
                                >
                                    {/* Columns */}
                                    {section.items.map((item, colIdx) => {
                                        const hasImage = !!item.image?.trim();

                                        // width per column
                                        const columnWidth = isGroup
                                            ? "w-full sm:flex-1"
                                            : hasAnyImage
                                            ? "w-full sm:w-2/3" // text column in single layout
                                            : "w-full";

                                        return (
                                            <div
                                                key={`${
                                                    item.id ??
                                                    `${sIdx}-${colIdx}`
                                                }`}
                                                className={[
                                                    columnWidth,
                                                    "flex flex-col justify-center",
                                                    hasImage || isGroup
                                                        ? "items-start text-left"
                                                        : "items-center text-center",
                                                    "min-w-0",
                                                ].join(" ")}
                                            >
                                                {/* Heading */}
                                                <p className="text-red-600 font-bold text-5xl sm:text-3xl lg:text-5xl">
                                                    {item.heading ||
                                                        "Youth Activism Nepal"}
                                                </p>

                                                {/* Subheading */}
                                                {item.subheading && (
                                                    <p className="w-full sm:w-128 font-semibold text-xl sm:text-base lg:text-2xl text-cs50Yellow mt-3">
                                                        {item.subheading}
                                                    </p>
                                                )}

                                                {/* Text: plain or HTML */}
                                                {item.text && (
                                                    item.isHtml ? (
                                                        // Treat as HTML (your grid, etc.)
                                                        <div
                                                            className="w-full md:w-4/5 pt-4"
                                                            dangerouslySetInnerHTML={{
                                                                __html: item.text,
                                                            }}
                                                        />
                                                    ) : (
                                                        // Treat as normal text
                                                        <div className="md:w-4/5 text-sm sm:text-base text-textBlue font-light pt-4 text-justify sm:text-justify whitespace-pre-line">
                                                            {item.text}
                                                        </div>
                                                    )
                                                )}

                                                {/* GROUPED: render image inside the same column */}
                                                {isGroup && hasImage && (
                                                    <div className="mt-6 self-center flex justify-center items-center shrink-0">
                                                        <Image
                                                            src={item.image!}
                                                            alt={
                                                                item.heading ||
                                                                "Section Image"
                                                            }
                                                            width={400}
                                                            height={400}
                                                            className="max-w-full h-auto object-contain max-h-[50vh]"
                                                            quality={100}
                                                            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 80vw"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}

                                    {/* SINGLE: if it has an image, render separate image column */}
                                    {!isGroup &&
                                        imgItemSingle &&
                                        typeof imgItemSingle !== "boolean" &&
                                        imgItemSingle.image && (
                                            <div className="w-full sm:w-1/3 min-w-0 shrink-0 flex justify-center items-center mt-6 sm:mt-0">
                                                <Image
                                                    src={imgItemSingle.image}
                                                    alt={
                                                        imgItemSingle.heading ||
                                                        "Section Image"
                                                    }
                                                    width={400}
                                                    height={400}
                                                    className="max-w-full h-auto object-contain max-h-[50vh]"
                                                    quality={100}
                                                    sizes="(min-width: 1024px) 33vw, 80vw"
                                                />
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
