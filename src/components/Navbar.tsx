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
} from "@nextui-org/react";
import { YANLogo } from "@/components/YANLogo";
import { usePathname } from "next/navigation";
import "../app/globals.css";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  const menuItems: [string, string][] = [
    ["/", "About"],
    ["/team", "Team"],
    ["/partners", "Partners"],
    ["/projects", "Projects"],
    ["/donate", "Donate"],
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === href && !activeSection;
    if (href.startsWith("/#")) {
      const sectionId = href.split("#")[1];
      return activeSection === sectionId;
    }
    return pathname === href;
  };

  return (
    // FULL-BLEED WRAPPER (background spans viewport edges)
    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[#DB1920]">
      {/* INNER CONTAINER (limits width + keeps your paddings/centering) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <Navbar
          maxWidth="full"
          className="navbar z-50 px-0 py-2 sm:px-0 md:px-0 font-medium bg-[#DB1920] text-white overflow-x-hidden"
          onMenuOpenChange={setIsMenuOpen}
        >
          {/* Brand + burger */}
          <NavbarContent className="px-4">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand>
              <Link href="/" className="flex items-center gap-2 text-white">
                <YANLogo />
                <div className="pt-4">Youth Activism Nepal</div>
              </Link>
            </NavbarBrand>
          </NavbarContent>

          {/* Desktop items */}
          <NavbarContent
            className="hidden px-4 pt-4 sm:flex sm:gap-1 md:gap-2 lg:gap-4 xl:gap-6"
            justify="center"
          >
            {menuItems.map(([link, title], index) => (
              <NavbarItem
                key={`${title}-${index}`}
                className={`h-[40%] flex items-center text-white transition-all duration-200 hover:text-green-400 focus:text-green-400 ${
                  isActive(link)
                    ? "border-b-3 rounded-sm border-blue-400 text-blue-400 hover:border-green-400 focus:border-green-400"
                    : ""
                } ${title === "Syllabus" ? "syllabus" : ""}`}
              >
                <Link className="sm:text-sm md:text-base text-base" href={link}>
                  {title}
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>

          {/* Mobile menu (kept full width; uses its own bg) */}
          <NavbarMenu className="bg-offYellow text-textBlue font-medium h-auto-important pt-10">
            {menuItems.map(([link, title], index) => (
              <NavbarMenuItem
                key={`${title}-${index}`}
                className={`hover:text-primaryRed focus:text-primaryRed transition-all duration-200 px-2 ${
                  isActive(link)
                    ? "border-s-3 rounded-sm border-primaryPurple text-primaryPurple hover:border-primaryRed focus:border-primaryRed"
                    : ""
                } ${title === "Syllabus" ? "syllabus2" : ""}`}
              >
                <Link className="w-full" href={link} size="md">
                  {title}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
      </div>
    </div>
  );
}
