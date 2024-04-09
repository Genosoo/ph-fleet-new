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

export default function TableComponent({ csrfToken }) {
  const { incidentData, accountData, updateIncidentData } = useContext(DataContext)

   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [searchQuery, setSearchQuery] = useState("");
   const [filteredData, setFilteredData] = useState([]);
   const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
   const [deleteIncidentId, setDeleteIncidentId] = useState(null);
   const username = accountData.username;
   console.log("Incident:", incidentData)
   console.log("username:", username)

   const [successMessage, setSuccessMessage] = useState("");
   const [errorMessage, setErrorMessage] = useState("");
   const [snackbarOpen, setSnackbarOpen] = useState(false);

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
      showSuccessMessage("Vessels deleted successfully!");
  } catch (error) {
      console.error('Error deleting Vessels:', error.message);
      showErrorMessage("Failed to delete Vessels!");
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
            <StyledTable stickyHeader aria-label="sticky table" >
            <TableHead className="bg-gray-800 ">
                <TableRow>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                {/* <StyledTableCell>Address Incidents</StyledTableCell>
                <StyledTableCell>Address Reported</StyledTableCell> */}
                <StyledTableCell>Reporter</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell sx={{ position: "sticky", right: 0 }}>Action</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {accountData.roles[0] === "Administrator" ? (
                  // Show all data without any filtering
                  filteredData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((item, index) => (
                          <TableRow key={index}>
                              <StyledTableCell>{item?.type_details?.type_name || "N/A"}</StyledTableCell>
                              <StyledTableCell>{item?.incident_details || "N/A"}</StyledTableCell>
                              {/* <StyledTableCell>{item?.address_incident || "N/A"}</StyledTableCell>
                              <StyledTableCell>{item?.address_reported || "N/A"}</StyledTableCell> */}
                              <StyledTableCell>{item?.user_details?.username || "N/A"}</StyledTableCell>
                              <StyledTableCell>{item?.status_details?.type_status || "N/A"}</StyledTableCell>
                              <StyledTableCell  sx={{display:"flex", gap:1, alignItems:"center", position: "sticky", right: 0}}>
                                 <Link to={"/fleet/incidents/report-information"} state={{ incident: filteredData[page * rowsPerPage + index] }} >
                                     <ButtonReportInfo  />
                                  </Link>

                                  <Link to={"/fleet/incidents/update-report"} state={{ incident: filteredData[page * rowsPerPage + index] }} >
                                     <ButtonUpdate  />
                                  </Link>
                                <ButtonDelete  itemId={item.id}  handleOpenDeleteConfirmation={handleOpenDeleteConfirmation}/>
                              </StyledTableCell>
                          </TableRow>
                      ))
              ) : (
                  // Filter based on username match
                  filteredData
                      .filter(item => item.user_details.username === username)
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((item, index) => (
                          <TableRow key={index}>
                              <StyledTableCell>{item?.type_details?.type_name || "N/A"}</StyledTableCell>
                              <StyledTableCell>{item?.incident_details || "N/A"}</StyledTableCell>
                              {/* <StyledTableCell>{item?.address_incident || "N/A"}</StyledTableCell>
                              <StyledTableCell>{item?.address_reported || "N/A"}</StyledTableCell> */}
                              <StyledTableCell>{item?.user_details?.username || "N/A"}</StyledTableCell>
                              <StyledTableCell >{item?.status_details?.type_status || "N/A"}</StyledTableCell>
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
              )}


            </TableBody>
            </StyledTable>
        </StyledTableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={
              accountData.roles[0] === "Administrator"
                ? incidentData.length
                : filteredData.filter(item => item.user_details.username === username).length
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
