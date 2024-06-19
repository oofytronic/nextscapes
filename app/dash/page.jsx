'use client';

import React, { useEffect, useState } from 'react';
import { initDB, getAllFeedsFromDB } from '@utils/database';
import Link from 'next/link';


export default function DashboardPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeLink, setActiveLink] = useState();
    console.log(articles)

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
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
            <p className="font-satoshi font-semibold">Loading...</p>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="sticky top-0 left-0 w-full flex justify-end z-10">
                <nav className="flex flex-col gap-2 items-start w-full border border-gray-500 rounded-md p-4 backdrop-blur-lg md:w-fit md:items-end">
                    <p className="font-satoshi font-bold text-lg">Collections</p>
                    <div className="flex gap-2 font-satoshi font-semibold w-full overflow-x-scroll px-4 md:px-0">
                        <button className="light_btn">Main</button>
                        <button className="light_btn">Tech</button>
                        <button className="light_btn">Entertainment</button>
                    </div>
                </nav>
            </div>
            {articles.length === 0 ? (
                <div className="flex flex-col gap-4">
                    <p className="font-satoshi font-semibold">No articles found. Please add feeds.</p>
                    <Link href="/dash/add-feed" className="light_btn w-fit">
                    	Add Feed
                    </Link>
                </div>
            ) : (
                <div className="relative flex flex-col gap-4 flex-wrap mt-4 w-full">
                    <h1 className="font-satoshi font-bold text-2xl">Main Feed</h1>
                    {articles.map((article, index) => (
                        <a key={index} href={article.link} target="_blank" rel="noopener noreferrer" className="w-full" >
                            <div className="flex justify-between items-center w-full">
                                <div className="flex flex-col flex-1 gap-4 w-full bg-black/50 hover:bg-white hover:text-black transition border border-gray-500 rounded-md p-6 cursor-pointer">
                                    <p className="text-sm">{article.channel}</p>
                                    <h2 className="font-inter font-semibold">{article.title}</h2>
                                    <p className="font-satoshi font-semibold text-sm break-words truncate">
                                        {article.des}
                                    </p>
                                </div>
                                {article.image ? `<img src="${article.image.url}" alt="${article.title}">` : ''}
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
