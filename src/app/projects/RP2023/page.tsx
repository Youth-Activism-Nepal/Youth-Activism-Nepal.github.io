import Image from "next/image";
import React from "react";

export default function RP2023() {
    return (
        <>
            <section>
                <div className="flex flex-col justify-center items-center max-w-4xl mx-auto">
                    <Image
                        className="w-full h-full"
                        src="/images/projects/RP2023.jpg"
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
                        Project Repurpose
                    </p>
                    <p className="w-full font-semibold text-2xl text-center text-cs50Yellow mt-3">
                        Taking Steps Towards a Greener Future at Shree Bal
                        Binayak School
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        <strong>Exciting news!</strong> We have successfully
                        wrapped up an incredible event on
                        <strong>plastic pollution repurposing</strong> at{" "}
                        <strong>Shree Bal Binayak School, Balkot</strong>. This
                        initiative aimed to educate students on the impact of
                        plastic waste and explore innovative ways to repurpose
                        materials for a more sustainable future.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        With the guidance of our dedicated facilitators{" "}
                        <strong>
                            Prinshu Dahal, Krisha Bhattarai, and Rishav K Das
                        </strong>
                        , students actively participated in hands-on activities
                        to transform waste into useful resources. The session
                        emphasized the importance of
                        <strong>reducing, reusing, and repurposing</strong>{" "}
                        plastic to combat environmental pollution.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        Our motto? <strong>"I DID IT"</strong> 💪—a powerful
                        reminder that small actions lead to big changes. Through
                        interactive discussions and practical demonstrations, we
                        encouraged students to take ownership of their role in
                        environmental conservation and to inspire others within
                        their communities.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        We extend our sincere gratitude to{" "}
                        <strong>Students For Liberty - Nepal</strong> for their
                        incredible support under the{" "}
                        <strong>Green Liberty Project</strong>. Their
                        contribution played a crucial role in making this event
                        impactful and inspiring.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        At <strong>South Asia Students For Liberty</strong>, we
                        believe that change begins with awareness and action. By
                        empowering young minds with knowledge and skills in
                        sustainability, we are building a future that
                        prioritizes{" "}
                        <strong>
                            environmental responsibility and innovation
                        </strong>
                        .
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        This event marks another step forward in our journey
                        toward a cleaner and greener planet. Let’s continue
                        working together to spread awareness, take action, and
                        make sustainability a way of life! 🌍♻️
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4 text-center">
                        <strong>
                            #PlasticRepurposing #GreenLiberty #IDidIt
                            #SustainabilityInAction
                        </strong>
                    </p>
                </div>
            </section>
        </>
    );
}
