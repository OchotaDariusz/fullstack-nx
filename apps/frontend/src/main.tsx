import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as ReactDOMClient from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import { store } from '@fullstack/reducers';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { NavigationDrawer, ThemeColorWrapper } from '@fullstack/ui';
import App from './app/app';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <StrictMode>
      <HashRouter>
        <ThemeColorWrapper>
          <>
            <CssBaseline />
            {ReactDOM.createPortal(
              <NavigationDrawer />,
              document.getElementById('navbar') as HTMLElement
            )}
            <App />
          </>
        </ThemeColorWrapper>
      </HashRouter>
    </StrictMode>
  </Provider>
);
