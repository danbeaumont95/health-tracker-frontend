import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import UserService from '../Services/user';

const useStyles = makeStyles((theme) => ({
  allContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingBottom: '15px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    marginTop: theme.spacing(2),
    width: '300px'
  },
  loginButton: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    backgroundColor: '#E0E0E0',
    width: '300px',
    color: 'black',
    '&:hover': {
      background: 'linear-gradient(#a88beb, #f8ceec)',
      color: 'white'
    }
  }
}));

const Login = () => {
  const classes = useStyles();
  const [user, setUser] = useState({ email: '', password: '' });
  // eslint-disable-next-line no-unused-vars
  const [successful, setSuccessful] = useState(false);
  const {
    register,
  } = useForm();

  const handleChangeUser = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);

    UserService.login(user)
      .then((res) => {
        const { success, message } = res.data;

        if (success === false) {
          return Swal.fire({
            title: 'Error',
            text: `${message}`,
          });
        }
        const {
          data: {
            data: {
              accessToken,
            },
          },
        } = res;
        setSuccessful(true);
        localStorage.setItem('userToken', accessToken);
        return Swal.fire({
          title: 'Logged in!',
          text: 'You will now be redirected to the homepage',
        }).then(() => {
          window.location.href = '/dashboard';
        });
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className={classes.allContent}>
      <form onSubmit={handleSubmit} className={classes.form}>

        <TextField
          {...register('email')}
          onChange={handleChangeUser}
          placeholder="Email"
          className={classes.inputField}
          inputProps={{
            style: { textAlign: 'center' },
            className: classes.color,
          }}
          variant="outlined"
        />

        <TextField
          {...register('password')}
          onChange={handleChangeUser}
          placeholder="Password"
          className={classes.inputField}
          inputProps={{
            style: { textAlign: 'center' },
            className: classes.color,
          }}
          type="password"
          variant="outlined"
        />

        <Button
          type="submit"
          onClick={() => {
            setUser(user);
          }}
          className={classes.loginButton}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
