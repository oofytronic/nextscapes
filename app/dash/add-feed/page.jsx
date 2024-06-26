'use client';

import { initDB, addFeedToDB } from '@utils/database';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import Form from '@components/Form';
import CurationFeed from '@components/CurationFeed';
import {DashContext} from '@components/dash/DashContext';

const AddFeed = () => {
    const router = useRouter();
    const { fetchCollections } = useContext(DashContext);
    const [submitting, setSubmitting] = useState(false);
    const [feed, setFeed] = useState({
        url: '',
        collection: ''
    });

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
        {title: 'Technology', image: '/technology.jpg', path: '/dash/add-feed/categories/technology'},
        {title: 'Business', image: '/business.jpg', path: '/dash/add-feed/categories/business'},
        {title: 'Sports', image: '/sports.jpg', path: '/dash/add-feed/categories/sports'},
        {title: 'Entertainment', image: '/entertainment.jpg', path: '/dash/add-feed/categories/entertainment'},
        {title: 'Music', image: '/music.jpg', path: '/dash/add-feed/categories/music'}
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 w-full h-full">
            <div className="sticky top-0 right-0 z-10 md:col-span-1 order-1 md:order-2 py-4 px-4 md:pl-4 border-b md:border-b-none md:border-l overflow-y-scroll">
                <nav className="flex flex-col gap-4 items-start w-full md:items-end">
                    <p className="font-satoshi font-bold text-lg">Featured Scapes</p>
                    <CurationFeed feed={feed} setFeed={setFeed} structureChoice="list">
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
            <div className="md:col-span-3 order-2 md:order-1 flex flex-col gap-4 py-4 px-4 md:pr-0 h-full overflow-y-auto">
                <h1 className="head_text">Add Scape</h1>
                <Form
                    type="Add"
                    feed={feed}
                    setFeed={setFeed}
                    submitting={submitting}
                    handleSubmit={addFeed}
                />
                <p className="text-2xl">Categories</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {categories.map((category, index) => (
                    <Link href={category.path} key={index}><div className="relative w-full h-64 rounded-md hover:filter hover:sepia transition-all cursor-pointer">
                        <Image
                          src={category.image}
                          alt={category.title}
                          width={500}
                          height={500}
                          className="object-cover w-full h-full rounded-md"
                          priority
                        />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                        <p className="text-white font-bold text-lg">{category.title}</p>
                      </div>
                    </div></Link>
                  ))}
                </div>
            </div>
        </div>
    );
}

export default AddFeed;