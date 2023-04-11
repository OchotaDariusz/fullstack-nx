import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes, Link } from 'react-router-dom';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ConnectedContentWrapper, MainContent } from '@fullstack/ui';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { User } from '@fullstack/interfaces';

type AppProps = {
  authState: User;
};

export function App({ authState }: AppProps) {
  useEffect(() => {
    console.log(authState);
  }, [authState]);

  return (
    <ConnectedContentWrapper>
      <MainContent />
    </ConnectedContentWrapper>
  );
}

const mapStateToProps = (state: User) => ({
  authState: state,
});

export default connect(mapStateToProps)(App);
