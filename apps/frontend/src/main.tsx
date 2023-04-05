import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import { NavigationDrawer } from '@fullstack/ui';
import App from './app/app';
import './styles.scss';
import { ThemeColorWrapper } from '@fullstack/ui';

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeColorWrapper>
        <CssBaseline />
        {ReactDOM.createPortal(
          <NavigationDrawer />,
          document.getElementById('navbar') as HTMLElement
        )}
        <App />
      </ThemeColorWrapper>
    </BrowserRouter>
  </StrictMode>
);
