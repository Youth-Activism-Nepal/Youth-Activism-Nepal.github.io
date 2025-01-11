'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

export const HoverEffect = ({
	items,
	className,
}: {
	items: {
		avatar: StaticImport;
		title: string;
		description: string;
	}[];
	className?: string;
}) => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div
			className={cn(
				'grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-4',
				className
			)}>
			{items.map((item, idx) => (
				<div
					key={idx + 1}
					className="relative group  block p-2 h-full w-full"
					onMouseEnter={() => setHoveredIndex(idx)}
					onMouseLeave={() => setHoveredIndex(null)}>
					<AnimatePresence>
						{hoveredIndex === idx && (
							<motion.span
								className="absolute inset-0 h-full w-full bg-textBlue block  rounded-3xl"
								layoutId="hoverBackground"
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
								}}
								exit={{
									opacity: 0,
								}}
								transition={{ duration: 0.3, ease: 'linear', delay: 0.2 }}
							/>
						)}
					</AnimatePresence>
					<Card>
						<Image
							src={item.avatar}
							alt={item.title}
							width={150}
							height={150}
							className="bg-textBlue rounded-full "
						/>
						<CardTitle>{item.title}</CardTitle>
						<CardDescription>{item.description}</CardDescription>
					</Card>
				</div>
			))}
		</div>
	);
};

export const Card = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				'rounded-2xl h-full w-full p-4 overflow-hidden bg-offWhite shadow-lg border border-transparent group-hover:border-textBlue relative z-20',
				className
			)}>
			<div className="relative justify-center z-50">
				<div className="p-4 flex flex-col justify-center items-center">
					{children}
				</div>
			</div>
		</div>
	);
};
export const CardTitle = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<h4
			className={cn(
				'text-textBlue text-lg font-bold tracking-wide mt-4',
				className
			)}>
			{children}
		</h4>
	);
};
export const CardDescription = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<p
			className={cn(
				'mt-4 text-gray-400 tracking-wide leading-relaxed text-sm',
				className
			)}>
			{children}
		</p>
	);
};
