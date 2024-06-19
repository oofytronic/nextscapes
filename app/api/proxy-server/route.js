import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser();

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
            return {
                channel: xmlDoc.rss.channel.title,
                title: firstItem.title,
                link: firstItem.link?.href || firstItem.link,
                des: firstItem.description
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
