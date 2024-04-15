/*==================================================
Header.js

It contains the Header component to be displayed on every page.
The header contains navigation links to every other page.
================================================== */
// Import "material" library for building UI with React components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

// Define styling for the header
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    fontWeight: 'bold',
    fontFamily: 'Roboto', 
    fontSize: '2rem', 
    color: '#ffffff' // white text color
  },
  appBar:{
    background: 'linear-gradient(to right, #6a11cb, #2575fc)', // gradient background
    boxShadow: 'none',
  },
  greeting:{
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    width: "50%",
    margin: "auto",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
  links:{
    textDecoration: 'none',
    color: '#2575fc', // blue color
    fontWeight: 'bold',
  }
}));

// Header component, displayed on every page
// Links to every other page
const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit" >
            Campus Management System
          </Typography>

          <Link className={classes.links} to={'/'} >
            <Button variant="contained" color="primary" style={{marginRight: '10px'}}>
              Home
            </Button>
          </Link>

          <Link className={classes.links} to={'/campuses'} >
            <Button variant="contained" color="primary" style={{marginRight: '10px'}}>
              All Campuses
            </Button>
          </Link>

          <Link className={classes.links} to={'/students'} >
            <Button variant="contained" color="primary">
              All Students
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );    
}

export default Header;
