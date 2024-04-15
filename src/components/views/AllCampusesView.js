/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(to bottom right, #6a11cb, #2575fc)',
    color: '#ffffff',
    textAlign: 'center',
    overflow: 'hidden',
  },  
  reet: {
   
    justifyContent: 'center',
    backgroundImage: 'linear-gradient(to bottom right, #6a11cb, #2575fc)',
    color: '#ffffff', // White text color
    textAlign: 'center',
    overflow: 'hidden', // Hide overflowing content
    color: "white"
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
    color: "black",
    marginBottom: theme.spacing(2), // Adjust margin for the campus container
  },
  studentName: {
    fontSize: '1.2rem',
    color: '#2a2f45',
    marginBottom: '10px',
  },
}));

const AddCampusForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    imageUrl: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Clear form fields after submission
    setFormData({
      name: "",
      address: "",
      description: "",
      imageUrl: ""
    });
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>

    <section style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px" }}>
      <h2>Add Campus</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
    </div>
  );
};

AddCampusForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const AllCampusesView = (props) => {
  const handleAddCampus = (formData) => {
    // Make a POST request to the server to add the new campus
    fetch("/api/campuses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New campus added:", data);
        // Refresh the page after adding the campus
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding campus:", error);
      });
  };

  const handleDeleteCampus = (id) => {
    // Function to delete campus
    fetch(`/api/campuses/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Campus deleted:", data);

        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting campus:", error);
      });
  };


  const handleEditCampus = (id) => {
    // Redirect user to Edit Campus View
    window.location.href = `/edit-campus/${id}`;
  };

  const classes = useStyles();


  return (
    <div className={classes.reet}>

    <div className={classes.studentContainer}>
      <h1>All Campuses</h1>
      {props.allCampuses.length ? (
        props.allCampuses.map((campus) => (
          <div key={campus.id}>
            <Link to={`/campus/${campus.id}`}>
              <h2>{campus.name}</h2>
            </Link>
            <h4>campus id: {campus.id}</h4>
            <p>{campus.address}</p>
            <p>{campus.description}</p>
            <button onClick={() => handleEditCampus(campus.id)}>Edit</button>
            <button onClick={() => handleDeleteCampus(campus.id)}>Delete</button>
            <hr />
          </div>
        ))
      ) : (
        <div>There are no campuses.</div>
      )}
          </div>

      <br />
      <AddCampusForm onSubmit={handleAddCampus} />
      <br /><br />
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
