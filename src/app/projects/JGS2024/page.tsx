import Image from "next/image";
import React from "react";

export default function JGS2024() {
    return (
        <>
            <section>
                <div className="flex flex-col justify-center items-center max-w-4xl mx-auto">
                    <Image
                        className="w-full h-full"
                        src="/images/projects/JGS2024.jpg"
                        alt="RP2023"
                        quality={100}
                        width={400}
                        height={400}
                        priority
                    />
                </div>
                {/* Justified Text with some padding */}
                <div className="flex flex-col justify-center items-center m-10 px-4 max-w-4xl mx-auto">
                    <p className="font-bold text-3xl text-center bg-clip-text bg-gradient-to-r from-blue-600 to-blue-950">
                        John Galt School Nepal 2024
                    </p>
                    <p className="w-full font-semibold text-2xl text-center text-cs50Yellow mt-3">
                        Empowering Youth Through Philosophy and Critical
                        Thinking
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        <strong>Youth Activism Nepal</strong> is proud to have
                        collaborated in hosting the{" "}
                        <strong>John Galt School Nepal 2024</strong>, an
                        educational initiative by the{" "}
                        <strong>Ayn Rand Center Europe</strong>. This seven-week
                        program introduced participants to{" "}
                        <strong>Objectivism</strong>—a philosophy that champions{" "}
                        <strong>
                            reason, individualism, and rational self-interest
                        </strong>
                        . Through interactive lectures, workshops, and cultural
                        discussions, students engaged in thought-provoking ideas
                        that shape intellectual and societal progress.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        Conducted in partnership with{" "}
                        <strong>Students For Liberty - Nepal</strong>, this
                        program brought together young and ambitious individuals
                        eager to explore the fundamental principles of{" "}
                        <strong>
                            metaphysics, epistemology, ethics, politics, and
                            aesthetics
                        </strong>
                        . Guided by distinguished lecturers, participants
                        expanded their understanding of rational philosophy and
                        its real-world applications.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        As a part of our mission at{" "}
                        <strong>Youth Activism Nepal</strong>, we believe in
                        empowering young minds with{" "}
                        <strong>philosophical literacy</strong> and the ability
                        to think critically about the world. The{" "}
                        <strong>John Galt School</strong> aligns with our vision
                        of fostering intellectual curiosity and encouraging
                        rational discourse among Nepalese youth.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        This initiative is part of a global effort, with{" "}
                        <strong>John Galt School</strong>
                        programs running in nearly <strong>
                            20 countries
                        </strong>{" "}
                        across Europe, Asia, Africa, and South America during
                        the spring-summer semester of 2024. We are excited to be
                        a part of this transformative journey, inspiring the
                        next generation of leaders and thinkers in Nepal.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4 text-center">
                        <strong>
                            #JohnGaltSchool #YouthActivismNepal
                            #PhilosophyMatters #CriticalThinking
                        </strong>
                    </p>
                </div>
            </section>
        </>
    );
}
