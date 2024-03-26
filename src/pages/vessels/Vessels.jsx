/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Table, TableBody, TableContainer, TableHead, TableRow, Paper, 
  TablePagination, Button, Dialog, DialogTitle, 
  DialogContent,  CircularProgress, DialogActions
} from "@mui/material";

import { StyledTableCell } from "./StyledComponent"; 
import DeleteIcon from '@mui/icons-material/Delete';
import { apiVesselsData,  } from "../../api/api_urls";
import GetToken from '../../components/token/GetToken'

import './VesselStyles.css'
import ArticleIcon from '@mui/icons-material/Article';
import FormAdd from "./FormAdd";
import Search from "./Search";
import ButtonAddVessel from "./buttons/ButtonAddVessel";
import {  StyledButtonProfile, StyledTableContainer } from "./StyledComponent";
import SelectedVessel from "./SelectedVessel";
// import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Link } from "react-router-dom";

export default function Vessels() {
  const csrfToken = GetToken();
  const [vesselsData, setVesselsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [openVesselProfileDialog, setOpenVesselProfileDialog] = useState(false);
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [vesselToDelete, setVesselToDelete] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [expandedActionButton, setExpandedActionButton] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vesselsResponse = await axios.get(apiVesselsData);
        setVesselsData(vesselsResponse.data.success); // Ensure correct property name
        console.log("Vessels",vesselsResponse.data.success )
        setLoading(false); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredResult = vesselsData.filter(item => {
      const vesselName = item.vessel_name ? item.vessel_name.toLowerCase() : '';
      const className = item.vessel_class_details && item.vessel_class_details.class_name ? item.vessel_class_details.class_name.toLowerCase() : '';
      const origin = item.origin ? item.origin.toLowerCase() : '';
  
      return (
        vesselName.includes(searchQuery.toLowerCase()) ||
        className.includes(searchQuery.toLowerCase()) ||
        origin.includes(searchQuery.toLowerCase())
      );
    });
  
    setFilteredData(filteredResult);
  }, [searchQuery, vesselsData]);

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

  const handleOpenVesselProfileDialog = (id) => {
    // Find the selected vessel from the filtered data
    const vessel = filteredData.find(item => item.id === id);
    setSelectedVessel(vessel);
    setOpenVesselProfileDialog(true);
  };
  

  const handleCloseVesselProfileDialog = () => {
    setOpenVesselProfileDialog(false);
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleDeleteVessel = async (id) => {
    setVesselToDelete(id);
    setDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (vesselToDelete) {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        };

        await axios.delete(apiVesselsData, {
          headers,
          data: { id: vesselToDelete },
        });

        // Update the rolesData state to exclude the deleted role
        setVesselsData(prevVesselsData => prevVesselsData.filter(vessel => vessel.id !== vesselToDelete));

          // Toggle the expansion state for the deleted item
          setExpandedActionButton(prevExpandedActionButton => {
            const updatedState = { ...prevExpandedActionButton };
            delete updatedState[vesselToDelete]; // Remove the deleted item's ID from the state
            return updatedState;
          });
      } catch (error) {
        console.log(error);
      } finally {
        setVesselToDelete(null);
        setDeleteDialog(false);
      }
    }
  };

  const cancelDelete = () => {
    setVesselToDelete(null);
    setDeleteDialog(false);
  };


  const toggleExpansion = (id) => {
    // Check if any item is expanded
    const isAnyExpanded = Object.values(expandedActionButton).some(value => value);
    
    // If any item is expanded, prevent toggle action for other items
    if (!isAnyExpanded || expandedActionButton[id]) {
      setExpandedActionButton(prevState => ({
        ...prevState,
        [id]: !prevState[id]
      }));
    }
  };
  
  


  return (
    <div className="tableContainer">
       <div className="flex items-center justify-center gap-5 ">
       <Search  handleSearchChange={handleSearchChange}  searchQuery={searchQuery}/>
      <ButtonAddVessel handleOpenDialog={handleOpenDialog} />
       </div>
      {loading ? ( // Show loading indicator if data is loading
        <CircularProgress />
      ) : (
        <StyledTableContainer >
        <Table>
          <TableHead className="bg-[#404958] sticky top-0 z-50">
            <TableRow>
              <StyledTableCell><b className="text-white">Hull Number</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Name</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Class Name</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Type</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Unit</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Origin</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Capacity</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Action</b></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index}>
                <StyledTableCell>{item.hull_number ?? "--"}</StyledTableCell>
                <StyledTableCell>{item.vessel_name ?? "--"}</StyledTableCell>
                <StyledTableCell>{item.vessel_class_details?.class_name ?? "--"}</StyledTableCell>
                <StyledTableCell>{item.vessel_type_details?.type_name ?? "--"}</StyledTableCell>
                <StyledTableCell>{item.unit_details?.unit_name ?? "--"}</StyledTableCell>
                <StyledTableCell>{item.origin ?? "--"}</StyledTableCell>
                <StyledTableCell>{item.capacity ?? "--"}</StyledTableCell>
                <StyledTableCell sx={{display:"flex", alignItems:"center", gap:2 }}>
                    <StyledButtonProfile  variant="contained"  onClick={() => handleOpenVesselProfileDialog(item.id)}>
                            View Profile
                          </StyledButtonProfile>
                          {/* <StyledButtonEdit  variant="contained" startIcon={<BorderColorIcon />}>
                            Edit
                          </StyledButtonEdit> */}

                      <button className="bg-[#EB5454] text-white w-[35px] h-[35px]  rounded-full hover:bg-black duration-200" onClick={() => handleDeleteVessel(item.id)}>
                      <DeleteIcon />
                        </button>    
                  
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
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
        <FormAdd csrfToken={csrfToken} handleCloseDialog={handleCloseDialog}/>
      </Dialog>

      
      <Dialog   maxWidth="xl"   open={openVesselProfileDialog} onClose={handleCloseVesselProfileDialog}>
       <DialogActions>
          <Button variant="contained"  onClick={handleCloseVesselProfileDialog}>Close</Button>
       </DialogActions>
        <DialogContent>
           <SelectedVessel selectedVessel={selectedVessel} />
        </DialogContent>
       
      </Dialog>

      {/* Dialog for confirming deletion */}
      <Dialog open={deleteDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <span className="flex flex-col gap-3">
            <p>Are you sure you want to delete this Vessel?</p>
            <Button size="small" variant="contained"  onClick={confirmDelete}>
              Confirm
            </Button>
            <Button size="small" variant="outlined"  onClick={cancelDelete}>
              Cancel
            </Button>
          </span>
        </DialogContent>
      </Dialog>
    </div>
  );
}
