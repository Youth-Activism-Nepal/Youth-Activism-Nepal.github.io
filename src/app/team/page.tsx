'use client';
import React from 'react';
import CardItem from '@/app/team/card';
import { TeamList } from './team_list';

export default function Team() {
	return (
		<div className="top-12 bg-offWhite">
			<CardItem Teams={TeamList} />
		</div>
	);
}
