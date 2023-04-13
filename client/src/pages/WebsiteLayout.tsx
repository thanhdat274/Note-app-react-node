import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';

const WebsiteLayout = () => {
  return (
    <div className="bg-white w-full min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default WebsiteLayout;
