'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signin, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
	const isUserLoggedIn = true;

	// const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	// useEffect(() => {
	// 	const setProviders = async () => {
	// 		const response = await getProviders();

	// 		setProviders(response);
	// 	}

	// 	setProviders();
	// }, [])

	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href="/" className="flex gap-2 flex-center">
				<p>Scapes</p>
			</Link>

			<div className="sm:flex hidden">
				<div className="flex gap-3 md:gap-5">
					<Link href="/add-feed" className="black_btn">
						Add Feed
					</Link>

					<Link href="/wall" className="black_btn">
						Wall
					</Link>

					<Link href="/profile" className="black_btn">
						Profile
					</Link>
				</div>
				{/*{isUserLoggedIn ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/creat-prompt" className="black_btn">
							Add Feed
						</Link>

						<button type="button" onClick={signOut} className="outline_btn">
							Sign Out
						</button>

						<Link href="/profile" className="black_btn">
							Profile
						</Link>
					</div>
				) : (
					<>
						{providers && Object.values(providers).map((provider) => (
							<button
								type="button"
								key={provider.name}
								onClick={() => signIn(provider.id)}
								className="black_btn"
							>
								Sign In
							</button>
						))}
					</>
				)}*/}
			</div>

			<div className="sm:hidden flex relative">

			<div className="flex">
					<button
						onClick={() => setToggleDropdown(prev => !prev)}
					>
						Drop
					</button>

					{toggleDropdown && (
						<div className="dropdown">
							<Link
								href="/profile"
								className="dropdown_link"
								onClick={() => setToggleDropdown(false)}
							>
								My Profile
							</Link>
							<Link
								href="/add-feed"
								className="dropdown_link"
								onClick={() => {setToggleDropdown(false)}}
							>
								Create Prompt
							</Link>
							<button
								type="button"
								onClick={() => {
									setToggleDropdown(false)
									signOut();
								}}
								className="mt-5 w-full black_btn"
							>
								Sign Out
							</button>
						</div>
					)}
				</div>
				{/*{isUserLoggedIn ? (
					<div className="flex">
						<button
							onClick={() => setToggleDropdown(prev => !prev)}
						>
							Drop
						</button>

						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href="/profile"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									My Profile
								</Link>
								<Link
									href="/create-prompt"
									className="dropdown_link"
									onClick={() => {setToggleDropdown(false)}}
								>
									Create Prompt
								</Link>
								<button
									type="button"
									onClick={() => {
										setToggleDropdown(false)
										signOut();
									}}
									className="mt-5 w-full black_btn"
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers && Object.values(providers).map((provider) => (
							<button
								type="button"
								key={provider.name}
								onClick={() => signIn(provider.id)}
								className="black_btn"
							>
								Sign In
							</button>
						))}
					</>
				)}*/}
			</div>
		</nav>
	)
}

export default Nav;