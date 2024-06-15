'use client';

import { useEffect, useState } from 'react';

const Footer = () => {
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

	useEffect(() => {
		setCurrentYear(new Date().getFullYear());
	}, []);

	return (
		<footer className="w-full text-center p-6 mt-auto">
			<p>© {currentYear} | feathermode | All rights reserved.</p>
		</footer>
	);
};

export default Footer;