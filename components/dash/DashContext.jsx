'use client';

import { createContext, useState, useEffect } from 'react';
import { initDB, getAllCollections } from '@utils/database';

export const DashContext = createContext();

export const DashProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [feeds, setFeeds] = useState([]);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const fetchCollections = async () => {
    const dbName = 'FeedDB';
    const storeNames = ['feeds', 'collections'];

    try {
      const db = await initDB(dbName, storeNames);
      const collections = await getAllCollections(db);
      setCollections(collections);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <DashContext.Provider value={{ collections, isExpanded, feeds, setFeeds, fetchCollections, toggleMenu }}>
      {children}
    </DashContext.Provider>
  );
};
