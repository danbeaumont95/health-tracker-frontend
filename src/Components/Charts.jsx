import React, { useState, useEffect } from 'react';
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
import {  Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  allContent: {
    display: 'flex',
    marginTop: theme.spacing(2),
    ['@media (max-width:800px)']: {
      flexDirection: 'column'
    },
  },
  timePeriodContent: {
    marginLeft: theme.spacing(4),
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: theme.spacing(4),
    ['@media (max-width:800px)']: {
      
      marginLeft: 'auto',
      marginRight: 'auto',
      height: '50%',
      width: '90%'
    },
  },
  graphTitle: {
    marginTop: theme.spacing(2)
  },
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
  timePeriodGraph: {
    height: '500px',
    width: '700px',
    ['@media (max-width:800px)']: {
      height: '80%',
      width: '100%',
    },
  },
  mealTypeGraph: {
    height: '500px',
    width: '400px',
    margin: '0 auto',
    ['@media (max-width:800px)']: {
      height: '300px',
      width: '100%',
    },
  },
  mealGraphContent: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: theme.spacing(4),
    ['@media (max-width:800px)']: {
      marginTop: theme.spacing(2),
      marginLeft: 'auto',
      marginRight: 'auto',
      height: '20%',
      width: '90%'
    },
  }
}));
const Charts = () => {
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
        const { data: { data: { labels, painData } } } = res;
        setPainLevelForMealsLabels(labels);
        setPainLevelForMealsData(painData);
      });
  }, []);

  const painLevelForTimePeriodOptions = {
    maintainAspectRatio: false,
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
    maintainAspectRatio: false,
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
        label: 'Average pain level for day',
        data: painLevelForTimePeriodData,
        borderColor: '#a88beb',
        backgroundColor: '#a88beb',
      },
    ],
  };

  const painLevelForMealsGraphData = {
    labels: painLevelForMealsLabels,
    datasets: [
      {
        label: 'Average pain level for meal type',
        data: painLevelForMealsData,
        backgroundColor: '#a88beb',
        borderColor: 'white'
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
    <div className={classes.allContent}>
      <div className={classes.timePeriodContent}>
        <Typography variant='h4' id="painLevelForTimePeriodTitle" className={classes.graphTitle}>{timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}ly pain level</Typography>
        <Button className={classes.weeklyButton} onClick={onClickWeekly} id="weeklyButton">Weekly</Button>
        <Button className={classes.monthlyButton} onClick={onClickMonthly} id="monthlyButton">Monthly</Button>
        <div className={classes.timePeriodGraph}>

          <Line options={painLevelForTimePeriodOptions} data={painLevelForTimePeriodGraphData} id="painLevelInTimePeriodGraph"/>
        </div>
      </div>
      <div className={classes.mealGraphContent}>
        <Typography variant='h4' id="averagePainLevelForMealTitle" className={classes.graphTitle}>Average pain level per meal</Typography>
        <div className={classes.mealTypeGraph}>
          <Bar options={painLevelForMealsOptions} data={painLevelForMealsGraphData} id="painLevelByMealTypeGraph" />
        </div>
      </div>
    </div>
  );
};

export default Charts;
