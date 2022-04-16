import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import UserService from '../Services/user';
import { Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  timePeriodButton: {
    background: 'linear-gradient(#a88beb, #f8ceec)',
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
  const [labels, setLabels] = useState([]);
  const [painData, setPainData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    UserService.getUserPainLevelForTimePeriod(localStorage.getItem('userToken'), timePeriod)
      .then((res) => {
        const { data: { data: { labels, painData } } } = res;
        setLabels(labels);
        setPainData(painData);
      });
  }, [timePeriod]);

  const options = {
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
  
  const data = {
    labels,
    datasets: [
      {
        label: `Pain level in past ${timePeriod}`,
        data: painData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
          <Typography variant='h4' id="graphTitle" className={classes.graphTitle}>{timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}ly pain level</Typography>
          <Button className={classes.timePeriodButton} onClick={onClickWeekly} id="weeklyButton">Weekly</Button>
          <Button className={classes.timePeriodButton} onClick={onClickMonthly} id="monthlyButton">Monthly</Button>
          <Line options={options} data={data} id="painLevelInTimePeriodGraph"/>;
        </div>
      </div>
    </>
  );
};

export default Dashboard;
