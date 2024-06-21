import '@styles/globals.css';

import Link from 'next/link';
import DashNav from '@components/dash/DashNav';
import Sidebar from '@components/dash/Sidebar';

export const metadata = {
	title: "Dashboard | Scapes",
	description: 'Collect Your Favorite Web Feeds Privately and Anonymously'
}

const DashLayout = ({ children }) => {
	return (
		<>
			<div className="dash-container">
				<DashNav />
				<Sidebar />
				<main className="relative main-section">{children}</main>
			</div>
		</>
	)
}

export default DashLayout;