import { useState, useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import './Styles.css';
import {baseUrl } from "../../api/api_urls";
import { Snackbar, Alert } from '@mui/material';
import GetToken from "../../components/token/GetToken";
import noImg from '../../assets/no-user-image.png';
import ButtonChangePass from "./buttons/ButtonChangePass";
import ImageUpload from "./ImageUpload";
import ButtonEditAccount from "./buttons/ButtonEditAccount";
import ButtonChangePicture from "./buttons/ButtonChangePicture";


export default function Account() {
  const csrfToken = GetToken();
  const { accountData} = useContext(DataContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false); 


  

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleImageUpload = (imageFile) => {
    // Handle image upload logic here
    console.log("Image uploaded:", imageFile);
    // You can set the uploaded image data in the formData state or handle it accordingly
  };

  return (
    <div className="accountContainer">
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={!!successMessage || !!errorMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={successMessage ? "success" : "error"}>
          {successMessage || errorMessage}
        </Alert>
      </Snackbar>
      <div className="accountTopFlex">
        <h1>Account</h1>
      </div>
      <div className="accountWrapper">
        <div className="accountBoxWrapper">
          <div className="accountBox">
          <img
              className="profileImage"
              src={`${baseUrl}${accountData?.personal_details?.image}`}
              alt=""
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = noImg; // Set default image URL here
              }}
            />
         
           <div className="flex flex-col gap-3">
             <ButtonChangePicture  setIsImageDialogOpen={setIsImageDialogOpen} />
            <ButtonChangePass />
            <ButtonEditAccount />
           </div>
          </div>
          <div className="accountInputBox">
            <span>Username</span>
            <p>{accountData?.username || "N/A"}</p>
          </div>
          <div className="accountInputBox">
            <span>Email</span>
            <p>{accountData?.personal_details?.email || "N/A"}</p>
          </div>
          <div className="accountInputBox">
            <span>First Name</span>
            <p>{accountData?.personal_details?.first_name || "N/A"}</p>
          </div>
          <div className="accountInputBox">
            <span>Last Name</span>
            <p>{accountData?.personal_details?.last_name || "N/A"}</p>
          </div>
          <div className="accountInputBox">
            <span>Role</span>
            <p>{accountData?.groups?.[0]?.name || "N/A"}</p>
          </div>
        </div>
      </div>
    
      <ImageUpload
        open={isImageDialogOpen}
        onClose={() => setIsImageDialogOpen(false)}
        onUpload={handleImageUpload}
        csrfToken={csrfToken}
      />
    </div>
  );
}
