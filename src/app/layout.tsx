import React from 'react';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Registration from '@/components/Registration';
import DonateFooterCta from '@/components/DonateFooterCta';
import Footer from '@/components/Footer';

const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
	variable: '--font-montserrat',
	display: 'swap',
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
			<body className={`${montserrat.variable} bg-offWhite`}>
				<Navbar />
				{/* <Registration /> */}
				{children}
				<DonateFooterCta />
				<Footer />
			</body>
		</html>
	);
}
