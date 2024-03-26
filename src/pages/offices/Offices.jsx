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
import {  apiOfficesData  } from "../../api/api_urls";
import GetToken from '../../components/token/GetToken'

import './OfficeStyles.css'
// import ArticleIcon from '@mui/icons-material/Article';
import FormAdd from "./FormAdd";
import FormUpdate from './FormUpdate'
import Search from "./Search";
import ButtonAddOffice from "./buttons/ButtonAddOffice";
import { StyledButtonDelete, StyledButtonProfile, StyledButtonEdit } from "./StyledComponent";
// import SelectedOffice from "./SelectedOffice";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function Office() {
  const csrfToken = GetToken();
  const [officeData, setOfficeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
//   const [openOfficeProfileDialog, setOpenOfficeProfileDialog] = useState(false);
//   const [selectedOffice, setSelectedOffice] = useState(null);
  const [officeToDelete, setOfficeToDelete] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [expandedActionButton, setExpandedActionButton] = useState({});
  const [updateDialog, setUpdateDialog] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const officeResponse = await axios.get(apiOfficesData);
        setOfficeData(officeResponse.data.success); // Ensure correct property name
        console.log("office",officeResponse.data.success )
        setLoading(false); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredResult = officeData.filter(item => {
      const officeName = item.office_name ? item.office_name.toLowerCase() : '';
  
      return (
        officeName.includes(searchQuery.toLowerCase()) 
        // aircraftName.includes(searchQuery.toLowerCase()) ||
        // aircraftType.includes(searchQuery.toLowerCase())
      );
    });
  
    setFilteredData(filteredResult);
  }, [searchQuery, officeData]);

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

//   const handleOpenOfficeProfileDialog = (id) => {
//     // Find the selected Office from the filtered data
//     const office = filteredData.find(item => item.id === id);
//     setSelectedOffice(office);
//     setOpenOfficeProfileDialog(true);
//   };
  

//   const handleCloseOfficeProfileDialog = () => {
//     setOpenOfficeProfileDialog(false);
//   };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleDeleteOffice = async (id) => {
    setOfficeToDelete(id);
    setDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (officeToDelete) {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        };
  
        await axios.delete(apiOfficesData, {
          headers,
          data: { id: officeToDelete },
        });
  
        // Update the state to exclude the deleted aircraft
        setOfficeData(prevOfficeData => prevOfficeData.filter(office => office.id !== officeToDelete));
  
        // Toggle the expansion state for the deleted item
        // setExpandedActionButton(prevExpandedActionButton => {
        //   const updatedState = { ...prevExpandedActionButton };
        //   delete updatedState[officeToDelete]; // Remove the deleted item's ID from the state
        //   return updatedState;
        // });
      } catch (error) {
        console.log(error);
      } finally {
        setOfficeToDelete(null);
        setDeleteDialog(false);
      }
    }
  };

  
  const cancelDelete = () => {
    setOfficeToDelete(null);
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


  const handleUpdateOffice = async (data) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      };
      // Include the id in the request body
      const updateOfficeData = {
        id: data.id,
        office_name: data.office_name,
        office_address: data.office_address,
        camp_base: data.camp_base,
        office_code: data.office_code,
        latitude: data.latitude,
        longitude: data.longitude,
      };

      const updateOfficeResponse = await axios.put(apiOfficesData, updateOfficeData, { headers });
      console.log("update office response", updateOfficeResponse.data);

      // Fetch updated roles data after updating a role
      const updatedOfficeResponse = await axios.get(apiOfficesData);
      setOfficeData(updatedOfficeResponse.data.success);

    } catch (error) {
      console.log(error);
    }
  };

  
  const handleEditOffice = (office) => {
    setSelectedOffice(office);
    setUpdateDialog(true);
  };
  


  return (
    <div className="tableContainer">
      <h2 className="title">Offices</h2>
      <Search  handleSearchChange={handleSearchChange}  searchQuery={searchQuery}/>
      <ButtonAddOffice handleOpenDialog={handleOpenDialog} />
      {loading ? ( // Show loading indicator if data is loading
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-800 sticky top-0 z-50">
            <TableRow>
              <StyledTableCell><b className="text-white">Name</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Address</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Camp Base</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Code</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Action</b></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index}>
                <StyledTableCell>{item.office_name ?? "--"}</StyledTableCell>
                <StyledTableCell>{item.office_address ?? "--"}</StyledTableCell>
                <StyledTableCell>{item.camp_base ?? "--"}</StyledTableCell>
                <StyledTableCell>{item.office_code ?? "--"}</StyledTableCell>
                <StyledTableCell sx={{ position:"relative" }}>
                {/* {expandedActionButton[item.id] && (
                        <div className="actionBox">
                            <StyledButtonProfile  variant="contained" onClick={() => handleOpenOfficeProfileDialog(item.id)} startIcon={<ArticleIcon />}>
                            Profile
                          </StyledButtonProfile>
                          <StyledButtonEdit onClick={() => handleEditOffice(item)}  variant="contained" startIcon={<BorderColorIcon />}>
                            Edit
                          </StyledButtonEdit>
                          <StyledButtonDelete  variant="contained" onClick={() => handleDeleteOffice(item.id)} startIcon={<DeleteIcon />}>
                            Delete
                          </StyledButtonDelete>
                        </div>
                    )} */}
                    <StyledButtonDelete  variant="contained" onClick={() => handleDeleteOffice(item.id)} startIcon={<DeleteIcon />}>
                            Delete
                          </StyledButtonDelete>
                  {/* <button className="actionButton" onClick={() => toggleExpansion(item.id)}>
                   <MoreHorizIcon/>
                  </button> */}
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

      
      {/* <Dialog maxWidth="xl" open={openOfficeProfileDialog} onClose={handleCloseOfficeProfileDialog}>
       <DialogActions>
          <Button variant="contained"  onClick={handleCloseOfficeProfileDialog}>Close</Button>
       </DialogActions>
        <DialogTitle>Office Profile</DialogTitle>
        <DialogContent>
           <SelectedOffice selectedOffice={selectedOffice} />
        </DialogContent>
       
      </Dialog> */}

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

      <Dialog open={updateDialog} onClose={() => setUpdateDialog(false)}>
          {selectedOffice && (
            <FormUpdate
              onSubmit={handleUpdateOffice}
              initialValues={{ 
                id: selectedOffice.id,
                office_name: selectedOffice.office_name,
                office_address: selectedOffice.office_address,
                camp_base: selectedOffice.camp_base,
                office_code: selectedOffice.office_code,
                latitude: selectedOffice.latitude,
                longitude: selectedOffice.longitude,
                  }}
            />
          )}
      </Dialog>
    </div>
  );
}
