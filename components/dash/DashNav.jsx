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

			<div className="sm:flex hidden">
				<div className="flex gap-3 md:gap-5">
					<Link href="/dash/profile" className="dash-icon">
						<FaUser />
					</Link>
				</div>
			</div>

			<div className="sm:hidden flex relative">

			<div className="flex">
					<button className="light_btn" onClick={() => setToggleDropdown(prev => !prev)}>
						Menu
					</button>

					{toggleDropdown && (
						<div className="dropdown">
							<Link
								href="/dash/profile"
								className="dropdown_link"
								onClick={() => {setToggleDropdown(false)}}
							>
								<FaUser />
							</Link>
						</div>
					)}
				</div>
			</div>
		</nav>
	)
}

export default DashNav;