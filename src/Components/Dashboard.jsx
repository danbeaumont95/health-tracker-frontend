import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import UserService from '../Services/user';
import { Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  weeklyButton: {
    background: 'linear-gradient(#a88beb, #f8ceec)',
    marginRight: theme.spacing(1),
    color: 'white',
    marginTop: theme.spacing(4),
    width: '10%',
    '&:hover': {
      background: 'blue',
      color: 'white'
    }
  },
  monthlyButton: {
    background: 'linear-gradient(#a88beb, #f8ceec)',
    marginLeft: theme.spacing(1),
    color: 'white',
    marginTop: theme.spacing(4),
    width: '10%',
    '&:hover': {
      background: 'blue',
      color: 'white'
    }
  },
  graphTitle: {
    marginTop: theme.spacing(2)
  }
}));
const Dashboard = () => {
  const [timePeriod, setTimePeriod] = useState('week');
  const [painLevelForTimePeriodLabels, setPainLevelForTimePeriodLabels] = useState([]);
  const [painLevelForMealsLabels, setPainLevelForMealsLabels] = useState([]);
  const [painLevelForMealsData, setPainLevelForMealsData] = useState([]);
  const [painLevelForTimePeriodData, setPainLevelForTimePeriodData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    UserService.getUserPainLevelForTimePeriod(localStorage.getItem('userToken'), timePeriod)
      .then((res) => {
        const { data: { data: { labels, painData } } } = res;
        setPainLevelForTimePeriodLabels(labels);
        setPainLevelForTimePeriodData(painData);
      });
  }, [timePeriod]);

  useEffect(() => {
    UserService.getUserPainLevelByMealType(localStorage.getItem('userToken'))
      .then((res) => {
        console.log(res, 'RES');
        const { data: { data: { labels, painData } } } = res;
        console.log(labels, painData, 'labels, painData');
        setPainLevelForMealsLabels(labels);
        setPainLevelForMealsData(painData);
      });
  }, []);

  const painLevelForTimePeriodOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${timePeriod}ly pain level`,
      },
    },
  };

  const painLevelForMealsOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average pain level for meal type',
      },
    },
  };

  const painLevelForTimePeriodGraphData = {
    labels: painLevelForTimePeriodLabels.map((el) => (moment(el).format('DD/MM/YYYY'))),
    datasets: [
      {
        label: `Pain level in past ${timePeriod}`,
        data: painLevelForTimePeriodData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const painLevelForMealsGraphData = {
    labels: painLevelForMealsLabels,
    datasets: [
      {
        label: 'Average pain level for meal type',
        data: painLevelForMealsData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const onClickWeekly = () => {
    setTimePeriod('week');
  };
  const onClickMonthly = () => {
    setTimePeriod('month');
  };

  return (
    <>
      <NavBar />
      <div className={classes.allContent}>
        <div className={classes.timePeriodGraph}>
          <Typography variant='h4' id="painLevelForTimePeriodTitle" className={classes.graphTitle}>{timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}ly pain level</Typography>
          <Button className={classes.weeklyButton} onClick={onClickWeekly} id="weeklyButton">Weekly</Button>
          <Button className={classes.monthlyButton} onClick={onClickMonthly} id="monthlyButton">Monthly</Button>
          <Line options={painLevelForTimePeriodOptions} data={painLevelForTimePeriodGraphData} id="painLevelInTimePeriodGraph"/>
        </div>
        <div className={classes.mealGraph}>
          <Typography variant='h4' id="averagePainLevelForMealTitle" className={classes.graphTitle}>Average pain level per meal</Typography>

          <Bar options={painLevelForMealsOptions} data={painLevelForMealsGraphData} id="painLevelByMealTypeGraph" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
