/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserService from '../Services/user';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  allContent: {
    width: '100%',
  },
  box: {
    width: '100%'
  },
  nameBoxes: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: theme.spacing(2)
  },
  firstNameDiv: { 
    marginRight: theme.spacing(2) 
  },
  secondNameDiv: { 
    marginLeft: theme.spacing(2) 
  },
  textField: {
  },
  updateDetailsButton: {
    backgroundColor: 'blue',
    color: 'white',
    marginTop: theme.spacing(4),
    width: '20%',
    '&:hover': {
      background: 'linear-gradient(#a88beb, #f8ceec)',
      color: 'black'
    }
  }
}));
const ProfileForm = ({ user })  => {
  const [newUserDetails, setNewUserDetails] = useState({});
  const classes = useStyles();
  const [successful, setSuccessful] = useState(false);

  const {
    register,
  } = useForm();

  const handleChangeUser = (event) => {
    setNewUserDetails({
      ...newUserDetails,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);

    const originalUserDetails = {};

    ({
      firstName: originalUserDetails.firstName,
      lastName: originalUserDetails.lastName,
      email: originalUserDetails.email,
      phoneNumber: originalUserDetails.phoneNumber,
    } = user);


    const updatedUser = { ...originalUserDetails, ...newUserDetails };
    UserService.updateUserDetails(localStorage.getItem('userToken'), updatedUser)
      .then((res) => {
        const { success } = res.data;
        if (success === false) {
          return Swal.fire({
            title: 'Error',
            text: '[BadRequest] Error updating details, please try again later'
          });
        }
        setSuccessful(true);
        return Swal.fire({
          title: 'Successful',
          text: 'Details successfully updated!'
        });
      })
      .catch(() => {
        return Swal.fire({
          title: 'Error',
          text: '[BadRequest] Error updating details, please try again later'
        });
      });
  };

  return (
    <div className={classes.allContent}>
      {!user.firstName ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box
          className={classes.box}
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' }
          }}
          onSubmit={onSubmit}
        >
          <div className={classes.nameBoxes}>
            <div className={classes.firstNameDiv}>

              <Typography>First name</Typography>
              <TextField
                variant="outlined"
                InputProps={{
                  classes: { input: classes.textInput }
                }}
                className={classes.textField}
                defaultValue={user.firstName}
                id="firstName"
                {...register('firstName')}
                onChange={handleChangeUser}
              />
            </div>
            <div className={classes.secondNameDiv}>
              <Typography>Last name</Typography>
              <TextField
                variant="outlined"
                InputProps={{
                  classes: { input: classes.textInput }
                }}
                className={classes.textField}
                defaultValue={user.lastName}
                id="lastName"
                {...register('lastName')}
                onChange={handleChangeUser}
              />
            </div>
          </div>

          <div className={classes.nameBoxes}>
            <div className={classes.firstNameDiv}>

              <Typography>Email</Typography>
              <TextField
                variant="outlined"
                InputProps={{
                  classes: { input: classes.textInput }
                }}
                className={classes.textField}
                defaultValue={user.email}
                id="email"
                {...register('email')}
                onChange={handleChangeUser}
              />
            </div>
            <div className={classes.secondNameDiv}>
              <Typography>Phone Number</Typography>
              <TextField
                variant="outlined"
                InputProps={{
                  classes: { input: classes.textInput }
                }}
                className={classes.textField}
                defaultValue={user.phoneNumber}
                id="phoneNumber"
                {...register('phoneNumber')}
                onChange={handleChangeUser}
              />
            </div>
          </div>
          <Button className={classes.updateDetailsButton} type="submit" id='submitUserDetailsButton'>Update</Button>
        </Box>
      )}
      
    </div>
  );
};

export default ProfileForm;
