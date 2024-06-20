'use client';

import { initDB, deleteDB, getAllData } from '@utils/database.js';

const ProfilePage = () => {

	const downloadJSON = (jsonString, filename) => {
		const blob = new Blob([jsonString], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const exportData = async (dbName) => {
	    try {
	        const db = await initDB(dbName, ['feeds', 'collections']);
	        const feedsData = await getAllData(db, 'feeds');
	        const collectionsData = await getAllData(db, 'collections');

	        const exportObject = {
	            feeds: feedsData,
	            collections: collectionsData,
	        };

	        const jsonString = JSON.stringify(exportObject, null, 2);
	        downloadJSON(jsonString, 'scapes-data-export.json');
	    } catch (error) {
	        console.error('Error exporting data:', error);
	    }
	};

	const handleExportData = () => {
        exportData('FeedDB')
            .then(() => {
            	alert('Data exported successfully')
                console.log('Data exported successfully');
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleDeleteData = () => {
		if (window.confirm('Are you sure you want to clear all local data?')) {
            deleteDB('FeedDB')
                .then(message => {
                    alert(message);
                    console.log(message);
                })
                .catch(error => {
                	alert(error);
                    console.error(error);
                });
        }
	}

	return (
		<section className="w-full flex-center flex-col gap-8">
		<nav className="flex flex-col gap-2 items-start w-full border border-gray-500 rounded-md p-4 backdrop-blur-lg md:items-end">
                    <p className="font-satoshi font-bold text-lg">Actions</p>
                    <div className="flex md:justify-end gap-2 font-satoshi font-semibold w-full overflow-x-scroll">
                    	<button className="light_btn" onClick={handleExportData}>Export Data</button>
                        <button className="btn bg-rose-500 hover:bg-rose-900" onClick={handleDeleteData}>Delete Data</button>
                    </div>
                </nav>
			<h1 className="head_text text-center">
				Coming Soon...
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

export default ProfilePage;