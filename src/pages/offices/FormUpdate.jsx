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
    office: initialValues.office,
    unit: initialValues.unit,
    vehicle_name: initialValues.vehicle_name,
    vehicle_code: initialValues.vehicle_code,
    vehicle_type: initialValues.vehicle_type,
    latitude: initialValues.latitude,
    longitude: initialValues.longitude,

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        label="Office Name"
        name="office_name"
        value={formData.office_name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Office Address"
        name="office_address"
        value={formData.office_address}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />  
      

      <TextField
        label="Office Camp Base"
        name="camp_base"
        value={formData.camp_base}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Office Code"
        name="office_code"
        value={formData.office_code}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Latitude"
        name="latitude"
        value={formData.latitude}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Longitude"
        name="longitude"
        value={formData.longitude}
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
