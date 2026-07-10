import React from 'react';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Registration from '@/components/Registration';
import DonateFooterCta from '@/components/DonateFooterCta';
import Footer from '@/components/Footer';
import {
	absoluteUrl,
	getOrganizationSchema,
	getWebsiteSchema,
	siteConfig,
} from '@/lib/seo';

const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
	variable: '--font-montserrat',
	display: 'swap',
});

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: siteConfig.keywords,
	applicationName: siteConfig.name,
	category: 'nonprofit',
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: siteConfig.name,
		description: siteConfig.description,
		url: siteConfig.url,
		siteName: siteConfig.name,
		locale: 'en_US',
		type: 'website',
		images: [
			{
				url: absoluteUrl(siteConfig.ogImage),
				alt: `${siteConfig.name} logo`,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.name,
		description: siteConfig.description,
		images: [absoluteUrl(siteConfig.ogImage)],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
	},
	icons: {
		icon: '/icon.svg',
		shortcut: '/icon.svg',
		apple: '/images/YANLOGO.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const organizationSchema = getOrganizationSchema();
	const websiteSchema = getWebsiteSchema();

	return (
		<html lang="en">
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(organizationSchema),
					}}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(websiteSchema),
					}}
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
