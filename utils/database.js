export const initDB = async (dbName, storeName) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject('IndexedDB error: ' + event.target.errorCode);
        };
    });
}

export const addFeedToDB = async (dbName, storeName, obj) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName);

        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const addRequest = store.add(obj);

            addRequest.onsuccess = () => {
                resolve(addRequest.result);
            };

            addRequest.onerror = (event) => {
                reject('Add object error: ' + event.target.errorCode);
            };
        };

        request.onerror = (event) => {
            reject('IndexedDB error: ' + event.target.errorCode);
        };
    });
}

export const getAllFeedsFromDB = async (dbName, storeName) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName);

        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const getRequest = store.getAll();

            getRequest.onsuccess = (event) => {
                resolve(event.target.result);
            };

            getRequest.onerror = (event) => {
                reject('Get all feeds error: ' + event.target.errorCode);
            };
        };

        request.onerror = (event) => {
            reject('IndexedDB error: ' + event.target.errorCode);
        };
    });
}

export async function fetchFirstArticleFromFeed(feedUrl) {
	const response = await fetch(feedUrl);
	const feedText = await response.text();

	// Parse the feed (RSS, ATOM, JSONFeed) and extract the first article
	// This is a simple example, you might need a proper feed parser library
	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(feedText, "application/xml");
	const firstItem = xmlDoc.querySelector("item") || xmlDoc.querySelector("entry");

	if (firstItem) {
		return {
			title: firstItem.querySelector("title")?.textContent,
			link: firstItem.querySelector("link")?.textContent,
		};
	}

	return null;
}