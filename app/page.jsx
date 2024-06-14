import Feed from '@components/Feed';

const Home = () => {
	return (
		<section className="w-full flex-center flex-col gap-4">
			<h1 className="head_text text-center">
				Gather All of Your Favorite Web Content in One Place
				<br className="max-md:hidden" />
				<span className="text-blue-600">Privately and Anonymously</span>
			</h1>
			<p>Scapes is an RSS Feed Reading application dedicated to user autonomy, personal data ownership, content aggregation and the preserving the splendor of the World Wide Web.</p>

			<Feed />
		</section>
	)
}

export default Home;