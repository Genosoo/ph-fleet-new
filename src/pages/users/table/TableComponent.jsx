/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import { Table, TableBody, TableHead, TableRow, TableCell, TablePagination, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Search from "./Search";
import axios from 'axios'

  
export default function TableComponent({ usersData, apiUsers, csrfToken }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [openAddForm, setOpenAddForm] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password:"",
        mobileNumber: "",
        rankName: "",
        status: "",
        unitName: "",
        image: ""
    });

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => (setRowsPerPage(+event.target.value), setPage(0));
    const handleSearchChange = (e) => (setSearchQuery(e.target.value));
    const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleOpenAddForm = () => setOpenAddForm(true);
   
    const resetFormData = () => {
        setFormData({
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password:"",
            mobileNumber: "",
            rankName: "",
            status: "",
            unitName: "",
            image: ""
        });
    };
    
    const handleCloseAddForm = () => {
        setOpenAddForm(false);
        resetFormData();
    };



    const handleAddUser = async () => {
        try {
            // Send form data to backend using Axios POST request
            const response = await axios.post(apiUsers, formData,{
                headers: {
                    'X-CSRFToken': csrfToken,
                  }
            });
            
            // Check if the request was successful
            if (response.status === 200) {
                console.log("User added successfully:", response.data);
                // Close the form after successful addition
                handleCloseAddForm();
            } else {
                console.error("Failed to add user:", response.data);
                // Handle error case, if necessary
            }
        } catch (error) {
            console.error("Error adding user:", error);
            // Handle error case, if necessary
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    

    useEffect(() => {
        const filteredResult = usersData.filter(item => {
          const username = item.username ? item.username.toLowerCase() : '';
      
          return (
            username.includes(searchQuery.toLowerCase()) 
            // aircraftName.includes(searchQuery.toLowerCase()) ||
            // aircraftType.includes(searchQuery.toLowerCase())
          );
        });
      
        setFilteredData(filteredResult);
      }, [searchQuery, usersData]);

  return (
    <>
      <div className="flex items-center justify-center">
      <Search  handleSearchChange={handleSearchChange}  searchQuery={searchQuery}/>
     <Button variant="contained" color="primary" onClick={handleOpenAddForm}>Add User</Button>
      </div>
      <Table>
    <TableHead className="bg-gray-800 sticky top-0 z-50">
      <TableRow>
        <TableCell><b className="text-white">Username</b></TableCell>
        <TableCell><b className="text-white">First Name</b></TableCell>
        <TableCell><b className="text-white">Last Name</b></TableCell>
        <TableCell><b className="text-white">Email</b></TableCell>
        <TableCell><b className="text-white">Mobile Number</b></TableCell>
        <TableCell><b className="text-white">Rank Name</b></TableCell>
        <TableCell><b className="text-white">Status</b></TableCell>
        <TableCell><b className="text-white">Unit Name</b></TableCell>
        <TableCell><b className="text-white">Action</b></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
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
   <TablePagination
   rowsPerPageOptions={[10, 25, 50]}
   component="div"
   count={filteredData.length}
   rowsPerPage={rowsPerPage}
   page={page}
   onPageChange={handleChangePage}
   onRowsPerPageChange={handleChangeRowsPerPage}
 />

<Dialog open={openAddForm} onClose={handleCloseAddForm}>
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="username"
                        label="Username"
                        type="text"
                        fullWidth
                        value={formData.username}
                        onChange={handleFormChange}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        name="password"
                        label="Password"
                        type="text"
                        fullWidth
                        value={formData.password}
                        onChange={handleFormChange}
                    />

                    <input
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span">
                            Upload Image
                        </Button>
                    </label>
                    {formData.image && (
                        <img src={formData.image} alt="Uploaded" />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddForm} color="secondary">Cancel</Button>
                    <Button onClick={handleAddUser} color="primary">Add</Button>
                </DialogActions>
            </Dialog>
    </>
  )
}
