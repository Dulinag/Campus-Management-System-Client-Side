import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  formContainer: {
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  formTitle: {
    backgroundColor: '#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px',
  },
}));

const CampusView = (props) => {
  const { campus } = props;
  const classes = useStyles();

  // Function to handle adding a new student to the campus
  const handleAddStudent = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post('/api/students', {
        firstname: e.target.firstname.value,
        lastname: e.target.lastname.value,
        email: e.target.email.value, // Add email field
        imageUrl: e.target.imageUrl.value, // Add imageUrl field
        gpa: e.target.gpa.value, // Add gpa field
        campusId: campus.id, // Use campus ID from props
      });

      console.log('New student added:', response.data);
      // Refresh the page after adding the new student
      //window.location.reload();
      window.location.href = '/campuses';
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`/api/students/${studentId}`);
      // Refresh the page after deleting the student
      window.location.reload();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>

      {campus.students.length > 0 ? (
        campus.students.map((student) => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id} className={classes.studentContainer}>
              <div className={classes.studentName}>
                <Link to={`/student/${student.id}`}>
                  <h2>{name}</h2>
                </Link>
              </div>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => handleDeleteStudent(student.id)}
              >
                Delete
              </Button>
            </div>
          );
        })
      ) : (
        <p>No students are currently enrolled in this campus.</p>
      )}

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{ fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e' }}>
              Add a Student
            </Typography>
          </div>
          <form style={{ textAlign: 'center' }} onSubmit={handleAddStudent}>
            <label style={{ color: '#11153e', fontWeight: 'bold' }}>First Name: </label>
            <input type="text" name="firstname" />
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Last Name: </label>
            <input type="text" name="lastname" />
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Email: </label>
            <input type="email" name="email" /> {/* Add email field */}
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Image URL: </label>
            <input type="text" name="imageUrl" /> {/* Add imageUrl field */}
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>GPA: </label>
            <input type="number" name="gpa" /> {/* Add gpa field */}
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

export default CampusView;
