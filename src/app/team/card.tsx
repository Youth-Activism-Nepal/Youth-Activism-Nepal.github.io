import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { ITeam } from '@/app/team/team_list_type';
import { Chip } from '@nextui-org/react';
import { Image } from '@nextui-org/react';

export default function App({ Teams }: { Teams: ITeam[] }) {
	return (
		<>
			<div className="overflow-hidden mt-4 px-6">
				<h1 className="flex text-4xl text-center font-black items-center justify-center  text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-900 to-red-950">
					Meet Our Local Team
				</h1>
				<p className="text-sm py-2 px-6 sm:px-28 lg:w-[80%] mx-auto text-center text-textBlue">
					Our local Youth Activism Nepal team is dedicated to empowering young
					individuals, fostering leadership, and driving positive change within
					the community.
				</p>
				<div className="flex justify-center mt-8 mb-4">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-20mx-auto justify-center items-center sm:mt-0">
						{Teams.map((team, index) => (
							<Card
								key={`${index + 1} - ${team.name}`}
								className="bg-bg-effect bg-cover bg-center bg-offWhite px-1 py-1 max-w-max max-h-max">
								<CardBody>
									<Image
										alt={`${team.name} Image`}
										className="object-cover rounded-lg"
										src={
											team.image
												? `/images/team/${team.image}`
												: '/images/team/default.jpg'
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
										<small className="text-textBlue pt-1 text-sm">
											{team.role}
										</small>
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
