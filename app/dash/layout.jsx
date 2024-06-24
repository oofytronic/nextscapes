import '@styles/globals.css';

import Link from 'next/link';
import DashContainer from '@components/dash/DashContainer';

export const metadata = {
	title: "Dashboard | Scapes",
	description: 'Collect Your Favorite Web Feeds Privately and Anonymously'
}

const DashLayout = ({ children }) => {
	return (
		<DashContainer>
			{children}
		</DashContainer>
	)
}

export default DashLayout;