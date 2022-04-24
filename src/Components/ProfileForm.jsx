/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserService from '../Services/user';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import * as Types from '../store/types';
import ClipLoader from 'react-spinners/ClipLoader';

const useStyles = makeStyles((theme) => ({
  allContent: {
    width: '100%',
  },
  box: {
    width: '100%',
    ['@media (max-width:800px)']: {
    },
   
  },
  nameBoxes: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: theme.spacing(5),
    ['@media (max-width:800px)']: {
      display: 'block',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
    },
  },
  firstNameDiv: { 
    marginRight: theme.spacing(2),
    ['@media (max-width:800px)']: {

      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: theme.spacing(3),
    },
  },
  secondNameDiv: { 
    marginLeft: theme.spacing(2),
    ['@media (max-width:800px)']: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: theme.spacing(3)
    },
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
    },
    ['@media (max-width:800px)']: {
      marginBottom: theme.spacing(2),
      width: '40%'
    },
  }
}));
const ProfileForm = ({ user, detailsClicked })  => {
  const [newUserDetails, setNewUserDetails] = useState({});
  const [newUserPassword, setNewUserPassword] = useState({});
  const classes = useStyles();
  const [successful, setSuccessful] = useState(false);
  const [updateDetailsLoading, setUpdateDetailsLoading] = useState(false);


  const {
    register,
  } = useForm();

  const handleChangeUser = (event) => {
    setNewUserDetails({
      ...newUserDetails,
      [event.target.name]: event.target.value
    });
  };

  const handleChangePassword = (event) => {
    setNewUserPassword({
      ...newUserPassword,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = (e) => {
    setUpdateDetailsLoading(true);
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
          setUpdateDetailsLoading(false);
          return Swal.fire({
            title: 'Error',
            text: '[BadRequest] Error updating details, please try again later',
          });
        }
        setSuccessful(true);
        setUpdateDetailsLoading(false);
        return Swal.fire({
          title: 'Successful',
          text: 'Details successfully updated!',
        });
      })
      .catch(() => {
        return Swal.fire({
          title: 'Error',
          text: '[BadRequest] Error updating details, please try again later',
        });
      });
  };

  const onPasswordChangeSubmit = (e) => {
    setUpdateDetailsLoading(true);
    e.preventDefault();
    setSuccessful(false);

    UserService.updateUserPassword(localStorage.getItem('userToken'), newUserPassword)
      .then((res) => {
        const { success, message } = res.data;
        if (success === false) {
          setUpdateDetailsLoading(false);
          return Swal.fire({
            title: 'Error',
            text: `${message}`
          });
        }
        setSuccessful(true);
        setUpdateDetailsLoading(false);
        return Swal.fire({
          title: 'Successful',
          text: 'Password successfully updated!'
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
        detailsClicked === 'account' ? (
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
            {updateDetailsLoading ? (
              <ClipLoader color="blue" size={20}/>
  
            ) : null}
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
        ) : 

          <Box
            className={classes.box}
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' }
            }}
            onSubmit={onPasswordChangeSubmit}
          >
            {updateDetailsLoading ? (
              <ClipLoader color="blue" size={20}/>
  
            ) : null}
            <div className={classes.nameBoxes}>
              <div className={classes.firstNameDiv}>

                <Typography>Old Password</Typography>
                <TextField
                  variant="outlined"
                  InputProps={{
                    classes: { input: classes.textInput }
                  }}
                  className={classes.textField}
                  type="password"
                  id="originalPassword"
                  {...register('originalPassword')}
                  onChange={handleChangePassword}
                />
              </div>
              <div className={classes.secondNameDiv}>
                <Typography>New Password</Typography>
                <TextField
                  variant="outlined"
                  InputProps={{
                    classes: { input: classes.textInput }
                  }}
                  className={classes.textField}
                  type="password"
                  id="newPassword"
                  {...register('newPassword')}
                  onChange={handleChangePassword}
                />
              </div>
            </div>

            <Button className={classes.updateDetailsButton} type="submit" id='submitPasswordButton'>Update</Button>
          </Box>
       
      )}
      
    </div>
  );
};



const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  updateAccessToken: accessToken => dispatch({
    type: Types.UPDATE_DETAILS_CLICKED, payload: {
      accessToken
    }
  }),
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(ProfileForm);
