'use client';

import React, { useEffect, useState } from 'react';
import { initDB, getAllFeedsFromDB, getAllCollections } from '@utils/database';
import Link from 'next/link';
import Feed from '@components/Feed';


export default function DashboardPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeLink, setActiveLink] = useState();
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const fetchCollections = async () => {
            const dbName = 'FeedDB';
            const storeNames = ['feeds', 'collections'];

            try {
                const db = await initDB(dbName, storeNames);
                const collections = await getAllCollections(db);
                setCollections(collections);
            } catch (error) {
                console.error('Error fetching collections:', error);
            }
        };

        fetchCollections();
    }, []);

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                await initDB('FeedDB', ['feeds', 'collections']);
                const feeds = await getAllFeedsFromDB('FeedDB', 'feeds');
                const response = await fetch('/api/proxy-server', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(feeds),
                });

                if (response.ok) {
                    const articles = await response.json();
                    setArticles(articles);
                } else {
                    console.error('Failed to fetch articles:', await response.json());
                }
            } catch (error) {
                console.error('Error fetching feeds:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeeds();
    }, []);

    if (loading) {
        return (
            <div className="py-4">
                <p className="font-satoshi font-semibold">Loading...</p>
            </div>
        );
    }

    return (
		<div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 w-full h-full">
		    <div className="sticky top-0 right-0 z-10 md:col-span-1 order-1 md:order-2 flex flex-col gap-4 py-4 md:pl-4 border-b md:border-b-none md:border-l">
		        <div className="flex flex-col gap-2 items-start w-full md:items-end">
		            <p className="font-satoshi font-bold text-lg">Collections</p>
		            <div className="flex gap-2 font-satoshi font-semibold w-full overflow-x-scroll md:flex-wrap md:justify-end">
		                {collections.length > 0 ? (
		                    collections.map((collection) => (
		                        <button className="light_btn" key={collection.id}>{collection.name}</button>
		                    ))
		                ) : (
		                    <p>No Collection Yet...</p>
		                )}
		            </div>
		        </div>

                <div className="flex flex-col gap-2 items-start w-full md:items-end">
                    <p className="font-satoshi font-bold text-lg">Feeds</p>
                    <div className="max-h-24 md:max-h-96 flex gap-2 font-satoshi font-semibold w-full overflow-y-scroll md:flex-wrap md:justify-end">
                        <Feed />
                    </div>
                </div>
		    </div>
		    {articles.length === 0 ? (
		        <div className="flex flex-col gap-4 md:col-span-3 order-2 md:order-1 py-4">
		            <p className="font-satoshi font-semibold">No articles found. Please add feeds.</p>
		            <Link href="/dash/add-feed" className="light_btn w-fit">
		                Add Feed
		            </Link>
		        </div>
		    ) : (
		        <div className="md:col-span-3 order-2 md:order-1 flex flex-col gap-4 py-4 h-full overflow-y-auto">
		            <h1 className="font-satoshi font-bold head_text">Main Feed</h1>
		            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
		                {articles.map((article, index) => (
		                    <a key={index} href={article.link} target="_blank" rel="noopener noreferrer" className="h-full w-full">
		                        <div className="flex flex-col gap-4 bg-black/50 hover:bg-white hover:text-black transition border border-gray-500 rounded-md p-6 cursor-pointer h-full">
		                            {article.image && (
		                                <img src={article.image} alt={article.title} className="w-full h-auto object-contain rounded-md" />
		                            )}
		                            <div className="flex flex-col gap-4">
		                                <p className="text-sm">{article.channel}</p>
		                                <h2 className="font-inter font-semibold">{article.title}</h2>
		                                <p className="font-satoshi font-semibold text-sm break-words truncate">
		                                    {article.des}
		                                </p>
		                            </div>
		                        </div>
		                    </a>
		                ))}
		            </div>
		        </div>
		    )}
		</div>
	);
}
