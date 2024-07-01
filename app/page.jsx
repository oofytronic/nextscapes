'use client';

import Nav from '@components/Nav';
import Footer from '@components/Footer';
import Feed from '@components/Feed';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkIndexedDB, isPWAInstalled } from '@utils/database.js';

const Home = () => {
	const router = useRouter();

	useEffect(() => {
		const checkConditionsAndRedirect = async () => {
			const indexedDBExists = await checkIndexedDB();
			const pwaInstalled = isPWAInstalled();

			if (indexedDBExists || pwaInstalled) {
				router.push('/dash');
			}
		};

		checkConditionsAndRedirect();
	}, []);

	return (
		<div className="content w-full min-h-dvh">
			<Nav />
			<section className="w-full flex-center flex-col gap-8">
				<h1 className="head_text text-center">
					Your Favorite Web Content
					<br />
					In One Place
					<br />
					<span className="text-gradient">Privately and Anonymously</span>
				</h1>
				<p className="max-w-prose">Scapes is an RSS feed reading application dedicated to user autonomy, data ownership, content aggregation and preserving the splendor of the World Wide Web.</p>
				<Link href="/dash/add-feed" className="light_btn">
						Add Feed
					</Link>
				<div className="grid md:grid-cols-3 gap-4 mb-4">
					<div className="flex flex-col gap-4 p-4 border rounded-md bg-black/50">
						<p className="font-bold text-md">Privacy Protection</p>
						<p>No user data tracking or sharing.</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md bg-black/50">
						<p className="font-bold text-md">Anonymity</p>
						<p>Users can read feeds without creating accounts.</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md bg-black/50">
						<p className="font-bold text-md">PWA</p>
						<p>Scapes is a PWA (Progressive Web App). Install it from the web on any device.</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md bg-black/50">
						<p className="font-bold text-md">Local Storage</p>
						<p>All data is stored locally on the user's device.</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md bg-black/50">
						<p className="font-bold text-md">End-to-End Encryption</p>
						<p>Secure communication and data transfer.</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md bg-black/50">
						<p className="font-bold text-md">Ad-Free Experience</p>
						<p>No intrusive advertisements. Ever.</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md bg-black/50">
						<p className="font-bold text-md">Customizable Interface (coming soon)</p>
						<p>Users can personalize their dashboard and reading experience.</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md bg-black/50">
						<p className="font-bold text-md">Offline Access (coming soon)</p>
						<p>Read feeds without an internet connection.</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md bg-black/50">
						<p className="font-bold text-md">Open Code</p>
						<p>Scapes is source-available and downloadable for personal use.</p>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	)
}

export default Home;