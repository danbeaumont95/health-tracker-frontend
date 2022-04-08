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
  registerButton: {
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

const Register = () => {
  const classes = useStyles();
  const [user, setUser] = useState({ email: '', password: '', firstName: '', lastName: '' });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registeredUser = await UserService.register(user);
    const { success, message } = registeredUser.data;
    if (success === false) {
      return Swal.fire({
        title: 'Error',
        text: message
      });
    }
    setSuccessful(true);
    return Swal.fire({
      title: 'Success',
      text: 'Account created! You may now log in!'
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
            'id': 'email'
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
            'id': 'password'
          }}
          type="password"
          variant="outlined"
        />

        <TextField
          {...register('firstName')}
          onChange={handleChangeUser}
          placeholder="First name"
          className={classes.inputField}
          inputProps={{
            style: { textAlign: 'center' },
            className: classes.color,
            'id': 'firstName'
          }}
          variant="outlined"
        />

        <TextField
          {...register('lastName')}
          onChange={handleChangeUser}
          placeholder="Last name"
          className={classes.inputField}
          inputProps={{
            style: { textAlign: 'center' },
            className: classes.color,
            'id': 'lastName'
          }}
          variant="outlined"
        />

        <Button
          type="submit"
          onClick={() => {
            setUser(user);
          }}
          className={classes.registerButton}
          id='registerButton'
        >
  Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
