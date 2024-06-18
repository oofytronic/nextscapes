'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaUser } from "react-icons/fa";



const DashNav = () => {
	const isUserLoggedIn = true;

	const [toggleDropdown, setToggleDropdown] = useState(false);
	
	return (
		<nav className="top-nav flex-between">
			<div className="flex gap-2 flex-center">
				<Link href="/">
					<Image
						src="/icon.svg"
						width={50}
						height={50}
						alt="Scapes Icon"
					/>
				</Link>
				<Link href="/">
					<p className="font-satoshi font-bold text-lg">Scapes</p>
				</Link>
			</div>
			<div className="flex gap-3 md:gap-5">
				<Link href="/dash/profile" className="dash-icon">
					<FaUser />
				</Link>
			</div>
		</nav>
	)
}

export default DashNav;