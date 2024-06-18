'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { initDB, getAllFeedsFromDB } from '@utils/database';
import FeedCard from './FeedCard';

const FeedCardList = ({ data, handleTagClick }) => {
	return (
		<>
		{data.length === 0 ? (
			<p>Empty</p>
		) : (
			<div className="flex flex-col gap-4 w-full">
				<div className="flex flex-wrap gap-4">
					{data.map((post) => {
						return <FeedCard
							key={post.id}
							post={post}
							handleTagClick={handleTagClick}
						/>
					})}
				</div>
			</div>
		)}
		</>
	)
}

const Feed = () => {
	const [ searchText, setSearchText ] = useState('');
	const [ posts, setPosts ] = useState([]);

	const handleSearchChange = e => {}

	async function fetchFeedsFromServer() {
		const response = await fetch('/api/feed', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			const dbName = 'FeedDB';
			const storeName = 'feeds';
			const db = await initDB(dbName, storeName);
			const feeds = await getAllFeedsFromDB('FeedDB', 'feeds');
			return feeds;
		} else {
			console.error('Failed to fetch feeds:', await response.json());
		}
	}

	useEffect(() => {
		const fetchData = async () => {
		const data = await fetchFeedsFromServer();
			console.log(data)
			setPosts(data);
		};

		fetchData();
	}, []);

	return (
		<section>
			<FeedCardList
				data={posts}
				handleTagClick={() => {}}
			/>
		</section>
	)
}

export default Feed;