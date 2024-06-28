'use client';

import { initDB, addFeedToDB } from '@utils/database';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Form from '@components/Form';
import CurationFeed from '@components/CurationFeed';
import {DashContext} from '@components/dash/DashContext';

const Category = ( {params}) => {
    const router = useRouter();
    const { fetchCollections } = useContext(DashContext);
    const [submitting, setSubmitting] = useState(false);
    const [feed, setFeed] = useState({
        url: '',
        collection: ''
    });

    const category = params.slug ? params.slug[0] : undefined;

    const saveFeed = async (data) => {
        const dbName = 'FeedDB';
        const stores = ['feeds', 'collections'];

        try {
            const db = await initDB(dbName, stores);
            const result = await addFeedToDB(dbName, stores, data);
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
                    collection: feed.collection
                })
            });

            if (response.ok) {
                const responseData = await response.json();
                await saveFeed(responseData.data);
                await fetchCollections();
                router.push('/dash');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    const categories = [
        {title: 'Technology', image: '/technology.jpg'},
        {title: 'Business', image: '/business.jpg'},
        {title: 'Sports', image: '/sports.jpg'},
        {title: 'Entertainment', image: '/entertainment.jpg'},
        {title: 'Music', image: '/music.jpg'}
    ]

    const suggestions = [
		{
			category: 'technology',
			feeds: [
				{title: 'Tech 1'},
				{title: 'Tech 2'},
				{title: 'Tech 3'}
			]
		}
    ]

    const topic = suggestions.find(topic => topic.category === category);
    const feedData = topic ? topic.feeds : '';

    return (
        <div className="grid grid-rows-12 grid-cols-1 md:grid-cols-4 md:gap-4 w-full h-full">
            <div className="sticky top-0 right-0 row-start-1 row-end-4 md:row-span-12 z-10 md:col-span-1 order-1 md:order-2 h-fit md:h-full py-4 px-4 md:pl-4 border-b md:border-b-none md:border-l overflow-y-scroll">
                <nav className="flex flex-col gap-4 items-start w-full md:items-end">
                    <p className="font-satoshi font-bold text-lg">Featured Scapes</p>
                    <CurationFeed feed={feed} setFeed={setFeed} structureChoice={'list'}>
                        <Form
                            type="Add"
                            feed={feed}
                            setFeed={setFeed}
                            submitting={submitting}
                            handleSubmit={addFeed}
                            hideUrlInput={true}
                        />
                    </CurationFeed>
                </nav>
            </div>
            <div className="row-start-4 row-end-13 md:row-span-12 md:col-span-3 order-2 md:order-1 flex flex-col gap-4 py-4 px-4 md:pr-0 h-full overflow-y-auto">
                <h1 className="head_text capitalize">{category === undefined ? 'Categories' : category}</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <CurationFeed feed={feed} setFeed={setFeed} feedData={feedData} structureChoice={'grid'}>
                        <Form
                            type="Add"
                            feed={feed}
                            setFeed={setFeed}
                            submitting={submitting}
                            handleSubmit={addFeed}
                            hideUrlInput={true}
                        />
                    </CurationFeed>
                </div>
            </div>
        </div>
    );
}

export default Category;