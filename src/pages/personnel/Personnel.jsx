/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Table, TableBody, TableContainer, TableHead, TableRow, Paper, 
  TablePagination, Button, Dialog, DialogTitle, 
  DialogContent,  CircularProgress, DialogActions
} from "@mui/material";

import { StyledTableCell, CustomTableContainer } from "./StyledComponent"; 
import {  apiPersonnelData  } from "../../api/api_urls";
import GetToken from '../../components/token/GetToken'

import './PersonnelStyles.css'
import ArticleIcon from '@mui/icons-material/Article';
import FormAdd from "./FormAdd";
import Search from "./Search";
import { StyledButtonDelete, StyledButtonProfile, StyledButtonEdit } from "./StyledComponent";
import SelectedPersonnel from "./SelectedPersonnel";
import ButtonAddPersonnel from "./buttons/ButtonAddPersonnel";
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import FormUpdate from './FormUpdate'
// import DeleteIcon from '@mui/icons-material/Delete';


export default function Personnel() {
  const csrfToken = GetToken();
  const [personnelData, setPersonnelData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [openPersonnelProfileDialog, setOpenPersonnelProfileDialog] = useState(false);
  const [personnelToDelete, setPersonnelToDelete] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [expandedActionButton, setExpandedActionButton] = useState({});
  const [updateDialog, setUpdateDialog] = useState(false);
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personnelResponse = await axios.get(apiPersonnelData);
        setPersonnelData(personnelResponse.data.success); // Ensure correct property name
        console.log("personnel",personnelResponse.data.success )
        setLoading(false); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredResult = personnelData.filter(item => {
      const username = item.username ? item.username.toLowerCase() : '';
  
      return (
        username.includes(searchQuery.toLowerCase()) 
        // aircraftName.includes(searchQuery.toLowerCase()) ||
        // aircraftType.includes(searchQuery.toLowerCase())
      );
    });
  
    setFilteredData(filteredResult);
  }, [searchQuery, personnelData]);

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

  const handleOpenPersonnelProfileDialog = (id) => {
    // Find the selected Office from the filtered data
    const personnel = filteredData.find(item => item.id === id);
    setSelectedPersonnel(personnel);
    setOpenPersonnelProfileDialog(true);
  };
  

  const handleClosePersonnelProfileDialog = () => {
    setOpenPersonnelProfileDialog(false);
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // const handleDeletePersonnel = async (id) => {
  //   setPersonnelToDelete(id);
  //   setDeleteDialog(true);
  // };

  // const confirmDelete = async () => {
  //   if (personnelToDelete) {
  //     try {
  //       const headers = {
  //         'Content-Type': 'application/json',
  //         'X-CSRFToken': csrfToken,
  //       };
  
  //       await axios.delete(apiPersonnelData, {
  //         headers,
  //         data: { id: personnelToDelete },
  //       });
  
  //       // Update the state to exclude the deleted aircraft
  //       setPersonnelData(prevPersonnelData => prevPersonnelData.filter(personnel => personnel.id !== personnelToDelete));
  
  //       // Toggle the expansion state for the deleted item
  //       // setExpandedActionButton(prevExpandedActionButton => {
  //       //   const updatedState = { ...prevExpandedActionButton };
  //       //   delete updatedState[officeToDelete]; // Remove the deleted item's ID from the state
  //       //   return updatedState;
  //       // });
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setPersonnelToDelete(null);
  //       setDeleteDialog(false);
  //     }
  //   }
  // };

  
  // const cancelDelete = () => {
  //   setPersonnelToDelete(null);
  //   setDeleteDialog(false);
  // };


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


  // const handleUpdatePersonnel = async (data) => {
  //   try {
  //     const headers = {
  //       'Content-Type': 'application/json',
  //       'X-CSRFToken': csrfToken,
  //     };
  //     // Include the id in the request body
  //     const updatePersonnelData = {
  //       id: data.id,
  //       username: data.username,
  //       first_name: data.first_name,
  //       last_name: data.last_name,
  //       email: data.email,
  //     };

  //     const updatePersonnelResponse = await axios.put(apiPersonnelData, updatePersonnelData, { headers });
  //     console.log("update Personnel response", updatePersonnelResponse.data);

  //     // Fetch updated roles data after updating a role
  //     const updatedPersonnelResponse = await axios.get(apiPersonnelData);
  //     setPersonnelData(updatedPersonnelResponse.data.success);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  
  // const handleEditPersonnel = (personnel) => {
  //   setSelectedPersonnel(personnel);
  //   setUpdateDialog(true);
  // };
  


  return (
    <div className="tableContainer">
        <div className="flex items-center justify-center gap-5 ">
        <Search  handleSearchChange={handleSearchChange}  searchQuery={searchQuery}/>
        <ButtonAddPersonnel handleOpenDialog={handleOpenDialog}  />
      </div>
      {loading ? ( // Show loading indicator if data is loading
        <CircularProgress />
      ) : (
        <CustomTableContainer  component={Paper}>
        <Table>
          <TableHead className="bg-gray-800 sticky top-0 z-50">
            <TableRow>
              <StyledTableCell><b className="text-white">Username</b></StyledTableCell>
              <StyledTableCell><b className="text-white">First Name</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Last Name</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Email</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Mobile Number</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Rank Name</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Status</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Unit Name</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Action</b></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index}>
                <StyledTableCell>{item.username}</StyledTableCell>
                <StyledTableCell>{item.personal_details?.first_name}</StyledTableCell>
                <StyledTableCell>{item.personal_details?.last_name}</StyledTableCell>
                <StyledTableCell>{item.personal_details?.email}</StyledTableCell>
                <StyledTableCell>{item.personal_details?.mobile_number}</StyledTableCell>
                <StyledTableCell>{item.personal_details?.rank_name}</StyledTableCell>
                <StyledTableCell>{item.personal_details?.status_name}</StyledTableCell>
                <StyledTableCell>{item.personal_details?.unit_name}</StyledTableCell>
                <StyledTableCell sx={{ position:"relative" }}>
                {/* {expandedActionButton[item.id] && (
                        <div className="actionBox">
                            <StyledButtonProfile  variant="contained" onClick={() => handleOpenPersonnelProfileDialog(item.id)} startIcon={<ArticleIcon />}>
                            Profile
                          </StyledButtonProfile>
                          <StyledButtonEdit onClick={() => handleEditPersonnel(item)}  variant="contained" startIcon={<BorderColorIcon />}>
                            Edit
                          </StyledButtonEdit>
                          <StyledButtonDelete  variant="contained" onClick={() => handleDeletePersonnel(item.id)} startIcon={<DeleteIcon />}>
                            Delete
                          </StyledButtonDelete>
                        </div>
                    )} */}

                    <StyledButtonProfile  variant="contained" onClick={() => handleOpenPersonnelProfileDialog(item.id)}>
                           View  Profile
                          </StyledButtonProfile>
                  {/* <button className="actionButton" onClick={() => toggleExpansion(item.id)}>
                   <MoreHorizIcon/>
                  </button> */}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomTableContainer >
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

      
      <Dialog maxWidth="xl" open={openPersonnelProfileDialog} onClose={handleClosePersonnelProfileDialog}>
       <DialogActions>
          <Button variant="contained"  onClick={handleClosePersonnelProfileDialog}>Close</Button>
       </DialogActions>
        <DialogTitle>Personnel Profile</DialogTitle>
        <DialogContent>
           <SelectedPersonnel selectedPersonnel={selectedPersonnel} />
        </DialogContent>
       
      </Dialog>

      {/* Dialog for confirming deletion
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
      </Dialog> */}

      {/* <Dialog open={updateDialog} onClose={() => setUpdateDialog(false)}>
          {selectedPersonnel && (
            <FormUpdate
              onSubmit={handleUpdatePersonnel}
              initialValues={{ 
                id: selectedPersonnel.id,
                username: selectedPersonnel.username,
                first_name: selectedPersonnel.personal_details.first_name,
                last_name: selectedPersonnel.personal_details.last_name,
                email: selectedPersonnel.personal_details.email,
                  }}
            />
          )}
      </Dialog> */}
    </div>
  );
}
