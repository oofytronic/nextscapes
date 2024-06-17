import Nav from '@components/Nav';
import Footer from '@components/Footer';
import Feed from '@components/Feed';

const Home = () => {
	return (
		<div className="content w-full min-h-dvh">
			<Nav />
			<section className="w-full flex-center flex-col gap-8">
				<h1 className="head_text text-center">
					Your Favorite Web Content
					<br />
					In One Place
					<br />
					<span className="text-gradient">Privately and Anonymously</span>
				</h1>
				<p className="max-w-prose">Scapes is an RSS Feed Reading application dedicated to user autonomy, data ownership, content aggregation and preserving the splendor of the World Wide Web.</p>
				<div className="grid md:grid-cols-3 gap-4">
					<div className="flex flex-col gap-4 p-4 border rounded-md">
						<p className="font-bold text-md">Privacy Protection</p>
						<p>No user data tracking or sharing.</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md">
						<p className="font-bold text-md">Anonymity</p>
						<p>Users can read feeds without creating accounts.</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md">
						<p className="font-bold text-md">PWA</p>
						<p>Scapes is a PWA (Progressive Web App). Install it from the web on any device.</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md">
						<p className="font-bold text-md">Local Storage</p>
						<p>All data is stored locally on the user's device.</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md">
						<p className="font-bold text-md">End-to-End Encryption</p>
						<p>Secure communication and data transfer.</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md">
						<p className="font-bold text-md">Ad-Free Experience</p>
						<p>No intrusive advertisements.</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md">
						<p className="font-bold text-md">Customizable Interface</p>
						<p>Users can personalize their reading experience.</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md">
						<p className="font-bold text-md">Offline Access</p>
						<p>Read feeds without an internet connection.</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md">
						<p className="font-bold text-md">Open Source</p>
						<p>Transparent and community-driven development.</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md">
						<p className="font-bold text-md">AI-less</p>
						<p>Scapes is dedicated to being human-first and free of invasive AI technologies.</p>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	)
}

export default Home;