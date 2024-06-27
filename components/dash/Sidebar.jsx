'use client';

import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { initDB, getAllCollections } from '@utils/database';
import { FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { DashContext } from './DashContext';

const Sidebar = () => {
  const { collections, isExpanded, toggleMenu } = useContext(DashContext);

	return (
		<aside className={`sidebar grid ${isExpanded ? 'row-start-11 row-end-13' : 'row-start-12 row-end-13'} md:row-start-auto md:row-end-auto`}>
			<div className="flex items-center justify-between md:flex-col md:items-start gap-4 w-full">
				<div className="flex flex-col flex-start md:w-full">
					<div className="flex gap-2 items-center">
						<Link href="/dash" className="dash-icon text-center font-bold">
							<span className="flex gap-2 flex-center hover:underline">Home</span>
						</Link>
					</div>
				</div>

				<div className="flex flex-col items-center md:items-start gap-2 md:w-full">
					<div className="flex gap-2 items-center">
			            <button className="flex items-center gap-1 text-white focus:outline-none font-bold" onClick={toggleMenu}>
			            	<p className="font-satoshi font-bold">Collections</p>
			            	{isExpanded ? <FaChevronUp className="h-4 w-4 text-white md:hidden" /> : <FaChevronDown className="h-4 w-4 text-white md:hidden" />}
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

			{isExpanded && (
				<div className="flex flex-col md:hidden w-full mt-4">
					<div className="flex gap-2 font-satoshi font-semibold w-full overflow-x-scroll">
						{collections.length > 0 ? (
							collections.map((collection) => (
								<button className="btn hover:bg-white hover:text-black" key={collection.id}>{collection.name}</button>
							))
						) : (
							<p className="font-satoshi text-sm">No Collections Yet...</p>
						)}
					</div>
				</div>
			)}
		</aside>
	)
}

export default Sidebar;
