import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(to bottom right, #6a11cb, #2575fc)', // Gradient background
    color: '#ffffff', 
    textAlign: 'center',
    overflow: 'hidden', 
  },
  title: {
    fontSize: '3rem', 
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Text shadow for visual effect
  },
}));

const HomePageView = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Welcome to D AND I Campus Mangement System</h1>
    </div>
  );    
}

export default HomePageView;
