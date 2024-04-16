import { TextField,  Select, MenuItem, FormControl,InputLabel, Snackbar, Alert, } from "@mui/material";
import { useState, useContext, useRef, useEffect } from "react";
import { DataContext } from "../../../context/DataProvider";
import { apiIncident } from "../../../api/api_urls";
import GetToken from "../../../components/token/GetToken";
import axios from 'axios';
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import markerIcon from '../../../assets/incident/location.svg';
import L from 'leaflet';
import MapSelection from './MapSelection';
import imageDisplay from '../../../assets/incident/image-display.svg'
import { StyledButtonAdd, StyledFormControlLabel, StyledCheckbox } from "./Styled";

// Define a custom icon
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function AddReport() {
    const { incidentData, incidentType, updateIncidentData } = useContext(DataContext);
    const csrfToken = GetToken();
    const [formData, setFormData] = useState({
        incident_details: "",
        address_incident:"",
        address_reported:"",
        status:1,
        severity:1,
        type:""
    });  

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const mapRef = useRef(null);
    const initialZoom = 5;

    const [showDeviceMarker, setShowDeviceMarker] = useState(true);
    const [deviceLocation, setDeviceLocation] = useState(null);
    const [locationChoice, setLocationChoice] = useState('map');


    useEffect(() => {
        const fetchUserLocation = () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                setFormData({
                  ...formData,
                  glatitude_reported: latitude,
                  glongitude_reported: longitude,
    
                  glatitude_incident: latitude,
                  glongitude_incident: longitude,
                });
                
              },
              (error) => {
                console.error('Error getting user location:', error);
              }
            );
          } else {
            console.error('Geolocation is not supported by this browser.');
          }
        };
    
        fetchUserLocation();
      }, []);

    useEffect(() => {
        const fetchAddress = async () => {
          try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${formData.glatitude_reported}&lon=${formData.glongitude_reported}&format=json`);
            const { address } = response.data;
            const { road, city, county, state, postcode, country, building } = address;
            const formattedAddress = `${building ? building + ', ' : ''}${road ? road + ', ' : ''}${city ? city + ', ' : ''}${county ? county + ', ' : ''}${state ? state + ', ' : ''}${postcode ? postcode + ', ' : ''}${country ? country : ''}`;
            setFormData((prevFormData) => ({
              ...prevFormData,
              address_reported: formattedAddress,
            }));
    
            console.log('Address response:', response);
          } catch (error) {
            console.error('Error fetching address:', error);
          }
        };
      
        if (formData.glatitude_reported && formData.glongitude_reported) {
          fetchAddress();
        }
      }, [formData.glatitude_reported, formData.glongitude_reported]);
      
      


    const handleLocationChoiceChange = (event) => {
        if (event.target.value === 'map') {
          // Reset the map's zoom level
          if (mapRef.current) {
            mapRef.current.setView([12.8797, 121.774], initialZoom);
          }
        }
        // Handle other location choices if needed
        setLocationChoice(event.target.value);
      
      };
      


    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

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


    const handleAddReport = async () => {
        try {
          if (formData.incident_image) {
            const response = await axios.post(apiIncident, formData, {
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });
            const newReport = response.data.data;
            updateIncidentData([...incidentData, newReport]);
            setFormData({
                type: '',
                incident_details: '',
                glongitude_incident: '',
                glatitude_incident: '',
                address_incident: '',
                glongitude_reported: '',
                glatitude_reported: '',
                incident_image: null,
            });
            showSuccessMessage("Report added successfully!");

        } else {
            showErrorMessage("Please select an image .");
        }
          
        } catch (error) {
            console.error('Error adding report:', error);
            showErrorMessage("Failed to add report!");
        }
    };


    const handleFormChange = (e) => {
            const { name, value } = e.target;
            if (name.includes(".")) {
                const [key, subKey] = name.split(".");
                setFormData(prevState => ({
                    ...formData,
                    [key]: {
                        ...prevState[key],
                        [subKey]: value
                    }
                }));
            } else {
                setFormData({ ...formData, [name]: value });
            }
        };


   


        const handleMapChange = async (location) => {
            try {
              const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`);
              const { address } = response.data;
              const { road, city, county, state, postcode, country } = address;
              const formattedAddress = `${road ? road + ', ' : ''}${city ? city + ', ' : ''}${county ? county + ', ' : ''}${state ? state + ', ' : ''}${postcode ? postcode + ', ' : ''}${country ? country : ''}`;
              setFormData({
                ...formData,
                glatitude_incident: location.lat,
                glongitude_incident: location.lng,
                address_incident: formattedAddress
              });

                // Zoom the map to the selected location
        mapRef.current.setView([location.lat, location.lng], 14, { animate: true });

              console.log('address map', response)
              // Hide the device marker when the user selects a location on the map
              setShowDeviceMarker(false);
            } catch (error) {
              console.error('Error fetching address:', error);
            }
          };


          const handleDeviceLocation = () => {
            console.log('Attempting to get device location...');
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                async (position) => {
                  console.log('Device location retrieved successfully:', position.coords);
                  const { latitude, longitude } = position.coords;
                  setDeviceLocation({ latitude, longitude });
          
                  // Update the map's center and zoom level
                  mapRef.current.setView([latitude, longitude], 14,  { animate: true }); // 14 is an example zoom level
          
                  setShowDeviceMarker(true); // Show the device marker again
                  try {
                    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                    const { address } = response.data;
                    const { road, city, county, state, postcode, country, building } = address;
                    const formattedAddress = `${building ? building + ', ' : ''}${road ? road + ', ' : ''}${city ? city + ', ' : ''}${county ? county + ', ' : ''}${state ? state + ', ' : ''}${postcode ? postcode + ', ' : ''}${country ? country : ''}`;
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      address_incident: formattedAddress
                    }));
                  } catch (error) {
                    console.error('Error fetching address:', error);
                  }
                },
                (error) => {
                  console.error('Error getting user location:', error);
                }
              );
            } else {
              console.error('Geolocation is not supported by this browser.');
            }
          };

          
          const handleFileChange = (e ) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
              let base64String = reader.result.split(",")[1];
              setFormData({
                ...formData,
                    incident_image: base64String
              });
            };
            reader.readAsDataURL(file);
          };
          

         

  return (
    <div className="reportAddContainer">
        <Snackbar  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
                <Alert variant="filled" onClose={handleSnackbarClose} severity={successMessage ? "success" : "error"}>
                    {successMessage || errorMessage}
                </Alert>
            </Snackbar>

           <div className="reportAddBoxWrapper">
             <div className="reportAddBox"> 
                 <div className="reportAddBoxInputs">
                   <span>
                      <p>Incident Description</p>
                      <TextField
                    autoFocus
                    margin="dense"
                    name="incident_details"
                    value={formData.incident_details}
                    onChange={handleFormChange}
                    label="Description..."
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                />
                   </span>

                 <span>
                  <p>Incident Type</p>
                  <FormControl fullWidth>
                    <InputLabel id="type">Incident Type</InputLabel>
                    <Select labelId="type"  name="type" value={formData.type}   onChange={handleFormChange} fullWidth >
                            {incidentType.map(type => (
                                <MenuItem key={type.id} value={type.id}>
                                    {type.type_name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                 </span>
                <span>
                  <p>Upload Image</p>
                  <div className="reportAddImageUpload">
                  <input type="file" name="incident_image" onChange={handleFileChange} />
                  {formData.incident_image ? (
                      <img src={`data:image/png;base64,${formData.incident_image}`} alt="Selected Incident Image" style={{ maxWidth: '100%', marginTop: '10px' }} />
                  ) : (
                      <img src={imageDisplay} alt="Selected Incident Image" style={{ maxWidth: '100%', marginTop: '10px' }} />
                  )}
                </div>
                </span>
                
                 </div>

                 <StyledButtonAdd variant="contained" onClick={handleAddReport}>
                   Submit Report
                  </StyledButtonAdd>

                </div>




             <div className="reportAddBox3">
               <span className="">
               <p>Enter or Select Incident Address on the Map</p>
               <TextField
                        autoFocus
                        margin="dense"
                        name="address_incident"
                        label="Incident Address"
                        type="text"
                        fullWidth
                        value={formData.address_incident}
                        onChange={handleFormChange}
                    />   
                  <div className="addressBox">
                    <StyledFormControlLabel control={<StyledCheckbox
                        value="device"
                        checked={locationChoice === 'device'}
                        onChange={handleLocationChoiceChange}
                        onClick={handleDeviceLocation} 
                        defaultChecked />} label=" Use Current Location" />

                    <StyledFormControlLabel control={<StyledCheckbox
                        type="radio"
                        value="map"
                        checked={locationChoice === 'map'}
                        onChange={handleLocationChoiceChange}
                        />} label="Select on map" />
                  </div >
               </span>
                  
                  <span>
                    <p>Incident Address</p>
                  
                  </span>

                        <div className="reportAddMapContainer">
                        <MapContainer  ref={mapRef}  center={[12.8797, 121.774]}  zoom={initialZoom} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en" subdomains={['mt0', 'mt1', 'mt2', 'mt3']} />
                              {locationChoice !== 'device' && <MapSelection onChange={handleMapChange} />}
                              {/* Render the deviceLocation marker only if locationChoice is 'device' and showDeviceMarker is true */}
                              {locationChoice === 'device' && showDeviceMarker && deviceLocation && (
                              <Marker position={[deviceLocation.latitude, deviceLocation.longitude]} icon={customIcon} />
                              )}
                            </MapContainer>
                    </div>

                  <span>
                    <p>Reported Address</p>
                    <TextField
                    autoFocus
                    margin="dense"
                    name="address_reported"
                    type="text"
                    fullWidth
                    disabled
                    value={formData.address_reported}
                    onChange={handleFormChange}
                />   
                  </span>

             </div>

           </div>

    </div>
  )
}
