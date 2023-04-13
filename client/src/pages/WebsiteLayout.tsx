import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import { useUserContext } from '@/context/UserContext';
import Signin from '@/components/auth/Signin';

const WebsiteLayout = () => {
  const { cookies } = useUserContext();
  return (
    <>
      {cookies.user ? (
        <div className="bg-white w-full min-h-screen">
          <Header />
          <Outlet />
        </div>
      ) : (
        <Signin />
      )}
    </>
  );
};

export default WebsiteLayout;
