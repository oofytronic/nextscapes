export const checkIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('FeedDB');

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['feeds'], 'readonly');
      transaction.onerror = () => {
        resolve(false);
      };
      transaction.oncomplete = () => {
        resolve(true);
      };
    };

    request.onerror = () => {
      resolve(false);
    };

    request.onupgradeneeded = (event) => {
      // This will not trigger if the database already exists
      event.target.transaction.abort();
      resolve(false);
    };
  });
};


export const isPWAInstalled = () => {
	return window.matchMedia('(display-mode: standalone)').matches;
};

export const initDB = async (dbName, storeNames) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            storeNames.forEach(storeName => {
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
                }
            });
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject('IndexedDB error: ' + event.target.errorCode);
        };
    });
}

export const deleteDB = (dbName) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.deleteDatabase(dbName);

        request.onsuccess = () => {
            console.log('Database deleted successfully');
            resolve('Database deleted successfully');
        };

        request.onerror = (event) => {
            console.error('Error deleting database:', event.target.errorCode);
            reject('Error deleting database: ' + event.target.errorCode);
        };

        request.onblocked = () => {
            console.warn('Database deletion blocked');
            reject('Database deletion blocked');
        };
    });
};

export const getAllData = (db, storeName) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject('Error fetching data: ' + event.target.errorCode);
        };
    });
};

export const addFeedToDB = async (dbName, storeNames, feed) => {
    return new Promise(async (resolve, reject) => {
        const request = indexedDB.open(dbName);

        request.onsuccess = (event) => {
            try {
                const db = event.target.result;
                const transaction = db.transaction(storeNames, 'readwrite');
                const feedsStore = transaction.objectStore('feeds');
                const collectionsStore = transaction.objectStore('collections');

                // Check if the collection exists
                const getRequest = collectionsStore.get(feed.collection);
                getRequest.onsuccess = () => {
                    if (!getRequest.result) {
                        // Add collection if it doesn't exist
                        collectionsStore.add({ id: feed.collection, name: feed.collection });
                    }

                    // Add the feed
                    const addRequest = feedsStore.add(feed);
                    addRequest.onsuccess = () => {
                        resolve(addRequest.result);
                    };

                    addRequest.onerror = (event) => {
                        reject('Add feed error: ' + event.target.errorCode);
                    };
                };

                getRequest.onerror = (event) => {
                    reject('Get collection error: ' + event.target.errorCode);
                };
            } catch (error) {
                reject('Transaction error: ' + error);
            }
        }

        request.onerror = (event) => {
            reject('IndexedDB error: ' + event.target.errorCode);
        };
    });
};

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

export const getAllCollections = (db) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['collections'], 'readonly');
        const store = transaction.objectStore('collections');
        const request = store.getAll();

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject('Error fetching collections: ' + event.target.errorCode);
        };
    });
};

export const fetchFeedsByCollection = async (dbName, collectionName) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName);

        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['feeds'], 'readonly');
            const store = transaction.objectStore('feeds');
            const index = store.index('collection');
            const query = index.getAll(collectionName);

            query.onsuccess = () => {
                resolve(query.result);
            };

            query.onerror = (event) => {
                reject('Error fetching feeds by collection: ' + event.target.errorCode);
            };
        };

        request.onerror = (event) => {
            reject('IndexedDB error: ' + event.target.errorCode);
        };
    });
};
