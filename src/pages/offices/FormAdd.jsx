/* eslint-disable react/prop-types */
import {  useState } from "react";
import {
  TextField,
  Snackbar,
  Alert
} from "@mui/material";
import axios from "axios";
import {
  apiOfficesData
} from "../../api/api_urls";
import { StyledButtonAdd } from "./StyledComponent"; 
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ImOffice } from "react-icons/im";

export default function FormAdd({ csrfToken }) {
  const [officeFormData, setOfficeFormData] = useState({});
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

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOfficeFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // const handleFileChange = (e, fieldName) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     let base64String = reader.result.split(",")[1]; // Extract base64 string without the prefix

  //     setAircraftFormData((prevState) => ({
  //       ...prevState,
  //       [fieldName]: base64String
  //     }));
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleCreateOffice = async (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    if (
      !officeFormData.office_name 
    ) {
      setErrorMessage("Please fill in all required fields");
      setOpenErrorMessage(true);
      return; // Prevent form submission
    }

    try {
      const response = await axios.post(apiOfficesData, officeFormData, {
        headers: {
          "X-CSRFToken": csrfToken // Add CSRF token to request headers
        }
      });
      console.log("Report submitted:", response.data);
      setOfficeFormData({});
      setSuccessMessage("Office created successfully");
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
        <ImOffice /> Add Office</h2>

      <form className="formBox" onSubmit={handleCreateOffice}>
    
          
          <TextField
            name="office_name"
            label="Office Name"
            value={officeFormData.office_name || ""}
            onChange={handleInputChange}
            fullWidth
          />

        <TextField
            name="office_address"
            label="Office Address"
            value={officeFormData.office_address || ""}
            onChange={handleInputChange}
            fullWidth
          />

        <TextField
            name="camp_base"
            label="Office Camp Base"
            value={officeFormData.camp_base || ""}
            onChange={handleInputChange}
            fullWidth
          />
       
       <TextField
            name="office_code"
            label="Office Code"
            value={officeFormData.office_code || ""}
            onChange={handleInputChange}
            fullWidth
          />

<TextField
            name="latitude"
            label="Latitude"
            value={officeFormData.latitude || ""}
            onChange={handleInputChange}
            fullWidth
          />
       

       <TextField
            name="longitude"
            label="Longitude"
            value={officeFormData.longitude || ""}
            onChange={handleInputChange}
            fullWidth
          />
       
       

{/* 
          {["image_main", "image_left", "image_right", "image_front", "image_back"].map((fieldName, index) => (
            <label htmlFor={fieldName} className="imageBox" key={index}>
              <span className="imageTitle">{fieldName.replace('_', ' ')}</span>
              <input type="file" name={fieldName} id={fieldName} onChange={(e) => handleFileChange(e, fieldName)} />
              {aircraftFormData[fieldName] && (
                <img src={`data:image/jpeg;base64,${aircraftFormData[fieldName]}`} alt={fieldName} />
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
