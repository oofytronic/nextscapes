import '@styles/globals.css';

import Link from 'next/link';
import DashContainer from '@components/dash/DashContainer';
import DashNav from '@components/dash/DashNav';
import Sidebar from '@components/dash/Sidebar';

export const metadata = {
	title: "Dashboard | Scapes",
	description: 'Collect Your Favorite Web Feeds Privately and Anonymously'
}

const DashLayout = ({ children }) => {
	return (
		<DashContainer>
			<DashNav />
			<Sidebar collections={collections} isExpanded={isExpanded} toggleMenu={toggleMenu} />
			<main className={`main-section ${isExpanded ? 'row-end-10' : 'row-end-12'} md:row-end-auto`}>{children}</main>
		</DashContainer>
	)
}

export default DashLayout;