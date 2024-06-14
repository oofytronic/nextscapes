export async function GET() {
	try {
		return Response.json({ message: 'Feed added successfully'}, { status: 201 })
	} catch {
		return Response.json({ message: 'Error adding feed'}, { status: 500 })
	}
}
