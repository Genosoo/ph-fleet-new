/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
  TablePagination,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const baseUrl = import.meta.env.VITE_URL;
const getUsersData = `${baseUrl}/api/users/`;

const CollapsibleRow = ({ user }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          {user.personal_details && (
            <IconButton aria-label="expand row" size="small" onClick={handleToggle}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          )}
        </TableCell>
        {/* <TableCell>{user.id}</TableCell> */}
        <TableCell>{user.username}</TableCell>
        <TableCell>{user.roles}</TableCell>
      </TableRow>
      {user.personal_details && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <div className="border p-4">
                <h1>Personal Details</h1>
                {user.personal_details ? (
                  <>
                  <p>Serial No: {user.personal_details.serial_number || "N/A"}</p>
                  <p>Rank: {user.personal_details.rank || "N/A"}</p>
                    <p>First Name: {user.personal_details.first_name ||"N/A"}</p>
                    <p>Last Name: {user.personal_details.last_name ||"N/A"}</p>
                    <p>Rank: {user.personal_details.rank_name ||"N/A"}</p>
                    <p>Unit Name: {user.personal_details.unit_name ||"N/A"}</p>
                    {/* Add more properties as needed */}
                  </>
                ) : (
                  <p>No personal details available</p>
                )}
              </div>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(getUsersData);
        setUsersData(usersResponse.data.success);
        console.log("Users", usersResponse.data.success);
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
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="pr-20">
      <TableContainer component={Paper}>
        <Table>
          <TableHead  className="bg-gray-800 ">
            <TableRow>
              <TableCell />
              {/* <TableCell>ID</TableCell> */}
              <TableCell>
                <b className="text-white">Username</b>
              </TableCell>
              <TableCell><b className="text-white">Roles</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <CollapsibleRow key={index} user={user} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={usersData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Users;
