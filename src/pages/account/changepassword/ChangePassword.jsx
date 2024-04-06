import { useState } from "react";
import { TextField, Button, Snackbar, Alert  } from '@mui/material';
import axios from 'axios';
import { apiAccount } from "../../../api/api_urls";
import GetToken from "../../../components/token/GetToken";

export default function ChangePassword() {
  const csrfToken = GetToken()
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      type: "changepass",
      current_password: formData.currentPassword,
      password: formData.newPassword,
      password2: formData.confirmPassword
    };

    try {
      const response = await axios.post(apiAccount, payload, {
        headers: {
          "X-CSRFToken": csrfToken
        }
      });
      console.log("Password change successful:", response.data);
      // Add any additional logic after successful password change
      setSuccessMessage("Successfully change your password!");
      window.location.reload()
    } catch (error) {
      console.error("Failed to change your password.", error);
      setErrorMessage(error.response.data.error)
    }
  };


  const handleCloseSnackbar = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };


  return (
    <div>

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={!!successMessage || !!errorMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={successMessage ? "success" : "error"}>
          {successMessage || errorMessage}
        </Alert>
      </Snackbar>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Current Password"
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="New Password"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirm New Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Change Password
        </Button>
      </form>
    </div>
  );
}
