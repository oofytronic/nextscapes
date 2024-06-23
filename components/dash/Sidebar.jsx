'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { initDB, getAllCollections } from '@utils/database';
import { FaPlus, FaChevronDown } from "react-icons/fa";

const Sidebar = () => {
	const [collections, setCollections] = useState([]);

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
		<aside className="sidebar">
			<div className="flex items-start justify-between md:flex-col md:items-start gap-4 w-full">
				<div className="flex flex-col flex-start md:w-full">
					<div className="flex gap-2 items-center">
						<Link href="/dash" className="dash-icon text-center font-bold">
							<span className="flex gap-2 flex-center hover:underline">Home</span>
						</Link>
					</div>
				</div>

				<div className="flex flex-col items-center md:items-start gap-2 md:w-full">
					<div className="flex gap-2 items-center">
						<p className="font-satoshi font-bold">Collections</p>
			            <button className="md:hidden flex items-center gap-1 text-gray-500 focus:outline-none">
			            	<FaChevronDown className="h-4 w-4 text-white" />
			            </button>
					</div>

					<div className="hidden md:flex gap-2 font-satoshi font-semibold w-full overflow-x-scroll md:flex-wrap">
		                {collections.length > 0 ? (
		                    collections.map((collection) => (
		                        <button className="btn hover:bg-white hover:text-black" key={collection.id}>{collection.name}</button>
		                    ))
		                ) : (
		                    <p className="font-satoshi text-sm">No Collections Yet...</p>
		                )}
		            </div>
				</div>

				<Link href="/dash/add-feed" className="dash-icon">
					<span className="flex justify-center items-center gap-2 font-bold"><FaPlus /> New</span>
				</Link>
			</div>
		</aside>
	)
}

export default Sidebar;
