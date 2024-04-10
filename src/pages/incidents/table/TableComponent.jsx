/* eslint-disable react/prop-types */
import { DataContext } from "../../../context/DataProvider"
import {  useState, useEffect, useContext } from "react";
import {  TableBody, TableHead, TableRow,  TablePagination,  Snackbar,
  Alert, } from "@mui/material";
import { StyledTableContainer, StyledTableCell, StyledTable,  StyledDialog } from "./Styled";
import Search from "./Search";
import ButtonAddReport from "./buttons/ButtonAddReport";
import ButtonReportInfo from "./buttons/ButtonReportInfo";
import { Link } from "react-router-dom";
import ButtonUpdate from "./buttons/ButtonUpdate";
import ButtonDelete from "./buttons/ButtonDelete";
import { PiWarningLight } from "react-icons/pi";
import { apiIncident } from "../../../api/api_urls";
import axios from 'axios';
import { MdFilterAlt, MdFilterAltOff  } from "react-icons/md";

export default function TableComponent({ csrfToken }) {
  const { incidentData, incidentStatus, accountData, usersData, updateIncidentData } = useContext(DataContext)

   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [searchQuery, setSearchQuery] = useState("");
   const [filteredData, setFilteredData] = useState([]);
   const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
   const [deleteIncidentId, setDeleteIncidentId] = useState(null);
   const username = accountData.username;
  

   const [successMessage, setSuccessMessage] = useState("");
   const [errorMessage, setErrorMessage] = useState("");
   const [snackbarOpen, setSnackbarOpen] = useState(false);

   const [selectedStatus, setSelectedStatus] = useState("All");
   console.log("selected Status:", selectedStatus)



   console.log("Incident:", incidentData)
   console.log("username:", username)
   console.log("status:", incidentStatus)
   const [showSelect, setShowSelect] = useState(false); // State to manage visibility of select dropdown

   // Function to toggle the visibility of the select dropdown
   const toggleSelectFilter = () => {
     setShowSelect(!showSelect);
   };
 

   const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  useEffect(() => {
    const filteredResult = incidentData.filter(item => {
      const reporter = item.user_details?.username  ? item.user_details?.username.toLowerCase() : '';
      const incidentType = item.type_details?.type_name  ? item.type_details?.type_name.toLowerCase() : '';
      return (
        reporter.includes(searchQuery.toLowerCase()) ||
        incidentType.includes(searchQuery.toLowerCase())
      );

    });
    setFilteredData(filteredResult);
  }, [searchQuery, incidentData]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleOpenDeleteConfirmation = (incidentId) => {
    setDeleteIncidentId(incidentId);
    setOpenDeleteConfirmation(true);
};

const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
    setDeleteIncidentId(null);
};

const handleConfirmDeleteIncident = () => {
    handleDeleteIncident(deleteIncidentId);
    handleCloseDeleteConfirmation();
};


const handleDeleteIncident= async (id) => {
  try {
      await axios.delete(apiIncident, {
          data: { id },
          headers: {
              'X-CSRFToken': csrfToken
          }
      });
      const updatedIncidents = incidentData.filter(incident => incident.id !== id);
      updateIncidentData(updatedIncidents);
      setFilteredData(updatedIncidents);
      showSuccessMessage("Incident deleted successfully!");
  } catch (error) {
      console.error('Error deleting Incident:', error.message);
      showErrorMessage("Failed to delete Incident!");
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



  const handleStatusChange = async (incidentId, newStatus) => {
    // Create a FormData object
    const formData = new FormData();
    
    // Append the status and ID to the FormData object
    formData.append('status', newStatus);
    formData.append('id', incidentId);
    
    try {
      // Perform the PUT request to update status
      await axios.put(apiIncident, formData, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });
    
      // Update the incident data in state
      const updatedIncidents = incidentData.map(incident => {
        if (incident.id === incidentId) {
          return { ...incident, status: newStatus };
        }
        return incident;
      });
      updateIncidentData(updatedIncidents);
    
      // Show success message
      showSuccessMessage("Successfully changed the status!");
    } catch (error) {
      // Handle errors
      console.error('Error updating status:', error.message);
      showErrorMessage("Failed to update status!");
    }
  };
  
  // Define a color palette for status values 1 to 7
const statusColors = {
  null: '#D6EAF8',
  1: '#D6EAF8', // Status 1 color
  2: '#FAE5D3', // Status 2 color
  3: '#FCF3CF', // Status 3 color
  4: '#D5F5E3', // Status 4 color
  5: '#FADBD8', // Status 5 color
  6: '#EBDEF0', // Status 6 color
  7: '#EAEDED', // Status 7 color
};


const statusTextColors = {
  null: '#3498DB',
  1: '#3498DB', // Status 1 color
  2: '#E67E22', // Status 2 color
  3: '#F1C40F', // Status 3 color
  4: '#2ECC71', // Status 4 color
  5: '#E74C3C', // Status 5 color
  6: '#9B59B6', // Status 6 color
  7: '#95A5A6', // Status 7 color
};


const filteredByUsername = filteredData.filter(item => item.user_details.username === username);
const filteredDataToShow = selectedStatus === "All" ? filteredData : filteredData.filter(item => item.status === selectedStatus);

const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  };
  const date = new Date(dateString);
  return date.toLocaleString('en-US', options);
};


  return (
    <div className="incidentTableWrapper">
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
                <Alert variant="filled" onClose={handleSnackbarClose} severity={successMessage ? "success" : "error"}>
                    {successMessage || errorMessage}
                </Alert>
       </Snackbar>
        <div className="incidentTableTopBox">
            <Search  handleSearchChange={handleSearchChange}/>
            <ButtonAddReport />
       </div>
    <div className="incidentTableContainer">
        
        <StyledTableContainer >
        {filteredData.length > 0 ? ( 
             <StyledTable stickyHeader aria-label="sticky table" >
             <TableHead className="bg-gray-800 ">
                 <TableRow>
                 <StyledTableCell>Date/Time</StyledTableCell>
                 <StyledTableCell>Incident Description</StyledTableCell>
                 <StyledTableCell>Severity</StyledTableCell>
                 <StyledTableCell>Type</StyledTableCell>
                 <StyledTableCell>Reporter</StyledTableCell>
                 <StyledTableCell>Address Incidents</StyledTableCell>
                 <StyledTableCell>Address Reported</StyledTableCell>
                 <StyledTableCell>
                  <div className="statusTableCell">
                    <p>Status</p>
                    {showSelect && (
                      <select
                      className="statusSelect"
                      value={selectedStatus}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Parse integer value if it's not "All", otherwise, set it as is
                        setSelectedStatus(value !== "All" ? parseInt(value) : value);
                      }}
                    >
                    <option value="All">All</option>
                    {incidentStatus.map((status, index) => (
                        <option key={index} value={status.id}>
                          {status.type_status}
                        </option>
                    ))}
                  </select>
                  )}
                 <button className="selectFilter" onClick={toggleSelectFilter}>
                          {showSelect ? <MdFilterAltOff/> : <MdFilterAlt/>}
                        </button>
                  </div>
                 </StyledTableCell>
                 <StyledTableCell>Assigned Responder</StyledTableCell>

                 <StyledTableCell sx={{ position: "sticky", right: 0 }}>Action</StyledTableCell>
                 </TableRow>
             </TableHead>
             <TableBody>
             {accountData.roles[0] === "Administrator" ? (
                   // Show all data without any filtering
                  filteredDataToShow 
                       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                       .map((item, index) => (
                           <TableRow key={index}>
                            
                               <StyledTableCell>{item.created_at ? formatDate(item.created_at) : "N/A"}</StyledTableCell>
                               <StyledTableCell>{item?.type_details?.type_name || "N/A"}</StyledTableCell>
                               <StyledTableCell>{item?.severity_details?.severity_name || "N/A"}</StyledTableCell>
                               <StyledTableCell>{item?.incident_details || "N/A"}</StyledTableCell>
                               <StyledTableCell>{item?.user_details?.username || "N/A"}</StyledTableCell>
                               <StyledTableCell>{item?.address_incident || "N/A"}</StyledTableCell>
                               <StyledTableCell>{item?.address_reported || "N/A"}</StyledTableCell>
  
                               <StyledTableCell >
                                  <select className="statusSelect"  name="status"
                                  style={{
                                    backgroundColor: statusColors[item.status],
                                    color: statusTextColors[item.status] || '#000',
                                  }}
                                 value={item.status || 'N/A'} // If item.status is null, set the value to 'N/A'
                                 onChange={(e) => handleStatusChange(item.id, parseInt(e.target.value))}
                               >
                                 {incidentStatus.map((status, index) => (
                                   <option  key={index} value={status.id}>{status.type_status}</option>
                                 ))}
                               </select>
                               </StyledTableCell>
                               <StyledTableCell>
                                <select className=""  name="assigned_to" value={item.assigned_to || "N/A"} >
                                  {usersData.map((user, index) => (
                                    <option  key={index} value={user.id}>{user.username}</option>
                                  ))}
                                </select>
                               </StyledTableCell>

                               <StyledTableCell  sx={{position: "sticky", right: 0}}>
                                   <div className="actionTableBox">
                                   <Link to={"/fleet/incidents/report-information"} state={{ incident: filteredData[page * rowsPerPage + index] }} >
                                      <ButtonReportInfo  />
                                   </Link>
 
                                   <Link to={"/fleet/incidents/update-report"} state={{ incident: filteredData[page * rowsPerPage + index] }} >
                                      <ButtonUpdate  />
                                   </Link>
                                 <ButtonDelete  itemId={item.id}  handleOpenDeleteConfirmation={handleOpenDeleteConfirmation}/>
                                   </div>
                               </StyledTableCell>

                           </TableRow>
                       ))
               ) : (
                   filteredByUsername.length > 0 ? (
                  filteredDataToShow 
                   .filter(item => item.user_details.username === username)
                       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                       .map((item, index) => (
                           <TableRow key={index}>
                               <StyledTableCell>{item.created_at ? formatDate(item.created_at) : "N/A"}</StyledTableCell>
                               <StyledTableCell>{item?.type_details?.type_name || "N/A"}</StyledTableCell>
                               <StyledTableCell>{item?.severity_details?.severity_name || "N/A"}</StyledTableCell>
                               <StyledTableCell>{item?.incident_details || "N/A"}</StyledTableCell>
                               <StyledTableCell>{item?.user_details?.username || "N/A"}</StyledTableCell>
                               <StyledTableCell>{item?.address_incident || "N/A"}</StyledTableCell>
                               <StyledTableCell>{item?.address_reported || "N/A"}</StyledTableCell>

                               <StyledTableCell>
                               <select
                                    className="statusSelect"
                                    name="status"
                                    style={{
                                      backgroundColor: statusColors[item.status],
                                      color: statusTextColors[item.status] || '#000'  // Set text color based on background color
                                      // Use status color if available, else fallback to green
                                    }}
                                    value={item.status !== null ? item.status : 'N/A'} // If item.status is null, set the value to 'N/A'
                                    onChange={(e) => {
                                      if (accountData.roles[0] !== "Administrator") {
                                        // Show popup message for non-admin users 
                                        alert("Only administrators can change the status.");
                                      } else {
                                        // Handle status change for admin users
                                        handleStatusChange(item.id, parseInt(e.target.value));
                                      }
                                    }}
                                  >
                                    {incidentStatus.map((status, index) => (
                                      <option key={index} value={status.id}>{status.type_status}</option>
                                    ))}
                                  </select>


                               </StyledTableCell>
                               <StyledTableCell  sx={{display:"flex", gap:1, alignItems:"center", position: "sticky", right: 0}}>
                               <Link to={"/fleet/incidents/report-information"} state={{ incident: item }} >
                                      <ButtonReportInfo  />
                                   </Link>
                                   <Link to={"/fleet/incidents/update-report"} state={{ incident: item }} >
                                      <ButtonUpdate  />
                                   </Link>
                                 <ButtonDelete  itemId={item.id}  handleOpenDeleteConfirmation={handleOpenDeleteConfirmation}/>
 
                               </StyledTableCell>
                               
                           </TableRow>
                       ))

                      ): (
                        <TableRow>
                        <StyledTableCell colSpan={6}>No available report</StyledTableCell>
                        </TableRow>
                      )
               )}
             </TableBody>
             </StyledTable>
        ) : (
          <div>No report available</div>
        )}
         
        </StyledTableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={
              (accountData.roles && accountData.roles.length > 0 && accountData.roles[0] === "Administrator")
                ? (incidentData ? incidentData.length : 0)
                : (filteredData.filter(item => item.user_details.username === username).length)
            }
            
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

      </div>

      <StyledDialog open={openDeleteConfirmation} onClose={handleCloseDeleteConfirmation}>
  <div className="deleteDialogBox">
      <span className="deleteIcon">
          <PiWarningLight/>
      </span>
      <h3>Are you sure you want to <br /> delete this Report?</h3>
      <p>
      This action cannot be undone. All values  <br /> associated within this field will be lost.
      </p>
    <div className="deleteDialogBtn">
    <button className="delete"  onClick={handleConfirmDeleteIncident} >Delete field</button>
      <button className="cancel" onClick={handleCloseDeleteConfirmation} >Cancel</button>
    </div>
    </div>
   </StyledDialog>
    </div>
  )
}
