import { KeyboardEvent, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
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

import { useGetLoginState } from '@fullstack/hooks';
import { logout } from '@fullstack/reducers';
import styles from './navigation-drawer.module.scss';

export function NavigationDrawer() {
  const authDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useGetLoginState();

  const toggleDrawer =
    (isVisible: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setIsOpen(isVisible);
    };

  const handleLogout = () => {
    authDispatch(logout());
    toast.info('Logged out.');
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
          <ListItemButton onClick={handleLogout}>
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
