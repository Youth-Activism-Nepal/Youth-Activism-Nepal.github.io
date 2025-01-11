"use client";
import React, { useEffect, useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Button,
} from "@nextui-org/react";
import { YANLogo } from "@/components/YANLogo";
import { usePathname } from "next/navigation";
import "../app/globals.css";

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const pathname = usePathname();

    const menuItems = [
        ["/", "Home"],
        // ["/projects", "Projects"],
        ["/team", "Team"],
    ];

    // IntersectionObserver for setting the active section
    useEffect(() => {
        if (typeof window === "undefined") return; // Prevent SSR execution
        const sections = document.querySelectorAll("section");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        sections.forEach((section) => observer.observe(section));
        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    // Function to check if a menu item is active
    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === href && !activeSection;
        }
        if (href.startsWith("/#")) {
            const sectionId = href.split("#")[1];
            return activeSection === sectionId;
        }
        return pathname === href;
    };

    return (
        <Navbar
            maxWidth="full"
            className="navbar z-50 px-0 sm:px-0 md:px-6 font-medium bg-offYellow text-textBlue overflow-x-hidden"
            onMenuOpenChange={setIsMenuOpen}
        >
            {/* Navbar Brand */}
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href="/" className="flex items-center gap-2">
                        <YANLogo />
                        Youth Activism Nepal
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            {/* Navbar Items */}
            <NavbarContent
                className="hidden sm:flex sm:gap-1 md:gap-2 lg:gap-4 xl:gap-6"
                justify="center"
            >
                {menuItems.map(([link, title], index) => (
                    <NavbarItem
                        className={`h-[40%] flex items-center text-textBlue transition-all duration-200 hover:text-primaryRed focus:text-primaryRed ${
                            isActive(link)
                                ? "border-b-3 rounded-sm border-primaryPurple text-primaryPurple hover:border-primaryRed focus:border-primaryRed"
                                : ""
                        } ${title === "Syllabus" ? "syllabus" : ""}`}
                        key={`${title}-${index}`}
                    >
                        <Link
                            className="sm:text-sm md:text-base text-base"
                            href={link}
                        >
                            {title}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            {/* Navbar Menu for Mobile */}
            <NavbarMenu className="bg-offYellow text-textBlue font-medium h-auto-important">
                {menuItems.map(([link, title], index) => (
                    <NavbarMenuItem
                        className={`hover:text-primaryRed focus:text-primaryRed transition-all duration-200 px-2 ${
                            isActive(link)
                                ? "border-s-3 rounded-sm border-primaryPurple text-primaryPurple hover:border-primaryRed focus:border-primaryRed"
                                : ""
                        } ${title === "Syllabus" ? "syllabus2" : ""}`}
                        key={`${title}-${index}`}
                    >
                        <Link className="w-full" href={link} size="md">
                            {title}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
