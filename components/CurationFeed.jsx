'use client';

import React, { useState } from 'react';
import FeedIcon from '@components/FeedIcon';

const CurationFeed = ({ children, feed, setFeed }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index, url) => {
        setActiveIndex(index === activeIndex ? null : index);
        setFeed({ ...feed, url });
    };

    const data = [
        { title: 'Oof Be Told', url: 'https://oofbetold.com/feed.xml' },
        { title: 'ESPN Boxing', url: 'https://www.espn.com/espn/rss/boxing/news' },
        { title: 'EDM.com', url: 'https://edm.com/.rss/full/' },
        { title: 'AutoSport | Formula 1', url: 'https://www.autosport.com/rss/f1/news/' },
        { title: 'Bankless', url: 'https://www.bankless.com/rss/feed'}
    ];

    return (
        <div className="flex md:flex-col md:justify-end gap-4 font-satoshi font-semibold w-full overflow-x-scroll">
            {data.map((item, index) => (
                <div key={index} className="flex flex-col flex-shrink-0 gap-4 w-4/5 md:w-full p-4 border border-gray-500 rounded-md bg-black/50 hover:bg-black cursor-pointer">
                    <div className="flex flex-shrink-0 items-center gap-2" onClick={() => handleClick(index, item.url)}>
                        <FeedIcon siteUrl={item.url} />
                        <p className="font-bold text-md">
                            {item.title}
                        </p>
                    </div>
                    {activeIndex === index && (
                        <div className="mt-2">
                            {React.cloneElement(children, { feed, setFeed, hideUrlInput: true })}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CurationFeed;
