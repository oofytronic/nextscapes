'use client';

import React, { useEffect, useState } from 'react';
import { initDB, getAllFeedsFromDB } from '@utils/database';
import Link from 'next/link';


export default function DashboardPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

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
            <div className="flex flex-col gap-4 flex-center">
                <h1 className="head_text text-center">
                    Main Feed
                </h1>
                <p className="font-satoshi font-semibold">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 flex-center">
            <h1 className="head_text text-center">
               Main Feed
            </h1>
            {articles.length === 0 ? (
                <div className="flex flex-col gap-4">
                    <p className="font-satoshi font-semibold">No articles found. Please add feeds.</p>
                    <Link href="/add-feed" className="light_btn">
                    	Add Feed
                    </Link>
                </div>
            ) : (
                <div className="relative flex flex-col gap-4 flex-wrap mt-4 w-full">
                    {articles.map((article, index) => (
                        <a key={index} href={article.link} target="_blank" rel="noopener noreferrer" className="w-full" ><div className="flex flex-col flex-1 gap-4 w-full bg-black/50 hover:bg-white hover:text-black transition border border-gray-500 rounded-md p-6 cursor-pointer">
                            <h2 className="font-inter font-semibold">{article.title}</h2>
                            <p className="font-satoshi font-semibold text-sm break-words">
                                {article.link}
                            </p>
                        </div></a>
                    ))}
                </div>
            )}
        </div>
    );
}