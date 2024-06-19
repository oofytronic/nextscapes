'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";



const Sidebar = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleMenu = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<aside className={`sidebar transition-all duration-300 ease-in-out ${isExpanded ? 'row-start-7 row-end-13' : 'row-start-12 row-end-13'}`}>
			<div className="flex items-start md:flex-col md:items-start gap-4 w-full">
				<div className="flex flex-col flex-start w-full">
					<div className="flex gap-2 items-center">
						<FaCaretDown onClick={toggleMenu} />
						<Link href="/dash" className="dash-icon text-center font-bold">
							<span className="flex gap-2 flex-center hover:underline">Main Feed</span>
						</Link>
					</div>
					{/*00<Feed />*/}
				</div>
				<Link href="/dash/add-feed" className="dash-icon">
					<span className="flex justify-center items-center gap-2 font-bold"><FaPlus /> New</span>
				</Link>
			</div>
		</aside>
	)
}

export default Sidebar;