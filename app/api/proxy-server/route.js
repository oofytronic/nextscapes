import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

const options = {
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
};

const parser = new XMLParser(options);

async function fetchFeed(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch feed');
        }
        const feedText = await response.text();
        const xmlDoc = parser.parse(feedText);
        const firstItem = xmlDoc.rss?.channel?.item?.[0] || xmlDoc.feed?.entry?.[0];

        if (firstItem) {
            let imageUrl = null;

            // Check for media:content
            const mediaContent = firstItem['media:content'];
            if (mediaContent) {
                imageUrl = mediaContent['@_url'];
            }

            // Check for enclosure
            if (!imageUrl && firstItem.enclosure) {
                if (firstItem.enclosure['@_type']?.startsWith('image/')) {
                    imageUrl = firstItem.enclosure['@_url'];
                }
            }

            // Check for image tag
            if (!imageUrl && firstItem.image) {
                imageUrl = firstItem.image;
            }

            // Check for thumbnail tag
            if (!imageUrl && firstItem.thumbnail) {
                imageUrl = firstItem.thumbnail['@_url'];
            }

            return {
                channel: xmlDoc.rss?.channel?.title || xmlDoc.feed?.title,
                title: firstItem.title,
                link: firstItem.link?.href || firstItem.link,
                des: firstItem.description,
                image: imageUrl
            };
        }

        return null;
    } catch (error) {
        console.error('Error fetching feed:', error);
        return null;
    }
}

export async function POST(req) {
    try {
        const feeds = await req.json();
        const articlesPromises = feeds.map(feed => fetchFeed(feed.url));
        const articles = await Promise.all(articlesPromises);

        const filteredArticles = articles.filter(article => article !== null);

        return NextResponse.json(filteredArticles, { status: 200 });
    } catch (error) {
        console.error('Error in proxy-feed API:', error);
        return NextResponse.json({ error: 'Error fetching articles' }, { status: 500 });
    }
}
