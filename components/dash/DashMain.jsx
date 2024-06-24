'use client';

import { useContext } from 'react';
import { DashContext } from './DashContext';

const Sidebar = ({ children }) => {
  const { collections, isExpanded, toggleMenu } = useContext(DashContext);

    return (
        <main className={`main-section ${isExpanded ? 'row-end-11' : 'row-end-12'}`}>
			{children}
		</main>
    )
}

export default Sidebar;


