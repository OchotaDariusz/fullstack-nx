import React, { lazy, Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ContentWrapper, LoadingSpinner } from '@fullstack/ui';
import { JWT_LOCAL_STORAGE_KEY } from '@fullstack/constants';
import { User } from '@fullstack/interfaces';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const MainContent = lazy(() => import('../wrappers/main-content-wrapper'));

export function App() {
  const authState = useSelector<never, User>((state) => state);
  const isLoggedIn = useMemo(() => {
    return (
      authState.roles!.length > 0 &&
      localStorage.getItem(JWT_LOCAL_STORAGE_KEY) !== ''
    );
  }, [authState.roles]);

  return (
    <ContentWrapper isLoggedIn={isLoggedIn}>
      <Suspense fallback={<LoadingSpinner />}>
        {isLoggedIn && <MainContent />}
      </Suspense>
    </ContentWrapper>
  );
}

export default App;
