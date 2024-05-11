/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */


import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Button, Typography, Card, CardContent, CardMedia,
  Dialog, DialogContent, DialogTitle, TextField, DialogActions,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    paddingTop: theme.spacing(4),
    backgroundImage: 'linear-gradient(to bottom right, #6a11cb, #2575fc)',
    color: '#ffffff',
  },
  gridContainer: {
    width: '100%',
    maxWidth: '1200px',
    margin: 'auto',
    padding: theme.spacing(2),
  },
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 140,
  },
}));

const CampusForm = ({ open, handleClose, initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initialData);  // Ensure form data is reset when initialData changes
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // Check each required field
    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required.';
      isValid = false;
    }
    if (!formData.address.trim()) {
      tempErrors.address = 'Address is required.';
      isValid = false;
    }
    if (!formData.description.trim()) {
      tempErrors.description = 'Description is required.';
      isValid = false;
    }
    if (!formData.imageUrl.trim()) {
      tempErrors.imageUrl = 'Image URL is required.';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{initialData.id ? 'Edit Campus' : 'Add New Campus'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          label="Campus Name"
          type="text"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          margin="dense"
          id="address"
          name="address"
          label="Address"
          type="text"
          fullWidth
          value={formData.address}
          onChange={handleChange}
          error={!!errors.address}
          helperText={errors.address}
        />
        <TextField
          margin="dense"
          id="description"
          name="description"
          label="Description"
          type="text"
          fullWidth
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          margin="dense"
          id="imageUrl"
          name="imageUrl"
          label="Image URL"
          type="text"
          fullWidth
          value={formData.imageUrl}
          onChange={handleChange}
          error={!!errors.imageUrl}
          helperText={errors.imageUrl}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

const AllCampusesView = ({ allCampuses }) => {
  const classes = useStyles();
  const [currentCampus, setCurrentCampus] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (campus) => {
    setCurrentCampus(campus || { name: '', address: '', description: '', imageUrl: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCampus(null);
  };

  const handleSaveCampus = (campusData) => {
    const method = campusData.id ? 'PUT' : 'POST';
    const endpoint = campusData.id ? `/api/campuses/${campusData.id}` : '/api/campuses';

    fetch(endpoint, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(campusData)
    }).then(() => window.location.reload());
  };

  const handleDeleteCampus = (id) => {
    fetch(`/api/campuses/${id}`, { method: 'DELETE' })
      .then(() => window.location.reload());
  };

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>Add New Campus</Button>
      <Grid container className={classes.gridContainer}>
        {allCampuses.map(campus => (
          <Grid item xs={12} sm={6} md={4} key={campus.id}>
            <Card className={classes.card}>
              <CardMedia className={classes.media} image={campus.imageUrl || 'https://placekitten.com/200/140'} title={campus.name} />
              <CardContent>
              <Link to={`/campus/${campus.id}`}>

                <Typography gutterBottom variant="h5" component="h2">{campus.name}</Typography>
                </Link>
                <Typography variant="body2" color="textSecondary" component="p">{campus.description}</Typography>
                <Button size="small" color="primary" onClick={() => handleOpenDialog(campus)}>Edit</Button>
                <Button size="small" color="primary" onClick={() => handleDeleteCampus(campus.id)}>Delete</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {openDialog && <CampusForm open={openDialog} handleClose={handleCloseDialog} initialData={currentCampus} onSubmit={handleSaveCampus} />}
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
