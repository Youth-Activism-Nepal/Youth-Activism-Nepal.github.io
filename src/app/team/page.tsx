'use client';

import React, { useEffect, useState } from 'react';
import CardItem from '@/app/team/card';
import { ITeam } from './team_list_type';
import { getTeamMembers } from '@/lib/apiClient';

export default function Team() {
	const [teamList, setTeamList] = useState<ITeam[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTeam = async () => {
			try {
				const data = (await getTeamMembers()) as ITeam[];
				setTeamList(data);
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
