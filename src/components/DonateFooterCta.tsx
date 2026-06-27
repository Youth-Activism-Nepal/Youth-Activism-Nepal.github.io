"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DonateFooterCta() {
    const pathname = usePathname();

    if (pathname === "/donate") {
        return null;
    }

    return (
        <section className="bg-offWhite px-4 py-10">
            <div className="mx-auto max-w-5xl">
                <div className="overflow-hidden rounded-[2rem] border border-[#DB1920]/10 bg-[linear-gradient(135deg,#fff7e3_0%,#fff0c8_45%,#ffe0da_100%)] px-6 py-10 text-center shadow-[0_18px_45px_rgba(20,30,70,0.08)] sm:px-10">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#DB1920]">
                        Support Youth Activism Nepal
                    </p>
                    <h2 className="mt-4 text-3xl font-black text-textBlue sm:text-4xl">
                        Fund a project. Fuel a future.
                    </h2>
                    <p className="mt-3 text-base text-textBlue/80 sm:text-lg">
                        Transform lives in Nepal.
                    </p>
                    <div className="mt-7 flex justify-center">
                        <Link
                            href="/donate"
                            className="inline-flex items-center justify-center rounded-full bg-[#DB1920] px-8 py-3 text-base font-semibold text-white shadow-[0_12px_24px_rgba(219,25,32,0.25)] transition-all hover:-translate-y-0.5 hover:bg-red-700"
                        >
                            Donate Now
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
