
// eslint-disable-next-line react/prop-types
import { useState, useEffect, useContext } from "react";
import { TableBody, TableHead, TableRow, TablePagination,} from "@mui/material";
import Search from "./Search";
import { Link } from "react-router-dom";
import { StyledTableCell, StyledTable, StyledTableContainer } from "./Styled";
import ButtonProfile from "./buttons/ButtonProfile";
import { DataContext } from "../../../context/DataProvider";

export default function TableComponent() {
    const { checkInData } = useContext(DataContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);






    useEffect(() => {
        const filteredResult = checkInData.filter(item => {
            const username = item.username ? item.username.toLowerCase() : '';
            return username.includes(searchQuery.toLowerCase());
        });
        setFilteredData(filteredResult);
    }, [searchQuery, checkInData]);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    
    const handleSearchChange = (e) => setSearchQuery(e.target.value);
  
    return (
        <div className="usersTableWrapper">
         
            <div className="usersTableTopBox">
                <Search handleSearchChange={handleSearchChange} searchQuery={searchQuery} />
                {/* <ButtonAdd handleOpenAddForm={handleOpenAddForm} /> */}
            </div>

            <div className="usersTableContainer">
            <StyledTableContainer >
           <StyledTable stickyHeader aria-label="sticky table" > 
                <TableHead>
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
        {filteredData.length === 0 ? (
            <TableRow>
                <StyledTableCell >No data to show</StyledTableCell>
            </TableRow>
        ) : (
            filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                <TableRow key={index}>
                    <StyledTableCell>{item?.username || "N/A"}</StyledTableCell>
                    <StyledTableCell>{item?.personal_details?.first_name || "N/A"}</StyledTableCell>
                    <StyledTableCell>{item?.personal_details?.last_name || "N/A"}</StyledTableCell>
                    <StyledTableCell>{item?.personal_details?.email || "N/A"}</StyledTableCell>
                    <StyledTableCell>{item?.personal_details?.mobile_number || "N/A"}</StyledTableCell>
                    <StyledTableCell>{item.roles && item.roles.length ? item.roles : "Users"}</StyledTableCell>
                    <StyledTableCell>{item?.personal_details?.rank_name || "N/A"}</StyledTableCell>
                    <StyledTableCell>{item?.personal_details?.status_name || "N/A"}</StyledTableCell>
                    <StyledTableCell>{item?.personal_details?.unit_name || "N/A"}</StyledTableCell>
                    <StyledTableCell   sx={{display:"flex", gap:1, alignItems:"center", position: "sticky", right: 0}}>
                        <Link to={'/fleet/personnel/profile'} state={{ user: filteredData[page * rowsPerPage + index] }} >
                            <ButtonProfile />
                        </Link>
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
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </div>

        </div>
    );
}
