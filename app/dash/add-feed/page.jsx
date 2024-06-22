'use client';

import { initDB, addFeedToDB } from '@utils/database';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const AddFeed = () => {
	const router = useRouter();
	const [ submitting, setSubmitting ] = useState(false);
	const [ feed, setFeed ] = useState({
		url: '',
		collection: ''
	});

	const saveFeed = async (data) => {
		const dbName = 'FeedDB';
		const stores = ['feeds', 'collections'];
		const storeName = 'feeds';

		try {
			const db = await initDB(dbName, stores);
			const result = await addFeedToDB(dbName, stores, data);
			console.log('Feed added successfully with id:', result);
		} catch (error) {
			console.error('Error adding feed:', error);
		}
	}

	const addFeed = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const response = await fetch('/api/feed/new', {
				method: 'POST',
				body: JSON.stringify({
					url: feed.url,
					collection: feed.collection
				})
			});

			if(response.ok) {
				const responseData = await response.json();
				await saveFeed(responseData.data);
				router.push('/dash');
			}
		} catch(error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 w-full h-full">
		    <div className="sticky top-0 right-0 z-10 md:col-span-1 order-1 md:order-2 py-4 md:pl-4 border-b md:border-b-none md:border-l">
		        <nav className="flex flex-col gap-2 items-start w-full md:items-end">
		            <p className="font-satoshi font-bold text-lg">Scapes Recommends</p>
                    <div className="flex md:flex-col md:justify-end gap-4 font-satoshi font-semibold w-full overflow-x-scroll">
                    	<div className="flex flex-col gap-4 p-4 border border-gray-500 rounded-md bg-black/50">
							<p className="font-bold text-md">Oof Be Told</p>
						</div>
						<div className="flex flex-col gap-4 p-4 border border-gray-500 rounded-md bg-black/50">
							<p className="font-bold text-md">ESPN Boxing</p>
						</div>
						<div className="flex flex-col gap-4 p-4 border border-gray-500 rounded-md bg-black/50">
							<p className="font-bold text-md">Dancing Astronaut</p>
						</div>
						<div className="flex flex-col gap-4 p-4 border border-gray-500 rounded-md bg-black/50">
							<p className="font-bold text-md">Formula One</p>
						</div>
                    </div>
		        </nav>
		    </div>
		    <div className="md:col-span-3 order-2 md:order-1 flex flex-col gap-4 py-4 h-full overflow-y-auto">
		    	<Form
				type="Add"
				feed={feed}
				setFeed={setFeed}
				submitting={submitting}
				handleSubmit={addFeed} />
	            <p className="text-2xl">Categories</p>
				<div className="grid md:grid-cols-3 gap-4 mb-4">
					<div className="flex flex-col gap-4 p-4 border border-gray-500 rounded-md bg-black/50">
						<p className="font-bold text-md">Technology</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border border-gray-500 rounded-md bg-black/50">
						<p className="font-bold text-md">Business</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border border-gray-500 rounded-md bg-black/50">
						<p className="font-bold text-md">Sports</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border border-gray-500 rounded-md bg-black/50">
						<p className="font-bold text-md">Entertainment</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border border-gray-500 rounded-md bg-black/50">
						<p className="font-bold text-md">Music</p>
					</div>
				</div>
	        </div>
		</div>
	)
}

export default AddFeed;