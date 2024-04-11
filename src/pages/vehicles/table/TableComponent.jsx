/* eslint-disable no-unused-vars */
import { DataContext } from "../../../context/DataProvider";
import { useState, useEffect, useContext } from "react";
import ButtonUpdate from "./buttons/ButtonUpdate";
import ButtonDelete from "./buttons/ButtonDelete";
import ButtonProfile from "./buttons/ButtonProfile";
import ButtonAdd from "./buttons/buttonAdd";
import {StyledTableCell, StyledTable, StyledTableContainer } from "./Styled";
import Search from "./Search";
import {  TableBody, TableHead, TableRow, TablePagination} from "@mui/material";
import { Link } from "react-router-dom";

export default function TableComponent() {
  const { vehiclesData } = useContext(DataContext);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  console.log("vehicles:", vehiclesData)

  useEffect(() => {
    const filteredResult = vehiclesData.filter(item => {
        const officeName = item.office_name ? item.office_name.toLowerCase() : '';
        return officeName.includes(searchQuery.toLowerCase());
    });
    setFilteredData(filteredResult);
}, [searchQuery, vehiclesData]);

const handleChangePage = (event, newPage) => setPage(newPage);
const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
};
const handleSearchChange = (e) => setSearchQuery(e.target.value);

  return (
    <div  className="officesTableWrapper">
      <div className="officesTableTopBox">
                <Search  handleSearchChange={handleSearchChange}/>
                <ButtonAdd/>
            </div>

            <div className="usersTableContainer">
            <StyledTableContainer >
           <StyledTable stickyHeader aria-label="sticky table" > 
                <TableHead >
                    <TableRow>
                       <StyledTableCell>Vehicle Name</StyledTableCell>
                       <StyledTableCell>Vehicle Code</StyledTableCell>
                       <StyledTableCell>Unit</StyledTableCell>
                        <StyledTableCell>Office Name</StyledTableCell>
                        <StyledTableCell>Office Address</StyledTableCell>
                        <StyledTableCell >Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                        <TableRow key={index}>
                            <StyledTableCell>{item?.vehicle_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.vehicle_code || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.unit_details?.unit_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.office_details?.office_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.office_details?.office_address || "N/A"}</StyledTableCell>
                            <StyledTableCell sx={{display:"flex", gap:1, alignItems:"center"}} >
                                <div className="flex gap-4">
                                {/* <Link to={'/fleet/offices/profile'} state={{ office: filteredData[page * rowsPerPage + index] }} >
                                </Link> */}
                                <ButtonProfile />

                                <ButtonUpdate />
                                <ButtonDelete/>
                                </div>
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
