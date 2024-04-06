/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { StyledTableCell, StyledTable, StyledTableContainer, StyledDialog } from "./Styled";
import axios from 'axios';
import { Link } from "react-router-dom";
import {TableBody, TableHead, TableRow, TablePagination, 
   Dialog, DialogTitle, DialogActions, Button, Snackbar,
   Alert, TextField, FormControl, InputLabel, Select, MenuItem
  } from "@mui/material";
import ButtonUpdate from "./buttons/ButtonUpdate";
import ButtonDelete from "./buttons/ButtonDelete";
import ButtonProfile from "./buttons/ButtonProfile";
import ButtonAdd from "./buttons/buttonAdd";
import Search from "./Search";
import { DataContext } from "../../../context/DataProvider";
import { apiVesselClass, apiVesselType, apiVesselStatus, apiVesselsData } from "../../../api/api_urls";
import { PiWarningLight } from "react-icons/pi";

export default function TableComponent({ csrfToken }) {
  const { vesselsData, updateVesselsData } = useContext(DataContext);
  const [filteredData, setFilteredData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [deleteVesselId, setDeleteVesselId] = useState(null);
  const [formData, setFormData] = useState({
    vessel_name:"",
    vessel_description:"",
    hull_number:"",
    beam:"",
    origin:"",
    capacity:"",
    vessel_class:"",
    vessel_type:"",
    vessel_status:"",
  });

  const [selectedVessel, setSelectedVessel] = useState(null)

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

  useEffect(() => {
    const filteredResult = vesselsData.filter(item => {
      const vesselsName = item.vessel_name ? item.vessel_name.toLowerCase() : '';
      return vesselsName.includes(searchQuery.toLowerCase());
    });
    setFilteredData(filteredResult);
  }, [searchQuery, vesselsData]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenAddForm = () => setOpenAddForm(true);

  const handleCloseAddForm = () => setOpenAddForm(false);


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

  const handleAddVessel = async () => {
    try {
        const response = await axios.post(apiVesselsData, formData, {
            headers: {
                'X-CSRFToken': csrfToken
            }
        });
        const newVessel = response.data.data;
        updateVesselsData([...vesselsData, newVessel]); // Update vesselsData using the context function
        setFilteredData([...filteredData, newVessel]);
        handleCloseAddForm();
        showSuccessMessage("User added successfully!");
    } catch (error) {
        console.error('Error adding user:', error);
        showErrorMessage("Failed to add user!");
    }
  };


  const handleOpenUpdateForm = (vessel) => {
    setSelectedVessel(vessel);
    setFormData({
        vessel_name: vessel.vessel_name,
        vessel_description: vessel.vessel_description,
    });

    setOpenUpdateForm(true);
};

const handleCloseUpdateForm = () => {
    setOpenUpdateForm(false);
    setSelectedVessel(null);
};



  const handleOpenDeleteConfirmation = (vesselId) => {
    setDeleteVesselId(vesselId);
    setOpenDeleteConfirmation(true);
};

const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
    setDeleteVesselId(null);
};

const handleConfirmDeleteVessel = () => {
    handleDeleteVessel(deleteVesselId);
    handleCloseDeleteConfirmation();
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };



  const handleDeleteVessel = async (id) => {
    try {
        await axios.delete(apiVesselsData, {
            data: { id },
            headers: {
                'X-CSRFToken': csrfToken
            }
        });
        const updatedVessels = vesselsData.filter(vessel => vessel.id !== id);
        updateVesselsData(updatedVessels);
        setFilteredData(updatedVessels);
        showSuccessMessage("Vessels deleted successfully!");
    } catch (error) {
        console.error('Error deleting Vessels:', error.message);
        showErrorMessage("Failed to delete Vessels!");
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

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
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


  const handleUpdateVessel = async () => {
    try {
        const updatedFormData = { ...formData, id: selectedVessel.id };

        const response = await axios.put(apiVesselsData, updatedFormData, {
            headers: {
                'X-CSRFToken': csrfToken
            }
        });
        const updatedVessel = response.data.data;
        const updatedVessels = vesselsData.map(vessel => {
            if (vessel.id === updatedVessel.id) {
                return updatedVessel;
            }
            return vessel;
        });
        updateVesselsData(updatedVessels);
        setFilteredData(updatedVessels);
        handleCloseUpdateForm();
        showSuccessMessage("Successfully updated the vessel!");
    } catch (error) {
        console.error('Error updating vessel:', error);
        showErrorMessage("Failed to update vessel");
    }
};
  

  return (
    <div className="vesselsTableWrapper">
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={successMessage ? "success" : "error"}>
                    {successMessage || errorMessage}
                </Alert>
       </Snackbar>
       <div className="vesselsTableTopBox">
                <Search handleSearchChange={handleSearchChange}/>
                <ButtonAdd  handleOpenAddForm={handleOpenAddForm}/>
            </div>
       <div className="vesselsTableContainer">
            <StyledTableContainer >
           <StyledTable stickyHeader aria-label="sticky table" > 
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Hull Number</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Class Name</StyledTableCell>
                        <StyledTableCell>Type</StyledTableCell>
                        <StyledTableCell>Unit</StyledTableCell>
                        <StyledTableCell>Origin</StyledTableCell>
                        <StyledTableCell>Capacity</StyledTableCell>
                        <StyledTableCell sx={{ position: "sticky", right: 0 }}>Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                        <TableRow key={index}>
                            <StyledTableCell>{item?.hull_number || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.vessel_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.vessel_class_details?.class_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.vessel_type_details?.type_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.unit_details?.unit_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.origin || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.capacity || "N/A"}</StyledTableCell>
                            <StyledTableCell sx={{display:"flex", gap:1, alignItems:"center", position: "sticky", right: 0}} >
                                <Link to={'/fleet/vessels/profile'} state={{ vessel: filteredData[page * rowsPerPage + index] }} >
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
    <DialogTitle>Add Vessels</DialogTitle>
       <div className="p-10 flex flex-col gap-3 w-[600px]">
       <TextField value={formData.vessel_name} onChange={handleFormChange}  autoFocus  margin="dense"  name="vessel_name" label="Vessel Name" type="text"  fullWidth />
        <TextField value={formData.vessel_description} onChange={handleFormChange}  autoFocus  margin="dense"  name="vessel_description" label="Vessel Description" type="text"  fullWidth />
        <TextField value={formData.hull_number} onChange={handleFormChange}  autoFocus  margin="dense"  name="hull_number" label="Hull Number" type="text"  fullWidth />
        <TextField value={formData.beam} onChange={handleFormChange}  autoFocus  margin="dense"  name="beam" label="Beam" type="text"  fullWidth />
        <TextField value={formData.origin} onChange={handleFormChange}  autoFocus  margin="dense"  name="origin" label="Origin" type="text"  fullWidth />
        <TextField value={formData.capacity} onChange={handleFormChange}  autoFocus  margin="dense"  name="capacity" label="Capacity" type="text"  fullWidth />
        
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
      <Button variant="contained" onClick={handleAddVessel} color="primary">Add</Button>
    </DialogActions>
   </Dialog>


     {/*============= UPDATE FORM ============================*/}
     <Dialog open={openUpdateForm} onClose={handleCloseUpdateForm}>
  <DialogTitle>Update Vessel</DialogTitle>
  <div className="p-10 flex flex-col gap-3 w-[600px]">
    {/* Input fields for updating vessel data */}
    <TextField
      value={formData.vessel_name || ''}
      onChange={handleFormChange}
      autoFocus
      margin="dense"
      name="vessel_name"
      label="Vessel Name"
      type="text"
      fullWidth
    />
    <TextField
      value={formData.vessel_description || ''}
      onChange={handleFormChange}
      autoFocus
      margin="dense"
      name="vessel_description"
      label="Vessel Description"
      type="text"
      fullWidth
    />
  </div>
  <DialogActions>
    <Button variant="contained" onClick={handleCloseUpdateForm} color="secondary">
      Cancel
    </Button>
    <Button variant="contained" onClick={handleUpdateVessel} color="primary">
      Update
    </Button>
  </DialogActions>
</Dialog>



  <StyledDialog open={openDeleteConfirmation} onClose={handleCloseDeleteConfirmation}>
  <div className="deleteDialogBox">
      <span className="deleteIcon">
          <PiWarningLight/>
      </span>
      <h3>Are you sure you want to <br /> delete this vessel?</h3>
      <p>
      This action cannot be undone. All values  <br /> associated within this field will be lost.
      </p>
    <div className="deleteDialogBtn">
    <button className="delete"  onClick={handleConfirmDeleteVessel} >Delete field</button>
      <button className="cancel" onClick={handleCloseDeleteConfirmation} >Cancel</button>
    </div>
    </div>
   </StyledDialog>

    </div>
  )
}
