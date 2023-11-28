import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from "@mui/material";

const baseUrl = import.meta.env.VITE_URL;
const getVesselsData = `${baseUrl}/api/internal_vessel/`;

export default function Vessels() {
  const [vesselsData, setVesselsData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vesselsResponse = await axios.get(getVesselsData);

        setVesselsData(vesselsResponse.data.success);
        console.log("Vessels", vesselsResponse.data);
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
      <h2 className="text-xl font-semibold pb-3">Vessels</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-800 ">
            <TableRow>
              <TableCell><b className="text-white">Name</b></TableCell>
              <TableCell><b className="text-white">Class Name</b></TableCell>
              <TableCell><b className="text-white">Type</b></TableCell>
              <TableCell><b className="text-white">Unit</b></TableCell>
              <TableCell><b className="text-white">Origin</b></TableCell>
              <TableCell><b className="text-white">Capacity</b></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
  {vesselsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
    <TableRow key={index}>
      <TableCell>{item.vessel_name ?? ""}</TableCell>
      <TableCell>{item.vessel_class_details?.class_name ?? ""}</TableCell>
      <TableCell>{item.vessel_type_details?.type_name ?? ""}</TableCell>
      <TableCell>{item.unit_details?.unit_name ?? ""}</TableCell>
      <TableCell>{item.origin ?? ""}</TableCell>
      <TableCell>{item.capacity ?? ""}</TableCell>
    </TableRow>
  ))}
</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={vesselsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
