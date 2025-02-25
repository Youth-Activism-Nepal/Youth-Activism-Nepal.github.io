"use client";
import React from "react";
import { Link, Button } from "@nextui-org/react";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";

export default function FooterSection() {
    return (
        <div className="top-12 relative bg-offYellow">
            <section className="py-10 bg-offYellow sm:pt-16 lg:pt-24">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-3 md:col-span-3 lg:grid-cols-3 gap-y-16 gap-x-12">
                        <div className="col-span-2 md:col-span-2 lg:col-span-2 lg:pr-8">
                            <div className="col-span-1 md:col-span-1 lg:col-span-1 lg:pr-8">
                                <Link href="/">
                                    <Image
                                        src="/icon.svg"
                                        alt="CS50xNepal Logo"
                                        width={80}
                                        height={30}
                                    />
                                </Link>
                            </div>
                            <div className="col-span-1 md:col-span-1 lg:col-span-1 lg:pr-8">
                                <p className="text-sm leading-relaxed text-textBlue mt-7">
                                    Youth Activism Nepal is dedicated to
                                    fostering excellence, innovation, and skill
                                    in youth activism, empowering students to
                                    shape a transformative and impactful future.
                                </p>
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-1 lg:col-span-1 lg:pr-8 text-right">
                            <h2 className="text-xl font-semibold text-textBlue">
                                Contact Us
                            </h2>
                            <p className="text-sm mt-4">
                                <strong>Email:</strong>{" "}
                                <a
                                    href="mailto:youthactvismnepal@gmail.com"
                                    className="text-blue-500 underline"
                                >
                                    youthactvismnepal@gmail.com
                                </a>
                            </p>
                            <p className="text-sm">
                                <strong>Phone:</strong> +977 9860563625
                            </p>
                            <p className="text-sm">
                                <strong>Address:</strong> Kanchanpur, Saptari,
                                Nepal
                            </p>
                            <ul className="flex items-center justify-end space-x-3 mt-9">
                                {[
                                    [
                                        "facebook",
                                        "https://www.facebook.com/youthactivismnepal",
                                    ],
                                    [
                                        "linkedin",
                                        "https://www.linkedin.com/company/youth-activism-nepal/",
                                    ],
                                    [
                                        "instagram",
                                        "https://www.instagram.com/youthactivismnepal",
                                    ],
                                    // ["discord", "#"],
                                ].map(([network, url], index) => (
                                    <li key={index}>
                                        <SocialIcon
                                            url={url}
                                            className="flex items-center justify-center text-white transition-all duration-200 rounded-full w-7 h-7 hover:bg-primaryRed focus:bg-primaryRed hover:cursor-pointer"
                                            network={network}
                                            bgColor="#141E46"
                                            style={{ height: 30, width: 30 }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
                    <p className="text-sm text-center text-gray-600 py-4">
                        © Copyright 2024, Youth Activism Nepal. All rights
                        reserved.
                    </p>
        </div>
    );
}
