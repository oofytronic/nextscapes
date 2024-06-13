import Feed from '@components/Feed';

const Home = () => {
	return (
		<section className="w-full flex-center flex-col">
			<h1 className="head_text text-center">
				Gather All of Your Favorite Web Content
				<br className="max-md:hidden" />
				<span className="gradient">in One Place Privately and Anonymously</span>
			</h1>
			<p>Scapes is an RSS Feed Reading application dedicated to user autonomy, personal data ownership, content aggregation and the preserving the splendor of the World Wide Web.</p>

			<Feed />
		</section>
	)
}

export default Home;