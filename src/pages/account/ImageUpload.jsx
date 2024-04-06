/* eslint-disable react/prop-types */
import { useState } from "react";
import { Dialog, DialogTitle, DialogActions, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { apiAccount } from "../../api/api_urls";

export default function ImageUpload({ open, onClose, onUpload, csrfToken }) {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // State to store the temporary URL of the selected image
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file)); // Create a temporary URL for the selected image
  };

  const handleUpload = async () => {
    if (!imageFile) {
      // No file selected
      return;
    }
  
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64String = reader.result.split(',')[1]; // Extract Base64 string from Data URL
  
        // Prepare the payload with image data in Base64 format
        const payload = {
            personal_details:{
                image:  base64String,
            }
          };
  
        // Add CSRF token to the headers
        const headers = {
          'X-CSRFToken': csrfToken
        };
  
        // Make a POST request to the apiAccount endpoint with the payload and headers
        const response = await axios.put(apiAccount, payload, { headers });
  
        // Assuming the response contains updated image data
        onUpload(response.data);
        onClose();
        setSuccessMessage("Successfully change your profile picture!");
        setTimeout(() =>{
            window.location.reload()
          },1000)
      } catch (error) {
        // Handle error
        console.error("Error uploading image:", error);
       setErrorMessage("Failed to change your profile picture");

      }
    };
  
    // Read the file as Data URL
    reader.readAsDataURL(imageFile);
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };
  
  return (
    <>
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={!!successMessage || !!errorMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
    <Alert onClose={handleCloseSnackbar} severity={successMessage ? "success" : "error"}>
      {successMessage || errorMessage}
    </Alert>
  </Snackbar>
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Change Profile Picture</DialogTitle>
        <div className="imageUploadBoxWrapper">
            <div className="imageUploadBox">
            {imageUrl && <img src={imageUrl} alt="Selected Image" className="" />} {/* Display the selected image */}
            <input type="file" accept="image/*" onChange={handleFileChange} className=""/>
        </div>
        </div>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained"  onClick={handleUpload} disabled={!imageFile}>Upload</Button>
      </DialogActions>
    </Dialog>
    </>
  );
}
