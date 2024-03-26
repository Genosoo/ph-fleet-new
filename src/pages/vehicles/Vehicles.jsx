import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Table, TableBody, TableContainer, TableHead, TableRow, Paper, 
  TablePagination, Button, Dialog, DialogTitle, 
  DialogContent,  CircularProgress, 
} from "@mui/material";

import { StyledTableCell } from "./StyledComponent"; 
import DeleteIcon from '@mui/icons-material/Delete';
import {  apiVehiclesData  } from "../../api/api_urls";
import GetToken from '../../components/token/GetToken'

import './VehicleStyles.css'
// import ArticleIcon from '@mui/icons-material/Article';
import FormAdd from "./FormAdd";
// import FormUpdate from './FormUpdate'
import Search from "./Search";
import ButtonAddVehicle from "./buttons/ButtonAddVehicle";
import { StyledButtonDelete,  } from "./StyledComponent";
// import SelectedVehicle from "./Selectedvehicle";
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function Vehicle() {
  const csrfToken = GetToken();
  const [VehicleData, setVehicleData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  // const [openVehicleProfileDialog, setOpenVehicleProfileDialog] = useState(false);
  // const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [VehicleToDelete, setVehicleToDelete] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  // const [expandedActionButton, setExpandedActionButton] = useState({});
  // const [updateDialog, setUpdateDialog] = useState(false);
  // const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const VehicleResponse = await axios.get(apiVehiclesData);
        setVehicleData(VehicleResponse.data.success); // Ensure correct property name
        console.log("Vehicle",VehicleResponse.data.success )
        setLoading(false); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredResult = VehicleData.filter(item => {
      const VehicleName = item.Vehicle_name ? item.Vehicle_name.toLowerCase() : '';
  
      return (
        VehicleName.includes(searchQuery.toLowerCase()) 
        // VehicleName.includes(searchQuery.toLowerCase()) ||
        // VehicleType.includes(searchQuery.toLowerCase())
      );
    });
  
    setFilteredData(filteredResult);
  }, [searchQuery, VehicleData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // const handleOpenVehicleProfileDialog = (id) => {
  //   // Find the selected Vehicle from the filtered data
  //   const Vehicle = filteredData.find(item => item.id === id);
  //   setSelectedVehicle(Vehicle);
  //   setOpenVehicleProfileDialog(true);
  // };
  

  // const handleCloseVehicleProfileDialog = () => {
  //   setOpenVehicleProfileDialog(false);
  // };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleDeleteVehicle = async (id) => {
    setVehicleToDelete(id);
    setDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (VehicleToDelete) {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        };
  
        await axios.delete(apiVehiclesData, {
          headers,
          data: { id: VehicleToDelete },
        });
  
        // Update the state to exclude the deleted Vehicle
        setVehicleData(prevVehicleData => prevVehicleData.filter(Vehicle => Vehicle.id !== VehicleToDelete));
  
        // Toggle the expansion state for the deleted item
        // setExpandedActionButton(prevExpandedActionButton => {
        //   const updatedState = { ...prevExpandedActionButton };
        //   delete updatedState[VehicleToDelete]; // Remove the deleted item's ID from the state
        //   return updatedState;
        // });
      } catch (error) {
        console.log(error);
      } finally {
        setVehicleToDelete(null);
        setDeleteDialog(false);
      }
    }
  };

  
  const cancelDelete = () => {
    setVehicleToDelete(null);
    setDeleteDialog(false);
  };


  // const toggleExpansion = (id) => {
  //   // Check if any item is expanded
  //   const isAnyExpanded = Object.values(expandedActionButton).some(value => value);
    
  //   // If any item is expanded, prevent toggle action for other items
  //   if (!isAnyExpanded || expandedActionButton[id]) {
  //     setExpandedActionButton(prevState => ({
  //       ...prevState,
  //       [id]: !prevState[id]
  //     }));
  //   }
  // };

  
  
  // const handleUpdateVehicle = async (data) => {
  //   try {
  //     const headers = {
  //       'X-CSRFToken': csrfToken,
  //     };
  //     // Include the id in the request body
  //     const updateVehicleData = {
  //       id: data.id,
  //       unit: data.unit,
  //       office: data.office,
  //       vehicle_name: data.vehicle_name,
  //       vehicle_code: data.vehicle_code,
  //       vehicle_type: data.vehicle_type,
  //       latitude: data.latitude,
  //       longitude: data.longitude,
  //     };

  //     const updateVehicleResponse = await axios.put(apiVehiclesData, updateVehicleData, { headers });
  //     console.log("update vehicle response", updateVehicleResponse.data);
  //     setTimeout(() => {
  //     setUpdateDialog(false)

  //     },2000)
  //     // Fetch updated roles data after updating a role
  //     const updatedVehicleResponse = await axios.get(apiVehiclesData);
  //     setVehicleData(updatedVehicleResponse.data.success);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  
  // const handleEditVehicle = (vehicle) => {
  //   setSelectedVehicle(vehicle);
  //   setUpdateDialog(true);
  // };
  

  return (
    <div className="tableContainer">
      <h2 className="title">Vehicles</h2>
      <Search  handleSearchChange={handleSearchChange}  searchQuery={searchQuery}/>
      <ButtonAddVehicle handleOpenDialog={handleOpenDialog} />
      {loading ? ( // Show loading indicator if data is loading
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-800 sticky top-0 z-50">
            <TableRow>
              <StyledTableCell><b className="text-white">Name</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Code</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Type</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Office</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Unit</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Action</b></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index}>
                <StyledTableCell>{item.vehicle_name ?? "--"}</StyledTableCell>
                <StyledTableCell>{item.vehicle_code ?? "--"}</StyledTableCell>
                <StyledTableCell>{item.vehicle_type ?? "--"}</StyledTableCell>
                <StyledTableCell>{item.office_details?.office_name ?? "--"}</StyledTableCell>
                <StyledTableCell>{item.unit_details?.unit_name ?? "--"}</StyledTableCell>
                <StyledTableCell sx={{ position:"relative" }}>
                {/* {expandedActionButton[item.id] && (
                        <div className="actionBox">
                            <StyledButtonProfile  variant="contained" onClick={() => handleOpenVehicleProfileDialog(item.id)} startIcon={<ArticleIcon />}>
                            Profile
                          </StyledButtonProfile>
                          <StyledButtonEdit onClick={() => handleEditVehicle(item)}  variant="contained" startIcon={<BorderColorIcon />}>
                            Edit
                          </StyledButtonEdit>
                          <StyledButtonDelete  variant="contained" onClick={() => handleDeleteVehicle(item.id)} startIcon={<DeleteIcon />}>
                            Delete
                          </StyledButtonDelete>
                        </div>
                    )} */}
                  <StyledButtonDelete  variant="contained" onClick={() => handleDeleteVehicle(item.id)} startIcon={<DeleteIcon />}>
                     Delete
                   </StyledButtonDelete>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      )}

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Dialog for adding vessel */}
      <Dialog maxWidth="xl" open={openDialog} onClose={handleCloseDialog}>
        <FormAdd csrfToken={csrfToken} handleCloseDialog={handleCloseDialog} />
      </Dialog>

      
      {/* <Dialog maxWidth="xl" open={openVehicleProfileDialog} onClose={handleCloseVehicleProfileDialog}>
       <DialogActions>
          <Button variant="contained"  onClick={handleCloseVehicleProfileDialog}>Close</Button>
       </DialogActions>
        <DialogTitle>Vehicle Profile</DialogTitle>
        <DialogContent>
           <SelectedVehicle selectedVehicle={selectedVehicle} />
        </DialogContent>
       
      </Dialog> */}

      {/* Dialog for confirming deletion */}
      <Dialog open={deleteDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <span className="flex flex-col gap-3">
            <p>Are you sure you want to delete this Vehicle</p>
            <Button size="small" variant="contained"  onClick={confirmDelete}>
              Confirm
            </Button>
            <Button size="small" variant="outlined"  onClick={cancelDelete}>
              Cancel
            </Button>
          </span>
        </DialogContent>
      </Dialog>

{/* 
      <Dialog open={updateDialog} onClose={() => setUpdateDialog(false)}>
          {selectedVehicle && (
            <FormUpdate
              onSubmit={handleUpdateVehicle}
              initialValues={{ 
                id: selectedVehicle.id,
                office: selectedVehicle.office,
                unit: selectedVehicle.unit,
                vehicle_name: selectedVehicle.vehicle_name,
                vehicle_code: selectedVehicle.vehicle_code,
                vehicle_type: selectedVehicle.vehicle_type,
                latitude: selectedVehicle.latitude,
                longitude: selectedVehicle.longitude,
                  }}
            />
          )}
      </Dialog> */}
    </div>
  );
}
