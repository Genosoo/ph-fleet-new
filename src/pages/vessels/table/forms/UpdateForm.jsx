import { StyledTextField } from "../Styled";
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { apiVesselClass, apiVesselType, apiVesselStatus, apiVesselsData, baseUrl } from "../../../../api/api_urls";
import { useDropzone } from 'react-dropzone'
import { DataContext } from "../../../../context/DataProvider";
import GetToken from '../../../../components/token/GetToken'
import { message } from 'antd';
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./VesselsForm.css"
import { useLocation} from 'react-router-dom';

export default function AddForm() {
  const location = useLocation();
  console.log({location });
  const item = location.state.vessel;
  const csrfToken = GetToken()
  const [formData, setFormData] = useState({
    vessel_name:item?.vessel_name || "",
    vessel_description:item?.description || "",
    hull_number:item?.hull_number || "",
    beam:item?.beam || "",
    origin:item?.origin || "",
    capacity:item?.capacity || "",
    vessel_class:item?.vessel_class || "",
    vessel_type:item?.vessel_type || "",
    unit:item?.unit || "",
    vessel_status:item?.vessel_status || "",
   
  });

  const { vesselsData, updateVesselsData, unitData } = useContext(DataContext);
  const [classData, setClassData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classResponse, typeResponse, statusResponse] = await Promise.all([
          axios.get(apiVesselClass),
          axios.get(apiVesselType),
          axios.get(apiVesselStatus)
        ]);
        setClassData(classResponse.data.success);
        setTypeData(typeResponse.data.success);
        setStatusData(statusResponse.data.success);
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

    if (formData.vessel_name.trim() === "" ) {
      message.error('Please enter vessel name');
      return;
    }

    if (formData.vessel_name.trim() === "" || formData.vessel_name.length < 8) {
      message.error('Please enter a vessel name with at least 8 characters.');
      return;
  }


      if (formData.vessel_description.trim() === "" ) {
        message.error('Please enter vessel description');
        return;
    }

    if (formData.vessel_description.trim() === "" || formData.vessel_description.length < 8) {
      message.error('Please enter a vessel description with at least 8 characters.');
      return;
  }

  if (formData.hull_number.trim() === "" ) {
    message.error('Please enter vessel hull number');
    return;
}

      if (formData.beam.trim() === "" ) {
        message.error('Please enter vessel beam');
        return;
    }

    if (formData.origin.trim() === "" ) {
      message.error('Please enter vessel origin');
      return;
    }

      
    if (formData.capacity.trim() === "" ) {
      message.error('Please enter vessel capacity');
      return;
    }

    if (formData.vessel_class === "" ) {
      message.error('Please select vessel class');
      return;
   }


      if (formData.vessel_type === "" ) {
        message.error('Please select enter vessel type');
        return;
    }

    if (formData.unit === "" ) {
      message.error('Please select enter unit');
      return;
  }


    if (formData.vessel_status === "" ) {
      message.error('Please select  vessel status');
      return;
    }
    setIsSubmitting(true);

    try {
      const updatedFormData = { ...formData, id: item.id };
        const response = await axios.put(apiVesselsData, updatedFormData, {
            headers: {
                'X-CSRFToken': csrfToken
            }
        });
        const newVessel = response.data.data;
        updateVesselsData([...vesselsData, newVessel]);

        message.success("Vessel updated successfully!");
    } catch (error) {
        console.error('Error updating user:', error);
        message.error("Failed to update vessel");
    } finally {
      setIsSubmitting(false);
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
    <div className="vesselsFormContainer">
          <div className="vesselsFormWrapper">
            <div className="vesselsFormImgBox">
            <h2>Vessel Image</h2>
            <div className="vesselsImageMainCard" {...getRootPropsMain()}>
                    <input {...getInputPropsMain()} />
                   {formData.image_main ? (
                      <img src={`data:image/jpeg;base64,${formData.image_main}`} alt="Uploaded" />
                   ): (
                    <img src={`${baseUrl}${item.image_main}`} alt="" />
                   )}
                    <AiOutlineCloudUpload/>
                    <p>Drag & Drop or <span> Choose file</span> here</p>
                  </div>
            </div>
            <div className="vesselsImageContainer">
                <h2>Vessel Perception</h2>
                 <div className="vesselsImageWrapper">
                    <div className="vesselsImageCardBox">
                    <h3>Front View</h3>
                    <div className="vesselsImageCard" {...getRootPropsFront()}>
                        <input {...getInputPropsFront()} />
                        <img src={`${baseUrl}${item.image_front}`} alt="" />
                        {formData.image_front && (
                          <img src={`data:image/jpeg;base64,${formData.image_front}`} alt="Uploaded" />
                        )}
                        <AiOutlineCloudUpload/>
                        <p>Drag & Drop or <span> Choose file</span> here</p>
                      </div>
                  </div>

                  <div className="vesselsImageCardBox">
                    <h3>Back View</h3>
                    <div className="vesselsImageCard" {...getRootPropsBack()}>
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

                <div className="vesselsImageWrapper">
                    <div className="vesselsImageCardBox">
                    <h3>Right Side View</h3>
                    <div className="vesselsImageCard" {...getRootPropsRight()}>
                        <input {...getInputPropsRight()} />
                        <img src={`${baseUrl}${item.image_right}`} alt="" />
                        {formData.image_right && (
                          <img src={`data:image/jpeg;base64,${formData.image_right}`} alt="Uploaded" />
                        )}
                        <AiOutlineCloudUpload/>
                        <p>Drag & Drop or <span> Choose file</span> here</p>
                      </div>
                  </div>

                  <div className="vesselsImageCardBox">
                    <h3>Left Side View</h3>
                    <div className="vesselsImageCard" {...getRootPropsLeft()}>
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

          <div className="vesselsFormWrapper2">
            
          <div className="vesselsFormDetail">
                    <h2>Vessel Details</h2>
                    <StyledTextField value={formData.vessel_name} onChange={handleFormChange}  autoFocus  margin="dense"  name="vessel_name" label="Vessel Name" type="text"  fullWidth />
                      <StyledTextField
                       rows={4}
                       multiline
                      value={formData.vessel_description} onChange={handleFormChange}  autoFocus  margin="dense"  name="vessel_description" label="Vessel Description" type="text"  fullWidth />
                      <StyledTextField value={formData.hull_number} onChange={handleFormChange}  autoFocus  margin="dense"  name="hull_number" label="Hull Number" type="text"  fullWidth />
                      <StyledTextField value={formData.beam} onChange={handleFormChange}  autoFocus  margin="dense"  name="beam" label="Beam" type="text"  fullWidth />
                      <StyledTextField value={formData.origin} onChange={handleFormChange}  autoFocus  margin="dense"  name="origin" label="Origin" type="text"  fullWidth />
                      <StyledTextField value={formData.capacity} onChange={handleFormChange}  autoFocus  margin="dense"  name="capacity" label="Capacity" type="text"  fullWidth />
                    
                      <FormControl fullWidth>
                          <InputLabel id="class">Class</InputLabel>
                          <Select
                            labelId="class"
                            id="class"
                            value={formData.vessel_class}
                            name="vessel_class"
                            onChange={handleInputChange}
                          >
                            {classData.map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.class_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl fullWidth>
                          <InputLabel id="type">Type</InputLabel>
                          <Select
                            labelId="type"
                            id="type"
                            value={formData.vessel_type}
                            name="vessel_type"
                            onChange={handleInputChange}
                          >
                            {typeData.map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.type_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        
                        <FormControl fullWidth>
                          <InputLabel id="unit">Unit</InputLabel>
                          <Select
                            labelId="unit"
                            id="unit"
                            value={formData.unit}
                            name="unit"
                            onChange={handleInputChange}
                          >
                            {unitData.map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.unit_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl fullWidth>
                          <InputLabel id="status">Status</InputLabel>
                          <Select
                            labelId="status"
                            id="status"
                            value={formData.vessel_status}
                            name="vessel_status"
                            onChange={handleInputChange}
                          >
                            {statusData.map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.status_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

            </div>
            <button className="vesselsBtn" onClick={handleUpdateVessel} disabled={isSubmitting}>
              {isSubmitting? "Updating Vessel..." : "Update Vessel"}
              </button>
      
          </div>

    </div>

   
  )
}
