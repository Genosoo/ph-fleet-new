import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from "@mui/material";
import { apiOfficesData } from "../../api/api_urls";

export default function Personnel() {
  const [officesData, setOfficesData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const OfficesResponse = await axios.get(apiOfficesData);

        setOfficesData(OfficesResponse.data.success);
        console.log("Offices", OfficesResponse.data);
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
      <h2 className="text-xl font-semibold pb-3">Offices</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-800 ">
            <TableRow>
              <TableCell><b className="text-white">Name</b></TableCell>
              <TableCell><b className="text-white">Address</b></TableCell>
              <TableCell><b className="text-white">Camp Base</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {officesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index}>
                  <TableCell>{item.office_name ?? ""}</TableCell>
                  <TableCell>{item.office_address ?? ""}</TableCell>
                  <TableCell>{item.camp_base ?? ""}</TableCell>
     
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={officesData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
