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






//----------------------------------------------Edit campus form-------------------------//
const EditCampusForm = ({ onSubmit, onCancel, campus }) => {
  console.log("EditCampusForm running")
  const [formData, setFormData] = useState({
    id: campus.id,
    name: campus.name,
    address: campus.address,
    description: campus.description,
    imageUrl: campus.imageUrl,
  });

  const [errors, setErrors] = useState({
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  

    // Reset error message when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};
  
    // Validate name field
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
  
    // Validate address field
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }
  
    // Validate description field
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
  
    // Validate imageURL field
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
      isValid = false;
    } else if (!formData.imageUrl.endsWith(".jpg")) {
      newErrors.imageUrl = "Image URL must end with .jpg";
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };



  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <section style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px" }}>
      <h2>Edit Campus</h2>
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
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
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
          {errors.address && <span style={{ color: "red" }}>{errors.address}</span>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <span style={{ color: "red" }}>{errors.description}</span>}
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
          {errors.imageUrl && <span style={{ color: "red" }}>{errors.imageUrl}</span>}
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </section>
  );
};



//----------------------------------------------Add campus form-------------------------//
const AddCampusForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    imageUrl: ""
  });

  const [errors, setErrors] = useState({
    imageUrl: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    // Reset error message when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};
  
    // Validate name field
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
  
    // Validate address field
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }
  
    // Validate description field
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
  
    // Validate imageURL field
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
      isValid = false;
    } else if (!formData.imageUrl.endsWith(".jpg")) {
      newErrors.imageUrl = "Image URL must end with .jpg";
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);

      // Clear form fields after successful submission
      setFormData({
        name: "",
        address: "",
        description: "",
        imageUrl: ""
      });
    }
  };



  return (
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
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
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
          {errors.address && <span style={{ color: "red" }}>{errors.address}</span>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <span style={{ color: "red" }}>{errors.description}</span>}
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
          {errors.imageUrl && <span style={{ color: "red" }}>{errors.imageUrl}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};


EditCampusForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  campus: PropTypes.object.isRequired,
};



AddCampusForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  campus: PropTypes.object.isRequired,
};



const AllCampusesView = (props) => {

  const [editingCampus, setEditingCampus] = useState(null);

  const handleEditCampus = (id) => {
    console.log("Edit button clicked for campus ID:", id);
    // Retrieve the campus data based on ID and set it to state
    const campus = props.allCampuses.find((campus) => campus.id === id);
    setEditingCampus(campus);
  };
  const handleCancelEdit = () => {
    // Reset editingCampus state to null when canceling edit
    setEditingCampus(null);
  };


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



  const handleEditSubmit = (formData, campusId) => {
    console.log("the route is running");
    // Make a PUT request to the server to update the campus
    fetch(`/api/campuses/${campusId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Campus updated:", data);
      window.location.reload();
      // Handle success, maybe redirect user or update state
    })
    .catch((error) => {
      console.error("Error updating campus:", error);
    });
  };
  






  const classes = useStyles();


  return (
    <div className={classes.reet}>
            <AddCampusForm onSubmit={handleAddCampus} />


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

            {editingCampus && editingCampus.id === campus.id ? (
              <EditCampusForm onSubmit={(formData) => handleEditSubmit(formData, campus.id)} onCancel={handleCancelEdit} campus={editingCampus} />
            ) : (
              <>
                <button onClick={() => handleEditCampus(campus.id)}>Edit</button>
                <button onClick={() => handleDeleteCampus(campus.id)}>Delete</button>
              </>
            )}

            <hr />
          </div>
        ))
      ) : (
        <div>There are no campuses.</div>
      )}
          </div>

      <br />
      <br /><br />
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;