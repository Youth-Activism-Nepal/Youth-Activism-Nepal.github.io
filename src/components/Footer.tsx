"use client";
import React from "react";
import { Link, Button } from "@nextui-org/react";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";

export default function FooterSection() {
    return (
        <div className="top-12 relative bg-offWhite">
            <section className="py-10 bg-offWhite sm:pt-16 lg:pt-24">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
                        <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
                            <Link href="/">
                                <Image
                                    src="/icon.svg"
                                    alt="CS50xNepal Logo"
                                    width={80}
                                    height={30}
                                />
                            </Link>

                            <p className="text-sm leading-relaxed text-textBlue mt-7">
                                Youth Activism Nepal is dedicated to fostering
                                excellence, innovation, and skill in youth
                                activism, empowering students to shape a
                                transformative and impactful future.
                            </p>

                            <ul className="flex items-center space-x-3 mt-9">
                                {[
                                    [
                                        "facebook",
                                        "https://www.facebook.com/profile.php?id=61554706883546&mibextid=kFxxJD",
                                    ],
                                    [
                                        "twitter",
                                        "https://x.com/CS50xNepal?t=zhIVQxpn57jrtVVsYZJG0w&s=09",
                                    ],
                                    [
                                        "linkedin",
                                        "https://www.linkedin.com/company/cs50x-nepal/",
                                    ],
                                    ["discord", "#"],
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

                    <p className="text-sm text-center text-gray-600">
                        © Copyright 2024, Youth Activism Nepal. All rights
                        reserved.
                    </p>
                </div>
            </section>
        </div>
    );
}
