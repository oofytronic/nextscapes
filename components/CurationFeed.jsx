'use client';

import React, { useState, useContext } from 'react';
import FeedIcon from '@components/FeedIcon';
import {DashContext} from '@components/dash/DashContext';

const CurationFeed = ({ children, feed, setFeed, feedData, structureChoice }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const { isFeedExpanded, toggleFeed } = useContext(DashContext);

    const handleClick = (index, url) => {
        setActiveIndex(index === activeIndex ? null : index);
        setFeed({ ...feed, url });
    };

    const defaultData = [
        { title: 'Oof Be Told', url: 'https://oofbetold.com/feed.xml' },
        { title: 'ESPN Boxing', url: 'https://www.espn.com/espn/rss/boxing/news' },
        { title: 'EDM.com', url: 'https://edm.com/.rss/full/' },
        { title: 'AutoSport | Formula 1', url: 'https://www.autosport.com/rss/f1/news/' },
        { title: 'Bankless', url: 'https://www.bankless.com/rss/feed'},
        { title: 'Uncharted Territories', url: 'https://unchartedterritories.tomaspueyo.com/feed'}
    ];

    const data = feedData ? feedData : defaultData;

    const structure = structureChoice === 'list'
                        ? 'flex md:flex-col md:justify-end gap-4 font-satoshi font-semibold w-full overflow-x-scroll'
                      : structureChoice === 'grid'
                        ? 'flex flex-col md:flex-row gap-4 font-satoshi font-semibold w-full'
                      : 'flex';

    return (
        <div className={structure}>
            {data.map((item, index) => (
                <div key={index} className={`flex flex-col flex-shrink-0 gap-4 h-fit ${structureChoice === 'grid' ? 'w-full' : 'w-4/5'} md:w-full p-4 border border-gray-500 rounded-md bg-black/50 hover:bg-black hover:border-white cursor-pointer`}>
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
