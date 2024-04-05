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
  apiVesselClass,
  apiVesselType,
  apiVesselStatus,
  apiUnit,
  apiVesselsData
} from "../../api/api_urls";
import { StyledButtonAdd } from "./StyledComponent"; 
import AddBoxIcon from '@mui/icons-material/AddBox';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';

export default function FormAdd({ csrfToken,  handleCloseDialog }) {
  const [vesselClass, setVesselClass] = useState([]);
  const [vesselType, setVesselType] = useState([]);
  const [vesselStatus, setVesselStatus] = useState([]);
  const [unit, setUnit] = useState([]);
  const [vesselFormData, setVesselFormData] = useState({});
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
        const [vesselClassResponse, vesselTypeResponse, vesselStatusResponse, unitResponse] = await Promise.all([
          axios.get(apiVesselClass),
          axios.get(apiVesselType),
          axios.get(apiVesselStatus),
          axios.get(apiUnit)
        ]);
        setVesselClass(vesselClassResponse.data.success);
        setVesselType(vesselTypeResponse.data.success);
        setVesselStatus(vesselStatusResponse.data.success);
        setUnit(unitResponse.data.success);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVesselFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      let base64String = reader.result.split(",")[1]; // Extract base64 string without the prefix

      setVesselFormData((prevState) => ({
        ...prevState,
        [fieldName]: base64String
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleCreateVessel = async (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    if (
      !vesselFormData.vessel_class ||
      !vesselFormData.vessel_type ||
      !vesselFormData.vessel_status ||
      !vesselFormData.vessel_name ||
      !vesselFormData.vessel_description ||
      !vesselFormData.hull_number
    ) {
      setErrorMessage("Please fill in all required fields");
      setOpenErrorMessage(true);
      return; // Prevent form submission
    }

    try {
      const response = await axios.post(apiVesselsData, vesselFormData, {
        headers: {
          "X-CSRFToken": csrfToken // Add CSRF token to request headers
        }
      });
      console.log("Report submitted:", response.data);

      setVesselFormData({});
      setSuccessMessage("Vessel created successfully");
      setOpenSuccessMessage(true);
      setTimeout(() => {
      handleCloseDialog ()

      },2500)
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
      <h2 className="formTitle">
        <DirectionsBoatIcon /> Add Vessel</h2>

      <div className="formBox">
          <FormControl fullWidth>
            <InputLabel id="vessel-class-label">Vessel Class</InputLabel>
            <Select
              labelId="vessel-class-label"
              id="vessel-class-select"
              value={vesselFormData.vessel_class || ""}
              label="Vessel Class"
              name="vessel_class"
              onChange={handleInputChange}
            >
              {vesselClass.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.class_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="vessel-type-label">Vessel Type</InputLabel>
            <Select
              labelId="vessel-type-label"
              id="vessel-type-select"
              value={vesselFormData.vessel_type || ""}
              label="Vessel Type"
              name="vessel_type"
              onChange={handleInputChange}
            >
              {vesselType.map((item, index) => (
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
              value={vesselFormData.unit || ""}
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

          <FormControl fullWidth>
            <InputLabel id="vessel-status-label">Vessel Status</InputLabel>
            <Select
              labelId="vessel-status-label"
              id="vessel-status-select"
              value={vesselFormData.vessel_status || ""}
              label="Vessel Status"
              name="vessel_status"
              onChange={handleInputChange}
            >
              {vesselStatus.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.status_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            name="vessel_name"
            label="Vessel Name"
            value={vesselFormData.vessel_name || ""}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="vessel_description"
            label="Vessel Description"
            value={vesselFormData.vessel_description || ""}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            name="hull_number"
            label="Hull Number"
            value={vesselFormData.hull_number || ""}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="beam"
            label="Beam"
            value={vesselFormData.beam || ""}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="origin"
            label="Origin"
            value={vesselFormData.origin || ""}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="capacity"
            label="Capacity"
            value={vesselFormData.capacity || ""}
            onChange={handleInputChange}
            fullWidth
          />

          {["image_main", "image_left", "image_right", "image_front", "image_back"].map((fieldName, index) => (
            <label htmlFor={fieldName} className="imageBox" key={index}>
              <span className="imageTitle">{fieldName.replace('_', ' ')}</span>
              <input type="file" name={fieldName} id={fieldName} onChange={(e) => handleFileChange(e, fieldName)} />
              {vesselFormData[fieldName] && (
                <img src={`data:image/jpeg;base64,${vesselFormData[fieldName]}`} alt={fieldName} />
              )}
            </label>
          ))}
      </div>
      <div className="formFooter">
      <StyledButtonAdd  variant="contained" onClick={handleCreateVessel} startIcon={<AddBoxIcon/>} >
        Create
      </StyledButtonAdd>
      </div>
    </div>
  );
}
