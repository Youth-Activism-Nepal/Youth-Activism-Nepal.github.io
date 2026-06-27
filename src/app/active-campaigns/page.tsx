"use client";

import React, { useEffect, useRef, useState } from "react";
import CardItem from "@/app/projects/card";
import type { ITeam } from "@/app/projects/projectType";
import { filterProjectsByPhase, getProjects } from "@/lib/apiClient";

export default function ActiveCampaigns() {
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
                    "active"
                ) as ITeam[];
                cacheRef.current = projects;
                setTeamList(projects);
            } catch (error) {
                console.error("Failed to fetch active campaigns:", error);
            }
        }

        fetchProjects();
    }, []);

    return (
        <div className="bg-offWhite min-h-screen px-4">
            <CardItem
                Teams={teamList}
                title="Active Campaigns"
                description="Follow the campaigns and live initiatives Youth Activism Nepal is actively running now."
                emptyText="No active campaigns are available right now."
            />
        </div>
    );
}
