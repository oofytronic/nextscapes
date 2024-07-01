'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaUser, FaGear } from "react-icons/fa6";



const DashNav = () => {
	const isUserLoggedIn = true;

	const [toggleDropdown, setToggleDropdown] = useState(false);
	
	return (
		<nav className="top-nav flex-between">
			<div className="flex gap-2 flex-center">
				<Link href="/dash">
					<Image
						src="/icon.svg"
						width={50}
						height={50}
						alt="Scapes Icon"
						priority={true}
					/>
				</Link>
			</div>
			<div className="flex gap-3 md:gap-4">
				<Link href="/dash/settings" className="dash-icon">
					<FaGear />
				</Link>
				<Link href="/dash/profile" className="dash-icon">
					<FaUser />
				</Link>
			</div>
		</nav>
	)
}

export default DashNav;