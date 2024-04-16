import { apiReportIn } from "../../api/api_urls"
import axios from 'axios';
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import L from 'leaflet';
// import MapSelection from './MapSelection';
import { useState, useEffect, useRef, useContext} from "react";
import { TextField, Snackbar, Alert, } from "@mui/material";
import { StyledButtonAdd } from "./Styled";
import markerIcon from '../../assets/incident/location.svg';
import GetToken from "../../components/token/GetToken";
import { DataContext } from "../../context/DataProvider";

const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
  

export default function ReportIn() {
    const csrfToken = GetToken()
    const { checkInData, reportInData, updateReportInData } = useContext(DataContext);
    const [showDeviceMarker, setShowDeviceMarker] = useState(true);
    const [deviceLocation, setDeviceLocation] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [locationChoice, setLocationChoice] = useState('device');
    const mapRef = useRef(null);
    const initialZoom = 5;
    const [formData, setFormData] = useState({
        glatitude:"",
        glongitude:"",
        address: "",
    });  

    // const accountID =  accountData.personal_details.user;
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);


    console.log("Check In:", checkInData)

    useEffect(() => {
        const fetchLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setFormData({
                            ...formData,
                            glatitude:latitude,
                            glongitude: longitude,
                        });
                    },
                    (error) => {
                        console.log('Error getting location:', error);
                    }
                );

            } else {
                console.error('Geolocation is not supported by this browser.')
            }
        }
        fetchLocation();
        handleDeviceLocation()
    }, [])


    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${formData.glatitude}&lon=${formData.glongitude}&format=json`)
                const { display_name } = response.data;
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    address: display_name,
                  }));
          
                  console.log('Address response:', response);
            }  catch (error) {
                console.error('Error fetching address:', error);
            }
        }

        if (formData.glatitude && formData.glongitude) {
            fetchAddress();
          }
    }, [formData.glatitude, formData.glongitude])

   
      

      const handleDeviceLocation = () => {
        console.log('Attempting to get device location...');
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              console.log('Device location retrieved successfully:', position.coords);
              const { latitude, longitude } = position.coords;
              setDeviceLocation({ latitude, longitude });
      
              // Update the map's center and zoom level
              mapRef.current.setView([latitude, longitude], 7,  { animate: true }); // 14 is an example zoom level
      
              setShowDeviceMarker(true); // Show the device marker again
              try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                const { display_name } = response.data;
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  address: display_name
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

      // const handleMapChange = async (location) => {
      //   try {
      //     const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`);
      //     const { display_name } = response.data;
      //     const { road, city, county, state, postcode, country } = display_name;
      //     const formattedAddress = `${road ? road + ', ' : ''}${city ? city + ', ' : ''}${county ? county + ', ' : ''}${state ? state + ', ' : ''}${postcode ? postcode + ', ' : ''}${country ? country : ''}`;
      //     setFormData({
      //       ...formData,
      //       glatitude: location.lat,
      //       glongitude: location.lng,
      //       address: formattedAddress
      //     });

      //       // Zoom the map to the selected location
      //   mapRef.current.setView([location.lat, location.lng], 14, { animate: true });

      //     console.log('address map', response)
      //     // Hide the device marker when the user selects a location on the map
      //     setShowDeviceMarker(false);
      //   } catch (error) {
      //     console.error('Error fetching address:', error);
      //   }
      // };


    
      const handleAddReport = async () => {
        try {
            const response = await axios.post(apiReportIn, formData, {
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });
            const newReport = response.data.data;
            updateReportInData([...reportInData, newReport]);
            setFormData({
                address: '',
                glongitude: '',
                glatitude: '',
            });
            showSuccessMessage(response.data.success);
        } catch (error) {
            console.error('Error adding user:', error);
            showErrorMessage("Failed to add report!");
        }
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



    // const handleStatusChange = async (newStatus) => {
    //   // Create a FormData object
    //   const formData = new FormData();
      
    //   // Append the status and ID to the FormData object
    //   formData.append('status', newStatus);
    //   formData.append('id', accountID);
      
    //   try {
    //     // Perform the PUT request to update status
    //     await axios.put(apiUsers, formData, {
    //       headers: {
    //         'X-CSRFToken': csrfToken
    //       }
    //     });
      
    //     // Update the incident data in state
    //     const updatedUsers = usersData.map(users => {
    //       if (users.id === accountID) {
    //         return { ...users, status: newStatus };
    //       }
    //       return users;
    //     });
    //     updateUsersData(updatedUsers);
      
    //     // Show success message
    //     showSuccessMessage("Successfully changed the status!");
    //   } catch (error) {
    //     // Handle errors
    //     console.error('Error updating status:', error.message);
    //     showErrorMessage("Failed to update status!");
    //   }
    // };

  
      
  return (
    <div className="pr-10">
          <Snackbar  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
                <Alert variant="filled" onClose={handleSnackbarClose} severity={successMessage ? "success" : "error"}>
                    {successMessage || errorMessage}
                </Alert>
            </Snackbar>
        <div className="reportAddBox3">
               <span className="">
               <p  className="text-sm font-manrope">Report In Address</p>
               <TextField
                        autoFocus
                        margin="dense"
                        name="address"
                        label="Incident Address"
                        type="text"
                        fullWidth
                        value={formData.address}
                        disabled
                    />   
               </span>
               
                   <p className="text-base font-bold font-manrope">Report In Map</p>
                        <div className="reportAddMapContainer">
                        <MapContainer  ref={mapRef}  center={[12.8797, 121.774]}  zoom={initialZoom} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en" subdomains={['mt0', 'mt1', 'mt2', 'mt3']} />
                              {locationChoice === 'device' && showDeviceMarker && deviceLocation && (
                              <Marker position={[deviceLocation.latitude, deviceLocation.longitude]} icon={customIcon} />
                              )}
                        </MapContainer>
                    </div>

                    <StyledButtonAdd variant="contained" onClick={handleAddReport}>
                     Submit 
                  </StyledButtonAdd>


             </div>

    </div>
  )
}
