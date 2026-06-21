"use client";

import React, { useEffect, useRef, useState } from "react";
import CardItem from "@/app/projects/card";
import type { ITeam } from "@/app/projects/projectType";
import { getProjects } from "@/lib/apiClient";

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
                const projects = (await getProjects()) as ITeam[];
                cacheRef.current = projects;
                setTeamList(projects);
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
