export const POST = async (req, res) => {
	try {
		// const db = await initDB(dbName, storeName);
		// const result = await addFeedToDB(dbName, storeName, req.body);

		const data = req.body;

		res.status(201).json({ message: 'Feed added successfully', data });
	} catch (error) {
		res.status(500).json({ message: 'Error adding feed', error });
	}
}