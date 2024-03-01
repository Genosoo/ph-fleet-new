import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from "@mui/material";
import { apiAircraftData } from "../../api/api_urls";

export default function Personnel() {
  const [aircraftData, setAircraftData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const AircraftResponse = await axios.get(apiAircraftData);

        setAircraftData(AircraftResponse.data.success);
        console.log("Aircraft", AircraftResponse.data);
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
      <h2 className="text-xl font-semibold pb-3">Aircrafts</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-800 ">
            <TableRow>
              <TableCell><b className="text-white">Name</b></TableCell>
              <TableCell><b className="text-white">Type</b></TableCell>
              <TableCell><b className="text-white">Unit</b></TableCell>
              <TableCell><b className="text-white">Variant</b></TableCell>
              <TableCell><b className="text-white">Wing Area</b></TableCell>
              <TableCell><b className="text-white">Wing Span</b></TableCell>
              <TableCell><b className="text-white">Maximum Speed</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aircraftData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index}>
                  <TableCell>{item.aircraft_name ?? ""}</TableCell>
                  <TableCell>{item.aircraft_type_details?.type_name ?? ""}</TableCell>
                  <TableCell>{item.unit_details?.unit_name ?? ""}</TableCell>
                  <TableCell>{item.variant ?? ""}</TableCell>
                  <TableCell>{item.wing_area ?? ""}</TableCell>
                  <TableCell>{item.wingspan ?? ""}</TableCell>
                  <TableCell>{item.maximum_speed ?? ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={aircraftData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
