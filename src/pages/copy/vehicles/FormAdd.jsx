/* eslint-disable react/prop-types */
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
import axios from "axios";
import {
  apiUnit,
  apiVehiclesData,
  apiOfficesData,
} from "../../api/api_urls";
import { StyledButtonAdd } from "./StyledComponent"; 
import AddBoxIcon from '@mui/icons-material/AddBox';
import { FaCarRear } from "react-icons/fa6";

export default function FormAdd({ csrfToken }) {
  const [unit, setUnit] = useState([]);
  const [office, setOffice] = useState([]);
  const [vehicleFormData, setVehicleFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

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
    setVehicleFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // const handleFileChange = (e, fieldName) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     let base64String = reader.result.split(",")[1]; // Extract base64 string without the prefix

  //     setvehicleFormData((prevState) => ({
  //       ...prevState,
  //       [fieldName]: base64String
  //     }));
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleCreateVehicle = async (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    if (
      !vehicleFormData.vehicle_name
    ) {
      setErrorMessage("Please fill in all required fields");
      setOpenErrorMessage(true);
      return; // Prevent form submission
    }

    try {
      const response = await axios.post(apiVehiclesData, vehicleFormData, {
        headers: {
          "X-CSRFToken": csrfToken // Add CSRF token to request headers
        }
      });
      console.log("Report submitted:", response.data);
      setVehicleFormData({});
      setSuccessMessage("Vehicle created successfully");
      setOpenSuccessMessage(true);
      setTimeout(() => {
         window.location.reload()
      },2000)
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  return (
    <div className="formWrapper">
      <Snackbar
        open={openSuccessMessage}
        autoHideDuration={3000}
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
      <h2 className="formTitle">
        <FaCarRear /> Add Vehicle</h2>

      <form className="formBox" onSubmit={handleCreateVehicle}>

      <FormControl fullWidth>
            <InputLabel id="unit-label">Office</InputLabel>
            <Select
              labelId="unit-label"
              id="unit-select"
              value={vehicleFormData.office || ""}
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
              value={vehicleFormData.unit || ""}
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
            name="vehicle_name"
            label="Vehicle Name"
            value={vehicleFormData.vehicle_name || ""}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            name="vehicle_type"
            label="Vehicle Type"
            value={vehicleFormData.vehicle_type || ""}
            onChange={handleInputChange}
            fullWidth
          />

        <TextField
            name="vehicle_code"
            label="Vehicle Code"
            value={vehicleFormData.vehicle_code || ""}
            onChange={handleInputChange}
            fullWidth
          />

<TextField
            name="latitude"
            label="Latitude"
            value={vehicleFormData.latitude || ""}
            onChange={handleInputChange}
            fullWidth
          />
       

       <TextField
            name="longitude"
            label="Longitude"
            value={vehicleFormData.longitude || ""}
            onChange={handleInputChange}
            fullWidth
          />
       
       

{/* 
          {["image_main", "image_right", "image_right", "image_front", "image_back"].map((fieldName, index) => (
            <label htmlFor={fieldName} className="imageBox" key={index}>
              <span className="imageTitle">{fieldName.replace('_', ' ')}</span>
              <input type="file" name={fieldName} id={fieldName} onChange={(e) => handleFileChange(e, fieldName)} />
              {vehicleFormData[fieldName] && (
                <img src={`data:image/jpeg;base64,${vehicleFormData[fieldName]}`} alt={fieldName} />
              )}
            </label>
          ))} */}
      <div className="formFooter">
        <StyledButtonAdd type="submit"  variant="contained" startIcon={<AddBoxIcon/>} >
          Create
        </StyledButtonAdd>
      </div>
      </form>
    </div>
  );
}
