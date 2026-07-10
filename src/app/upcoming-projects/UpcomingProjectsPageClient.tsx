"use client";

import React, { useEffect, useRef, useState } from "react";
import CardItem from "@/app/projects/card";
import type { ITeam } from "@/app/projects/projectType";
import { filterProjectsByPhase, getProjects } from "@/lib/apiClient";

export default function UpcomingProjects() {
    const cacheRef = useRef<ITeam[] | null>(null);
    const [teamList, setTeamList] = useState<ITeam[]>([]);

    useEffect(() => {
        if (cacheRef.current) {
            setTeamList(cacheRef.current);
            return;
        }

        async function fetchProjects() {
            try {
                const projects = filterProjectsByPhase(
                    (await getProjects()) as ITeam[],
                    "upcoming"
                ) as ITeam[];
                cacheRef.current = projects;
                setTeamList(projects);
            } catch (error) {
                console.error("Failed to fetch upcoming projects:", error);
            }
        }

        fetchProjects();
    }, []);

    return (
        <div className="bg-offWhite min-h-screen px-4">
            <CardItem
                Teams={teamList}
                title="Upcoming Projects"
                description="See what Youth Activism Nepal is preparing next and follow projects before they launch."
                emptyText="No upcoming projects are available right now."
            />
        </div>
    );
}
