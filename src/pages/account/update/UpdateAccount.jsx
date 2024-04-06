/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import axios from 'axios';
import { Button, TextField, Snackbar, Alert } from '@mui/material';
import { apiAccount } from "../../../api/api_urls";
import GetToken from "../../../components/token/GetToken";

export default function UpdateAccount() {
  const csrfToken = GetToken()
  const { accountData, updateAccountData } = useContext(DataContext);
  const [formData, setFormData] = useState({
    username: accountData?.username || "",
    personal_details: {
      email: accountData?.personal_details?.email || "",
      first_name: accountData?.personal_details?.first_name || "",
      last_name: accountData?.personal_details?.last_name || "",
    },
    role: accountData?.groups && accountData.groups.length > 0 ? accountData.groups[0].name : "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormChanged, setIsFormChanged] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the field is nested under personal_details
    const isNestedField = name.includes('personal_details.');
  
    if (isNestedField) {
      const nestedFieldName = name.split('.')[1]; // Extract the nested field name
      setFormData({
        ...formData,
        personal_details: {
          ...formData.personal_details,
          [nestedFieldName]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Set isFormChanged to true if the value is different from initial value
    setIsFormChanged(true);
  };
  
  const handleSubmit = async () => {
    if (!isFormChanged) {
      return;
    }

    try {
      const dataWithId = { ...formData, id: accountData.id }; // Include the ID in the formData
      const response = await axios.put(apiAccount, dataWithId, {
        headers: {
          "X-CSRFToken": csrfToken
        }
      });
  
      // Update account data in context or state
      updateAccountData(response.data);
  
      setSuccessMessage("Account updated successfully");
      setTimeout(() =>{
        window.location.reload()
      },1000)
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error occurred while updating account data");
    }
  };
  

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };


  return (
    <div className="updateAccountContainer">

<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={!!successMessage || !!errorMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={successMessage ? "success" : "error"}>
          {successMessage || errorMessage}
        </Alert>
      </Snackbar>
      <div className="updateAccountForm">
      <h1>Update Account Information</h1>
      <TextField label="Username" name="username" value={formData.username} onChange={handleInputChange} fullWidth />
      <TextField label="Email" name="personal_details.email" value={formData.personal_details.email} onChange={handleInputChange} fullWidth />
      <TextField label="First Name" name="personal_details.first_name" value={formData.personal_details.first_name} onChange={handleInputChange} fullWidth />
      <TextField label="Last Name" name="personal_details.last_name" value={formData.personal_details.last_name} onChange={handleInputChange} fullWidth />
      <Button variant="contained" onClick={handleSubmit}>Save Changes</Button>
      </div>
    </div>
  )
}
