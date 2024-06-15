import '@styles/globals.css';

import Nav from '@components/Nav';
// import Provider from '@components/Provider';

export const metadata = {
	title: "Scapes",
	description: 'Collect Your Favorite Web Feeds Privately and Anonymously'
}

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
		<body>
			<div className="main">
				<div className="blur-circle circle1"></div>
				<div className="blur-circle circle2"></div>
				<div className="blur-circle circle3"></div>
			</div>
			<div className="content">
				<Nav />
				{children}
			</div>
		</body>
		</html>
	)
}

export default RootLayout;