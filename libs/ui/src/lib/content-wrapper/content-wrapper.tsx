import React, { ReactNode, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import { Container } from '@mui/material';
import SignalWifiBadIcon from '@mui/icons-material/SignalWifiBad';

import { User } from '@fullstack/interfaces';
import { Role } from '@fullstack/types';
import { SignForm } from '../sign-form/sign-form';
import { ThemeSwitchButton } from '../theme-switch-button/theme-switch-button';

/* eslint-disable-next-line */
type ContentWrapperProps = {
  authState: User;
  children?: ReactNode;
};

export function ContentWrapper({ authState, children }: ContentWrapperProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if ((authState.roles as Role[])?.length > 0) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authState]);

  return (
    <Container component={'main'} sx={{ justifyContent: 'center' }}>
      <ThemeSwitchButton />
      {!isLoggedIn && <SignForm />}
      {isLoggedIn && children}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </Container>
  );
}

ContentWrapper.defaultProps = {
  children: <SignalWifiBadIcon color="disabled" fontSize="large" />,
};

const mapStateToProps = (state: User) => ({
  authState: state,
});

export const ConnectedContentWrapper = connect(mapStateToProps)(ContentWrapper);
