'use client';

import { useState, useEffect } from 'react';
import { getAllFeedsFromDB, fetchFirstArticleFromFeed } from '@utils/database';

const WallPage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchFeedsAndArticles = async () => {
            try {
                const feeds = await getAllFeedsFromDB('FeedDB', 'feeds');
                const articlesPromises = feeds.map(feed => fetchFirstArticleFromFeed(feed.url));
                const articles = await Promise.all(articlesPromises);

                setArticles(articles.filter(article => article !== null));
            } catch (error) {
                console.error('Error fetching feeds and articles:', error);
            }
        };

        fetchFeedsAndArticles();
    }, []);

    return (
        <div>
            <h1>Feed Wall</h1>
            <div>
                {articles.map((article, index) => (
                    <div key={index} className="feed-card">
                        <h2>{article.title}</h2>
                        <a href={article.link} target="_blank" rel="noopener noreferrer">{article.link}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WallPage;
