import React, { useState } from 'react';
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

import styles from './navigation-drawer.module.scss';

/* eslint-disable-next-line */
export interface NavigationDrawerProps {}

export function NavigationDrawer(props: NavigationDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

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
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
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
    </Box>
  );

  return (
    <>
      <Button className={styles['drawer-button']} onClick={toggleDrawer(true)}>
        <KeyboardArrowRightIcon />
      </Button>
      <Drawer anchor={'left'} open={isOpen} onClose={toggleDrawer(false)}>
        {navMenu()}
      </Drawer>
    </>
  );
}

export default NavigationDrawer;
