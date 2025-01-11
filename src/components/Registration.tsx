'use client';
import { FaCircleInfo } from 'react-icons/fa6';
import Link from 'next/link';

export default function PreviousEdition() {
	return (
		<>
			<div className="flex gap-2 px-6 py-2 text-warningRed text-sm bg-offWhite align-top justify-center h-14 items-center ">
				<FaCircleInfo className="w-6 h-6" />
				<p>
					Registration for Membership 2025 Open. Register{' '}
					<Link
						href="https://forms.gle/uCPDFcBuYytAyYB26"
						className="text-blue-500 underline underline-offset-4">
						here!
					</Link>
				</p>
			</div>
		</>
	);
}
