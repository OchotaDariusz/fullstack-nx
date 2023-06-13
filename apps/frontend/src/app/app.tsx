import React, { lazy, Suspense } from 'react';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useGetLoginState } from '@fullstack/hooks';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ContentWrapper, LoadingSpinner } from '@fullstack/ui';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const MainContent = lazy(() => import('../wrappers/main-content-wrapper'));

export function App() {
  const isLoggedIn = useGetLoginState();

  return (
    <ContentWrapper isLoggedIn={isLoggedIn}>
      <Suspense fallback={<LoadingSpinner />}>
        {isLoggedIn && <MainContent />}
      </Suspense>
    </ContentWrapper>
  );
}

export default App;
