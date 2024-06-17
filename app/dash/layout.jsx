import '@styles/globals.css';

import Link from 'next/link';
import DashNav from '@components/dash/DashNav';
import Footer from '@components/Footer';
import { FaPlus } from "react-icons/fa";

export const metadata = {
	title: "Dashboard | Scapes",
	description: 'Collect Your Favorite Web Feeds Privately and Anonymously'
}

const DashLayout = ({ children }) => {
	return (
		<>
			<div className="dash-container">
				<DashNav />
				<aside className="sidebar">
					<div className="flex flex-between md:flex-col gap-4 w-full">
						<Link href="/dash" className="md:w-full text-center font-bold hover:underline">
							Main Feed
						</Link>
						<Link href="/dash/add-feed" className="dash-icon">
							<span className="flex justify-center items-center gap-2 font-bold"><FaPlus /> URL</span>
						</Link>
					</div>
					<Footer />
				</aside>
				<main className="main-section">{children}</main>
			</div>
		</>
	)
}

export default DashLayout;