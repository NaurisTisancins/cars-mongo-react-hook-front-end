import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

import Title from './Title';

const styles = {
  drawerContainer: {
    height: '95px',
  },
  drawer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: '95px',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2rem',
  },
  menuBtn: {
    
  },
  menuIcon: {
    fontSize: '3rem',
    color: 'darkgray',
    marginRight: '3rem',
    "&:hover": {
      backgroundColor: 'whitesmoke',
    }
  },
}

export default function NavBar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={styles.drawerContainer}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={styles.drawer}>
        <ListItem button >
          <NavLink to="/add">
            <ListItemIcon>
              <h3>Add Car</h3>
            </ListItemIcon>
          </NavLink>
          <ListItemText />
        </ListItem>
        <ListItem button >
          <NavLink to="/">
            <ListItemIcon>
              <h3>Car List</h3>
            </ListItemIcon>
          </NavLink>
          <ListItemText />
        </ListItem>
      </List>


    </Box>
  );

  return (
    <Box sx={styles.header}>
      <Title />
      {['top'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button sx={styles.menuBtn} onClick={toggleDrawer(anchor, true)}><MenuIcon sx={styles.menuIcon} /></Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
}