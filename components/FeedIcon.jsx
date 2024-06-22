'use client';

import { useEffect, useState } from 'react';

const fetchFaviconUrl = async (siteUrl) => {
    const response = await fetch('/api/favicon-server', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: siteUrl })
    });
    const data = await response.json();
    return data.faviconUrl;
};

const Placeholder = ({ outlined }) => (
    <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: outlined ? 'transparent' : '#ccc',
        border: outlined ? '2px solid #ccc' : 'none'
    }}></div>
);

const FeedIcon = ({ siteUrl }) => {
    const [faviconUrl, setFaviconUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavicon = async () => {
            const favicon = await fetchFaviconUrl(siteUrl);
            setFaviconUrl(favicon);
            setLoading(false);
        };

        fetchFavicon();
    }, [siteUrl]);

    if (loading) {
        return <Placeholder outlined={true} />; // Loading state
    }

    if (!faviconUrl) {
        return <Placeholder outlined={false} />; // Placeholder when no favicon is found
    }

    return (
        <img src={faviconUrl} alt="Website Favicon" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
    );
};

export default FeedIcon;