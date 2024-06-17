import '@styles/globals.css';

import Link from 'next/link';
import DashNav from '@components/dash/DashNav';
import Footer from '@components/Footer';

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
					<Link href="/dash" className="light_btn">
						Wall
					</Link>
					<Link href="/dash/add-feed" className="light_btn">
						Add Feed
					</Link>
					<Footer />
				</aside>
				<main className="main-section">{children}</main>
			</div>
		</>
	)
}

export default DashLayout;