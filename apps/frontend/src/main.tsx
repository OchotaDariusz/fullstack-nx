import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { NavigationDrawer } from '@fullstack/ui';
import App from './app/app';
import './styles.scss';

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      {ReactDOM.createPortal(
        <NavigationDrawer />,
        document.getElementById('navbar') as HTMLElement
      )}
      <App />
    </BrowserRouter>
  </StrictMode>
);
