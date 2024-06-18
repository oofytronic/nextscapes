const Profile = () => {
	return (
		<section className="w-full flex-center flex-col gap-8">
			<h1 className="head_text text-center">
				User Profiles Coming Soon...
			</h1>
			<div className="grid md:grid-cols-3 gap-4 mb-4">
				<div className="flex flex-col gap-4 p-4 border rounded-md bg-black/50">
					<p className="font-bold text-md">Usernames</p>
					<p>@username as well as domains like you@domain.com</p>
				</div>
				<div className="flex flex-col gap-4 p-4 border rounded-md bg-black/50">
					<p className="font-bold text-md">Data Migration</p>
					<p>Move your Scapes data to another device with QR code or E2E URL</p>
				</div>
				<div className="flex flex-col gap-4 p-4 border rounded-md bg-black/50">
					<p className="font-bold text-md">Data Export</p>
					<p>Move your feeds to another app or document</p>
				</div>
				<div className="flex flex-col gap-4 p-4 border rounded-md bg-black/50">
					<p className="font-bold text-md">Device Sync</p>
					<p>Sync Scapes data across devices using peer-to-peer technologies</p>
				</div>
				<div className="flex flex-col gap-4 p-4 border rounded-md bg-black/50">
					<p className="font-bold text-md">Multiplayer</p>
					<p>Add users to your Scape and assign roles</p>
				</div>
			</div>
		</section>
	)
}

export default Profile;