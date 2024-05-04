import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(to bottom right, #6a11cb, #2575fc)',
    color: '#ffffff',
    textAlign: 'center',
    overflow: 'auto',
  },
  header: {
    marginTop: '20px', // Additional space at the top
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    padding: '20px 0', // Padding instead of margin for spacing inside the container
  },
  studentContainer: {
    width: '30%',
    maxWidth: '300px',
    margin: '10px',
    padding: '10px',
    backgroundColor: '#e3e6f0',
    borderRadius: '5px',
    paddingBottom: '5px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
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
      <Typography variant="h3" className={classes.header}>All Students</Typography>
      <Link to={`/newstudent`}>
        <Button variant="contained" color="primary">Add New Student</Button>
      </Link>
      <div className={classes.cardsContainer}>
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
      </div>
    </div>
  );
};

export default AllStudentsView;
