import React from 'react';
import { Outlet } from 'react-router-dom';

const WebsiteLayout = () => {
  return (
    <div className="max-w-full mx-auto">
      <Outlet />
    </div>
  );
};

export default WebsiteLayout;
