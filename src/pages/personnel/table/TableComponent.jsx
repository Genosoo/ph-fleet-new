/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../../context/DataProvider";
import {  TableBody, TableHead, TableRow, TablePagination  } from "@mui/material";
import { StyledTableCell, StyledTable, StyledTableContainer, StyledDialog } from "./Styled";
import ButtonDelete from "./buttons/ButtonDelete";
import ButtonProfile from "./buttons/ButtonProfile";
import Search from "./Search";
import { apiUsers } from "../../../api/api_urls";
import axios from 'axios';
import { PiWarningLight } from "react-icons/pi";
import ExportFiles from "./export/ExportFiles";
import { FaPlus } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { message } from 'antd';

export default function TableComponent({ csrfToken,  personnelStatus, }) {
  const { usersData,  updateUsersData, accountData} = useContext(DataContext)
  console.log("personnel users:", usersData)
  console.log("personnel status:", personnelStatus)
  

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);



  useEffect(() => {
    const filteredResult = usersData.filter(item => {
        const username = item.username ? item.username.toLowerCase() : '';
        return username.includes(searchQuery.toLowerCase());
    });
    setFilteredData(filteredResult);
    }, [searchQuery, usersData]);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleSearchChange = (e) => setSearchQuery(e.target.value);


  






    const handleOpenDeleteConfirmation = (userId) => {
        setDeleteUserId(userId);
        setOpenDeleteConfirmation(true);
    };

    const handleCloseDeleteConfirmation = () => {
        setOpenDeleteConfirmation(false);
        setDeleteUserId(null);
    };

    const handleConfirmDeleteUser = () => {
        handleDeleteUser(deleteUserId);
        handleCloseDeleteConfirmation();
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(apiUsers, {
                data: { id },
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });
            const updatedUsers = usersData.filter(user => user.id !== id);
            updateUsersData(updatedUsers);
            setFilteredData(updatedUsers);
             message.success("Personnel deleted successfully!");
        } catch (error) {
            console.error('Error deleting Personnel:', error.message);
            message.error("Failed to delete Personnel!");
        }
    };


    

  return (
    <div>
         <div className="usersTableTopBox">
                <Search handleSearchChange={handleSearchChange} searchQuery={searchQuery} />
                <Link className="btnAdd" to={"/fleet/personnel/add-personnel"}>
                 <FaPlus className="icon" />
                    Add Personnel
                </Link>
            </div>
            <div className="usersTableContainer">
            <StyledTableContainer >
           <StyledTable stickyHeader aria-label="sticky table" > 
                <TableHead >
                    <TableRow>
                        <StyledTableCell>Username</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Mobile Number</StyledTableCell>
                        <StyledTableCell>Roles</StyledTableCell>
                        <StyledTableCell>Rank</StyledTableCell>
                        <StyledTableCell>Duty Status</StyledTableCell>
                        <StyledTableCell>Unit</StyledTableCell>
                        <StyledTableCell>Check-in Location</StyledTableCell>
                        <StyledTableCell sx={{ position: "sticky", right: 0 }}>Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData
                    .filter(item => item.roles && (item.roles.length === 0 || item.roles.includes("Personnel")))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                        <TableRow key={index}>
                            <StyledTableCell>{item?.username || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.first_name || "N/A"} {item?.personal_details?.last_name || ""}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.email || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.mobile_number || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.roles[0] || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.rank_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.status_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.unit_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>
                              
                            </StyledTableCell>

                            <StyledTableCell sx={{display:"flex", gap:1, alignItems:"center", position: "sticky", right: 0}} >
                                <Link to={'/fleet/personnel/profile'} state={{ personnel: item}} >
                                    <ButtonProfile />
                                </Link>
                                <Link  to={'/fleet/personnel/update-personnel'} state={{ personnel: item }}  className="btnUpdate"><CiEdit/></Link>
                                <ButtonDelete  itemId={item.id}  handleOpenDeleteConfirmation={handleOpenDeleteConfirmation} />
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
            {accountData.roles && accountData.roles.length > 0 && accountData.roles[0] === "Administrator" && (
               <ExportFiles />
             )}



 
    {/*========================== DELETE DIALOG ============================*/}
    <StyledDialog open={openDeleteConfirmation} onClose={handleCloseDeleteConfirmation}>
                <div className="deleteDialogBox">
                    <span className="deleteIcon">
                        <PiWarningLight/>
                    </span>
                    <h3>Are you sure you want to <br /> delete this personnel?</h3>
                   <p>
                   This action cannot be undone. All values  <br /> associated within this field will be lost.
                   </p>
                  <div className="deleteDialogBtn">
                  <button className="delete"  onClick={handleConfirmDeleteUser} >Delete field</button>
                    <button className="cancel" onClick={handleCloseDeleteConfirmation} >Cancel</button>
                  </div>
                </div>
            </StyledDialog>           

    </div>
  )
}
