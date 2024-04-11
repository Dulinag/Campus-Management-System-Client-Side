/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

// Create styling for the input form
const useStyles = makeStyles( () => ({
  formContainer:{  
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  }, 
  customizeAppBar:{
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle:{
    backgroundColor:'#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
}));

const NewStudentView = (props) => {
  const {handleChange, handleSubmit } = props;
  const classes = useStyles();


    // Function to handle adding a new student
    const handleAddStudent = async (e) => {
      e.preventDefault(); // Prevent default form submission behavior
  
      try {
        const response = await axios.post('/api/students', {
          firstname: e.target.firstname.value,
          lastname: e.target.lastname.value,
          email: e.target.email.value, // Add email field
          imageUrl: e.target.imageUrl.value, // Add imageUrl field
          gpa: e.target.gpa.value, // Add gpa field
          campusId: e.target.campusId.value,
        });
  
        console.log('New student added:', response.data);
        // Refresh the page after adding the new student
        //window.location.reload();
        window.location.href = '/students';
      } catch (error) {
        console.error('Error adding student:', error);
      }
    };
  
    return (
      <div>
        <h1>New Student</h1>
  
        <div className={classes.root}>
          <div className={classes.formContainer}>
            <div className={classes.formTitle}>
              <Typography style={{ fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e' }}>
                Add a Student
              </Typography>
            </div>
            <form style={{ textAlign: 'center' }} onSubmit={handleAddStudent}>
              <label style={{ color: '#11153e', fontWeight: 'bold' }}>First Name: </label>
              <input type="text" name="firstname" onChange={(e) => handleChange(e)} />
              <br />
              <br />
  
              <label style={{ color: '#11153e', fontWeight: 'bold' }}>Last Name: </label>
              <input type="text" name="lastname" onChange={(e) => handleChange(e)} />
              <br />
              <br />
  
              <label style={{ color: '#11153e', fontWeight: 'bold' }}>Email: </label>
              <input type="email" name="email" onChange={(e) => handleChange(e)} /> {/* Add email field */}
              <br />
              <br />
  
              <label style={{ color: '#11153e', fontWeight: 'bold' }}>Image URL: </label>
              <input type="text" name="imageUrl" onChange={(e) => handleChange(e)} /> {/* Add imageUrl field */}
              <br />
              <br />
  
              <label style={{ color: '#11153e', fontWeight: 'bold' }}>GPA: </label>
              <input type="number" name="gpa" onChange={(e) => handleChange(e)} /> {/* Add gpa field */}
              <br />
              <br />
  
              <label style={{ color: '#11153e', fontWeight: 'bold' }}>Campus Id: </label>
              <input type="text" name="campusId" onChange={(e) => handleChange(e)} />
              <br />
              <br />
  
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
              <br />
              <br />
            </form>
          </div>
        </div>
      </div>
    );
  };

export default NewStudentView;