import { useLocation} from 'react-router-dom';
import GetToken from "../../../components/token/GetToken";
import { apiIncident, baseUrl } from '../../../api/api_urls';
import { DataContext } from '../../../context/DataProvider';
import { useContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { TextField,  Select, MenuItem, FormControl,InputLabel, Snackbar, Alert, } from "@mui/material";
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import MapSelection from '../addIncident/MapSelection';
import markerIcon from '../../../assets/incident/location.svg';
import L from 'leaflet';
import { StyledButtonAdd, StyledFormControlLabel, StyledCheckbox } from "./Styled";


const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function UpdateReport() {
  const location = useLocation();
    console.log({location});
  
    const csrfToken = GetToken()
    const item = location.state.incident
    const incidentId = location.state.incident.id;
    const {incidentData, incidentType, updateIncidentData } = useContext(DataContext)
    const [formData, setFormData] = useState({
      incident_details: item?.incident_details || "",
      address_incident: item?.address_incident || "",
      type: item?.type || "",
      user: item?.user || "",
      incident_image: item?.incident_image || "",


    
  });
  const mapRef = useRef(null);
  const initialZoom = 5;

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showDeviceMarker, setShowDeviceMarker] = useState(true);
    const [deviceLocation, setDeviceLocation] = useState(null);
    const [locationChoice, setLocationChoice] = useState('map');
    const [selectedImage, setSelectedImage] = useState(null);


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

    const handleUpdateUser = async () => {
      try {
          const updatedFormData = { ...formData, id: incidentId };

          const response = await axios.put(apiIncident, updatedFormData, {
              headers: {
                  'X-CSRFToken': csrfToken
              }
          });
          const updatedIncident = response.data.data;
          const updatedIncidents = incidentData.map(incident => {
              if (incident.id === updatedIncident.id) {
                  return updatedIncident;
              }
              return incident;
          });
          updateIncidentData(updatedIncidents);
          showSuccessMessage("User updated successfully!");
      } catch (error) {
          console.error('Error updating user:', error);
          showErrorMessage("Failed to update user!");
      }
  };

  
  // const handleFileChange = (e ) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     let base64String = reader.result.split(",")[1];
  //     setFormData({
  //       ...formData,
  //           incident_image: base64String
  //     });
  //   };
  //   reader.readAsDataURL(file);
  // };
  
  const handleFileChange = (e ) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      let base64String = reader.result.split(",")[1];
      setFormData({
        ...formData,
        incident_image: base64String
      });
      setSelectedImage(reader.result); // Set the selected image
    };
    reader.readAsDataURL(file);
  };


  return (
    <div className='updateReportContainer'>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
                <Alert variant="filled" onClose={handleSnackbarClose} severity={successMessage ? "success" : "error"}>
                    {successMessage || errorMessage}
                </Alert>
            </Snackbar>

            <span>
                  <p>Upload Image</p>
                  <div className="">
                  <input type="file" name="incident_image" onChange={handleFileChange} />
                  {!selectedImage ? (
                    <img className='updateReportImage' src={`${baseUrl}${formData.incident_image}`} alt="Selected Incident Image" style={{ maxWidth: '100%', marginTop: '10px' }} />
                  ): (
                    <img className='updateReportImage' src={selectedImage} alt="Selected Incident Image" style={{ maxWidth: '100%', marginTop: '10px' }} />
                  )}
                </div>
                </span> 

              <div>
                <p>Incident Details</p>
                <TextField
                    autoFocus
                    margin="dense"
                    name="incident_details"
                    label="Incident Details"
                    type="text"
                    fullWidth
                    value={formData.incident_details}
                    onChange={handleFormChange}
                />
              </div>

                <div>
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
                </div>

                    <div className="">
                    <span>
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
                   </span>
                      <span className="">
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
                    </div>
                    <div className="updateMapBox">
                      <MapContainer  ref={mapRef}  center={[12.8797, 121.774]}  zoom={initialZoom} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en" subdomains={['mt0', 'mt1', 'mt2', 'mt3']} />
                              {locationChoice !== 'device' && <MapSelection onChange={handleMapChange} />}
                              {/* Render the deviceLocation marker only if locationChoice is 'device' and showDeviceMarker is true */}
                              {locationChoice === 'device' && showDeviceMarker && deviceLocation && (
                              <Marker position={[deviceLocation.latitude, deviceLocation.longitude]} icon={customIcon} />
                              )}
                      </MapContainer>
                    </div>   
            
                <StyledButtonAdd onClick={handleUpdateUser}>Update Report</StyledButtonAdd>
    </div>
  )
}
