import Image from "next/image";
import React from "react";

export default function RP2023() {
    return (
        <>
            <section>
                <div className="flex flex-col justify-center items-center max-w-4xl mx-auto">
                    <Image
                        className="w-full h-full"
                        src="/images/projects/PT2024.jpg"
                        alt="RP2023"
                        quality={100}
                        width={400}
                        height={400}
                        priority
                    />
                </div>
                {/* Justified Text with some padding */}
                <div className="flex flex-col justify-center items-center m-10 px-4 max-w-4xl mx-auto">
                    <p className="font-bold text-3xl text-center bg-clip-text bg-gradient-to-r from-green-600 to-green-950">
                        Project Plantation
                    </p>
                    <p className="w-full font-semibold text-2xl text-center text-cs50Yellow mt-3">
                        Youth Activism Nepal's Commitment to a Sustainable
                        Future
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        Since <strong>2023</strong>,{" "}
                        <strong>Youth Activism Nepal (YAN)</strong> has been
                        leading an ongoing afforestation project, dedicated to
                        transforming <strong>Kanchanrup Municipality</strong>
                        into a greener and more sustainable environment. With
                        our unwavering commitment to tackling
                        <strong>climate change</strong> and promoting ecological
                        balance, we have successfully planted and nurtured{" "}
                        <strong>over 300 trees</strong>, with more to come.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        Our first major plantation drive was honored by the
                        presence of
                        <strong>Honorable Bachulal Chaudhary</strong>,
                        Chairperson of Kanchanrup-6, whose support has been
                        instrumental in ensuring the continued success of our
                        mission. His commitment to fostering a{" "}
                        <strong>green municipality</strong>
                        gives us the motivation to expand and sustain this
                        impactful project.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        In another remarkable milestone, we planted{" "}
                        <strong>100+ saplings</strong>
                        in <strong>Kanchanrup Nagarpalika</strong> under the
                        special initiative of
                        <strong>Dr. Sanjay Sah</strong>, a dedicated advocate
                        for environmental conservation and a long-time supporter
                        of YAN’s efforts. His vision for a sustainable future
                        continues to inspire us to scale up our afforestation
                        activities.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        We extend our sincere gratitude to{" "}
                        <strong>Mr. Suraj Thakur</strong>, Branch Manager of{" "}
                        <strong>NABIL Bank Kanchanpur</strong>, and the{" "}
                        <strong>
                            Principal of Nandalal Chowk Government School
                        </strong>{" "}
                        for their invaluable presence and support in making this
                        project a success. Their encouragement strengthens our
                        resolve to keep pushing forward with our sustainability
                        goals.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        What started as a single event has evolved into a{" "}
                        <strong>long-term movement</strong>, continuously
                        engaging young people, local leaders, and organizations
                        to create a lasting environmental impact. With each tree
                        we plant, we are building a healthier ecosystem,
                        reducing carbon footprints, and setting an example for
                        future generations to follow.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        <strong>Join us in this ongoing mission!</strong>{" "}
                        Together, let’s turn our communities into thriving green
                        spaces, combat <strong>climate change</strong>, and
                        leave behind a legacy of sustainability for years to
                        come. 🌿🌏🌱
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4 text-center">
                        <strong>
                            #YouthActivismNepal #YANcare #PlantingTrees
                            #ClimateAction #SDG13 #GreenMunicipality
                            #SustainabilityInAction
                        </strong>
                    </p>
                </div>
            </section>
        </>
    );
}
