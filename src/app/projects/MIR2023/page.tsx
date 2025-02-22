import Image from "next/image";
import React from "react";

export default function MIR2023() {
    return (
        <>
            <section>
                <div className="flex flex-col justify-center items-center max-w-4xl mx-auto">
                    <Image
                        className="w-full h-full"
                        src="/images/projects/MIR2023.jpg"
                        alt="Madesh Impact Room 2023"
                        quality={100}
                        width={400}
                        height={400}
                        priority
                    />
                </div>
                {/* Justified Text with some padding */}
                <div className="flex flex-col justify-center items-center m-10 px-4 max-w-4xl mx-auto">
                    <p className="font-bold text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-950">
                        Madhesh Impact Room 2023
                    </p>
                    <p className="w-full font-semibold text-2xl text-center text-cs50Yellow mt-3">
                        SDG and Climate Change
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        The Madhesh Impact Room 2023 aims to provide a dynamic
                        platform for young individuals to learn about the
                        Sustainable Development Goals (SDGs) and Climate Change,
                        connect with like-minded peers, and collaborate on
                        innovative solutions that contribute to these global
                        priorities.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        Madhesh, a region in southern Nepal, faces significant
                        socio-economic and environmental challenges, including
                        climate change-induced floods, droughts, and extreme
                        weather events. By hosting this event in Madhesh, we aim
                        to raise awareness of these pressing issues and empower
                        youth in the region to take proactive steps toward a
                        more sustainable and resilient future.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        Our goal is to inspire and equip young people with the
                        knowledge and skills necessary to become agents of
                        change, fostering sustainable development within their
                        communities and beyond.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        <strong>
                            About Madhesh Impact Room 2023: How Are We
                            Organizing This Impact Room?
                        </strong>
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        The event is being meticulously planned by a dedicated
                        team to ensure a structured and impactful experience.
                        Below is an overview of the organizational framework:
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        <strong>Event Concept Development:</strong> The concept
                        was proposed by Rishav Das, a Peace First Ambassador,
                        with a vision to create an interactive space for
                        discussions on SDGs and Climate Change.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        <strong>
                            Coordination with Youth Advocacy Nepal (YAN):
                        </strong>{" "}
                        The Youth Advocacy Nepal (YAN) team will oversee event
                        logistics, venue management, and resource allocation to
                        ensure smooth execution.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        <strong>Participant Registration:</strong> Sumit Sah and
                        his team from YAN will be responsible for participant
                        registration, particularly engaging youth from different
                        areas within Sapatri.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        <strong>Venue Confirmation:</strong> Nujhat Prabin and
                        the YAN team will finalize the event venue through an
                        official application or verbal agreement.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        <strong>Session Strategy Development:</strong> Rishav
                        Das and Sushmina Baidya will lead the development of
                        session strategies, including the preparation of
                        structured PowerPoint presentations and interactive
                        activities.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        <strong>Printing and Materials Preparation:</strong>{" "}
                        Sumit, Kamal, and the YAN team will coordinate the
                        printing of essential materials such as banners,
                        stationery, and participant prizes.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        <strong>Event Execution:</strong> During the event,
                        Rishav Das, Sushmina Baidya, and the YAN team will
                        facilitate discussions, manage resources, and ensure a
                        seamless experience for all attendees.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        <strong>Conclusion:</strong> Through the Madhesh Impact
                        Room 2023, we aspire to empower young individuals, equip
                        them with the necessary skills and knowledge, and foster
                        collaboration to address climate change and sustainable
                        development challenges in the region. This initiative
                        stands as a testament to the power of youth-led action
                        in shaping a more resilient and sustainable future for
                        Madhesh and beyond.
                    </p>
                </div>
            </section>
        </>
    );
}
