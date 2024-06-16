'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';


const Nav = () => {
	const isUserLoggedIn = true;

	const [toggleDropdown, setToggleDropdown] = useState(false);
	
	return (
		<nav className="flex-between w-full mb-16 pt-3">
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
					<Link href="/wall" className="light_btn">
						Wall
					</Link>

					<Link href="/add-feed" className="light_btn">
						Add Feed
					</Link>

					<Link href="/profile" className="light_btn">
						Profile
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
								href="/wall"
								className="dropdown_link"
								onClick={() => {setToggleDropdown(false)}}
							>
								Wall
							</Link>
							<Link
								href="/add-feed"
								className="dropdown_link"
								onClick={() => setToggleDropdown(false)}
							>
								Add Feed
							</Link>
							<Link
								href="/profile"
								className="dropdown_link"
								onClick={() => {setToggleDropdown(false)}}
							>
								Profile
							</Link>
						</div>
					)}
				</div>
			</div>
		</nav>
	)
}

export default Nav;