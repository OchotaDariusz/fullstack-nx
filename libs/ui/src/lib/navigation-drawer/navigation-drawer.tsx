import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { Role } from '@fullstack/types';
import { User } from '@fullstack/interfaces';
import styles from './navigation-drawer.module.scss';
import {
  AUTH_STATE_LOCAL_STORAGE_KEY,
  JWT_LOCAL_STORAGE_KEY,
} from '@fullstack/constants';

/* eslint-disable-next-line */
export interface NavigationDrawerProps {
  authState: User;
}

export function NavigationDrawer({ authState }: NavigationDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if ((authState.roles as Role[])?.length > 0) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authState]);

  const toggleDrawer =
    (isVisible: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsOpen(isVisible);
    };

  const navMenu = () => (
    <Box
      sx={{
        width: 'clamp(15vw, 250px, 25vw)',
        '@media (max-width: 600px)': {
          width: 150,
        },
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem key={'logout'} disablePadding>
          <ListItemButton
            onClick={() => {
              localStorage.setItem(AUTH_STATE_LOCAL_STORAGE_KEY, '');
              localStorage.setItem(JWT_LOCAL_STORAGE_KEY, '');
              window.location.reload();
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={'logout'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Button className={styles['drawer-button']} onClick={toggleDrawer(true)}>
        <KeyboardArrowRightIcon />
      </Button>
      <Drawer anchor={'left'} open={isOpen} onClose={toggleDrawer(false)}>
        {!isLoggedIn && (
          <Link to="/login">
            <Button onClick={toggleDrawer(false)}>
              Sign in to see content
            </Button>
          </Link>
        )}
        {isLoggedIn && navMenu()}
      </Drawer>
    </>
  );
}

const mapStateToProps = (state: User) => ({
  authState: state,
});

export const ConnectedNavigationDrawer =
  connect(mapStateToProps)(NavigationDrawer);
