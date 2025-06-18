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
        const response = await fetch('http://data.youthactivismnepal.org.np/data/Projects');
        const json = await response.json();
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
    <div className="top-12 bg-offWhite">
      <CardItem Teams={teamList} />
    </div>
  );
}