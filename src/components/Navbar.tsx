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
import { filterProjectsByPhase, getBlogs, getProjects } from "@/lib/apiClient";
import { usePathname } from "next/navigation";
import "../app/globals.css";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"about" | "projects" | null>(null);
  const [activeSection, setActiveSection] = useState("");
  const [showBlogs, setShowBlogs] = useState(false);
  const [showActiveCampaigns, setShowActiveCampaigns] = useState(false);
  const [showUpcomingProjects, setShowUpcomingProjects] = useState(false);
  const pathname = usePathname();

  const projectItems: [string, string][] = [["/projects", "Past Projects"]];
  if (showActiveCampaigns) projectItems.push(["/active-campaigns", "Active Campaigns"]);
  if (showUpcomingProjects) projectItems.push(["/upcoming-projects", "Upcoming Projects"]);

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

  useEffect(() => {
    let cancelled = false;

    getBlogs()
      .then((blogs) => {
        if (!cancelled) {
          setShowBlogs(blogs.length > 0);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setShowBlogs(false);
        }
      });

    getProjects()
      .then((projects) => {
        if (!cancelled) {
          setShowActiveCampaigns(filterProjectsByPhase(projects, "active").length > 0);
          setShowUpcomingProjects(filterProjectsByPhase(projects, "upcoming").length > 0);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setShowActiveCampaigns(false);
          setShowUpcomingProjects(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === href && !activeSection;
    if (href.startsWith("/#")) {
      const sectionId = href.split("#")[1];
      return activeSection === sectionId;
    }
    return pathname === href;
  };

  const isMenuActive = (items: [string, string][]) =>
    items.some(([href]) => isActive(href));

  const aboutItems: [string, string][] = [
    ["/", "Home"],
    ["/team", "Team"],
    ["/transparency", "Transparency"],
  ];

  const secondaryItems: [string, string][] = [
    ["/partners", "Partners"],
    ...(showBlogs ? [["/blogs", "Blogs"] as [string, string]] : []),
    ["/donate", "Donate"],
  ];

  const mobileItems: [string, string][] = [
    ...aboutItems,
    ...projectItems,
    ...secondaryItems,
  ];

  const closeMenu = () => setOpenMenu(null);

  return (
    // FULL-BLEED WRAPPER (background spans viewport edges)
    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[#DB1920]">
      {/* INNER CONTAINER (limits width + keeps your paddings/centering) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <Navbar
          maxWidth="full"
          className="navbar z-50 px-0 py-2 sm:px-0 md:px-0 font-medium bg-[#DB1920] text-white overflow-visible"
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
            className="hidden px-4 pt-4 sm:flex sm:gap-3 md:gap-5 lg:gap-8 xl:gap-10"
            justify="center"
          >
            <DesktopDropdown
              label="About"
              href="/"
              items={aboutItems}
              isOpen={openMenu === "about"}
              isActive={isMenuActive(aboutItems)}
              onToggle={() => setOpenMenu(openMenu === "about" ? null : "about")}
              onNavigate={closeMenu}
            />
            <DesktopDropdown
              label="Projects"
              href="/projects"
              items={projectItems}
              isOpen={openMenu === "projects"}
              isActive={isMenuActive(projectItems)}
              onToggle={() => setOpenMenu(openMenu === "projects" ? null : "projects")}
              onNavigate={closeMenu}
            />
            {secondaryItems.map(([link, title]) => (
              <NavbarItem key={title} className={`h-[40%] flex items-center text-white transition-all duration-200 hover:text-green-400 focus:text-green-400 ${isActive(link) ? "border-b-3 rounded-sm border-blue-400 text-blue-400" : ""}`}>
                <Link className="sm:text-sm md:text-base text-base" href={link}>{title}</Link>
              </NavbarItem>
            ))}
          </NavbarContent>

          {/* Mobile menu (kept full width; uses its own bg) */}
          <NavbarMenu className="bg-offYellow text-textBlue font-medium h-auto-important pt-10">
            {mobileItems.map(([link, title], index) => (
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

function DesktopDropdown({
  label,
  href,
  items,
  isOpen,
  isActive,
  onToggle,
  onNavigate,
}: {
  label: string;
  href: string;
  items: [string, string][];
  isOpen: boolean;
  isActive: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <NavbarItem
      className={`group relative h-[40%] flex items-center text-white transition-all duration-200 hover:text-green-400 ${isActive ? "border-b-3 rounded-sm border-blue-400 text-blue-400" : ""}`}
      onMouseEnter={() => {
        if (!isOpen) onToggle();
      }}
      onMouseLeave={() => {
        if (isOpen) onToggle();
      }}
    >
      <div className="flex items-center gap-1 sm:text-sm md:text-base text-base">
        <Link href={href} onClick={onNavigate} className="text-inherit">
          {label}
        </Link>
        <button
          type="button"
          aria-label={`Open ${label} menu`}
          aria-expanded={isOpen}
          onClick={onToggle}
          onFocus={() => {
            if (!isOpen) onToggle();
          }}
          className="px-0.5 text-xs text-inherit"
        >
          <span aria-hidden="true">▾</span>
        </button>
      </div>
      {isOpen && (
        <div className="absolute left-0 top-full z-[60] min-w-48 rounded-b-md border-t-4 border-[#DB1920] bg-white p-2 text-textBlue shadow-lg ring-1 ring-black/10">
          {items.map(([href, title]) => (
            <Link key={href} href={href} onClick={onNavigate} className="block rounded px-3 py-2 text-sm hover:bg-offYellow hover:text-primaryRed">
              {title}
            </Link>
          ))}
        </div>
      )}
    </NavbarItem>
  );
}
