'use client';

import { useState, useEffect } from 'react';
import { getAllFeedsFromDB } from '@utils/database';
import FeedCard from './FeedCard';

const FeedCardList = ({ data, handleTagClick }) => {
	return (
		<div className="flex gap-4 flex-wrap mt-16 w-full">
			{data.map((post) => {
				return <FeedCard
					key={post.id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			})}
		</div>
	)
}

const Feed = () => {
	const [ searchText, setSearchText ] = useState('');
	const [ posts, setPosts ] = useState([]);

	const handleSearchChange = e => {

	}

	async function fetchFeedsFromServer() {
		const response = await fetch('/api/feed', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			// Since the server indicates that the client should handle the IndexedDB part,
			// proceed to fetch from IndexedDB

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
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or feed"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			<FeedCardList
				data={posts}
				handleTagClick={() => {}}
			/>
		</section>
	)
}

export default Feed;