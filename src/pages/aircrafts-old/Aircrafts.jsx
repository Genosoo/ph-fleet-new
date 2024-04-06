import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Table, TableBody,  TableHead, TableRow, Paper, 
  TablePagination, Button, Dialog, DialogTitle, 
  DialogContent,  CircularProgress, DialogActions
} from "@mui/material";

import { StyledTableCell } from "./StyledComponent"; 
import DeleteIcon from '@mui/icons-material/Delete';
import {  apiAircraftData  } from "../../api/api_urls";
import GetToken from '../../components/token/GetToken'

import './AircraftStyles.css'
import FormAdd from "./FormAdd";
import Search from "./Search";
import ButtonAddAircraft from "./buttons/ButtonAddAircraft";
import { StyledButtonProfile, StyledTableContainer } from "./StyledComponent";
import SelectedAircraft from "./SelectedAircraft";

export default function Aircraft() {
  const csrfToken = GetToken();
  const [aircraftData, setAircraftData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAircraftProfileDialog, setOpenAircraftProfileDialog] = useState(false);
  const [selectedAircraft, setSelectedAircraft] = useState(null);
  const [aircraftToDelete, setAircraftToDelete] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aircraftResponse = await axios.get(apiAircraftData);
        setAircraftData(aircraftResponse.data.success); // Ensure correct property name
        console.log("Aircraft",aircraftResponse.data.success )
        setLoading(false); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredResult = aircraftData.filter(item => {
      const aircraftName = item.aircraft_name ? item.aircraft_name.toLowerCase() : '';
  
      return (
        aircraftName.includes(searchQuery.toLowerCase()) 
        // aircraftName.includes(searchQuery.toLowerCase()) ||
        // aircraftType.includes(searchQuery.toLowerCase())
      );
    });
  
    setFilteredData(filteredResult);
  }, [searchQuery, aircraftData]);

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

  const handleOpenAircraftProfileDialog = (id) => {
    // Find the selected aircraft from the filtered data
    const aircraft = filteredData.find(item => item.id === id);
    setSelectedAircraft(aircraft);
    setOpenAircraftProfileDialog(true);
  };
  

  const handleCloseAircraftProfileDialog = () => {
    setOpenAircraftProfileDialog(false);
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleDeleteAircraft = async (id) => {
    setAircraftToDelete(id);
    setDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (aircraftToDelete) {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        };
  
        await axios.delete(apiAircraftData, {
          headers,
          data: { id: aircraftToDelete },
        });
  
        // Update the state to exclude the deleted aircraft
        setAircraftData(prevAircraftData => prevAircraftData.filter(aircraft => aircraft.id !== aircraftToDelete));
    
      } catch (error) {
        console.log(error);
      } finally {
        setAircraftToDelete(null);
        setDeleteDialog(false);
      }
    }
  };

  
  const cancelDelete = () => {
    setAircraftToDelete(null);
    setDeleteDialog(false);
  };


  


  return (
    <div className="tableContainer">
       <div className="flex items-center justify-center gap-5 ">
       <Search  handleSearchChange={handleSearchChange}  searchQuery={searchQuery}/>
      <ButtonAddAircraft handleOpenDialog={handleOpenDialog} />
       </div>
      {loading ? ( // Show loading indicator if data is loading
        <CircularProgress />
      ) : (
        <StyledTableContainer component={Paper}>
        <Table>
          <TableHead className="bg-[#404958] sticky top-0 z-50">
            <TableRow>
              <StyledTableCell><b className="text-white">Name</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Type</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Unit</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Wingspan</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Origin</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Capacity</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Action</b></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index}>
                <StyledTableCell>{item.aircraft_name ?? "--"}</StyledTableCell>
                <StyledTableCell>{item.aircraft_type_details?.type_name ?? "--"}</StyledTableCell>
                <StyledTableCell>{item.unit_details?.unit_name ?? "--"}</StyledTableCell>
                <StyledTableCell>{item.wingspan ?? "--"}</StyledTableCell>
                <StyledTableCell>{item.origin ?? "--"}</StyledTableCell>
                <StyledTableCell>{item.capacity ?? "--"}</StyledTableCell>
                <StyledTableCell sx={{display:"flex", alignItems:"center", gap:2 }} >
                            <StyledButtonProfile  variant="contained" onClick={() => handleOpenAircraftProfileDialog(item.id)}>
                           View Profile
                          </StyledButtonProfile>
                          {/* <StyledButtonEdit  variant="contained" startIcon={<BorderColorIcon />}>
                            Edit
                          </StyledButtonEdit> */}
                            <button className="bg-[#EB5454] text-white w-[35px] h-[35px]  rounded-full hover:bg-black duration-200" onClick={() => handleDeleteAircraft(item.id)}>
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
        <FormAdd csrfToken={csrfToken} handleCloseDialog={handleCloseDialog} />
      </Dialog>

      
      <Dialog maxWidth="xl" open={openAircraftProfileDialog} onClose={handleCloseAircraftProfileDialog}>
       <DialogActions>
          <Button variant="contained"  onClick={handleCloseAircraftProfileDialog}>Close</Button>
       </DialogActions>
        <DialogTitle>Aircraft Profile</DialogTitle>
        <DialogContent>
           <SelectedAircraft selectedAircraft={selectedAircraft} />
        </DialogContent>
       
      </Dialog>

      {/* Dialog for confirming deletion */}
      <Dialog open={deleteDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <span className="flex flex-col gap-3">
            <p>Are you sure you want to delete this Aircraft</p>
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
