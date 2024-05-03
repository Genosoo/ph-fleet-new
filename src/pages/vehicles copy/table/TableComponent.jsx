/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { DataContext } from "../../../context/DataProvider";
import { useState, useEffect, useContext, useRef } from "react";
import ButtonUpdate from "./buttons/ButtonUpdate";
import ButtonDelete from "./buttons/ButtonDelete";
import ButtonProfile from "./buttons/ButtonProfile";
import ButtonAdd from "./buttons/buttonAdd";
import {StyledTableCell, StyledTable, StyledFormControl,  StyledDialog, StyledTableContainer, StyledTextField, StyledFormControlLabel, StyledCheckbox } from "./Styled";
import Search from "./Search";
import {  TableBody, TableHead, TableRow, Select, MenuItem, InputLabel, TablePagination, Dialog, Snackbar, Alert} from "@mui/material";
import { Link } from "react-router-dom";
import axios from 'axios';
import { apiVehiclesData } from "../../../api/api_urls";
import { IoClose } from "react-icons/io5";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import L from 'leaflet'
import markerIcon from '../../../assets/incident/location.svg';
import MapSelection from "./MapSelection";
import { PiWarningLight } from "react-icons/pi";
import ExportFiles from "./export/ExportFiles";


// Define a custom icon
const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });


export default function TableComponent({ csrfToken, unitData }) {
  const { vehiclesData, officesData, updateVehiclesData} = useContext(DataContext);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [formData, setFormData] = useState({
    vehicle_name: "",
    vehicle_code: "",
    office:"",
    unit:"",
    latitude:"",
    longitude:""
   
});
const [successMessage, setSuccessMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");
const [snackbarOpen, setSnackbarOpen] = useState(false);

  
const [showDeviceMarker, setShowDeviceMarker] = useState(true);
const [deviceLocation, setDeviceLocation] = useState(null);
const [locationChoice, setLocationChoice] = useState('map');
const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
const [deleteVehicleId, setDeleteVehicleId] = useState(null);


const mapRef = useRef(null);
const initialZoom = 5;

console.log("vehicles:", vehiclesData)
const [selectedVehicle, setSelectedVehicle] = useState(null);



const handleOpenDeleteConfirmation = (vehicleId) => {
  setDeleteVehicleId(vehicleId);
  setOpenDeleteConfirmation(true);
};

const handleCloseDeleteConfirmation = () => {
  setOpenDeleteConfirmation(false);
  setDeleteVehicleId(null);
};

const handleConfirmDeleteUser = () => {
  handleDeleteUser(deleteVehicleId);
  handleCloseDeleteConfirmation();
};

const handleDeleteUser = async (id) => {
  try {
      await axios.delete(apiVehiclesData, {
          data: { id },
          headers: {
              'X-CSRFToken': csrfToken
          }
      });
      const updatedVehicles = vehiclesData.filter(vehicle => vehicle.id !== id);
      updateVehiclesData(updatedVehicles);
      setFilteredData(updatedVehicles);
      showSuccessMessage("Vehicle deleted successfully!");
  } catch (error) {
      console.error('Error deleting Vehicle:', error.message);
      showErrorMessage("Failed to delete vehicle!");
  }
};



  
  const handleOpenUpdateForm = (vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      vehicle_name: vehicle.vehicle_name,
      vehicle_code: vehicle.vehicle_code,
      office:vehicle.office,
      unit:vehicle.unit,
      latitude:"",
      longitude:""
    });

    setOpenUpdateForm(true);
};

const handleCloseUpdateForm = () => {
    setOpenUpdateForm(false);
    setSelectedVehicle(null);
};


const handleUpdateVehicle = async () => {
  try {
      const updatedFormData = { ...formData, id: selectedVehicle.id };

      const response = await axios.put(apiVehiclesData, updatedFormData, {
          headers: {
              'X-CSRFToken': csrfToken
          }
      });

      const updatedVehicle = response.data.data;
      const updatedVehicles = vehiclesData.map(office => {
          if (office.id === updatedVehicle.id) {
              return updatedVehicle;
          }
          return office;
      });
      updateVehiclesData(updatedVehicles);
      setFilteredData(updatedVehicles);
      handleCloseUpdateForm();
      showSuccessMessage("Vehicle updated successfully!");
  } catch (error) {
      console.error('Error updating Vehicle:', error);
      showErrorMessage("Failed to update Vehicle!");
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

  const handleCloseAddForm = () =>  setOpenAddForm(false);
  const handleOpenAddForm = () => setOpenAddForm(true);


  const handleAddUser = async () => {
    try {
        const response = await axios.post(apiVehiclesData, formData, {
            headers: {
                'X-CSRFToken': csrfToken
            }
        });
        const newVehicles = response.data.data;
        updateVehiclesData([...vehiclesData, newVehicles]);
        setFilteredData([...filteredData, newVehicles]);
        handleCloseAddForm();
        showSuccessMessage("User added successfully!");
    } catch (error) {
        console.error('Error adding user:', error);
        showErrorMessage(error.response.data.error.username);
    }
};

  useEffect(() => {
    const filteredResult = vehiclesData.filter(item => {
        const vehicleName = item.vehicle_name ? item.vehicle_name.toLowerCase() : '';
        return vehicleName.includes(searchQuery.toLowerCase());
    });
    setFilteredData(filteredResult);
}, [searchQuery, vehiclesData]);

const handleChangePage = (event, newPage) => setPage(newPage);
const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
};
const handleSearchChange = (e) => setSearchQuery(e.target.value);




useEffect(() => {
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setFormData({
              ...formData,
                latitude: latitude,
                longitude: longitude,
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
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${formData.latitude}&lon=${formData.longitude}&format=json`);
        const { display_name } = response.data;
    
        setFormData((prevFormData) => ({
          ...prevFormData,
          office_address: display_name,
        }));

        console.log('Address response:', response);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };
  
    if (formData.latitude && formData.longitude) {
      fetchAddress();
    }
  }, [formData.latitude, formData.longitude]);
  
  


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
            const { display_name } = response.data;
            setFormData((prevFormData) => ({
              ...prevFormData,
              office_address: display_name
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


  const handleMapChange = async (location) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`);
      const { display_name } = response.data;
      setFormData({
        ...formData,
        latitude: location.lat,
        longitude: location.lng,
        office_address: display_name
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


  return (
    <div  className="vehiclesTableWrapper">
           <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
                <Alert variant="filled" onClose={handleSnackbarClose} severity={successMessage ? "success" : "error"}>
                    {successMessage || errorMessage}
                </Alert>
            </Snackbar>
      <div className="vehiclesTableTopBox">
                <Search  handleSearchChange={handleSearchChange}/>
                <ButtonAdd handleOpenAddForm={handleOpenAddForm}/>
            </div>

            <div className="usersTableContainer">
            <StyledTableContainer >
           <StyledTable stickyHeader aria-label="sticky table" > 
                <TableHead >
                    <TableRow>
                       <StyledTableCell>Vehicle Name</StyledTableCell>
                       <StyledTableCell>Vehicle Code</StyledTableCell>
                       <StyledTableCell>Unit</StyledTableCell>
                        <StyledTableCell>Office Name</StyledTableCell>
                        <StyledTableCell>Office Address</StyledTableCell>
                        <StyledTableCell >Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                        <TableRow key={index}>
                            <StyledTableCell>{item?.vehicle_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.vehicle_code || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.unit_details?.unit_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.office_details?.office_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.office_details?.office_address || "N/A"}</StyledTableCell>
                            <StyledTableCell sx={{display:"flex", gap:1, alignItems:"center"}} >
                                <div className="flex gap-4">
                                <Link to={'/fleet/vehicles/profile'} state={{ vehicle: item}} >
                                 <ButtonProfile />
                                </Link>

                                <ButtonUpdate item={item} handleOpenUpdateForm={handleOpenUpdateForm}  />
                                <ButtonDelete  itemId={item.id}  handleOpenDeleteConfirmation={handleOpenDeleteConfirmation}/>
                                </div>
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
            </StyledTableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <ExportFiles />
            </div>


{/*======================= ADD DIALOG FORM===============================*/}
<Dialog fullWidth open={openAddForm} onClose={handleCloseAddForm}>
               <div className="addFormContainer">
                <div className="addFormHeader">
                    <p>Add Vehicle</p>
                    <IoClose onClick={handleCloseAddForm} />
                </div>
                 
                 <div className="addFormBoxDetails">
                    <div className="addFormBoxDetail1">
                        <p>Vehicle Information</p>
                        <StyledTextField
                            autoFocus
                            margin="dense"
                            name="vehicle_name"
                            label="Vehicle name"
                            type="text"
                            fullWidth
                            value={formData.vehicle_name}
                            onChange={handleFormChange}
                        />

                    <StyledTextField
                            autoFocus
                            margin="dense"
                            name="vehicle_code"
                            label="Vehicle code"
                            type="text"
                            fullWidth
                            value={formData.vehicle_code}
                            onChange={handleFormChange}
                        />

                  <StyledFormControl fullWidth>
                      <InputLabel id="office">Office</InputLabel>
                      <Select 
                           labelId="office"
                              name="office"
                              value={formData.office}
                              onChange={handleFormChange}
                              fullWidth
                              IconComponent={ExpandMoreIcon}
                           
                          >
                              {officesData.map(vehicle => (
                                  <MenuItem key={vehicle.id} value={vehicle.id}>
                                      {vehicle.office_name}
                                  </MenuItem>
                              ))}
                          </Select>
                      </StyledFormControl>


                      <StyledFormControl fullWidth>
                      <InputLabel id="unit">Unit</InputLabel>
                      <Select 
                           labelId="unit"
                              name="unit"
                              value={formData.unit}
                              onChange={handleFormChange}
                              fullWidth
                              IconComponent={ExpandMoreIcon}
                           
                          >
                              {unitData.map(unit => (
                                  <MenuItem key={unit.id} value={unit.id}>
                                      {unit.unit_name}
                                  </MenuItem>
                              ))}
                          </Select>
                      </StyledFormControl>


                      <div className="reportAddBox3">
            <span className="">
            <p>Enter or Select Vehicle Address on the Map</p>
                <StyledTextField
                    autoFocus
                    margin="dense"
                    name=""
                    label=""
                    type="text"
                    fullWidth
                    value={formData.office_address}
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
        </div>
                 </div>
                  
                 
               </div>
               <div className="addFormFooter">
                    <button className="addFormBtnCancel" onClick={handleCloseAddForm}>Cancel</button>
                    <button className="addFormBtnAdd" onClick={handleAddUser}>Add Vehicle</button>
                    </div>
            </div>
            </Dialog>


            <Dialog open={openUpdateForm} onClose={handleCloseUpdateForm}>

            <div className="addFormContainer">
                <div className="addFormHeader">
                    <p>Update Vehicle</p>
                    <IoClose onClick={handleCloseAddForm} />
                </div>
                 
                 <div className="addFormBoxDetails">
                    <div className="addFormBoxDetail1">
                        <p>Vehicle Information</p>
                        <StyledTextField
                            autoFocus
                            margin="dense"
                            name="vehicle_name"
                            label="Vehicle name"
                            type="text"
                            fullWidth
                            value={formData.vehicle_name}
                            onChange={handleFormChange}
                        />

                    <StyledTextField
                            autoFocus
                            margin="dense"
                            name="vehicle_code"
                            label="Vehicle code"
                            type="text"
                            fullWidth
                            value={formData.vehicle_code}
                            onChange={handleFormChange}
                        />

                  <StyledFormControl fullWidth>
                      <InputLabel id="office">Office</InputLabel>
                      <Select 
                           labelId="office"
                              name="office"
                              value={formData.office}
                              onChange={handleFormChange}
                              fullWidth
                              IconComponent={ExpandMoreIcon}
                           
                          >
                              {officesData.map(vehicle => (
                                  <MenuItem key={vehicle.id} value={vehicle.id}>
                                      {vehicle.office_name}
                                  </MenuItem>
                              ))}
                          </Select>
                      </StyledFormControl>


                      <StyledFormControl fullWidth>
                      <InputLabel id="unit">Unit</InputLabel>
                      <Select 
                           labelId="unit"
                              name="unit"
                              value={formData.unit}
                              onChange={handleFormChange}
                              fullWidth
                              IconComponent={ExpandMoreIcon}
                           
                          >
                              {unitData.map(unit => (
                                  <MenuItem key={unit.id} value={unit.id}>
                                      {unit.unit_name}
                                  </MenuItem>
                              ))}
                          </Select>
                      </StyledFormControl>


                      <div className="reportAddBox3">
            <span className="">
            <p>Enter or Select Vehicle Address on the Map</p>
                <StyledTextField
                    autoFocus
                    margin="dense"
                    name=""
                    label=""
                    type="text"
                    fullWidth
                    value={formData.office_address}
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
        </div>
                 </div>
                  
                 
               </div>
            </div>
    <div className="addFormFooter">
      <button className="addFormBtnCancel" onClick={handleCloseUpdateForm}>Cancel</button>
      <button className="addFormBtnAdd" onClick={handleUpdateVehicle}>Update Vehicle</button>
    </div>
</Dialog>



    {/*========================== DELETE DIALOG ============================*/}
    <StyledDialog open={openDeleteConfirmation} onClose={handleCloseDeleteConfirmation}>
                <div className="deleteDialogBox">
                    <span className="deleteIcon">
                        <PiWarningLight/>
                    </span>
                    <h3>Are you sure you want to <br /> delete this vehicle?</h3>
                   <p>
                   This action cannot be undone. All values  <br /> associated within this field will be lost.
                   </p>
                  <div className="deleteDialogBtn">
                  <button className="delete"  onClick={handleConfirmDeleteUser} >Delete field</button>
                    <button className="cancel" onClick={handleCloseDeleteConfirmation} >Cancel</button>
                  </div>
                </div>
            </StyledDialog>           


    </div>
  )
}
