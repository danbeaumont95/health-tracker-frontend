import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Register from './Register';
import Login from './Login';
import {  Button, Container, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  allContent: {
    background: 'linear-gradient(#a88beb, #f8ceec)',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  loginBox: {
    borderRadius: 4,
    background: 'white',
    width: '100%',
    height: '100%'
  },
  registerBox: {
    borderRadius: 4,
    background: 'white',
    width: '100%',
    height: '100%'
  },
  title: {
    paddingBottom: '15px',
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2)
  },
  button: {
    background: 'linear-gradient(#a88beb, #f8ceec)',
    marginRight: theme.spacing(2),
    width: '30%'
  },
  loginButtonOnRegister: {
    backgroundColor: '#E0E0E0',
    marginRight: theme.spacing(2),
    width: '30%'
  },
  loginButtonOnLogin: {
    background: 'linear-gradient(#a88beb, #f8ceec)',
    marginRight: theme.spacing(2),
    width: '30%'
  },
  registerButtonOnRegister: {
    background: 'linear-gradient(#a88beb, #f8ceec)',
    marginRight: theme.spacing(2),
    width: '30%'
  },
  registerButtonOnLogin: {
    backgroundColor: '#E0E0E0',
    marginRight: theme.spacing(2),
    width: '30%'
  },
  registerShow: {

  },
  registerNotShow: {
    display: 'none'
  },
  loginShow: {

  },
  loginNotShow: {
    display: 'none'
  }
}));

const Homepage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [title, setTitle] = useState('Login');

  const classes = useStyles();

  const handleLoginClick = () => {
    setShowRegister(false);
    setShowLogin(true);
    setTitle('Login');
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
    setTitle('Register');
  };

  return (
    <div className={classes.allContent}>
      <div className={classes.bothBoxes}>

        <Container className={showLogin ? classes.loginBox : classes.registerBox}>
          <Typography variant="h3" className={classes.title}>{title}</Typography>

          <Button onClick={handleLoginClick} className={showLogin ? classes.loginButtonOnLogin : classes.loginButtonOnRegister}>Login</Button>
          <Button onClick={handleRegisterClick} className={showRegister ? classes.registerButtonOnRegister : classes.registerButtonOnLogin} id='register'>Register</Button>

          <div className={ showRegister ?  classes.registerShow : classes.registerNotShow}>
            <Register />
          </div>

          <div className={showLogin ? classes.loginShow : classes.loginNotShow}>
            <Login />
          </div>
        </Container>
      </div>

    </div>
  );
};

export default Homepage;
