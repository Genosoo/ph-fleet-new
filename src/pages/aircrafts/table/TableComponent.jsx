/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {
  TableBody, 
  TableHead, 
  TableRow, 
  TablePagination, 
  Dialog, 
  DialogTitle, 
  DialogActions, 
  Button, 
  Snackbar,
  Alert, 
  TextField, 
  FormControl,
  InputLabel,
  MenuItem,
  Select,
 } from "@mui/material";
import { StyledTableCell, StyledTable, StyledTableContainer, StyledDialog} from "./Styled";
import { DataContext } from "../../../context/DataProvider";

import { apiAircraftData, apiUnit, apiAircraftType } from "../../../api/api_urls";

import ButtonUpdate from "./buttons/ButtonUpdate";
import ButtonDelete from "./buttons/ButtonDelete";
import ButtonProfile from "./buttons/ButtonProfile";
import ButtonAdd from "./buttons/buttonAdd";
import Search from "./Search";
import { PiWarningLight } from "react-icons/pi";
 
export default function TableComponent({ csrfToken }) {
  const { aircraftsData, updateAircraftsData } = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  
  console.log("aircraftsData: ", aircraftsData)
  const [filteredData, setFilteredData] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [deleteAircraftsId, setDeleteAircraftsId] = useState(null);
  const [selectedAircraft, setSelectedAircraft] = useState(null)
  const [searchQuery, setSearchQuery] = useState("");
 
  const [formData, setFormData] = useState({
    unit_id2:"",
    aircraft_name:"",
    wingspan:"",
    crew:"",
    fuel_capacity:"",
    height:"",
    length:"",
    maximum_speed:"",
    max_take_off_weight:"",
    range: "",
    payload:"",
    variant:"",
    wing_area:""
  });

  const [aircraftType, setAircraftType] = useState([]);
  const [unit, setUnit] = useState([]);


  const handleSearchChange = (e) => setSearchQuery(e.target.value);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unitResponse, aircraftTypeResponse] = await Promise.all([
          axios.get(apiUnit),
          axios.get(apiAircraftType)
        ]);
        setUnit(unitResponse.data.success);
        setAircraftType(aircraftTypeResponse.data.success);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredResult = aircraftsData.filter(item => {
      const aircraftName = item.aircraft_name ? item.aircraft_name.toLowerCase() : '';
      return aircraftName.includes(searchQuery.toLowerCase());
    });
    setFilteredData(filteredResult);
  }, [searchQuery, aircraftsData]);


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


  const handleAddAircraft = async () => {
    try {
        const response = await axios.post(apiAircraftData, formData, {
            headers: {
                'X-CSRFToken': csrfToken
            }
        });
        const newAircraft = response.data.data;
        updateAircraftsData([...aircraftsData, newAircraft]); // Update AircraftsData using the context function
        setFilteredData([...filteredData, newAircraft]);
        handleCloseAddForm();
        showSuccessMessage("Successfully added the aircraft!");
    } catch (error) {
        console.error('Failed to add aircraft:', error);
        showErrorMessage("Failed to add aircraft!");
    }
  };


  const handleSnackbarClose = () => setSnackbarOpen(false);

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

  const handleOpenAddForm = () => setOpenAddForm(true);

  const handleCloseAddForm = () => setOpenAddForm(false);

  const handleOpenUpdateForm = (aircraft) => {
    setSelectedAircraft(aircraft);
    setFormData({
        unit_id2: aircraft.unit_id2,
        aircraft_name: aircraft.aircraft_name,
        wingspan: aircraft.wingspan,
        crew: aircraft.crew,
        fuel_capacity: aircraft.fuel_capacity,
        height: aircraft.height,
        length: aircraft.length,
        maximum_speed: aircraft.maximum_speed,
        max_take_off_weight: aircraft.max_take_off_weight,
        range: aircraft.range,
        payload: aircraft.payload,
        variant: aircraft.variant,
        wing_area: aircraft.wing_area,
        aircraft_type: aircraft.aircraft_type,
        unit: aircraft.unit,
    });   

    setOpenUpdateForm(true);
};

const handleCloseUpdateForm = () => {
    setOpenUpdateForm(false);
    setSelectedAircraft(null);
};

const handleUpdateAircraft = async () => {
  try {
      const updatedFormData = { ...formData, id: selectedAircraft.id };

      const response = await axios.put(apiAircraftData, updatedFormData, {
          headers: {
              'X-CSRFToken': csrfToken
          }
      });
      const updatedAircraft = response.data.data;
      const updatedAircarfts = aircraftsData.map(aircraft => {
          if (aircraft.id === updatedAircraft.id) {
              return updatedAircraft;
          }
          return aircraft;
      });
      updateAircraftsData(updatedAircarfts);
      setFilteredData(updatedAircarfts);
      handleCloseUpdateForm();
      showSuccessMessage("Successfully updated the Aircraft!");
  } catch (error) {
      console.error('Error updating Aircraft:', error);
      showErrorMessage("Failed to update Aircraft");
  }
};


 
  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  
  const handleOpenDeleteConfirmation = (aircraftsId) => {
    setDeleteAircraftsId(aircraftsId);
    setOpenDeleteConfirmation(true);
};

const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
    setDeleteAircraftsId(null);
};

const handleConfirmDeleteAircrafts = () => {
    handleDeleteAircrafts(deleteAircraftsId);
    handleCloseDeleteConfirmation();
};


const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevState) => ({
    ...prevState,
    [name]: value
  }));
};

const handleFileChange = (e, fieldName) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    let base64String = reader.result.split(",")[1]; // Extract base64 string without the prefix

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: base64String
    }));
  };
  reader.readAsDataURL(file);
};


const handleDeleteAircrafts = async (id) => {
  try {
      await axios.delete(apiAircraftData, {
          data: { id },
          headers: {
              'X-CSRFToken': csrfToken
          }
      });
      const updatedAircrafts = aircraftsData.filter(aircraft => aircraft.id !== id);
      updateAircraftsData(updatedAircrafts);
      setFilteredData(updatedAircrafts);
      showSuccessMessage("Aircrafts deleted successfully!");
  } catch (error) {
      console.error('Error deleting Aircrafts:', error.message);
      showErrorMessage("Failed to delete Aircrafts!");
  }
};

  return (
    <div className="aircraftsTableWrapper">
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={successMessage ? "success" : "error"}>
                    {successMessage || errorMessage}
                </Alert>
       </Snackbar>
        <div className="vesselsTableTopBox">
                <Search handleSearchChange={handleSearchChange}/>
                <ButtonAdd handleOpenAddForm={handleOpenAddForm}  />
            </div>
      <div className="aircraftsTableContainer">
      <StyledTableContainer>
          <StyledTable>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Unit ID</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Unit</StyledTableCell>
                <StyledTableCell>Wingspan</StyledTableCell>
                <StyledTableCell>Fuel Capacity</StyledTableCell>
                <StyledTableCell sx={{ position: "sticky", right: 0 }}>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                        <TableRow key={index}>
                            <StyledTableCell>{item?.aircraft_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.unit_id2 || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.aircraft_type_details?.type_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.unit_details?.unit_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.wingspan || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.fuel_capacity || "N/A"}</StyledTableCell>
                            <StyledTableCell sx={{display:"flex", gap:1, alignItems:"center", position: "sticky", right: 0}}>
                                <Link to={'/fleet/aircrafts/profile'} state={{ aircraft: filteredData[page * rowsPerPage + index] }} >
                                    <ButtonProfile />
                                </Link>
                                <ButtonUpdate item={item} handleOpenUpdateForm={handleOpenUpdateForm} />
                                <ButtonDelete  itemId={item.id}  handleOpenDeleteConfirmation={handleOpenDeleteConfirmation}/>
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
      </div>


{/*============= Add FORM ============================*/}
  <Dialog open={openAddForm} onClose={handleCloseAddForm}>
    <DialogTitle>Add Aircraft</DialogTitle>
       <div className="p-10 flex flex-col gap-3 w-[600px]">
       <TextField value={formData.unit_id2} onChange={handleFormChange}  autoFocus  margin="dense"  name="unit_id2" label="Unit ID" type="text"  fullWidth />
       <TextField value={formData.aircraft_name} onChange={handleFormChange}  autoFocus  margin="dense"  name="aircraft_name" label="Aircraft Name" type="text"  fullWidth />
       <TextField value={formData.crew} onChange={handleFormChange}  autoFocus  margin="dense"  name="crew" label="Crew" type="text"  fullWidth />
       <TextField value={formData.fuel_capacity} onChange={handleFormChange}  autoFocus  margin="dense"  name="fuel_capacity" label="Fuel Capacity" type="text"  fullWidth />
       <TextField value={formData.height} onChange={handleFormChange}  autoFocus  margin="dense"  name="height" label="Height" type="text"  fullWidth />
       <TextField value={formData.length} onChange={handleFormChange}  autoFocus  margin="dense"  name="length" label="Length" type="text"  fullWidth />
       <TextField value={formData.maximum_speed} onChange={handleFormChange}  autoFocus  margin="dense"  name="maximum_speed" label="Maximum Speed" type="text"  fullWidth />
       <TextField value={formData.max_take_off_weight} onChange={handleFormChange}  autoFocus  margin="dense"  name="max_take_off_weight" label="Maximum Take Off Weight" type="text"  fullWidth />
       <TextField value={formData.range} onChange={handleFormChange}  autoFocus  margin="dense"  name="range" label="Range" type="text"  fullWidth />
       <TextField value={formData.payload} onChange={handleFormChange}  autoFocus  margin="dense"  name="payload" label="Payload" type="text"  fullWidth />
       <TextField value={formData.variant} onChange={handleFormChange}  autoFocus  margin="dense"  name="variant" label="Variant" type="text"  fullWidth />
       <TextField value={formData.wingspan} onChange={handleFormChange}  autoFocus  margin="dense"  name="wingspan" label="Wingspan" type="number"  fullWidth />
       <TextField value={formData.wing_area} onChange={handleFormChange}  autoFocus  margin="dense"  name="wing_area" label="Wing Area" type="text"  fullWidth />
       
       <FormControl fullWidth>
            <InputLabel id="aircraft-type-label">Aircraft Type</InputLabel>
            <Select
              labelId="aircraft-type-label"
              id="aircraft-type-select"
              value={formData.aircraft_type || ""}
              label="Aircraft Type"
              name="aircraft_type"
              onChange={handleInputChange}
            >
              {aircraftType.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.type_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="unit-label">Unit</InputLabel>
            <Select
              labelId="unit-label"
              id="unit-select"
              value={formData.unit || ""}
              label="Unit"
              name="unit"
              onChange={handleInputChange}
            >
              {unit.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.unit_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>


         
          {["image_main", "image_left", "image_right", "image_front", "image_back"].map((fieldName, index) => (
            <label htmlFor={fieldName} className="border flex flex-col p-3 gap-4" key={index}>
              <span className="">{fieldName.replace('_', ' ')}</span>
              <input type="file" name={fieldName} id={fieldName} onChange={(e) => handleFileChange(e, fieldName)} />
              {formData[fieldName] && (
                <img src={`data:image/jpeg;base64,${formData[fieldName]}`} alt={fieldName} />
              )}
            </label>
          ))}
       </div>
    <DialogActions>
      <Button variant="contained" onClick={handleCloseAddForm} color="secondary">Cancel</Button>
      <Button variant="contained" onClick={handleAddAircraft} color="primary">Add</Button>
    </DialogActions>
   </Dialog>

   
{/*============= UPDATE FORM ============================*/}
<Dialog open={openUpdateForm} onClose={handleCloseUpdateForm}>
  <DialogTitle>Update Vessel</DialogTitle>
  <div className="p-10 flex flex-col gap-3 w-[600px]">
  <TextField value={formData.unit_id2} onChange={handleFormChange}  autoFocus  margin="dense"  name="unit_id2" label="Unit ID" type="text"  fullWidth />
       <TextField value={formData.aircraft_name} onChange={handleFormChange}  autoFocus  margin="dense"  name="aircraft_name" label="Aircraft Name" type="text"  fullWidth />
       <TextField value={formData.crew} onChange={handleFormChange}  autoFocus  margin="dense"  name="crew" label="Crew" type="text"  fullWidth />
       <TextField value={formData.fuel_capacity} onChange={handleFormChange}  autoFocus  margin="dense"  name="fuel_capacity" label="Fuel Capacity" type="text"  fullWidth />
       <TextField value={formData.height} onChange={handleFormChange}  autoFocus  margin="dense"  name="height" label="Height" type="text"  fullWidth />
       <TextField value={formData.length} onChange={handleFormChange}  autoFocus  margin="dense"  name="length" label="Length" type="text"  fullWidth />
       <TextField value={formData.maximum_speed} onChange={handleFormChange}  autoFocus  margin="dense"  name="maximum_speed" label="Maximum Speed" type="text"  fullWidth />
       <TextField value={formData.max_take_off_weight} onChange={handleFormChange}  autoFocus  margin="dense"  name="max_take_off_weight" label="Maximum Take Off Weight" type="text"  fullWidth />
       <TextField value={formData.range} onChange={handleFormChange}  autoFocus  margin="dense"  name="range" label="Range" type="text"  fullWidth />
       <TextField value={formData.payload} onChange={handleFormChange}  autoFocus  margin="dense"  name="payload" label="Payload" type="text"  fullWidth />
       <TextField value={formData.variant} onChange={handleFormChange}  autoFocus  margin="dense"  name="variant" label="Variant" type="text"  fullWidth />
       <TextField value={formData.wingspan} onChange={handleFormChange}  autoFocus  margin="dense"  name="wingspan" label="Wingspan" type="number"  fullWidth />
       <TextField value={formData.wing_area} onChange={handleFormChange}  autoFocus  margin="dense"  name="wing_area" label="Wing Area" type="text"  fullWidth />
       
       <FormControl fullWidth>
            <InputLabel id="aircraft-type-label">Aircraft Type</InputLabel>
            <Select
              labelId="aircraft-type-label"
              id="aircraft-type-select"
              value={formData.aircraft_type || ""}
              label="Aircraft Type"
              name="aircraft_type"
              onChange={handleInputChange}
            >
              {aircraftType.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.type_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="unit-label">Unit</InputLabel>
            <Select
              labelId="unit-label"
              id="unit-select"
              value={formData.unit || ""}
              label="Unit"
              name="unit"
              onChange={handleInputChange}
            >
              {unit.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.unit_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>


  </div>
  <DialogActions>
    <Button variant="contained" onClick={handleCloseUpdateForm} color="secondary">
      Cancel
    </Button>
    <Button variant="contained" onClick={handleUpdateAircraft} color="primary">
      Update
    </Button>
  </DialogActions>
</Dialog>


   <StyledDialog open={openDeleteConfirmation} onClose={handleCloseDeleteConfirmation}>
  <div className="deleteDialogBox">
      <span className="deleteIcon">
          <PiWarningLight/>
      </span>
      <h3>Are you sure you want to <br /> delete this Aircraft?</h3>
      <p>
      This action cannot be undone. All values  <br /> associated within this field will be lost.
      </p>
    <div className="deleteDialogBtn">
    <button className="delete"  onClick={handleConfirmDeleteAircrafts} >Delete field</button>
      <button className="cancel" onClick={handleCloseDeleteConfirmation} >Cancel</button>
    </div>
    </div>
   </StyledDialog>

    </div>
  )
}
