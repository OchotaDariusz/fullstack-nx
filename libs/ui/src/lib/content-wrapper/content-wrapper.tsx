import React, { ReactNode } from 'react';
import { Container } from '@mui/material';
import SignalWifiBadIcon from '@mui/icons-material/SignalWifiBad';

import { SignForm } from '../sign-form/sign-form';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './content-wrapper.module.scss';

/* eslint-disable-next-line */
type ContentWrapperProps = {
  children?: ReactNode;
};

export function ContentWrapper({ children }: ContentWrapperProps) {
  const isLoggedIn = false;

  return (
    <Container component={'main'} sx={{ textAlign: 'center' }}>
      {!isLoggedIn && <SignForm />}
      {isLoggedIn && children}
    </Container>
  );
}

ContentWrapper.defaultProps = {
  children: <SignalWifiBadIcon color="disabled" fontSize="large" />,
};

export default ContentWrapper;
