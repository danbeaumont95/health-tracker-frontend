/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MealService from '../Services/meal';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  allContent: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: theme.spacing(4),
    position: 'fixed',
    zIndex: 2,
    backgroundColor: '#F9FAFC',
  },
  formBox: {
    width: '500px',
  },
  submitMealButton: {
    background: 'linear-gradient(#a88beb, #f8ceec)',
    marginLeft: theme.spacing(1),
    color: 'white',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    width: '30%',
    '&:hover': {
      background: 'blue',
      color: 'white'
    }
  }
}));
const PostMealForm = () => {
  const classes = useStyles();
  const [newMeal, setNewMeal] = useState({});

  const {
    register,
  } = useForm();

  const handleChangeMeal = (event) => {
    setNewMeal({
      ...newMeal,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = (e) => {
    const { meal, mealType, painLevel } = newMeal;
    const mealObj = {
      meal,
      mealType,
      painLevel: +painLevel
    };

    e.preventDefault();

    MealService.postMeal(localStorage.getItem('userToken'), mealObj)
      .then((res) => {
        const { data: { success } } = res;
        if (success !== true) {
          return Swal.fire({
            title: 'Error',
            text: 'Please try again'
          });
        }
        return Swal.fire({
          title: 'Success',
          text: 'Meal logged'
        });
      })
      .then(() => {
        window.location.href = '/dashboard';
      });
  };
  return (
    <div className={classes.allContent}>
      <Box
        className={classes.formBox}
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
        onSubmit={onSubmit}>
        <div className={classes.nameBoxes}>
          <div className={classes.firstNameDiv}>

            <Typography>Meal Type</Typography>
            <TextField
              variant="outlined"
              InputProps={{
                classes: { input: classes.textInput }
              }}
              className={classes.textField}
              id="mealType"
              {...register('mealType')}
              onChange={handleChangeMeal}
            />
          </div>
          <div className={classes.secondNameDiv}>
            <Typography>Meal</Typography>
            <TextField
              variant="outlined"
              InputProps={{
                classes: { input: classes.textInput }
              }}
              className={classes.textField}
              id="meal"
              {...register('meal')}
              onChange={handleChangeMeal}
            />
          </div>
          <div className={classes.secondNameDiv}>
            <Typography>Pain Level</Typography>
            <TextField
              variant="outlined"
              InputProps={{
                classes: { input: classes.textInput }
              }}
              className={classes.textField}
              id="painLevel"
              {...register('painLevel')}
              onChange={handleChangeMeal}
            />
          </div>
        </div>
        <Button className={classes.submitMealButton} type="submit" id='submitUserDetailsButton'>Submit</Button>
      </Box>
    </div>
  );
};

export default PostMealForm;
