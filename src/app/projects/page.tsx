'use client';
import React from 'react';
import CardItem from '@/app/projects/card';
import { TeamList } from './projectList';

export default function Projects() {
	return (
		<div className="top-12 bg-offWhite">
			<CardItem Teams={TeamList} />
		</div>
	);
}
