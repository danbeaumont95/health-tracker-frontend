/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { makeStyles, styled } from '@material-ui/core/styles';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import { Fastfood, Star } from '@material-ui/icons';
import Charts from './Charts';
import UserService from '../Services/user';
import PostMealForm from './PostMealForm';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '90px',
  lineHeight: '60px',
  display: 'flex',
  flexDirection: 'row',
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
}));

const useStyles = makeStyles((theme) => ({
  allContent: {
    backgroundColor: '#F9FAFC',
    // pointerEvents: 'none',
  },
  allContentPopUp: {
    filter: 'blur(10px)',
    zIndex: -1,
    pointerEvents: 'none',
  },
  box: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  cardContentItems: {
  },
  icon: {
    display: 'flex',
    flex: 1,
    width: '60px',
    height: '50px'
  },
  statTitle: {
    marginTop: theme.spacing(2),
    color: 'black'
  },
  statText: {
    marginTop: theme.spacing(1),
    color: 'black'
  },
  popUpForm: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    zIndex: 2,
  }
}));
const Dashboard = () => {
  const classes = useStyles();
  const [painLevelForWeek, setPainLevelForWeek] = useState(0);
  const [painLevelForMonth, setPainLevelForMonth] = useState(0);
  const [mealsLoggedThisWeek, setMealsLoggedThisWeek] = useState(0);
  const [mostCommonPainFood, setMostCommonPainFood] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    UserService.getUserPainLevelForTimePeriod(localStorage.getItem('userToken'), 'week')
      .then((res) => {
        const { data: { data: { painData } } } = res;
        setPainLevelForWeek(Math.round((painData.reduce((a, b) => a + b, 0) / painData.length) * 100) / 100);
      });
  }, []);
  useEffect(() => {
    UserService.getUserPainLevelForTimePeriod(localStorage.getItem('userToken'), 'month')
      .then((res) => {
        const { data: { data: { painData } } } = res;
        setPainLevelForMonth(Math.round((painData.reduce((a, b) => a + b, 0) / painData.length) * 100) / 100);
      });
  }, []);
  useEffect(() => {
    UserService.getAmountOfMealsByTimePeriod(localStorage.getItem('userToken'), 'week')
      .then((res) => {
        const { data: { data } }  = res;
        setMealsLoggedThisWeek(data);
      });
  }, []);

  useEffect(() => {
    UserService.getMostCommonPainLevelFood(localStorage.getItem('userToken'))
      .then((res) => {
        const { data: { data: { mostCommonFoodWithHighPainLevel } } } = res;

        setMostCommonPainFood(mostCommonFoodWithHighPainLevel);
      });
  });

  const handlePopUpClick = () => {
    setShowPopUp(prevCheck => !prevCheck);
  };

  return (
    <>
      <NavBar />
      <Button onClick={handlePopUpClick}>Log a meal</Button>
      <div className={classes.popUpForm}>

        {showPopUp ? <PostMealForm /> : <></>}
      </div>
      <div className={!showPopUp ? classes.allContent : classes.allContentPopUp}>
        <div>
          <Box className={classes.box}>
            <Item elevation={3} id="mealsLoggedthisWeekCard">
              <div className={classes.cardContentItems}>

                <Typography className={classes.statTitle}>

                Meals logged this week
                </Typography>
                <Typography className={classes.statText} variant='h4' style={{ fontWeight: 'bolder' }} id="amountOfMealsLoogedThisWeek">
                  {mealsLoggedThisWeek}
                </Typography>
              </div>
              <Fastfood style={{ color: '#a88beb' }} className={classes.icon}/>
            </Item>
            <Item elevation={3} id="averagePainLevelthisWeekCard">
              <div className={classes.cardContentItems}>
                <Typography className={classes.statTitle}>

                Average pain level this week
                </Typography>
                <Typography className={classes.statText} variant='h4' style={{ fontWeight: 'bolder' }} id="averagePainLevelthisWeek">
                  {painLevelForWeek}
                </Typography>
              </div>
              <Star style={{ color: '#a88beb' }}  className={classes.icon}/>
            </Item>
            <Item elevation={3} id="averagePainLevelthisMonthCard">
              <div className={classes.cardContentItems}>
                <Typography className={classes.statTitle}>
                  Average pain level this month
                </Typography>
                <Typography className={classes.statText} variant='h4' style={{ fontWeight: 'bolder' }}  id="averagePainLevelthisMonth">
                  {painLevelForMonth}
                </Typography>
              </div>
              <Star style={{ color: '#a88beb' }} className={classes.icon}/>
            </Item>
            <Item elevation={3} id="foodThatCausedTheMostPainCard">
              <div className={classes.cardContentItems}>
                <Typography className={classes.statTitle}>
              Food that caused the most pain
                </Typography>
               
                <Typography className={classes.statText} variant='h4' style={{ fontWeight: 'bolder' }} id="foodThatCausedTheMostPain">
                  {mostCommonPainFood}
                </Typography>
              </div>
              <Fastfood style={{ color: '#a88beb' }} className={classes.icon}/>
            </Item>
          </Box>
        </div>
        <Charts/>
 
      </div>
    </>
  );
};

export default Dashboard;
