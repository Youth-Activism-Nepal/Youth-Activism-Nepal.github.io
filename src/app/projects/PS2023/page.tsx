import Image from "next/image";
import React from "react";

export default function PS2023() {
    return (
        <>
            <section>
                <div className="flex flex-col justify-center items-center max-w-4xl mx-auto">
                    <Image
                        className="w-full h-full"
                        src="/images/projects/PS2023.jpg"
                        alt="Madesh Impact Room 2023"
                        quality={100}
                        width={400}
                        height={400}
                        priority
                    />
                </div>
                {/* Justified Text with some padding */}
                <div className="flex flex-col justify-center items-center m-10 px-4 max-w-4xl mx-auto">
                    <p className="font-bold text-3xl text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-950">
                        Project Smile
                    </p>
                    <p className="w-full font-semibold text-2xl text-center text-cs50Yellow mt-3">
                        Promoting Better Oral Health in Kanchanrup Nagarpalika
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        Today, under the leadership and initiative of{" "}
                        <strong>Dr. Sanjay Sah</strong>, who has been actively
                        involved with <strong>Project Smile</strong> since 2019,
                        along with dedicated members of{" "}
                        <strong>Youth Activism Nepal (YAN)</strong>, we
                        successfully conducted an impactful event focused on
                        <strong>
                            oral hygiene awareness and dental screening
                        </strong>{" "}
                        at <strong>Kanchanrup Nagarpalika</strong>.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        The event aimed to educate community members about the
                        importance of maintaining good oral health, adopting
                        proper dental care routines, and preventing oral
                        diseases. Through interactive sessions, we emphasized
                        the significance of regular dental check-ups and early
                        intervention in maintaining overall health and
                        well-being.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        During the program, participants received free{" "}
                        <strong>dental screenings</strong> conducted by
                        experienced professionals, allowing them to understand
                        their oral health conditions and take necessary
                        preventive measures. The event also provided valuable
                        insights into common dental problems, hygiene practices,
                        and the long-term benefits of oral care.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        We extend our heartfelt gratitude to{" "}
                        <strong>Dr. Sanjay Sah</strong> for his dedication in
                        facilitating the event and sharing his expertise with
                        the participants. Additionally, we sincerely appreciate
                        the generous support and cooperation of
                        <strong>
                            Nabil Bank Branch Manager, Mr. Suraj Thakur
                        </strong>
                        , whose contributions played a vital role in ensuring
                        the program's success.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        This initiative reflects our ongoing commitment to
                        fostering community well-being through health awareness
                        programs and youth engagement. We believe that small
                        steps toward promoting <strong>oral hygiene</strong> can
                        lead to significant improvements in public health and
                        encourage individuals to take proactive care of their
                        dental health.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4">
                        As we continue our journey towards creating a healthier
                        society, we encourage everyone to spread awareness about{" "}
                        <strong>oral hygiene</strong>, support community health
                        initiatives, and take active steps toward a brighter and
                        healthier future.
                    </p>
                    <p className="text-sm text-textBlue text-justify font-light pt-4 text-center">
                        <strong>
                            #OralHygiene #OralHealth #YouthActivismNepal
                            #CommunityWellness
                        </strong>
                    </p>
                </div>
            </section>
        </>
    );
}
