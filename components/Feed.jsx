'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { initDB, getAllFeedsFromDB } from '@utils/database';
import FeedCard from './FeedCard';

const FeedCardList = ({ data, handleTagClick }) => {
	return (
		<>
		{data.length === 0 ? (
			<div>
				<Link href="/add-feed" className="black_btn">
					Add Feed
				</Link>
			</div>
		) : (
			<div className="flex flex-col gap-4 mt-16 w-full">
				<h2 className="font-bold text-2xl">Your Feeds</h2>
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
		<section className="feed">
			{/*<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or feed"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>*/}

			<FeedCardList
				data={posts}
				handleTagClick={() => {}}
			/>
		</section>
	)
}

export default Feed;