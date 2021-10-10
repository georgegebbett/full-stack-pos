import {
  AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Drawer, Avatar
} from '@mui/material';
import React, { useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useAuth } from '../../controllers/use-auth';
import { useHistory } from 'react-router-dom';
import ListRouter from './list-router';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Logout } from '@mui/icons-material';


export default function MyAppBar() {

  const history = useHistory();
  const auth = useAuth();
  const logout = () => {
    auth.signout(() => {
      handleClose();
      console.log('Logout');
    });
  };
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <AppBar position="static" className="menuBar">
      <Toolbar>
        {auth.user ?
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
        : null }
        <Drawer
          anchor="left"
          open={state.left}
          onClose={toggleDrawer('left', false)}
        >
          <ListRouter />
        </Drawer>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {document.title}
        </Typography>
        {auth.user && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32 }}>{auth.user.name.substr(0,1)}</Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disableRipple><b>{auth.user.name}</b></MenuItem>
              <Divider />
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Log Out
              </MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
