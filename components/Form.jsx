import Link from 'next/link';

const Form = ({ type, feed, setFeed, submitting, handleSubmit }) => {
	return (
		<section className="w-full max-w-full flex-center flex-col">
			<h1 className="head_text">{type} Feed</h1>

			<form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 bg-black/50 text-white rounded-md p-6">
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-200">Your Feed URL</span>
					<input
						type="url"
						value={feed.url}
						onChange={(e) => setFeed({...feed, url: e.target.value})}
						placeholder="Write your feed url here..."
						required
						className="form_input" />
				</label>

				<label>
					<span className="font-satoshi font-semibold text-base text-gray-200">
						Collection
						<br />
						<span className="font-normal">You have one collection, "main", by default. You can create and add a feed to a new collection below.</span>
					</span>
					<input
						type="text"
						value={feed.tag}
						onChange={(e) => setFeed({...feed, tag: e.target.value})}
						placeholder="collection name i.e main, tech, sports"
						required
						className="form_input" />
				</label>

				<div className="flex-end mx-3 mb-5 gap-4">
					<Link href="/dash" className="text-gray-200 hover:text-gray-100 text-sm">
						Cancel
					</Link>

					<button
						type="submit"
						disabled={submitting}
						className="px-5 py-1.5 text-sm rounded-full bg-teal-500 hover:bg-teal-400 text-white">

						{submitting ? `${type}...` : type}
					</button>
				</div>
			</form>
		</section>
	)
}

export default Form;