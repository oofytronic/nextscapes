'use client';

import { initDB, deleteDB, getAllData } from '@utils/database.js';

const SettingsPage = () => {

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
		<div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 w-full h-full">
		    {/*<div className="sticky top-0 right-0 z-10 md:col-span-1 order-1 md:order-2 py-4 md:pl-4 border-b md:border-b-none md:border-l">
		        <nav className="flex flex-col gap-2 items-start w-full md:items-end">
		            <p className="font-satoshi font-bold text-lg">Actions</p>
                    <div className="flex md:justify-end gap-2 font-satoshi font-semibold w-full overflow-x-scroll">
                    	<button className="light_btn" onClick={handleExportData}>Export Data</button>
                        <button className="btn bg-rose-500 hover:bg-rose-900" onClick={handleDeleteData}>Delete Data</button>
                    </div>
		        </nav>
		    </div>*/}
		    <div className="md:col-span-3 order-2 md:order-1 flex flex-col gap-4 py-4 h-full overflow-y-auto">
	            <h1 className="head_text">Settings</h1>
	            <p className="text-2xl">Coming Soon...</p>
				<div className="grid md:grid-cols-3 gap-4 mb-4">
					<div className="flex flex-col gap-4 p-4 border rounded-md bg-black/50">
						<p className="font-bold text-md">Custom Branding</p>
						<p>Change the Scapes Branding to your own</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md bg-black/50">
						<p className="font-bold text-md">Custom Backgrounds</p>
						<p>Add your own background image or color to the Scapes interface</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md bg-black/50">
						<p className="font-bold text-md">Custom Color Scheme and Font Choices</p>
						<p>Change the color scheme for the entire app and choice from a selection of font pairs</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md bg-black/50">
						<p className="font-bold text-md">Billing</p>
						<p>Manage plans and purchases</p>
					</div>
					<div className="flex flex-col gap-4 p-4 border rounded-md bg-black/50">
						<p className="font-bold text-md">Integrations</p>
						<p>Manage your Integrations with other apps</p>
					</div>
				</div>
	        </div>
		</div>
	);
}

export default SettingsPage;