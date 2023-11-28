import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from "@mui/material";

const baseUrl = import.meta.env.VITE_URL;
const getincidentData = `${baseUrl}/api/incident/`;

export default function Personnel() {
  const [incidentData, setincidentData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incidentResponse = await axios.get(getincidentData);

        setincidentData(incidentResponse.data.success);
        console.log("incident", incidentResponse.data);
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
      <h2 className="text-xl font-semibold pb-3">Incidents</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-800 ">
            <TableRow>
            <TableCell><b className="text-white">Type</b></TableCell>
              <TableCell><b className="text-white">Address Incidents</b></TableCell>
              <TableCell><b className="text-white">Address Reported</b></TableCell>
              <TableCell><b className="text-white">Reporter</b></TableCell>

              <TableCell><b className="text-white">Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incidentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index}>
                  <TableCell>{item.type_details?.type_name ?? ""}</TableCell>
                  <TableCell>{item.address_incident ?? ""}</TableCell>
                  <TableCell>{item.address_reported ?? ""}</TableCell>
                  <TableCell>{item.user_details?.username ?? ""}</TableCell>
                  <TableCell>{item.status_details?.type_status ?? ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
  );
}
