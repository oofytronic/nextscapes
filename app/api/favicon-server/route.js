import { NextResponse } from 'next/server';
import { parse } from 'node-html-parser';

const possibleIconRels = [
    'icon',
    'shortcut icon',
    'apple-touch-icon',
    'apple-touch-icon-precomposed'
];

const getFaviconUrl = async (siteUrl) => {
    const rootUrl = new URL(siteUrl).origin;

    try {
        const rootFaviconUrl = new URL('/favicon.ico', rootUrl).href;
        const response = await fetch(rootFaviconUrl, { method: 'HEAD' });
        if (response.ok) {
            return rootFaviconUrl;
        }
    } catch (error) {
        console.log('favicon.ico not found at the root');
    }

    try {
        const response = await fetch(rootUrl);
        const text = await response.text();
        const root = parse(text);

        for (let rel of possibleIconRels) {
            const iconLink = root.querySelector(`link[rel="${rel}"]`);
            if (iconLink) {
                let faviconUrl = iconLink.getAttribute('href');
                if (faviconUrl && !faviconUrl.startsWith('http')) {
                    faviconUrl = new URL(faviconUrl, rootUrl).href;
                }

                const iconResponse = await fetch(faviconUrl, { method: 'HEAD' });
                if (iconResponse.ok) {
                    return faviconUrl;
                }
            }
        }
    } catch (error) {
        console.error('Error fetching website HTML:', error);
    }

    return null;
};

export async function POST(req) {
    const body = await req.json();

    if (!body.url) {
        return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    try {
        const faviconUrl = await getFaviconUrl(decodeURIComponent(body.url));
        return NextResponse.json({ faviconUrl }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch favicon' }, { status: 500 });
    }
}
