"use client";

import React, { useEffect, useState } from "react";
import ImageCarousel from "@/components/ui/ImageCarousel"; // adjust path if needed

export default function Donate() {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        fetch("https://data.youthactivismnepal.org.np/data/Projects/")
            .then((res) => res.json())
            .then((data) => {
                if (data?.data?.length) {
                    const imageUrls = data.data
                        .map((project: any) => project.image)
                        .filter((url: string) => !!url); // filter out empty/null
                    setImages(imageUrls);
                }
            })
            .catch((error) => {
                console.error("Error fetching project data:", error);
            });
    }, []);

    return (
        <section>
            <div className="h-full text-center items-center bg-offWhite px-6 sm:px-6 md:px-8 lg:px-24 xl:px-32 mt-10 sm:mt-0 mt-10">
                <div className="flex flex-col justify-center items-center m-10 ">
                    <h1 className="flex text-4xl font-black items-center justify-center text-red-600">
                        Donate to Youth Activism Nepal
                    </h1>
                    <p className="text-sm py-2 px-6 sm:px-28 lg:w-[80%] mx-auto text-textBlue">
                        Your support helps us continue our mission to empower
                        the youth of Nepal. Thank you for your generosity!
                    </p>

                    {/* Only show carousel when images are available */}
                    {images.length > 0 && (
                        <div className="w-full mb-6">
                            <ImageCarousel images={images} />
                        </div>
                    )}
                </div>
            </div>
            <div className="h-full text-center items-center bg-offWhite px-6 sm:px-6 md:px-8 lg:px-24 xl:px-32 mt-10 sm:mt-0 my-10">
                <div className="flex flex-col justify-center items-center m-10 ">
                    <h2 className="text-2xl font-semibold mt-1">
                        Bank Account Details
                    </h2>
                    <p className="text-sm py-2">
                        Please use the following bank account details to make a
                        donation:
                    </p>
                    <div className="text-sm py-2 mx-auto text-textBlue">
                        <div className="list-disc list-inside text-sm inline-block text-left">
                            <p className="text-center">
                                <strong>Bank Name:</strong> NABIL BANK LIMITED
                            </p>
                            <p className="text-center">
                                <strong>Account Name:</strong> Youth Activism
                                Nepal
                            </p>
                            <p className="text-center">
                                <strong>Account Number:</strong> 26901017500012
                            </p>
                            <p className="text-center">
                                <strong>SWIFT Code:</strong> NARBNPKA
                            </p>
                            <p className="text-center">
                                <strong>Branch:</strong> Kanchanpur, Saptari,
                                Nepal
                            </p>
                        </div>
                    </div>

                    <p className="text-sm py-2">
                        If you have any questions or need further assistance,
                        please contact us at{" "}
                        <a
                            href="mailto:youthactvismnepal@gmail.com"
                            className="text-blue-500 underline"
                        >
                            youthactvismnepal@gmail.com
                        </a>
                        .
                    </p>
                </div>
            </div>
        </section>
    );
}
