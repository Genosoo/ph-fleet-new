/* eslint-disable react/prop-types */
// eslint-disable-next-line react-hooks/exhaustive-deps
// eslint-disable-next-line react/prop-types
import { useState, useEffect, useContext } from "react";
import {  TableBody, TableHead, TableRow, TablePagination } from "@mui/material";
import Search from "./Search";
import { Link } from "react-router-dom";
import {  apiUsers } from "../../../api/api_urls";
import { StyledTableCell, StyledTable, StyledTableContainer, StyledDialog,  StyledSelect, StyledMenuItem,} from "./Styled";
import ButtonDelete from "./buttons/ButtonDelete";
import ButtonProfile from "./buttons/ButtonProfile";
import { DataContext } from "../../../context/DataProvider";
import { PiWarningLight } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import axios from 'axios';
import ExportFiles from "./export/ExportFiles";
import { FaPlus } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { message } from 'antd';

export default function TableComponent({  csrfToken, rolesData  }) {
   const { usersData, updateUsersData } = useContext(DataContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);

    console.log("users:", usersData)


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
            message.success("User deleted successfully!");
        } catch (error) {
            console.error('Error deleting user:', error.message);
            message.error("Failed to delete user!");

        }
    };



    const handleUserAssignedChange = async (userId, newRole) => {
      
        try {
          // Perform the PUT request to update status
          await axios.put(apiUsers, {groups:[newRole], id:userId}, {
            headers: {
              'X-CSRFToken': csrfToken
            }
          });
        
          // Update the incident data in state
          const updatedUsers = usersData.map(user => {
            if (user.id === userId) {
              return { ...user, roles: [newRole] };
            }
            return user;
          });
          updateUsersData(updatedUsers);
        
           message.success("Successfully updated role!");

        } catch (error) {
          // Handle errors
          console.error('Error updating status:', error.message);
          message.error("Failed to update role");
        }
      };


  const statusColors = {
    "On-Duty": '#EBFAF1',
    "On-Leave": '#F9F5E2',
    "Rest and Recreation": '#E6F0F7', 
    "Non-Uniform": '#FADBD8', 
    "Official Business": '#EBDEF0', 
  };
  
  
  const statusTextColors = {
    "On-Duty": '#2ECC71', 
    "On-Leave": '#F1C40F', 
    "Rest and Recreation": '#3498DB', 
    "Non-Uniform": '#E74C3C', 
    "Official Business": '#9B59B6', 
  };


    return (
        <div className="usersTableWrapper">
            <div className="usersTableTopBox">
                <Search handleSearchChange={handleSearchChange} searchQuery={searchQuery} />
                <Link className="btnAdd" to={"/fleet/users/add-users"}>
                 <FaPlus className="icon" />
                    Add User
                </Link>
            </div>

            <div className="usersTableContainer">
            <StyledTableContainer >
           <StyledTable stickyHeader aria-label="sticky table" > 
                <TableHead >
                    <TableRow>
                        <StyledTableCell>Username</StyledTableCell>
                        <StyledTableCell>First Name</StyledTableCell>
                        <StyledTableCell>Last Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Mobile Number</StyledTableCell>
                        <StyledTableCell>Roles</StyledTableCell>
                        <StyledTableCell>Rank</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell>Unit</StyledTableCell>
                        <StyledTableCell sx={{ position: "sticky", right: 0 }}>Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                        <TableRow key={index}>
                            <StyledTableCell>{item?.username || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.first_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.last_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.email || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.mobile_number || "N/A"}</StyledTableCell>
                            <StyledTableCell>
                            <StyledSelect 
                                IconComponent={IoIosArrowDown}
                                name="groups" 
                                value={item.roles[0]}
                                onChange={(e) => handleUserAssignedChange(item.id, e.target.value)}
                                >
                                {rolesData.map((user, index) => (
                                    <StyledMenuItem key={index} value={user.name}>{user.name}</StyledMenuItem>
                                ))}
                            </StyledSelect>
                            </StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.rank_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>
                                <div className="userStatusBox"  style={{
                                        backgroundColor: statusColors[item?.personal_details?.status_name],
                                        color: statusTextColors[item?.personal_details?.status_name] || "#000",
                                    }} >
                                        <div
                                         style={{
                                            backgroundColor: statusTextColors[item?.personal_details?.status_name],
                                        }} className="userStatusDot"></div>
                                    {item?.personal_details?.status_name || "N/A"}
                                </div>
                                </StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.unit_name || "N/A"}</StyledTableCell>
                            <StyledTableCell sx={{display:"flex", gap:1, alignItems:"center", position: "sticky", right: 0}} >
                                <Link to={'/fleet/users/profile'} state={{ user: item }} >
                                    <ButtonProfile />
                                </Link>
                                <Link  to={'/fleet/users/update-users'} state={{ user: item }}  className="btnUpdate">
                                    <CiEdit/>
                                </Link>
                                <ButtonDelete itemId={item.id}  handleOpenDeleteConfirmation={handleOpenDeleteConfirmation}/>
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

{/*========================== DELETE DIALOG ============================*/}
            <StyledDialog open={openDeleteConfirmation} onClose={handleCloseDeleteConfirmation}>
                <div className="deleteDialogBox">
                    <span className="deleteIcon">
                        <PiWarningLight/>
                    </span>
                    <h3>Are you sure you want to <br /> delete this user?</h3>
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
    );
}
