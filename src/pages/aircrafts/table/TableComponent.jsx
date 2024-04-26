/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {
  TableBody, 
  TableHead, 
  TableRow, 
  TablePagination, 
 } from "@mui/material";
import { StyledTableCell, StyledTable, StyledTableContainer, StyledDialog} from "./Styled";
import { DataContext } from "../../../context/DataProvider";

import { apiAircraftData } from "../../../api/api_urls";

import ButtonDelete from "./buttons/ButtonDelete";
import ButtonProfile from "./buttons/ButtonProfile";
import Search from "./Search";
import { PiWarningLight } from "react-icons/pi";
import ExportFiles from "./export/ExportFiles";
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { message } from "antd";
 
export default function TableComponent({ csrfToken }) {
  const { aircraftsData, updateAircraftsData } = useContext(DataContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  console.log("aircraftsData: ", aircraftsData)
  const [filteredData, setFilteredData] = useState([]);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [deleteAircraftsId, setDeleteAircraftsId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
 
 
  const handleSearchChange = (e) => setSearchQuery(e.target.value);


  useEffect(() => {
    const filteredResult = aircraftsData.filter(item => {
      const aircraftName = item.aircraft_name ? item.aircraft_name.toLowerCase() : '';
      return aircraftName.includes(searchQuery.toLowerCase());
    });
    setFilteredData(filteredResult);
  }, [searchQuery, aircraftsData]);


 
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
      message.success("Aircraft deleted successfully!");
  } catch (error) {
      console.error('Error deleting Aircraft:', error.message);
      message.error("Failed to delete Aircraft");
  }
};

  return (
    <div className="aircraftsTableWrapper">
        <div className="aircraftsTableTopBox">
                <Search handleSearchChange={handleSearchChange}/>
                <Link className="btnAdd" to={"/fleet/aircrafts/add-aircraft"}>
                 <FaPlus className="icon" />
                    Add Aircraft
                </Link>
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
                                <Link  to={'/fleet/aircrafts/update-aircraft'} state={{ aircraft: item }}  className="btnUpdate">
                                    <CiEdit/>
                                </Link>
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
            <ExportFiles />
      </div>


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
