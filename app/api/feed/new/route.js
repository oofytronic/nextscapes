import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const data = await req.json(); // Parse JSON body

        // Simulate a database operation here
        // const db = await initDB(dbName, storeName);
        // const result = await addFeedToDB(dbName, storeName, data);

        return NextResponse.json({ message: 'Feed added successfully', data }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error adding feed', error: error.message }, { status: 500 });
    }
}
