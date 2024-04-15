import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(to bottom right, #6a11cb, #2575fc)', // Gradient background
    color: '#ffffff', // White text color
    textAlign: 'center',
    overflow: 'hidden', // Hide overflowing content
  },
  title: {
    fontSize: '3rem', // Large font size
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Text shadow for visual effect
    letterSpacing: '1px', // Add some letter spacing for better readability
    marginBottom: theme.spacing(4), // Add margin bottom for separation from other content
  },
}));

const StudentView = (props) => {
  const { student } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <h1 className={classes.title}>{student.firstname + " " + student.lastname}</h1>
        <h3>{student.campus.name}</h3>

        <div>
          <h3>Email: {student.email}</h3>
          <h3>GPA: {student.gpa}</h3>
          <h3>Image URL: {student.imageUrl}</h3>
        </div>
      </div>
    </div>
  );
};

export default StudentView;
