/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";


import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { apiUsers, apiRoles, getCsrfToken } from "../../api/api_urls";
import "./Styles.css"
import { StyledButtonAdd } from "../vessels/StyledComponent";
import GroupsIcon from '@mui/icons-material/Groups';

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("User");
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateUserId, setUpdateUserId] = useState(null);
  const [rolesData, setRolesData] = useState([]);

  const [csrfToken, setCsrfToken] = useState('');
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesResponse = await axios.get(apiRoles);
        setRolesData(rolesResponse.data.success);
        console.log("roles", rolesResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  const handleUpdateUser = (id) => {
    const userToUpdate = usersData.find((user) => user.id === id);
    setUpdateUserId(id);
    setUsername(userToUpdate.username); 
    setFirstName(userToUpdate.first_name);
    setLastName(userToUpdate.last_name);
    setEmail(userToUpdate.email);
    setSelectedRole(userToUpdate.groups);
    setUpdateOpen(true);
  };

  const handleUpdateConfirm = async () => {
    // Similar to handleCreateUser, send a PUT request to update user details
    try {
      const updatedUser = {
        id: updateUserId,
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        groups:[selectedRole],
      };

      const headers = {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      };

      await axios.put(apiUsers, updatedUser, headers);

      const updatedUsersData = usersData.map((user) =>
        user.id === updateUserId ? updatedUser : user
      );
      setUsersData(updatedUsersData);

      // Close the update dialog
      setUpdateOpen(false);
      window.location.reload()

    } catch (error) {
      console.error("Error updating user:", error);
    }
  };


  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleCreateUser = async () => {
    // Create a new user object with form data
    const newUser = {
      username,
      first_name: firstName, // Adjusted to match backend expectation
      last_name: lastName,   // Adjusted to match backend expectation
      email,
      password,
      groups: [selectedRole], 
    };

    // Include CSRF token in the headers
    const headers = {
      headers: {
        'X-CSRFToken': csrfToken,
      },
    };

    try {
      // Make a POST request to create a new user with CSRF token in the headers and newUser in the body
      await axios.post(apiUsers, newUser, headers);

      // Update the usersData state with the new user
      setUsersData((prevUsers) => [...prevUsers, newUser]);

      // Clear the form fields after submission
      setUsername("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setSelectedRole(""); // Reset role to default after submission
      window.location.reload()
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleDeleteUser = (id) => {
    setDeleteUserId(id);
    setDeleteConfirmDialogOpen(true);
  };


  const handleDeleteConfirm = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      };

      const requestBody = { id: deleteUserId };

      await axios.delete(`${apiUsers}`, { headers, data: requestBody });

      const updatedUsersData = usersData.filter((user) => user.id !== deleteUserId);
      setUsersData(updatedUsersData);

      setDeleteConfirmDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const getTheCsrfToken = async () => {
      try {
        const response = await axios.get(getCsrfToken);
        setCsrfToken(response.data['csrf-token']);
      } catch (error) {
        console.log(error);
      }
    };

    getTheCsrfToken();
  }, []);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(apiUsers);
        setUsersData(usersResponse.data.success ?? []);
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteConfirmDialogOpen(false);
    setUpdateOpen(false)
  };



  return (
    <div className="userContainer">
      <div className="mb-3">
        <StyledButtonAdd onClick={handleOpen} startIcon={<GroupsIcon />}>
          Add User
        </StyledButtonAdd>
      </div>

{/* Update dialog */}
<Dialog open={updateOpen} onClose={handleClose}>
  <DialogTitle>Update User</DialogTitle>
  <DialogContent>
    <TextField
      name="username"
      label="Username"
      fullWidth
      value={username}
      margin="normal"
      onChange={(e) => setUsername(e.target.value)}
    />
    <TextField
      name="firstName"
      label="First Name"
      fullWidth
      margin="normal"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
    />
    <TextField
      name="lastName"
      label="Last Name"
      fullWidth
      margin="normal"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
    />
    <TextField
      name="email"
      label="Email"
      fullWidth
      margin="normal"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <TextField
      name="password"
      label="Password"
      type="password"
      fullWidth
      margin="normal"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <FormControl fullWidth margin="normal">
      <InputLabel id="role-label">Role</InputLabel>
      <Select
        labelId="role-label"
        name="groups"
        value={selectedRole}
        onChange={handleRoleChange}
      >
        {rolesData.map((item,index) => (
           <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleUpdateConfirm} color="primary">
      Update
    </Button>
  </DialogActions>
</Dialog>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <TextField
            name="username"
            label="Username"
            fullWidth
            value={username}
            margin="normal"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            name="firstName"
            label="First Name"
            fullWidth
            margin="normal"
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            name="lastName"
            label="Last Name"
            fullWidth
            margin="normal"
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            name="email"
            label="Email"
            fullWidth
            margin="normal"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
            labelId="role-label"
            name="groups"  // Change to "groups"
            value={selectedRole} onChange={handleRoleChange}
          >
              {rolesData.map((item,index) => (
                  <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateUser} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>



         {/* Dialog for confirming deletion */}
         <Dialog  open={deleteConfirmDialogOpen}  onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
        <span className="flex flex-col gap-3">
        <p> Are you sure you want to delete this user?</p>
         <Button size="small" variant="outlined" color="success"  onClick={handleDeleteConfirm}>
            Confirm
          </Button>
          <Button size="small" variant="outlined" color="error"  onClick={handleClose}>
            Cancel
          </Button>
        </span>
        </DialogContent>
      </Dialog>

    
      
      {usersData.length === 0 ? (
        <p>No data available</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="bg-gray-800">
              <TableRow>
                <TableCell><b className="text-white">Username</b></TableCell>
                <TableCell><b className="text-white">Table</b></TableCell>
                <TableCell><b className="text-white">Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? usersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : usersData
              ).map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.groups && item.groups.length > 0 ? item.groups[0].name : ''}</TableCell>
                  <TableCell>
                    <span className="userBtnBox">
                      <button onClick={() => handleDeleteUser(item.id)}  className="userBtnDelete">
                      <FaTrash  />
                    </button>
                    <button   onClick={() => handleUpdateUser(item.id)} className="userBtnEdit">
                      <FaEdit />
                    </button>
                    </span>
                 
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={usersData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
      
    </div>
  );
};

export default Users;