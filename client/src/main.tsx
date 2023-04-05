import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/reset.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
// eslint-disable-next-line import/no-named-as-default
import UserProvider from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CookiesProvider>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </CookiesProvider>,
);
