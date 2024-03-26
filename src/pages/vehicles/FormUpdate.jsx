/* eslint-disable react/prop-types */
// RoleForm.js
import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Snackbar,
  Alert
} from "@mui/material";
import { StyledButtonAdd } from "./StyledComponent";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {
  apiUnit,
  apiOfficesData,
} from "../../api/api_urls";
import axios from "axios";
import { FaCarRear } from "react-icons/fa6";

export default function RoleForm({ onSubmit, initialValues = {} }) {
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [unit, setUnit] = useState([]);
  const [office, setOffice] = useState([]);

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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unitResponse, officeResponse] = await Promise.all([
          axios.get(apiUnit),
          axios.get(apiOfficesData),
        ]);
        setUnit(unitResponse.data.success);
        setOffice(officeResponse.data.success);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

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
        <FaCarRear /> Add Office</h2>
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

      <FormControl fullWidth>
            <InputLabel id="unit-label">Office</InputLabel>
            <Select
              labelId="unit-label"
              id="unit-select"
              value={formData.office}
              label="Office"
              name="office"
              onChange={handleInputChange}
            >
              {office.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.office_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="unit-label">Unit</InputLabel>
            <Select
              labelId="unit-label"
              id="unit-select"
              value={formData.unit}
              label="Unit"
              name="unit"
              onChange={handleInputChange}
            >
              {unit.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.unit_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>


      <TextField
        label="Vehicle Name"
        name="vehicle"
        value={formData.vehicle_name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Vehicle Code"
        name="vehicle_code"
        value={formData.vehicle_code}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />  
      

  

      <TextField
        label="Vehicle Type"
        name="vehicle_type"
        value={formData.vehicle_type}
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
