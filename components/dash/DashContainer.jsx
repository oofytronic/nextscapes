'use client';

import { DashContext, DashProvider } from './DashContext';
import { useContext } from 'react';

import DashNav from './DashNav';
import Sidebar from './Sidebar';
import DashMain from './DashMain';

const DashContainer = ({ children }) => {
  return (
    <DashProvider>
      <div className="dash-container">
        <DashNav />
        <Sidebar />
        <DashMain>
        	{children}
        </DashMain>
      </div>
    </DashProvider>
  );
};

export default DashContainer;
