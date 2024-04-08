import { DataContext } from "../../../context/DataProvider"
import {  useState, useContext } from "react";
import {  TableBody, TableHead, TableRow,  TablePagination } from "@mui/material";
import { StyledTableContainer, StyledTableCell, StyledTable } from "./Styled";
import Search from "./Search";
import ButtonAddReport from "./buttons/ButtonAddReport";

export default function TableComponent() {
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);

   const { incidentData, } = useContext(DataContext)
   console.log("Incident:", incidentData)

   const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };




  return (
    <div className="incidentTableWrapper">
        <div className="incidentTableTopBox">
            <Search />
            <ButtonAddReport />
       </div>
    <div className="incidentTableContainer">
        
        <StyledTableContainer >
            <StyledTable stickyHeader aria-label="sticky table" >
            <TableHead className="bg-gray-800 ">
                <TableRow>
                <StyledTableCell><b className="text-white">Type</b></StyledTableCell>
                <StyledTableCell><b className="text-white">Description</b></StyledTableCell>
                <StyledTableCell><b className="text-white">Address Incidents</b></StyledTableCell>
                <StyledTableCell><b className="text-white">Address Reported</b></StyledTableCell>
                <StyledTableCell><b className="text-white">Reporter</b></StyledTableCell>
                <StyledTableCell><b className="text-white">Status</b></StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {incidentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                <TableRow key={index}>
                    <StyledTableCell>{item?.type_details?.type_name || "N/A"}</StyledTableCell>
                    <StyledTableCell>{item?.incident_details || "N/A"}</StyledTableCell>
                    <StyledTableCell>{item?.address_incident || "N/A"}</StyledTableCell>
                    <StyledTableCell>{item?.address_reported || "N/A"}</StyledTableCell>
                    <StyledTableCell>{item?.user_details?.username || "N/A"}</StyledTableCell>
                    <StyledTableCell>{item?.status_details?.type_status || "N/A"}</StyledTableCell>
                </TableRow>
                ))}
            </TableBody>
            </StyledTable>
        </StyledTableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={incidentData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  )
}
