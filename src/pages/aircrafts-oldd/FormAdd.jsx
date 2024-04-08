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
  apiAircraftType,
  apiAircraftData
} from "../../api/api_urls";
import { StyledButtonAdd } from "./StyledComponent"; 
import AddBoxIcon from '@mui/icons-material/AddBox';
import { BsAirplaneEnginesFill } from "react-icons/bs";

export default function FormAdd({ csrfToken }) {
  const [aircraftType, setAircraftType] = useState([]);
  const [unit, setUnit] = useState([]);
  const [aircraftFormData, setAircraftFormData] = useState({});
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
        const [unitResponse, aircraftTypeResponse] = await Promise.all([
          axios.get(apiUnit),
          axios.get(apiAircraftType)
        ]);
        setUnit(unitResponse.data.success);
        setAircraftType(aircraftTypeResponse.data.success);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAircraftFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      let base64String = reader.result.split(",")[1]; // Extract base64 string without the prefix

      setAircraftFormData((prevState) => ({
        ...prevState,
        [fieldName]: base64String
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleCreateAircraft = async (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    if (
      !aircraftFormData.aircraft_name 
    ) {
      setErrorMessage("Please fill in all required fields");
      setOpenErrorMessage(true);
      return; // Prevent form submission
    }

    try {
      const response = await axios.post(apiAircraftData, aircraftFormData, {
        headers: {
          "X-CSRFToken": csrfToken // Add CSRF token to request headers
        }
      });
      console.log("Report submitted:", response.data);
      setAircraftFormData({});
      setSuccessMessage("Aircraft created successfully");
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
        <BsAirplaneEnginesFill /> Add Aircraft</h2>

      <form className="formBox" onSubmit={handleCreateAircraft}>
          <FormControl fullWidth>
            <InputLabel id="aircraft-type-label">Aircraft Type</InputLabel>
            <Select
              labelId="aircraft-type-label"
              id="aircraft-type-select"
              value={aircraftFormData.aircraft_type || ""}
              label="Aircraft Type"
              name="aircraft_type"
              onChange={handleInputChange}
            >
              {aircraftType.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.type_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="unit-label">Unit</InputLabel>
            <Select
              labelId="unit-label"
              id="unit-select"
              value={aircraftFormData.unit || ""}
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
            name="aircraft_name"
            label="Aircraft Name"
            value={aircraftFormData.aircraft_name || ""}
            onChange={handleInputChange}
            fullWidth
          />
       


          {["image_main", "image_left", "image_right", "image_front", "image_back"].map((fieldName, index) => (
            <label htmlFor={fieldName} className="imageBox" key={index}>
              <span className="imageTitle">{fieldName.replace('_', ' ')}</span>
              <input type="file" name={fieldName} id={fieldName} onChange={(e) => handleFileChange(e, fieldName)} />
              {aircraftFormData[fieldName] && (
                <img src={`data:image/jpeg;base64,${aircraftFormData[fieldName]}`} alt={fieldName} />
              )}
            </label>
          ))}
      <div className="formFooter">
        <StyledButtonAdd type="submit"  variant="contained" startIcon={<AddBoxIcon/>} >
          Create
        </StyledButtonAdd>
      </div>
      </form>
    </div>
  );
}
