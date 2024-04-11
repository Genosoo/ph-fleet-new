/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../../context/DataProvider";
import {  TableBody, TableHead, TableRow, TablePagination
 } from "@mui/material";
import {StyledTableCell, StyledTable, StyledTableContainer } from "./Styled";
import ButtonUpdate from "./buttons/ButtonUpdate";
import ButtonDelete from "./buttons/ButtonDelete";
import ButtonProfile from "./buttons/ButtonProfile";
import Search from "./Search";
import ButtonAdd from "./buttons/buttonAdd";

export default function TableComponent() {
  const { personnelData, personnelStatus, updatePersonnelData } = useContext(DataContext)
  console.log("personnel:", personnelData)
  console.log("personnel status:", personnelStatus)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);


  useEffect(() => {
    const filteredResult = personnelData.filter(item => {
        const username = item.username ? item.username.toLowerCase() : '';
        return username.includes(searchQuery.toLowerCase());
    });
    setFilteredData(filteredResult);
    }, [searchQuery, personnelData]);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleSearchChange = (e) => setSearchQuery(e.target.value);


   

  return (
    <div>
         <div className="usersTableTopBox">
                <Search handleSearchChange={handleSearchChange} searchQuery={searchQuery} />
                <ButtonAdd />
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
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                        <TableRow key={index}>
                            <StyledTableCell>{item?.username || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.first_name || "N/A"} {item?.personal_details?.last_name || ""}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.email || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.mobile_number || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item.roles && item.roles.length ? item.roles : "Personnel"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.rank_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.status_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.unit_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.address ? (item.address.length > 100 ? item.address.slice(0, 30) + '...' : item.address) : "N/A"}</StyledTableCell>

                            <StyledTableCell sx={{display:"flex", gap:1, alignItems:"center", position: "sticky", right: 0}} >
                                <Link to={'/fleet/personnel/profile'} state={{ personnel: filteredData[page * rowsPerPage + index] }} >
                                    <ButtonProfile />
                                </Link>
                                <ButtonUpdate />
                                <ButtonDelete />
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

    </div>
  )
}
