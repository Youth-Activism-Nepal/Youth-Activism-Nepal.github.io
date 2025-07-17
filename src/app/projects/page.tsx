// src/app/projects/page.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import CardItem from '@/app/projects/card';

export default function Projects() {
  const cacheRef = useRef<any[] | null>(null);
  const [teamList, setTeamList] = useState<any[]>([]);

  useEffect(() => {
    if (cacheRef.current) {
      setTeamList(cacheRef.current);
      return;
    }

    async function fetchProjects() {
      try {
        const res = await fetch('http://data.youthactivismnepal.org.np/data/Projects');
        const json = await res.json();
        const projects = json.data;
        cacheRef.current = projects;
        setTeamList(projects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
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