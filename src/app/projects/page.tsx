"use client";

import React, { useEffect, useRef, useState } from "react";
import CardItem from "@/app/projects/card";
import { API_BASE_URL } from "@/config/api";
import type { ITeam } from "@/app/projects/projectType";

const toSlug = (value: string): string =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export default function Projects() {
    const cacheRef = useRef<ITeam[] | null>(null);
    const [teamList, setTeamList] = useState<ITeam[]>([]);

    useEffect(() => {
        if (cacheRef.current) {
            setTeamList(cacheRef.current);
            return;
        }

        async function fetchProjects() {
            try {
                const res = await fetch(`${API_BASE_URL}/data/Projects`);
                const json = await res.json();
                const projects = Array.isArray(json?.data) ? json.data : [];
                const normalized: ITeam[] = projects.map((project: any, index: number) => {
                    const fallbackName =
                        typeof project?.name === "string" && project.name.trim()
                            ? project.name
                            : `project-${index + 1}`;
                    return {
                        ...project,
                        id:
                            project?.id ||
                            project?._id ||
                            toSlug(fallbackName),
                    };
                });

                cacheRef.current = normalized;
                setTeamList(normalized);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            }
        }

        fetchProjects();
    }, []);

    return (
        <div className="bg-offWhite min-h-screen px-4">
            <CardItem Teams={teamList} />
        </div>
    );
}
