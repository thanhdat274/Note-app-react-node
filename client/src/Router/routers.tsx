import Signin from '@/components/auth/Signin';
import Signup from '@/components/auth/Signup';
import Home from '@/pages/Home';
import WebsiteLayout from '@/pages/WebsiteLayout';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRouter } from './PrivateRouter';

const Router = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/"
        element={
          <PrivateRouter>
            <WebsiteLayout />
          </PrivateRouter>
        }
      >
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Router;
