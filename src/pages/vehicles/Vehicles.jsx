import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from "@mui/material";
import { apiVehiclesData } from "../../api/api_urls";

export default function Personnel() {
  const [vehiclesData, setvehiclesData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehiclesResponse = await axios.get(apiVehiclesData);

        setvehiclesData(vehiclesResponse.data.success);
        console.log("vehicles", vehiclesResponse.data);
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
      <h2 className="text-xl font-semibold pb-3">Vehicles</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-800 ">
            <TableRow>
              <TableCell><b className="text-white">Name</b></TableCell>
              <TableCell><b className="text-white">Type</b></TableCell> 
              <TableCell><b className="text-white">Code</b></TableCell>
              <TableCell><b className="text-white">Office</b></TableCell> 
              <TableCell><b className="text-white">Address</b></TableCell> 
              <TableCell><b className="text-white">Unit</b></TableCell> 


            </TableRow>
          </TableHead>
          <TableBody>
            {vehiclesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index}>
                  <TableCell>{item.vehicle_name ?? ""}</TableCell>
                  <TableCell>{item.vehicle_type ?? ""}</TableCell>
                  <TableCell>{item.vehicle_code ?? ""}</TableCell>
                  <TableCell>{item.office_details?.office_name ?? ""}</TableCell>
                  <TableCell>{item.office_details?.office_address ?? ""}</TableCell>
                  <TableCell>{item.unit_details?.unit_name ?? ""}</TableCell>
     
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={vehiclesData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
