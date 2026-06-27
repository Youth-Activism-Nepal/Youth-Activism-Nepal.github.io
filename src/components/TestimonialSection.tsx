"use client";

import { useEffect, useRef, useState } from "react";
import { getTestimonials, type Testimonial } from "@/lib/apiClient";

export default function TestimonialSection() {
    const [items, setItems] = useState<Testimonial[]>([]);
    const [current, setCurrent] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const total = items.length;

    useEffect(() => {
        let cancelled = false;

        getTestimonials()
            .then((testimonials) => {
                if (!cancelled) {
                    setItems(testimonials);
                }
            })
            .catch((error) => {
                console.error("Failed to fetch testimonials:", error);
                if (!cancelled) {
                    setItems([]);
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (total <= 1) return;
        timeoutRef.current = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % total);
        }, 7000);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [current, total]);

    if (items.length === 0) {
        return null;
    }

    const prevItem = items[(current - 1 + total) % total];
    const nextItem = items[(current + 1) % total];
    const activeItem = items[current];

    return (
        <section className="bg-[#f8f1df] w-screen relative left-1/2 right-1/2 -mx-[50vw]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#DB1920]">
                        Testimonials
                    </p>
                    <h2 className="mt-3 text-4xl lg:text-5xl font-black text-textBlue">
                        Voices From The Movement
                    </h2>
                    <p className="mt-4 text-sm sm:text-base text-textBlue/80">
                        Reflections from people who have worked with, learned from,
                        and grown alongside Youth Activism Nepal.
                    </p>
                </div>

                <div className="mt-12 max-w-6xl mx-auto">
                    <div className="relative px-12 sm:px-16">
                        <div className="relative min-h-[340px]">
                            {total > 1 && (
                                <>
                                    <PreviewCard
                                        item={prevItem}
                                        side="left"
                                        onClick={() =>
                                            setCurrent((current - 1 + total) % total)
                                        }
                                    />
                                    <PreviewCard
                                        item={nextItem}
                                        side="right"
                                        onClick={() =>
                                            setCurrent((current + 1) % total)
                                        }
                                    />
                                </>
                            )}

                            <article className="relative z-20 mx-auto w-full max-w-4xl rounded-2xl border border-[#DB1920]/10 bg-white px-6 py-10 shadow-[0_12px_30px_rgba(20,30,70,0.08)] sm:px-10">
                                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                                    <div className="mx-auto shrink-0 sm:mx-0">
                                        {activeItem.image ? (
                                            <img
                                                src={activeItem.image}
                                                alt={activeItem.name}
                                                className="h-24 w-24 rounded-full border border-[#DB1920]/15 object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#DB1920]/15 bg-[#DB1920]/10 text-3xl font-bold text-[#DB1920]">
                                                {activeItem.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className="text-base leading-8 text-textBlue sm:text-lg">
                                            {activeItem.testimonial}
                                        </p>
                                        <div className="mt-8 border-t border-gray-100 pt-4">
                                            <p className="font-bold text-textBlue">{activeItem.name}</p>
                                            {activeItem.involvement && (
                                                <p className="text-sm text-textBlue/70">
                                                    {activeItem.involvement}
                                                </p>
                                            )}
                                            {activeItem.social_url && (
                                                <a
                                                    href={activeItem.social_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-3 inline-flex text-sm font-semibold text-[#DB1920] hover:underline"
                                                >
                                                    Social Profile
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>

                        {total > 1 && (
                            <div className="mt-6 flex justify-center gap-2">
                                {items.map((item, index) => (
                                    <button
                                        key={item.mongoId ?? item.id ?? index}
                                        type="button"
                                        aria-label={`Go to testimonial ${index + 1}`}
                                        onClick={() => setCurrent(index)}
                                        className={[
                                            "h-2.5 w-2.5 rounded-full transition-colors",
                                            index === current
                                                ? "bg-[#DB1920]"
                                                : "bg-[#DB1920]/25",
                                        ].join(" ")}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

function PreviewCard({
    item,
    side,
    onClick,
}: {
    item: Testimonial;
    side: "left" | "right";
    onClick: () => void;
}) {
    const positionClass =
        side === "left"
            ? "left-0 -translate-x-6 lg:-translate-x-10"
            : "right-0 translate-x-6 lg:translate-x-10";

    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "absolute top-1/2 z-10 hidden w-72 -translate-y-1/2 rounded-2xl border border-[#DB1920]/10 bg-white/70 px-5 py-6 text-left shadow-[0_8px_24px_rgba(20,30,70,0.06)] opacity-40 backdrop-blur-[1px] transition-opacity hover:opacity-60 lg:block",
                positionClass,
            ].join(" ")}
            aria-label={`Show testimonial from ${item.name}`}
        >
            <div className="flex items-start gap-4">
                {item.image ? (
                    <img
                        src={item.image}
                        alt=""
                        className="h-14 w-14 shrink-0 rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#DB1920]/10 text-lg font-bold text-[#DB1920]">
                        {item.name.charAt(0).toUpperCase()}
                    </div>
                )}
                <div className="min-w-0">
                    <p
                        className="text-sm leading-6 text-textBlue"
                        style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 4,
                            overflow: "hidden",
                        }}
                    >
                        {item.testimonial}
                    </p>
                    <p className="mt-3 truncate text-sm font-semibold text-textBlue">
                        {item.name}
                    </p>
                </div>
            </div>
        </button>
    );
}
