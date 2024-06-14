import Link from 'next/link';

const Form = ({ type, feed, setFeed, submitting, handleSubmit }) => {
	return (
		<section className="w-full max-w-full flex-start flex-col">
			<h1 className="head_text">{type} Feed</h1>

			<form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">Your Feed URL</span>
					<input
						type="url"
						value={feed.url}
						onChange={(e) => setFeed({...feed, url: e.target.value})}
						placeholder="Write your feed url here..."
						required
						className="form_input" />
				</label>

				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Tag
						<br />
						<span className="font-normal">Pick from a list of your collections to add this feed to or type in the name of a new collection.</span>
					</span>
					<input
						type="text"
						value={feed.tag}
						onChange={(e) => setFeed({...feed, tag: e.target.value})}
						placeholder="#tag"
						required
						className="form_input" />
				</label>

				<div className="flex-end mx-3 mb-5 gap-4">
					<Link href="/" className="text-gray-500 text-sm">
						Cancel
					</Link>

					<button
						type="submit"
						disabled={submitting}
						className="px-5 py-1.5 text-sm rounded-full bg-teal-600 text-white">

						{submitting ? `${type}...` : type}
					</button>
				</div>
			</form>
		</section>
	)
}

export default Form;