import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { ContentWrapper, MainContent, NavigationDrawer } from '@fullstack/ui';
import useIsDomReady from '../hooks/use-is-dom-ready/use-is-dom-ready';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import styles from './app.module.scss';

export function App() {
  const isDomReady = useIsDomReady();

  return (
    <>
      {isDomReady
        ? ReactDOM.createPortal(
            <NavigationDrawer />,
            document.getElementById('navbar') as HTMLElement
          )
        : null}
      <ContentWrapper>
        <MainContent />
      </ContentWrapper>
      <div />

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </>
  );
}

export default App;