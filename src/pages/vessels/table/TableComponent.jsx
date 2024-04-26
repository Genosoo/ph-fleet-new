/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { StyledTableCell, StyledTable, StyledTableContainer, StyledDialog } from "./Styled";
import axios from 'axios';
import { Link } from "react-router-dom";
import {TableBody, TableHead, TableRow, TablePagination} from "@mui/material";
import ButtonDelete from "./buttons/ButtonDelete";
import ButtonProfile from "./buttons/ButtonProfile";
import Search from "./Search";
import { DataContext } from "../../../context/DataProvider";
import { apiVesselsData } from "../../../api/api_urls";
import { PiWarningLight } from "react-icons/pi";
import ExportFiles from "./export/ExportFiles";
import { FaPlus } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { message } from "antd";


export default function TableComponent({ csrfToken }) {
  const { vesselsData, updateVesselsData } = useContext(DataContext);
  console.log("vesselsData: ", vesselsData)

  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [deleteVesselId, setDeleteVesselId] = useState(null);

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
        message.success("Vessel deleted successfully!");
    } catch (error) {
        console.error('Error deleting Vessel:', error.message);
        message.error("Failed to delete Vessel!");
    }
};


  return (
    <div className="vesselsTableWrapper">
       <div className="vesselsTableTopBox">
                <Search handleSearchChange={handleSearchChange}/>
                <Link className="btnAdd" to={"/fleet/vessels/add-vessel"}>
                 <FaPlus className="icon" />
                    Add Vessel
                </Link>
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
                        <StyledTableCell >Action</StyledTableCell>
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
                            <StyledTableCell sx={{display:"flex", gap:1, alignItems:"center", }} >
                                <Link to={'/fleet/vessels/profile'} state={{ vessel: item }} >
                                    <ButtonProfile />
                                </Link>
                                <Link  to={'/fleet/vessels/update-vessel'} state={{ vessel: item }}  className="btnUpdate">
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
