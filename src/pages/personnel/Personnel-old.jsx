import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from "@mui/material";
import { apiPersonnelData } from "../../api/api_urls";

export default function Personnel() {
  const [personnelData, setPersonnelData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personnelResponse = await axios.get(apiPersonnelData);

        setPersonnelData(personnelResponse.data.success);
        console.log("Personnel", personnelResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="pr-20">
      <h2 className="text-xl font-semibold pb-3">Personnel</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-800 ">
            <TableRow>
              <TableCell><b className="text-white">Username</b></TableCell>
              <TableCell><b className="text-white">First Name</b></TableCell>
              <TableCell><b className="text-white">Last Name</b></TableCell>
              <TableCell><b className="text-white">Email</b></TableCell>
              <TableCell><b className="text-white">Mobile Number</b></TableCell>
              <TableCell><b className="text-white">Rank Name</b></TableCell>
              <TableCell><b className="text-white">Status</b></TableCell>
              <TableCell><b className="text-white">Unit Name</b></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {personnelData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.personal_details?.first_name}</TableCell>
                <TableCell>{item.personal_details?.last_name}</TableCell>
                <TableCell>{item.personal_details?.email}</TableCell>
                <TableCell>{item.personal_details?.mobile_number}</TableCell>
                <TableCell>{item.personal_details?.rank_name}</TableCell>
                <TableCell>{item.personal_details?.status_name}</TableCell>
                <TableCell>{item.personal_details?.unit_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={personnelData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
