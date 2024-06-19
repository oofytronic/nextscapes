import '@styles/globals.css';

export const metadata = {
	title: "Scapes",
	description: 'Collect Your Favorite Web Feeds Privately and Anonymously'
}

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
		<head>
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
			<link rel="manifest" href="/manifest.json" />
			<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#001b2e" />
			<meta name="msapplication-TileColor" content="#001b2e" />
			<meta name="theme-color" content="#001b2e" />
		</head>
		<body className="min-h-dvh flex flex-col">
			<div className="main">
				<div className="blur-circle circle1"></div>
				<div className="blur-circle circle2"></div>
				<div className="blur-circle circle3"></div>
			</div>
			{children}
		</body>
		</html>
	)
}

export default RootLayout;