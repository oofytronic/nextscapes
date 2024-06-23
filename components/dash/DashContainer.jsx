'use client';

import Link from 'next/link';
import DashContainer from '@components/dash/DashContainer';
import DashNav from '@components/dash/DashNav';
import Sidebar from '@components/dash/Sidebar';

export const metadata = {
	title: "Dashboard | Scapes",
	description: 'Collect Your Favorite Web Feeds Privately and Anonymously'
}

const DashLayout = ({ children }) => {
	const [collections, setCollections] = useState([]);
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleMenu = () => {
		setIsExpanded(!isExpanded);
	};

	useEffect(() => {
		const fetchCollections = async () => {
			const dbName = 'FeedDB';
			const storeNames = ['feeds', 'collections'];

			try {
				const db = await initDB(dbName, storeNames);
				const collections = await getAllCollections(db);
				setCollections(collections);
			} catch (error) {
				console.error('Error fetching collections:', error);
			}
		};

		fetchCollections();
	}, []);

	return (
		<div>
			{children}
		</div>
	)
}

export default DashLayout;