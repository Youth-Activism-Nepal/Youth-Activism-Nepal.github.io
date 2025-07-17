'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card, CardHeader, CardBody, Chip, Image, Button } from '@nextui-org/react';
import { ITeam } from '@/app/team/team_list_type';

export default function App({ Teams }: { Teams: ITeam[] }) {
	const years = useMemo(() => {
		const uniqueYears = Array.from(new Set(Teams.map((team) => team.year)));
		return uniqueYears.sort((a, b) => b - a); // Descending order
	}, [Teams]);

	const [selectedYear, setSelectedYear] = useState<number | null>(null);

	useEffect(() => {
		if (years.length > 0) {
			setSelectedYear(years[0]); // Default to the most recent year
		}
	}, [years]);

	const filteredTeams = useMemo(() => {
		if (!selectedYear) return [];
		return Teams.filter((team) => team.year === selectedYear);
	}, [Teams, selectedYear]);

	return (
		<>
			<div className="overflow-hidden mt-10 px-6">
				<h1 className="flex text-4xl text-center font-black items-center justify-center text-red-600">
					Meet Our Local Team
				</h1>
				<p className="text-sm py-2 px-6 sm:px-28 lg:w-[80%] mx-auto text-center text-textBlue">
					Our local Youth Activism Nepal team is dedicated to empowering young
					individuals, fostering leadership, and driving positive change within
					the community.
				</p>

				{/* Year buttons only */}
				<div className="flex flex-wrap justify-center gap-3 mt-6 mb-6">
					{years.map((year) => (
						<Button
							key={year}
							color={selectedYear === year ? 'primary' : 'default'}
							variant={selectedYear === year ? 'solid' : 'bordered'}
							onClick={() => setSelectedYear(year)}
							className={
								selectedYear === year
									? 'font-bold bg-black text-white border-red-900 hover:bg-blue-500'
									: 'font-bold bg-blue-500 text-white hover:bg-black'
							}
						>
							{year}
						</Button>
					))}
				</div>

				{/* Filtered team cards */}
				<div className="flex justify-center">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-20 mx-auto justify-center items-center">
						{filteredTeams.map((team, index) => (
							<Card
								key={`${index + 1} - ${team.name}`}
								className="bg-bg-effect bg-cover bg-center bg-offWhite px-1 py-1 max-w-max max-h-max"
							>
								<CardBody>
									<Image
										alt={`${team.name} Image`}
										className="object-cover rounded-lg"
										src={
											team.image
												? `${team.image}`
												: '/images/YANLOGO.png'
										}
										width={270}
										height={200}
									/>
								</CardBody>
								<CardHeader className="flex-col items-start">
									<h4 className="font-semibold text-regular uppercase text-primaryPurple">
										{team.name}
									</h4>
									<div className="flex flex-row items-left gap-2 flex-wrap">
										<small className="text-textBlue pt-1 text-sm">{team.role}</small>
										{team.badge && (
											<Chip className="bg-textBlue text-xs text-center flex justify-center items-center">
												{team.badge}
											</Chip>
										)}
									</div>
								</CardHeader>
							</Card>
						))}
					</div>
				</div>
			</div>
		</>
	);
}