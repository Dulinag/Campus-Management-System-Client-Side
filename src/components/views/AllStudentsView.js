import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(to bottom right, #6a11cb, #2575fc)',
    color: '#ffffff',
    textAlign: 'center',
    overflow: 'hidden',
  },
  studentContainer: {
    width: '80%', // Manageable width for each student container
    maxWidth: '600px', // Maximum width to keep the UI clean
    margin: '20px auto', // Centering and spacing vertically
    padding: '10px',
    backgroundColor: '#e3e6f0', // Light gray background for each student
    borderRadius: '5px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
    textAlign: 'center', // Center text elements within the student container
  },
  studentName: {
    fontSize: '1.2rem',
    color: '#2a2f45',
    marginBottom: '10px',
  },
}));

const AllStudentsView = (props) => {
  const { students, deleteStudent } = props;
  const classes = useStyles();

  if (!students.length) {
    return (
      <div className={classes.root}>
        <Typography variant="body1">There are no students.</Typography>
        <Link to={`newstudent`}>
          <Button variant="contained" color="primary">Add New Student</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Typography variant="h3">All Students</Typography>

      {students.map((student) => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id} className={classes.studentContainer}>
            <div className={classes.studentName}>
              <Link to={`/student/${student.id}`}>
                <Typography variant="h6">{name}</Typography>
              </Link>
            </div>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteStudent(student.id)}
            >
              Delete
            </Button>
          </div>
        );
      })}
      <br />
      <Link to={`/newstudent`}>
        <Button variant="contained" color="primary">Add New Student</Button>
      </Link>
    </div>
  );
};

export default AllStudentsView;
