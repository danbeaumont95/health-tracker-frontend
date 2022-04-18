import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { makeStyles, styled } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core';
import { Fastfood, Star } from '@material-ui/icons';
import Charts from './Charts';
import UserService from '../Services/user';

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
    marginTop: theme.spacing(2)
  },
  statText: {
    marginTop: theme.spacing(1)
  }
}));
const Dashboard = () => {
  const classes = useStyles();
  const [painLevelForWeek, setPainLevelForWeek] = useState(0);
  const [painLevelForMonth, setPainLevelForMonth] = useState(0);
  const [mealsLoggedThisWeek, setMealsLoggedThisWeek] = useState(0);
  const [mostCommonPainFood, setMostCommonPainFood] = useState('');

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

  return (
    <>
      <NavBar />
      <div className={classes.allContent}>
        <div>
          <Box className={classes.box}>
            <Item elevation={3}>
              <div className={classes.cardContentItems}>

                <Typography className={classes.statTitle}>

                Meals logged this week
                </Typography>
                <Typography className={classes.statText} variant='h4' style={{ fontWeight: 'bolder' }}>
                  {mealsLoggedThisWeek}
                </Typography>
              </div>
              <Fastfood style={{ color: '#a88beb' }} className={classes.icon}/>
            </Item>
            <Item elevation={3}>
              <div className={classes.cardContentItems}>
                <Typography className={classes.statTitle}>

                Average pain level this week
                </Typography>
                <Typography className={classes.statText} variant='h4' style={{ fontWeight: 'bolder' }}>
                  {painLevelForWeek}
                </Typography>
              </div>
              <Star style={{ color: '#a88beb' }}  className={classes.icon}/>
            </Item>
            <Item elevation={3}>
              <div className={classes.cardContentItems}>
                <Typography className={classes.statTitle}>
                  Average pain level this month
                </Typography>
                <Typography className={classes.statText} variant='h4' style={{ fontWeight: 'bolder' }}>
                  {painLevelForMonth}
                </Typography>
              </div>
              <Star style={{ color: '#a88beb' }} className={classes.icon}/>
            </Item>
            <Item elevation={3}>
              <div className={classes.cardContentItems}>
                <Typography className={classes.statTitle}>
              Food that caused the most pain
                </Typography>
               
                <Typography className={classes.statText} variant='h4' style={{ fontWeight: 'bolder' }}>
                  {mostCommonPainFood}
                </Typography>
              </div>
              <Star style={{ color: '#a88beb' }} className={classes.icon}/>
            </Item>
          </Box>
        </div>
        <Charts/>
 
      </div>
    </>
  );
};

export default Dashboard;
