import React, { useState } from 'react';
import { Link } from "react-router-dom";
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
  
  const [editFormData, setEditFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [studentErrors, setStudentErrors] = useState({});


const handleEditSubmit = async (e, studentId) => {
  e.preventDefault();

  const studentData = editFormData;
  const errors = {};

  // Validation checks
  if (studentData.gpa < 0 || studentData.gpa > 4) {
    errors.gpa = 'GPA must be between 0 and 4.';
  }
  if (!studentData.imageUrl.endsWith('.jpg')) {
    errors.imageUrl = 'Image URL must end with .jpg.';
  }
  if (!studentData.email.endsWith('.com')) {
    errors.email = 'Email must end with .com.';
  }

// Check if Campus ID exists
try {
  const campusIdExists = await checkCampusIdExists(studentData.campusId);
  if (!campusIdExists) {
    errors.campusId = 'Campus ID does not exist.';
  }
} catch (error) {
  console.error('Error checking Campus ID existence:', error);
  errors.campusId = 'Error checking Campus ID existence.';
}


  setStudentErrors({ [studentId]: errors });

  
  if (Object.keys(errors).length === 0) {
    try {
      const response = await fetch(`/api/students/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error('Failed to update student.');
      }

      const updatedStudent = await response.json();
      console.log('Student updated:', updatedStudent);
      // Clear edit form data
      setEditFormData(null);

      window.location.reload();
    } catch (error) {
      console.error('Error updating student:', error.message);

    }
  }
};




const checkCampusIdExists = async (campusId) => {
  try {
    const response = await fetch(`/api/campuses/${campusId}`, {
      method: 'GET',
    });

    if (response.status === 404) {
      return false; //CampusId does not exist
    }

    const data = await response.json();
    return !!data; //Return true if capusId exists
  } catch (error) {
    console.error('Error checking campus ID:', error);
    return false; //Return false in case of an error
  }
};



const renderEditForm = (student) => {
  return (
    <div key={student.id}>
      <h2>Edit Student</h2>
      <form onSubmit={(e) => handleEditSubmit(e, student.id)}>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input type="text" id="firstname" name="firstname" defaultValue={student.firstname} onChange={(e) => setEditFormData({ ...editFormData, firstname: e.target.value })} />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input type="text" id="lastname" name="lastname" defaultValue={student.lastname} onChange={(e) => setEditFormData({ ...editFormData, lastname: e.target.value })} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" defaultValue={student.email} onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })} />
          {studentErrors[student.id] && studentErrors[student.id].email && <span style={{ color: 'red' }}>{studentErrors[student.id].email}</span>}
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL:</label>
          <input type="text" id="imageUrl" name="imageUrl" defaultValue={student.imageUrl} onChange={(e) => setEditFormData({ ...editFormData, imageUrl: e.target.value })} />
          {studentErrors[student.id] && studentErrors[student.id].imageUrl && <span style={{ color: 'red' }}>{studentErrors[student.id].imageUrl}</span>}
        </div>
        <div>
          <label htmlFor="gpa">GPA:</label>
          <input type="number" id="gpa" name="gpa" defaultValue={student.gpa} onChange={(e) => setEditFormData({ ...editFormData, gpa: e.target.value })} />
          {studentErrors[student.id] && studentErrors[student.id].gpa && <span style={{ color: 'red' }}>{studentErrors[student.id].gpa}</span>}
        </div>
        <div>
        <label htmlFor="campusID">Campus ID:</label>
        <input type="text" id="campusID" name="campusID" defaultValue={student.campusId} onChange={(e) => setEditFormData({ ...editFormData, campusId: e.target.value })} />
        {studentErrors[student.id] && studentErrors[student.id].campusId && <span style={{ color: 'red' }}>{studentErrors[student.id].campusId}</span>}
      </div>
        <button type="submit">Submit</button>
        {/* <button type="button" onClick={() => setEditFormData(null)}>Cancel</button> */}
        <button type="button" onClick={() => handleCancelEdit(student.id)}>Cancel</button>
      </form>
    </div>
  );
};


// Function to handle canceling the edit form
const handleCancelEdit = (studentId) => {
  // Reset editFormData to null
  setEditFormData(null);
  // Clear any error messages for this student
  setStudentErrors((prevErrors) => ({ ...prevErrors, [studentId]: {} }));
};




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
                          onClick={() => setEditFormData(student)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => deleteStudent(student.id)}
                        >
                          Delete
                        </Button>



                        <hr />
                      {editFormData && editFormData.id === student.id && renderEditForm(student)}
                      {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                      {errors.imageUrl && <span style={{ color: 'red' }}>{errors.imageUrl}</span>}
                      {errors.gpa && <span style={{ color: 'red' }}>{errors.gpa}</span>}
                      {errors.campusId && <span style={{ color: 'red' }}>{errors.campusId}</span>}

                      </div>

              );
            })}
                  <br />
          <Link to={`/newstudent`}>
            <button>Add New Student</button>
          </Link>
          <br /><br />


      </div>
    </div>
  );
};

export default AllStudentsView;
