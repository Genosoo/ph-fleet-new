/* eslint-disable react/prop-types */
import {  useState, useEffect, useCallback } from "react";
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
  apiUsers,
  apiPersonnelStatus,
  apiPersonnelRank
} from "../../api/api_urls";
import { StyledButtonAdd } from "./StyledComponent"; 
import AddBoxIcon from '@mui/icons-material/AddBox';
import { FaPerson } from "react-icons/fa6";
import { useDropzone } from 'react-dropzone';
import { BiImageAdd } from "react-icons/bi";


export default function FormAdd({ csrfToken }) {
  const [personnelFormData, setPersonnelFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);
  const [status, setStatus ] = useState([])
  const [rank, setRank ] = useState([])
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const image = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      const image1 = reader.result.split(',')[1];

      setSelectedImage(URL.createObjectURL(image));

      setPersonnelFormData((prevData) => ({
        ...prevData,
        personal_details: {
          ...prevData.personal_details,
          image: image1,
        },
      }));

      console.log(image1);
    };

    reader.readAsDataURL(image);
  }, [setPersonnelFormData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [personnelStatusResponse, personnelRankResponse] = await Promise.all([
          axios.get(apiPersonnelStatus),
          axios.get(apiPersonnelRank)
        ]);
        setStatus(personnelStatusResponse.data.success);
        setRank(personnelRankResponse.data.success);

        console.log("status",personnelStatusResponse.data.success);
        console.log("rank", personnelRankResponse.data.success);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
    if (['username', 'latitude', 'longitude'].includes(name)) {
      setPersonnelFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setPersonnelFormData((prevState) => ({
        ...prevState,
        personal_details: {
          ...prevState.personal_details,
          [name]: value
        }
      }));
    }
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

  const handleCreatePersonnel = async (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    if (
      !personnelFormData.username 
    ) {
      setErrorMessage("Please fill in all required fields");
      setOpenErrorMessage(true);
      return; // Prevent form submission
    }

    try {
      const response = await axios.post(apiUsers, personnelFormData, {
        headers: {
          "X-CSRFToken": csrfToken // Add CSRF token to request headers
        }
      });
      console.log("Report submitted:", response.data);
      setPersonnelFormData({});
      setSuccessMessage("Personnel created successfully");
      setOpenSuccessMessage(true);
     
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
        <FaPerson /> Add Personnel</h2>

      <form className="formBox" onSubmit={handleCreatePersonnel}>

          <TextField
            name="username"
            label="Username"
            value={personnelFormData.username || ""}
            onChange={handleInputChange}
            fullWidth
          />

        <TextField
            name="first_name"
            label="First Name"
            value={personnelFormData.personal_details?.first_name || ""}
            onChange={handleInputChange}
            fullWidth
          />

        <TextField
            name="last_name"
            label="Last Name"
            value={personnelFormData.personal_details?.last_name  || ""}
            onChange={handleInputChange}
            fullWidth
          />
   
          <TextField
            name="email"
            label="Email"
            value={personnelFormData.personal_details?.email  || ""}
            onChange={handleInputChange}
            fullWidth
          />


          <TextField
            name="mobile_number"
            label="Mobile Number"
            value={personnelFormData.personal_details?.mobile_number  || ""}
            onChange={handleInputChange}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel id="rank-class-label">Rank</InputLabel>
            <Select
              labelId="rank-class-label"
              id="rank-class-select"
              value={personnelFormData.personal_details?.rank_name  || ""}
              label="Rank"
              name="rank_name"
              onChange={handleInputChange}
            >
              {rank.map((item, index) => (
                <MenuItem key={index} value={item.rank_name}>
                  {item.rank_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="status-class-label">Status</InputLabel>
            <Select
              labelId="status-class-label"
              id="status-class-select"
              value={personnelFormData.personal_details?.status_name  || ""}
              label="Status"
              name="status_name"
              onChange={handleInputChange}
            >
              {status.map((item, index) => (
                <MenuItem key={index} value={item.status_name}>
                  {item.status_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>


        



      <TextField
            name="latitude"
            label="Latitude"
            value={personnelFormData.latitude || ""}
            onChange={handleInputChange}
            fullWidth
          />
       

       <TextField
            name="longitude"
            label="Longitude"
            value={personnelFormData.longitude || ""}
            onChange={handleInputChange}
            fullWidth
          />
       
       
       <div {...getRootProps()} className={isDragActive ? 'dropzone-active' : 'dropzone'}>
          <input {...getInputProps()} id="file-input" />
          {selectedImage ? (
            <div>
              <img src={selectedImage} alt="Selected" className="selected-image" />
            </div>
            ) : (
              <div className="text-[30px] text-gray-500">
                <BiImageAdd />
              </div>
            )}
            {
              isDragActive ?
                <p className='text-xl text-gray-700 font-light'>Drop the logo here...</p> :
                <p className='text-xl text-gray-400 font-light'>Drag and drop an logo here or</p>
            }
            
            <div  className="choose-image-button">
              Choose Logo
            </div>
          </div>
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
