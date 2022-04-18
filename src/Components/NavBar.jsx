/* eslint-disable no-unused-vars */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Typography, Toolbar, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'black'
  },
  appBar: {
    background: 'linear-gradient(#a88beb, #f8ceec)',
    borderBottom: '2px solid silver'
  },
  grid: {
    flexGrow: 1,
    textAlign: 'left',
    marginLeft: 0,
    paddingLeft: 0,
    flexDirection: 'row'
  },
  title: {
    width: '10%',
    '&:hover': {
      cursor: 'pointer',
      background: 'rgba(168,139,235, 0.25)'
    }
  },
  profileButton: {
    color: '#fff',
  },
  logoutButton: {
    background: '#e91e63',
    color: '#fff',
    borderRadius: '25px',
    padding: '0px 25px',
    '&:hover': {
      background: 'black',
      boxShadow: '0px 2px 10px #888888'
    }
  }
}));

const NavBar = () => {
  const classes = useStyles();

  const handleLogoutClick = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    window.location.href = '/';
  };

  const handleLinkClick = (route) => {
    window.location.href=`${route}`;
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar} id="appBar">
        <Toolbar>
          <Grid className={classes.grid}>
            <Typography variant='h5' id="title" onClick={() => handleLinkClick('/dashboard')} className={classes.title}>Health App</Typography>
          </Grid>
          <Button className={classes.profileButton} id="profileButton" onClick={() => handleLinkClick('profile')}>
            Profile
          </Button>
          <Button className={classes.logoutButton} id="logoutButton" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
