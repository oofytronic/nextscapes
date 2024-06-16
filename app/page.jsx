import Feed from '@components/Feed';

const Home = () => {
	return (
		<section className="w-full flex-center flex-col gap-4">
			<h1 className="head_text text-center">
				Your Favorite Web Content
				<br />
				In One Place
				<br />
				<span className="text-gradient">Privately and Anonymously</span>
			</h1>
			<p className="max-w-prose">Scapes is an RSS Feed Reading application dedicated to user autonomy, data ownership, content aggregation and preserving the splendor of the World Wide Web.</p>

			<Feed />
		</section>
	)
}

export default Home;