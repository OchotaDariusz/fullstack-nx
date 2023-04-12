import React, { lazy, Suspense, useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ConnectedContentWrapper, LoadingSpinner } from '@fullstack/ui';
import {
  AUTH_STATE_LOCAL_STORAGE_KEY,
  JWT_LOCAL_STORAGE_KEY,
} from '@fullstack/constants';
import { Role } from '@fullstack/types';
import { User } from '@fullstack/interfaces';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const MainContent = lazy(() => import('../wrappers/main-content-wrapper'));

interface AppProps {
  authState: User;
}

export function App({ authState }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return (
      localStorage.getItem(AUTH_STATE_LOCAL_STORAGE_KEY) !== '' &&
      localStorage.getItem(JWT_LOCAL_STORAGE_KEY) !== ''
    );
  });

  return (
    <ConnectedContentWrapper isLoggedIn={isLoggedIn}>
      <Suspense fallback={<LoadingSpinner />}>
        {isLoggedIn && <MainContent />}
      </Suspense>
    </ConnectedContentWrapper>
  );
}

const mapStateToProps = (state: User) => ({
  authState: state,
});

export default connect(mapStateToProps)(App);
