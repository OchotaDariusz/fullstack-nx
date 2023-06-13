import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import SignalWifiBadIcon from '@mui/icons-material/SignalWifiBad';

import { User } from '@fullstack/interfaces';
import { SignForm } from '../sign-form/sign-form';
import { ThemeSwitchButton } from '../theme-switch-button/theme-switch-button';

/* eslint-disable-next-line */
type ContentWrapperProps = {
  children?: ReactNode;
  isLoggedIn: boolean;
};

export function ContentWrapper({ children, isLoggedIn }: ContentWrapperProps) {
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
