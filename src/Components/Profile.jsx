/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import UserService from '../Services/user';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Button } from '@material-ui/core';
import defaultProfilePhoto from '../Images/defaultProfilePhoto.jpeg';
import  HomeIcon  from '@material-ui/icons/HomeOutlined';
import { Lock } from '@material-ui/icons';
import ProfileForm from './ProfileForm';
import { connect } from 'react-redux';
import * as Types from '../store/types';
import NavBar from './NavBar';

const useStyles = makeStyles((theme) => ({
  allContent: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    ['@media (max-width:800px)']: {
      height: '100%',
      display: 'block',
    },
  },
  title: {
    marginTop: theme.spacing(2)
  },
  container: {
    display: 'flex',
    marginTop: theme.spacing(4),
    width: '70%',
    height: '351px',
    padding: 0,
    borderRadius: '20px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    ['@media (max-width:800px)']: {
      width: '90%',
      height: '100%',
      display: 'block',
      marginRight: 'auto',
      marginLeft: 'auto'
    },
    ['@media (min-width:800px) and (max-width:1000px)']: {
      display: 'flex',
      marginTop: theme.spacing(4),
      width: '90%',
      height: '350px',
      padding: 0,
      borderRadius: '20px',
    },
  },
  drawContent: {
    width: '20%',
    ['@media (max-width:800px)']: {
      width: '100%',
    },
  },
  box: {
    borderRadius: '20px 20px 0px 00px',
    textAlign: 'left',
    width: '100%',
    backgroundColor: 'red',
    height: '8%',
    display: 'flex',
    flexDirection: 'row',
    ['@media (max-width:800px)']: {
      display: 'block'
    },
  },

  drawer: {
    flex: 1,
    position: 'relative',
    ['@media (max-width:800px)']: {
      width: '90%',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    ['@media (min-width:800px) and (max-width:900px)']: {
      width: '100%',
    }
  },
  list: {
    ['@media (max-width:800px)']: {
    },
  },
  drawerPaper: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: '8px 0px 0px 14px', 
    ['@media (max-width:800px)']: {
      display: 'flex',
    }, 
  },
  avatar: {
    border: '2px solid white',
    width: '100px',
    height: '100px',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    alignSelf: 'center'
  },
  userName: {
    marginBottom: theme.spacing(2)
  },
  form: {
    width: '100%',
    ['@media (max-width:800px)']: {
      flex: 1,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  accountClickedAccountItem: {
    background: 'linear-gradient(#a88beb, #f8ceec)',
    cursor: 'pointer',
  },
  passwordClickedAccountItem: {
    cursor: 'pointer',
    '&:hover': {
      background: '#dcd0ff',
    },

  },
  passwordClickedPasswordItem: {
    background: 'linear-gradient(#a88beb, #f8ceec)',
    cursor: 'pointer',

  },
  accountClickedPasswordItem: {
    cursor: 'pointer',
    '&:hover': {
      background: '#dcd0ff',
    }
  },
  updateProfilePicButton: {
    background: 'linear-gradient(#a88beb, #f8ceec)',
    fontSize: 12
  }
}));

const Profile = (props) => {
  const { detailsClicked } = props;
  const [user, setUser] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const classes = useStyles();
  const uploadInputRef = useRef(null);
  useEffect(() => {
    UserService.getMe(localStorage.getItem('userToken'))
      .then((res) => {
        const { data, success } = res.data;
        if (success === false) {
          return Swal.fire({
            title: 'Error',
            text: '[BadRequest] Error finding profile, please try again later'
          });
        }
        setUser(data);
        localStorage.setItem('userId', data._id);
      })
      .catch(() => {
        return Swal.fire({
          title: 'Error',
          text: '[BadRequest] Error finding profile, please try again later'
        });
      });
  }, [profilePhoto]);
  

  const handleAccountClicked = () => {
    props.updateDetailsClicked('account');
  };

  const handlePasswordClicked = () => {
    props.updateDetailsClicked('password');
  };

  const uploadProfilePicture = (e) => {
    const currentFile = e.target.files[0];

    UserService.updateProfilePicture(localStorage.getItem('userToken'), currentFile)
      .then((res) => {
        const { data: { success, data } } = res;
        if (!success) {
          return Swal.fire({
            title: 'Error',
            text: 'Error updating profile picture'
          });
        }
        return Swal.fire({
          title: 'Success',
          text: 'New profile photo added!'
        })
          .then(() => {
            setProfilePhoto(data.profilePicture);
          });
      });
  };

  return (
    <>
      <NavBar />
     
      <div className={classes.allContent}>
        <Typography variant='h3' className={classes.title} id="title">Account Settings</Typography>
        <Box className={classes.container}>
          <div className={classes.drawContent}>
        
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper
              }}
              anchor="left">

              {user.profilePicture ? (
                <>
   
                  <>
                    <input
                      ref={uploadInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={uploadProfilePicture}
                    />
                    <Button
                      onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
                      variant="contained"
                      className={classes.updateProfilePicButton}
                    >
                      Update profile picture
                    </Button>
                  </>

                  <Avatar className={classes.avatar} alt="profile pic" src={user.profilePicture}/>
                </>
              ) : <Avatar className={classes.avatar} alt="profile pic" src={defaultProfilePhoto} />}
              <Typography className={classes.userName} variant="h6">{user.firstName} {user.lastName}</Typography>
              <Divider />
              <List className={classes.list}>
                <ListItem disablePadding onClick={handleAccountClicked} className={detailsClicked === 'account' ? classes.accountClickedAccountItem : classes.passwordClickedAccountItem}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </ListItem>
                <ListItem disablePadding onClick={handlePasswordClicked} className={detailsClicked === 'password' ? classes.passwordClickedPasswordItem : classes.accountClickedPasswordItem} id="passwordButton">
                  <ListItemIcon>
                    <Lock />
                  </ListItemIcon>
                  <ListItemText primary="Password"/>
                </ListItem>
              </List>
            </Drawer>
          </div>
          <div className={classes.form}>
            <ProfileForm user={user}/>
          </div>
        </Box>

      </div>
    </>
  );
};



const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  updateDetailsClicked: detailsClicked => dispatch({
    type: Types.UPDATE_DETAILS_CLICKED, payload: {
      detailsClicked
    }
  }),
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(Profile);
