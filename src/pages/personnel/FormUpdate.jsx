/* eslint-disable react/prop-types */
// RoleForm.js
import { useState } from "react";
import {
  TextField,
  Snackbar,
  Alert
} from "@mui/material";
import { ImOffice } from "react-icons/im";
import { StyledButtonAdd } from "./StyledComponent";
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function RoleForm({ onSubmit, initialValues = {} }) {
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const [formData, setFormData] = useState({
    id: initialValues.id,
    username: initialValues.username,
    personal_details: {
      first_name: initialValues.first_name,
      last_name: initialValues.last_name,
      email: initialValues.email,
    }

  });


  const handleCloseSuccessMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessMessage(false);
  };

  const handleCloseErrorMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorMessage(false);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['username', 'latitude', 'longitude'].includes(name)) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        personal_details: {
          ...prevState.personal_details,
          [name]: value
        }
      }));
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if there are any changes
    const hasChanges = Object.keys(initialValues).some(
      (key) => formData[key] !== initialValues[key]
    );
  
    if (!hasChanges) {
      setErrorMessage("No changes detected");
      setOpenErrorMessage(true);
      return;
    }
  
    onSubmit(formData);
    setSuccessMessage("Office Updated successfully");
    setOpenSuccessMessage(true);
 
  };
  

  return (
    <div className="formWrapper">
      <h2 className="formTitle">
        <ImOffice /> Add Office</h2>
    <form  className="formBox"  onSubmit={handleSubmit}>
       <Snackbar
        open={openSuccessMessage}
        autoHideDuration={3000}
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSuccessMessage}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorMessage}
        autoHideDuration={3000}
        onClose={handleCloseErrorMessage}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseErrorMessage}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="First Name"
        name="first_name"
        value={formData.personal_details.first_name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />  
      

      <TextField
        label="Last Name"
        name="last_name"
        value={formData.personal_details.last_name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Email"
        name="email"
        value={formData.personal_details.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

   
      <input type="hidden" name="id" value={formData.id} />
      <div className="formFooter">
        <StyledButtonAdd type="submit"  variant="contained" startIcon={<AddBoxIcon/>} >
          Update
        </StyledButtonAdd>
      </div>
    </form>
    </div>
  );
}
