'use client';

import React, { useEffect, useState, useContext } from 'react';
import { initDB, getAllFeedsFromDB, getAllCollections } from '@utils/database';
import Link from 'next/link';
import Feed from '@components/Feed';
import {DashContext} from '@components/dash/DashContext';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";


export default function DashboardPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeLink, setActiveLink] = useState();
    const { fetchCollections } = useContext(DashContext);
    const [isFeedsExpanded, setIsFeedsExpanded] = useState(false);

    const toggleFeeds = () => {
        setIsFeedsExpanded(!isFeedsExpanded);
      };

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
            	await fetchCollections();
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
            <div className="p-4">
                <p className="font-satoshi font-semibold">Loading...</p>
            </div>
        );
    }

    return (
		<div className="grid grid-rows-12 grid-cols-1 md:grid-cols-4 md:gap-4 w-full h-full">
          {/* Sidebar */}
          <div className={`${isFeedsExpanded ? 'row-start-1 row-end-5' : 'row-start-1 row-end-2'} md:col-span-1 md:row-span-12 order-1 md:order-2 flex flex-col md:items-end gap-4 border-b md:border-b-none md:border-l overflow-y-scroll`}>
            <div className={`sticky top-0 right-0 bg-black/50 backdrop-blur .webkit-backdrop-blur p-4 ${isFeedsExpanded ? 'border-b' : ''} rounded md:border-b w-full flex justify-end`}>
              <button className="flex items-center gap-1 text-white focus:outline-none md:pointer-events-none" onClick={toggleFeeds}>
                <p className="font-satoshi font-bold text-lg">All Scapes</p>
                {isFeedsExpanded ? <FaChevronUp className="h-4 w-4 text-white md:hidden" /> : <FaChevronDown className="h-4 w-4 text-white md:hidden" />}
              </button>
            </div>
            <div className={`${!isFeedsExpanded ? 'hidden' : 'block'} md:flex md:max-h-full flex gap-2 font-satoshi font-semibold w-full md:flex-wrap md:justify-end`}>
              <Feed />
            </div>
          </div>

          {/* Articles */}
          {articles.length === 0 ? (
            <div className={`flex flex-col gap-4 ${isFeedsExpanded ? 'row-start-5 row-end-13' : 'row-start-2 row-end-13'} md:col-span-3 md:row-span-12 order-2 md:order-1 py-4 pl-4`}>
              <p className="font-satoshi font-semibold text-sm">No articles found. Please add feeds.</p>
              <Link href="/dash/add-feed" className="light_btn w-fit">
                Add Scape
              </Link>
            </div>
          ) : (
            <div className={`${isFeedsExpanded ? 'row-start-5 row-end-13' : 'row-start-2 row-end-13'} md:col-span-3 md:row-span-12 order-2 md:order-1 flex flex-col gap-4 py-4 px-4 md:pr-0 h-full overflow-y-auto`}>
              <h1 className="font-satoshi font-bold head_text">Latest</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {articles.map((article, index) => (
                  <a key={index} href={article.link} target="_blank" rel="noopener noreferrer" className="h-full w-full">
                    <div className="flex flex-col gap-4 bg-black/50 transition border border-gray-500 rounded-md p-6 cursor-pointer h-full hover:bg-black hover:border-white">
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
