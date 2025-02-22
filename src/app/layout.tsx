import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Poppins } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Registration from '@/components/Registration';
import Footer from '@/components/Footer';

const poppins = Poppins({
	weight: '400',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Youth Activism Nepal',
	description:
		'Engage, Empower and Impact.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					rel="icon"
					href="/icon?<generated>"
					type="image/<generated>"
					sizes="<generated>"
				/>
			</head>
			<body className={`bg-offWhite ${poppins.className}`}>
				<Navbar />
				{/* <Registration /> */}
				{children}
				<Footer />
			</body>
		</html>
	);
}
