import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

// Create styling for the input form
const useStyles = makeStyles(() => ({
  formContainer: {
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
  customizeAppBar: {
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle: {
    backgroundColor: '#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
}));

const NewStudentView = (props) => {
  const { handleChange } = props;
  const classes = useStyles();

  const [errors, setErrors] = useState({});

  // Function to handle adding a new student
  const handleAddStudent = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const formData = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      email: e.target.email.value, // Add email field
      imageUrl: e.target.imageUrl.value, // Add imageUrl field
      gpa: e.target.gpa.value, // Add gpa field
      campusId: e.target.campusId.value,
    };

    // Validate form fields
    const newErrors = {};
    if (!formData.firstname.trim()) {
      newErrors.firstname = "First Name is required";
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    }
    if (!formData.gpa) {
      newErrors.gpa = "GPA is required";
    }
    if (!formData.campusId.trim()) {
      newErrors.campusId = "Campus Id is required";
    }

    // If there are errors, set them and prevent form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('/api/students', formData);

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
            <div>
              <label style={{ color: '#11153e', fontWeight: 'bold' }}>First Name: </label>
              <input type="text" name="firstname" onChange={(e) => handleChange(e)} />
              {errors.firstname && <span style={{ color: "red" }}>{errors.firstname}</span>}
            </div>
            <br />

            <div>
              <label style={{ color: '#11153e', fontWeight: 'bold' }}>Last Name: </label>
              <input type="text" name="lastname" onChange={(e) => handleChange(e)} />
              {errors.lastname && <span style={{ color: "red" }}>{errors.lastname}</span>}
            </div>
            <br />

            <div>
              <label style={{ color: '#11153e', fontWeight: 'bold' }}>Email: </label>
              <input type="email" name="email" onChange={(e) => handleChange(e)} />
              {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
            </div>
            <br />

            <div>
              <label style={{ color: '#11153e', fontWeight: 'bold' }}>Image URL: </label>
              <input type="text" name="imageUrl" onChange={(e) => handleChange(e)} />
              {errors.imageUrl && <span style={{ color: "red" }}>{errors.imageUrl}</span>}
            </div>
            <br />

            <div>
              <label style={{ color: '#11153e', fontWeight: 'bold' }}>GPA: </label>
              <input type="number" name="gpa" onChange={(e) => handleChange(e)} />
              {errors.gpa && <span style={{ color: "red" }}>{errors.gpa}</span>}
            </div>
            <br />

            <div>
              <label style={{ color: '#11153e', fontWeight: 'bold' }}>Campus Id: </label>
              <input type="text" name="campusId" onChange={(e) => handleChange(e)} />
              {errors.campusId && <span style={{ color: "red" }}>{errors.campusId}</span>}
            </div>
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
