"use client";
import React from "react";
import Image from "next/image";
import { Link, Button } from "@nextui-org/react";

export default function Home() {
    return (
        <>
            <section className="h-full sm:h-[84.5vh] items-center flex bg-offWhite overflow-hidden px-6 sm:px-6 md:px-8 lg:px-24 xl:px-32 mt-10 sm:mt-0">
                {/* Heading/Introduction */}
                <div className="flex flex-col items-center sm:flex-row md:gap-0 lg:gap-8 xl:gap-11">
                    <div className="w-full flex flex-col items-center sm:items-start align-center justify-center sm:w-1/2">
                        <p className="font-bold text-7xl md:text-4xl sm:text-3xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-950">
                            Youth Activism Nepal
                        </p>
                        <p className="w-full sm:w-96 font-semibold text-2xl text-center sm:text-left sm:text-base md:text-regular lg:text-2xl text-cs50Yellow mt-3">
                            Engage, Empower and Impact
                        </p>
                        <p className="md:w-[80%] text-sm text-textBlue text-justify sm:text-justify font-light pt-4">
                            A youth-led non-profit organization that mobilizes
                            community-based projects in Nepal. Our vision is to
                            create a better Nepal by providing basic health,
                            education, and empowerment to every citizen. We
                            strive to impact, engage and empower the
                            underprivileged individuals, groups, and communities
                            through our work under 7 principles. Our thematic
                            areas include Children, Women and Elderly People
                            Welfare, Quality Education, Good Health & Wellbeing,
                            Anti-Drug Society, SDG and Environment
                            Sustainability, Civic Engagement and Aids to
                            Vulnerable Communities, Disaster Management and Risk
                            Control, and Research and Publication. Join us in
                            creating a dynamic change in the community towards a
                            better Nepal.
                        </p>
                    </div>
                    {/* Image div */}
                    <div className="flex flex-col justify-center items-center">
                        <Image
                            className="w-100 h-100"
                            src="/images/YANLOGO.png"
                            alt="Youth Activism Nepal Logo"
                            quality={100}
                            width={400}
                            height={400}
                            priority
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
