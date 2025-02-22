import Image from "next/image";
import React from "react";

export default function HIV2024() {
    return (
        <>
            <section>
                <div className="flex flex-col justify-center items-center max-w-4xl mx-auto">
                    <Image
                        className="w-full h-full"
                        src="/images/projects/HIV2024.jpg"
                        alt="HIV 2024"
                        quality={100}
                        width={400}
                        height={400}
                        priority
                    />
                </div>
                {/* Justified Text with some padding */}
                <div className="flex flex-col justify-center items-center m-10 px-4 max-w-4xl mx-auto">
                    <p className="font-bold text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-950">
                        HIV Awareness Campaign
                    </p>
                    <p className="w-full font-semibold text-2xl text-center text-cs50Yellow mt-3">
                        Educating and Empowering Youth at Shree Rajaji
                        Janjagaran School
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        We are thrilled to announce the successful completion of
                        our <strong>HIV awareness campaign</strong>
                        at <strong>Shree Rajaji Janjagaran School</strong>,
                        where we engaged with{" "}
                        <strong>70 enthusiastic students</strong>
                        eager to learn about HIV prevention, stigma reduction,
                        and overall health awareness.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        This impactful initiative was made possible through a
                        meaningful collaboration between
                        <strong>'We' for Change</strong>,{" "}
                        <strong>UNAIDS-Nepal</strong>, and our dedicated team at
                        <strong>Youth Activism Nepal (YAN)</strong>. Together,
                        we aimed to spread essential knowledge about HIV/AIDS,
                        debunk myths, and empower students with the right
                        information to create a more informed and supportive
                        community.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        During the session, students actively participated in
                        discussions about{" "}
                        <strong>
                            HIV transmission, prevention, and the importance of
                            early diagnosis
                        </strong>
                        . Through interactive learning methods, we emphasized
                        the need to combat stigma, promote safe health
                        practices, and encourage a supportive environment for
                        those affected by HIV.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        We extend our heartfelt gratitude to the{" "}
                        <strong>school administration</strong> for their
                        unwavering support in facilitating this program. A
                        special thanks to the incredible{" "}
                        <strong>
                            volunteers from Youth Activism Nepal (YAN)
                        </strong>
                        , whose dedication and passion played a crucial role in
                        making this event a resounding success.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        This campaign is part of our ongoing commitment to{" "}
                        <strong>youth empowerment and health education</strong>.
                        By equipping young individuals with accurate knowledge
                        and fostering open discussions, we are taking vital
                        steps toward eradicating misconceptions and promoting a
                        healthier society.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        The fight against HIV/AIDS is not just about
                        awareness—it's about{" "}
                        <strong>
                            building a future where every individual is
                            informed, supported, and empowered
                        </strong>
                        . Let’s continue working together to break the stigma
                        and spread knowledge for a healthier tomorrow!
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4 text-center">
                        <strong>
                            #HIVAwareness #YouthForChange #UNAIDS
                            #EmpowerThroughEducation #EndStigma
                        </strong>
                    </p>
                </div>
            </section>
        </>
    );
}
