import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Card, CardContent, CardMedia } from '@material-ui/core';
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
    marginTop: '20px',
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    padding: '20px 0',
  },
  studentContainer: {
    width: '30%',
    maxWidth: '300px',
    margin: '10px',
    backgroundColor: '#e3e6f0',
    borderRadius: '5px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
  },
  studentName: {
    fontSize: '1.2rem',
    color: '#2a2f45',
    marginBottom: '10px',
  },
  media: {
    height: 140, // Adjust this value as needed
  },
}));

const AllStudentsView = (props) => {
  const { students, deleteStudent } = props;
  const classes = useStyles();
  
  const [editFormData, setEditFormData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleEditClick = (student) => {
    setEditFormData(student);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditFormData(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/students/${editFormData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        throw new Error('Failed to update student.');
      }

      const updatedStudent = await response.json();
      console.log('Student updated:', updatedStudent);
      handleCloseDialog();
      // Optional: Refresh the list of students here or update state accordingly
    } catch (error) {
      console.error('Error updating student:', error);
      // Handle errors appropriately in the UI
    }
  };

  const handleChange = (field, value) => {
    setEditFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.header}>All Students</Typography>
      <Link to="/newstudent">
        <Button variant="contained" color="primary">Add New Student</Button>
      </Link>
      <div className={classes.cardsContainer}>
        {students.map((student) => (
          <Card key={student.id} className={classes.studentContainer}>
            <CardMedia
              className={classes.media}
              image={student.imageUrl}
              title={`${student.firstname} ${student.lastname}`}
            />
            <CardContent>
            <Link to={`/student/${student.id}`}>
                <Typography variant="h6">{student.firstname + " " + student.lastname}</Typography>
              </Link>
              <Button variant="contained" color="secondary" onClick={() => handleEditClick(student)}>
                Edit
              </Button>
              <Button variant="contained" color="secondary" onClick={() => deleteStudent(student.id)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {editFormData && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogContent>
           
            <TextField autoFocus margin="dense" id="firstname" label="First Name" type="text" fullWidth value={editFormData.firstname} onChange={(e) => handleChange('firstname', e.target.value)} />
            <TextField margin="dense" id="lastname" label="Last Name" type="text" fullWidth value={editFormData.lastname} onChange={(e) => handleChange('lastname', e.target.value)} />
            <TextField margin="dense" id="email" label="Email" type="email" fullWidth value={editFormData.email} onChange={(e) => handleChange('email', e.target.value)} />
            <TextField margin="dense" id="imageUrl" label="Image URL" type="text" fullWidth value={editFormData.imageUrl} onChange={(e) => handleChange('imageUrl', e.target.value)} />
            <TextField margin="dense" id="gpa" label="GPA" type="number" fullWidth value={editFormData.gpa} onChange={(e) => handleChange('gpa', e.target.value)} />
            <TextField margin="dense" id="campusID" label="Campus ID" type="text" fullWidth value={editFormData.campusId} onChange={(e) => handleChange('campusId', e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
            <Button onClick={handleEditSubmit} color="primary">Save Changes</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default AllStudentsView;
