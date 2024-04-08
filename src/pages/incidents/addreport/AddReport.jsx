import { useContext, useState } from "react"
import { DataContext } from "../../../context/DataProvider"
import {FormControl, InputLabel, Select, MenuItem, TextField,  Snackbar, Alert} from "@mui/material";
import axios from 'axios'
import GetToken from "../../../components/token/GetToken";
import { apiIncident } from "../../../api/api_urls";

export default function AddReport() {
  const { incidentType, incidentSeverity, incidentStatus, incidentData,  updateIncidentData } = useContext(DataContext)
  const csrfToken = GetToken()
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  const handleSnackbarClose = () => setSnackbarOpen(false);


  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setSnackbarOpen(true);
    setTimeout(() => {
        setSuccessMessage("");
        setSnackbarOpen(false);
    }, 2000);
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setSnackbarOpen(true);
    setTimeout(() => {
        setErrorMessage("");
        setSnackbarOpen(false);
    }, 2000);
  };

  const [formData, setFormData] = useState({
    incident_details:"",
    type:"",
    severity:"",
    
  });


  

  console.log("Incident Type:", incidentType)
  console.log("Incident Severity:", incidentSeverity)
  console.log("Incident  Status:", incidentStatus)


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const [key, subKey] = name.split(".");
    if (subKey) {
        setFormData(prevState => ({
            ...formData,
            [key]: {
                ...prevState[key],
                [subKey]: value
            }
        }));
    } else {
        setFormData({ ...formData, [key]: value });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleAddIncident = async () => {
    try {
        const response = await axios.post(apiIncident, formData, {
            headers: {
                'X-CSRFToken': csrfToken
            }
        });
        const newIncident = response.data.data;
        updateIncidentData([...incidentData, newIncident]); // Update vesselsData using the context function
        showSuccessMessage("Successfully added your report!");
    } catch (error) {
        console.error('Failed to submit your report!', error);
        showErrorMessage("Failed to submit your report!");
    }
  };

  
  return (
    <div className="incidentReportContainer">
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={successMessage ? "success" : "error"}>
                    {successMessage || errorMessage}
                </Alert>
       </Snackbar>
        <TextField value={formData.incident_details} onChange={handleFormChange}  autoFocus  margin="dense"  name="incident_details" label="Incident Description" type="text"  fullWidth />
        <FormControl fullWidth>
            <InputLabel id="type">Incident Type</InputLabel>
            <Select
              labelId="type"
              id="type"
              value={formData.type}
              name="type"
              onChange={handleInputChange}
            >
              {incidentType.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.type_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>


          <FormControl fullWidth>
            <InputLabel id="Severity">Incident Severity</InputLabel>
            <Select
              labelId="Severity"
              id="Severity"
              value={formData.severity}
              name="severity"
              onChange={handleInputChange}
            >
              {incidentSeverity.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.severity_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <button onClick={handleAddIncident}>Submit Report</button>
    </div>
  )
}
