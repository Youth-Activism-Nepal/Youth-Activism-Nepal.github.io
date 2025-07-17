'use client';

import React, { useEffect, useState } from 'react';
import CardItem from '@/app/team/card';
import { ITeam } from './team_list_type';

export default function Team() {
	const [teamList, setTeamList] = useState<ITeam[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTeam = async () => {
			try {
				const res = await fetch('http://data.youthactivismnepal.org.np/data/Team', {
					cache: 'no-store',
				});
				if (!res.ok) throw new Error('Failed to fetch team');
				const data = await res.json();
				setTeamList(data.data); // assuming response shape: { data: ITeam[] }
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchTeam();
	}, []);

	return (
		<div className="top-12 bg-offWhite min-h-screen">
			{loading ? (
				<p className="text-center py-10 text-textBlue">Loading team...</p>
			) : (
				<CardItem Teams={teamList} />
			)}
		</div>
	);
}