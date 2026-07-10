"use client";

import React, { useEffect, useState } from "react";
import ImageCarousel from "@/components/ui/ImageCarousel"; // adjust path if needed
import { getProjects } from "@/lib/apiClient";

export default function Donate() {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        getProjects()
            .then((projects) => {
                if (projects.length) {
                    const imageUrls = projects
                        .map((project) => project.image)
                        .filter((url): url is string => !!url);
                    setImages(imageUrls);
                }
            })
            .catch((error) => {
                console.error("Error fetching project data:", error);
            });
    }, []);

    return (
        <section className="bg-offWhite">
            <div className="px-6 pt-12 sm:px-6 md:px-8 lg:px-24 xl:px-32">
                <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#DB1920]/10 bg-[linear-gradient(135deg,#fff7e3_0%,#fff0c8_45%,#ffe0da_100%)] px-6 py-10 text-center shadow-[0_18px_45px_rgba(20,30,70,0.08)] sm:px-10 lg:py-14">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#DB1920]">
                        Support Youth Activism Nepal
                    </p>
                    <h1 className="mt-4 text-4xl font-black text-textBlue sm:text-5xl">
                        Fund a project. Fuel a future.
                    </h1>
                    <p className="mt-3 text-lg text-textBlue/80">
                        Transform lives in Nepal.
                    </p>
                    <p className="mx-auto mt-5 max-w-3xl text-sm sm:text-base text-textBlue">
                        Your contribution helps us launch youth-led projects,
                        expand civic learning, and create real opportunities for
                        young people across Nepal.
                    </p>

                    {images.length > 0 && (
                        <div className="mt-8">
                            <ImageCarousel images={images} />
                        </div>
                    )}
                </div>
            </div>

            <div className="px-6 pb-12 pt-10 sm:px-6 md:px-8 lg:px-24 xl:px-32">
                <div className="mx-auto max-w-4xl rounded-[2rem] bg-white px-6 py-10 text-center shadow-[0_12px_36px_rgba(20,30,70,0.08)] sm:px-10">
                    <h2 className="text-2xl font-bold text-textBlue sm:text-3xl">
                        Bank Account Details
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-textBlue/75">
                        Use the account below to make a direct contribution. If
                        you are supporting a specific initiative, mention it in
                        your transfer note when possible.
                    </p>

                    <div className="mt-8 rounded-2xl border border-gray-100 bg-[#fffaf0] px-6 py-6 text-textBlue">
                        <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 sm:text-base">
                            <p>
                                <strong>Bank Name:</strong> NABIL BANK LIMITED
                            </p>
                            <p>
                                <strong>Account Name:</strong> Youth Activism Nepal
                            </p>
                            <p>
                                <strong>Account Number:</strong> 26901017500012
                            </p>
                            <p>
                                <strong>SWIFT Code:</strong> NARBNPKA
                            </p>
                            <p className="sm:col-span-2">
                                <strong>Branch:</strong> Kanchanpur, Saptari, Nepal
                            </p>
                        </div>
                    </div>

                    <p className="mt-6 text-sm sm:text-base text-textBlue/80">
                        If you have any questions or need further assistance,
                        please contact us at{" "}
                        <a
                            href="mailto:info@youthactivismnepal.org.np"
                            className="font-semibold text-[#DB1920] underline"
                        >
                            info@youthactivismnepal.org.np
                        </a>
                        .
                    </p>
                </div>
            </div>
        </section>
    );
}
