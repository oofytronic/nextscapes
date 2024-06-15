'use client';

import React, { useEffect, useState } from 'react';
import { initDB, getAllFeedsFromDB } from '@utils/database';



export default function WallPage() {
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
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="head_text text-center">
                Feed Wall
            </h1>
            {articles.length === 0 ? (
                <div>No articles found. Please add feeds.</div>
            ) : (
                <div className="flex gap-4 flex-wrap mt-16 w-full">
                    {articles.map((article, index) => (
                        <div key={index} className="prompt_card flex flex-col gap-4 cursor-pointer">
                            <h2 className="font-inter font-semibold text-gray-900">{article.title}</h2>
                            <a href={article.link} target="_blank" rel="noopener noreferrer" className="font-satoshi font-semibold text-gray-900">
                                {article.link}
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
