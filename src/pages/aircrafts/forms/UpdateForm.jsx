import "./AircraftsForm.css"
import { StyledTextField, StyledFormControl } from "./Styled";
import axios from 'axios';
import {  InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import {  apiAircraftType, apiAircraftData, baseUrl} from "../../../api/api_urls";
import { useDropzone } from 'react-dropzone'
import { DataContext } from "../../../context/DataProvider";
import GetToken from '../../../components/token/GetToken'
import { message } from 'antd';
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useLocation} from 'react-router-dom';

export default function AddForm() {
  const location = useLocation();
  console.log({location });
  const item = location.state.aircraft;
  const csrfToken = GetToken()
  const [formData, setFormData] = useState({
    unit_id2:item?.unit_id2 || "",
    aircraft_name:item?.aircraft_name || "",
    wingspan:item?.wingspan || "",
    crew:item?.crew || "",
    fuel_capacity:item?. fuel_capacity || "",
    height:item?.height || "",
    length:item?.length || "",
    maximum_speed:item?.maximum_speed || "",
    max_take_off_weight:item?.max_take_off_weight || "",
    range: item?.range || "",
    payload:item?.payload || "",
    variant:item?.variant || "",
    aircraft_type:item?.aircraft_type || "",
    wing_area:item?.wing_area || ""
  });

  const { aircraftsData, updateAircraftsData } = useContext(DataContext);
  const [typeData, setTypeData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typeResponse ] = await Promise.all([
          axios.get(apiAircraftType),
        ]);
        setTypeData(typeResponse.data.success);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);


  const { getRootProps: getRootPropsLeft, getInputProps: getInputPropsLeft } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => handleFileChange(acceptedFiles, 'image_left')
  });
  
  const { getRootProps: getRootPropsRight, getInputProps: getInputPropsRight } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => handleFileChange(acceptedFiles, 'image_right')
  });
  
  const { getRootProps: getRootPropsFront, getInputProps: getInputPropsFront } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => handleFileChange(acceptedFiles, 'image_front')
  });
  
  const { getRootProps: getRootPropsBack, getInputProps: getInputPropsBack } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => handleFileChange(acceptedFiles, 'image_back')
  });


  const { getRootProps: getRootPropsMain, getInputProps: getInputPropsMain } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => handleFileChange(acceptedFiles, 'image_main')
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateVessel = async () => {

    if (formData.unit_id2.trim() === "" ) {
      message.error('Please enter unit id');
      return;
    }

    if (formData.aircraft_name.trim() === "" ) {
      message.error('Please enter aircraft name');
      return;
    }

    if (formData.aircraft_name.trim() === "" || formData.aircraft_name.length < 8) {
      message.error('Please enter a aircraft name with at least 8 characters.');
      return;
    }


   if (formData.crew === "" ) {
    message.error('Please enter crew');
    return;
  }

  if (formData.variant === "" ) {
    message.error('Please enter variant');
    return;
  }

  if (formData.range === "" ) {
    message.error('Please enter range');
    return;
  }

  if (formData.fuel_capacity === "" ) {
    message.error('Please enter fuel capacity');
    return;
  }

  if (formData.height === "" ) {
    message.error('Please enter height');
    return;
  }

  if (formData.length === "" ) {
    message.error('Please enter length');
    return;
  }


  if (formData.max_take_off_weight === "" ) {
    message.error('Please enter maximum take off weight');
    return;
  }


  if (formData.wing_area === "" ) {
    message.error('Please enter wing area');
    return;
  }

  
  if (formData.wingempty_weight === "" ) {
    message.error('Please enter wing empty weight');
    return;
  }

  if (formData.wingspan === "" ) {
    message.error('Please enter wing span');
    return;
  }

    if (formData.aircraft_type === "" ) {
      message.error('Please select aircraft type');
      return;
   }

   
  

   setIsSubmitting(true)
    try {
      const updatedFormData = { ...formData, id: item.id  };
        const response = await axios.put(apiAircraftData, updatedFormData, {
            headers: {
                'X-CSRFToken': csrfToken
            }
        });
        const newAircraft = response.data.data;
        updateAircraftsData([...aircraftsData, newAircraft]);
        message.success("Aircraft Updated successfully!");
    } catch (error) {
        console.error('Error update aircraft:', error);
        message.error("Failed to update Aircraft");
    } finally {
      setIsSubmitting(false)
    }
  };


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

  const handleFileChange = (acceptedFiles, fieldName) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      let base64String = reader.result.split(",")[1];
      setFormData((prevState) => ({
        ...prevState,
        [fieldName]: base64String
      }));
    };
    reader.readAsDataURL(file);
  };



  return (
    <div className="aircraftFormContainer">
          <div className="aircraftFormWrapper">
            <div className="aircraftFormImgBox">
            <h2>Aircraft Image</h2>
            <div className="aircraftImageMainCard" {...getRootPropsMain()}>
            <input {...getInputPropsMain()} />
                    <img src={`${baseUrl}${item.image_main}`} alt="" />
                    {formData.image_main && (
                      <img src={`data:image/jpeg;base64,${formData.image_main}`} alt="Uploaded" />
                    )}
                    
                    <AiOutlineCloudUpload/>
                    <p>Drag & Drop or <span> Choose file</span> here</p>
                      </div>
            </div>
            <div className="aircraftImageContainer">
                <h2>Aircraft Perception</h2>
                 <div className="aircraftImageWrapper">
                    <div className="aircraftImageCardBox">
                    <h3>Front View</h3>
                    <div className="aircraftImageCard" {...getRootPropsFront()}>
                        <input {...getInputPropsFront()} />
                       <img src={`${baseUrl}${item.image_front}`} alt="" />
                        {formData.image_front && (
                          <img src={`data:image/jpeg;base64,${formData.image_front}`} alt="Uploaded" />
                        )}
                        <AiOutlineCloudUpload/>
                        <p>Drag & Drop or <span> Choose file</span> here</p>
                      </div>
                  </div>

                  <div className="aircraftImageCardBox">
                    <h3>Back View</h3>
                    <div className="aircraftImageCard" {...getRootPropsBack()}>
                        <input {...getInputPropsBack()} />
                        <img src={`${baseUrl}${item.image_back}`} alt="" />
                        {formData.image_back && (
                          <img src={`data:image/jpeg;base64,${formData.image_back}`} alt="Uploaded" />
                        )}
                        <AiOutlineCloudUpload/>
                        <p>Drag & Drop or <span> Choose file</span> here</p>
                      </div>
                  </div>
                </div>

                <div className="aircraftImageWrapper">
                    <div className="aircraftImageCardBox">
                    <h3>Right Side View</h3>
                    <div className="aircraftImageCard" {...getRootPropsRight()}>
                        <input {...getInputPropsRight()} />
                        <img src={`${baseUrl}${item.image_right}`} alt="" />
                        {formData.image_right && (
                          <img src={`data:image/jpeg;base64,${formData.image_right}`} alt="Uploaded" />
                        )}
                        <AiOutlineCloudUpload/>
                        <p>Drag & Drop or <span> Choose file</span> here</p>
                      </div>
                  </div>

                  <div className="aircraftImageCardBox">
                    <h3>Left Side View</h3>
                    <div className="aircraftImageCard" {...getRootPropsLeft()}>
                        <input {...getInputPropsLeft()} />
                        <img src={`${baseUrl}${item.image_left}`} alt="" />
                        {formData.image_left && (
                          <img src={`data:image/jpeg;base64,${formData.image_left}`} alt="Uploaded" />
                        )}
                        <AiOutlineCloudUpload/>
                        <p>Drag & Drop or <span> Choose file</span> here</p>
                      </div>
                  </div>
                </div>
             </div>
          </div>

          <div className="aircraftFormWrapper2">
            
          <div className="aircraftFormDetail">
                    <h2>Aircraft Details</h2>
                      <StyledTextField 
                        value={formData.unit_id2} 
                        onChange={handleFormChange}  
                        autoFocus  
                        margin="dense" 
                        name="unit_id2" 
                        label="Unit ID" 
                        type="text"  
                        fullWidth />
                      <StyledTextField
                        value={formData.aircraft_name}
                        onChange={handleFormChange} 
                        autoFocus
                        margin="dense"
                        name="aircraft_name"
                        label="Aircraft Name" 
                        type="text"  
                        fullWidth />
                      <StyledTextField
                      value={formData.crew} 
                        onChange={handleFormChange}  
                        autoFocus  
                        margin="dense"  
                        name="crew" 
                        label="Crew" 
                        type="text"  
                        fullWidth />
                      <StyledTextField
                        value={formData.variant} 
                        onChange={handleFormChange}  
                        autoFocus  
                        margin="dense"  
                        name="variant" 
                        label="Variant" 
                        type="text"  
                        fullWidth />
                         <StyledTextField
                        value={formData.range} 
                        onChange={handleFormChange}  
                        autoFocus  
                        margin="dense"  
                        name="range" 
                        label="Range" 
                        type="text"  
                        fullWidth />
                      <StyledTextField 
                        value={formData.fuel_capacity} 
                        onChange={handleFormChange}  
                        autoFocus  
                        margin="dense"  
                        name="fuel_capacity" 
                        label="Fuel Capacity" 
                        type="text" 
                        fullWidth />
                      <StyledTextField 
                        value={formData.height} 
                        onChange={handleFormChange} 
                        autoFocus  
                        margin="dense"  
                        name="height" 
                        label="Height" 
                        type="text"  
                        fullWidth />
                      <StyledTextField 
                        value={formData.length} 
                        onChange={handleFormChange} 
                        autoFocus  
                        margin="dense"  
                        name="length" 
                        label="Length" 
                        type="text"  
                        fullWidth />
                       <StyledTextField 
                        value={formData.maximum_speed} 
                        onChange={handleFormChange} 
                        autoFocus  
                        margin="dense"  
                        name="maximum_speed" 
                        label="Maximum Speed" 
                        type="text"  
                        fullWidth />
                      <StyledTextField 
                        value={formData.max_take_off_weight} 
                        onChange={handleFormChange} 
                        autoFocus  
                        margin="dense"  
                        name="max_take_off_weight" 
                        label="Maximum Take Off Weight" 
                        type="text"  
                        fullWidth />
                      <StyledTextField 
                        value={formData.wing_area} 
                        onChange={handleFormChange} 
                        autoFocus  
                        margin="dense"  
                        name="wing_area" 
                        label="Wing Area" 
                        type="text"  
                        fullWidth />
                      <StyledTextField 
                        value={formData.wingempty_weight} 
                        onChange={handleFormChange} 
                        autoFocus  
                        margin="dense"  
                        name="wingempty_weight" 
                        label="Wing Empty Weight" 
                        type="text"  
                        fullWidth />
                         <StyledTextField 
                        value={formData.wingspan} 
                        onChange={handleFormChange}  
                        autoFocus  
                        margin="dense"  
                        name="wingspan" 
                        label="Wign Span" 
                        type="text"  
                        fullWidth />
                      
                        <StyledFormControl fullWidth>
                          <InputLabel id="type">Type</InputLabel>
                          <Select
                            labelId="type"
                            id="type"
                            value={formData.aircraft_type}
                            name="aircraft_type"
                            onChange={handleInputChange}
                          >
                            {typeData.map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.type_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </StyledFormControl>

            </div>
            <button className="aircraftBtn" onClick={handleUpdateVessel} disabled={isSubmitting}>
               {isSubmitting ? "Updating Aircraft" : "Update Aircraft"}
            </button>
      
          </div>

    </div>

   
  )
}
