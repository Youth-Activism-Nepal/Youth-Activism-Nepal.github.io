"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DonateFooterCta() {
    const pathname = usePathname();

    if (pathname === "/donate") {
        return null;
    }

    return (
        <section className="bg-offWhite px-4 py-8">
            <div className="mx-auto flex max-w-7xl justify-center">
                <Link
                    href="/donate"
                    className="inline-flex items-center justify-center rounded-md bg-[#DB1920] px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
                >
                    Donate
                </Link>
            </div>
        </section>
    );
}
