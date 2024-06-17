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
		tag: ''
	});

	const saveFeed = async (data) => {
		const dbName = 'FeedDB';
		const storeName = 'feeds';

		try {
			const db = await initDB(dbName, storeName);
			const result = await addFeedToDB(dbName, storeName, data);
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
					tag: feed.tag
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
		<Form
		type="Add"
		feed={feed}
		setFeed={setFeed}
		submitting={submitting}
		handleSubmit={addFeed} />
	)
}

export default AddFeed;