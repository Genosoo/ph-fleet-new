/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line react-hooks/exhaustive-deps
// eslint-disable-next-line react/prop-types
import { useState, useEffect, useContext } from "react";
import { DialogContentText,  TableBody, TableHead, TableRow, TablePagination,
   TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Select,
   MenuItem, FormControl,InputLabel,
   Snackbar, Alert
} from "@mui/material";
import Search from "./Search";
import axios from 'axios';
import { Link } from "react-router-dom";
import { apiPersonnelRank, apiPersonnelStatus, apiUnit, apiPersonnelData, apiOfficesData, baseUrl, apiRoles } from "../../../api/api_urls";
import { StyledTableCell, StyledTable, StyledTableContainer } from "./Styled";
// import ButtonUpdate from "./buttons/ButtonUpdate";
// import ButtonDelete from "./buttons/ButtonDelete";
import ButtonProfile from "./buttons/ButtonProfile";
// import ButtonAdd from "./buttons/buttonAdd";
import { DataContext } from "../../../context/DataProvider";

export default function TableComponent({ csrfToken }) {
    const { usersData, updateUsersData } = useContext(DataContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    // const [openAddForm, setOpenAddForm] = useState(false);
    // const [openUpdateForm, setOpenUpdateForm] = useState(false);
    // const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        groups:[],
        personal_details: {
            first_name: "",
            last_name: "",
            middle_name: "",
            gender:"",
            email: "",
            mobile_number: "",
            image: "",
            rank:"",
            personnel_status:"",
            unit:"",
        }
    });
    const [rankData, setRankData] = useState([]);
    const [statusData, setStatusData] = useState([]);
    const [unitData, setUnitData] = useState([]);
    const [officeData, setOfficeData] = useState([]);
    const [rolesData, setRolesData] = useState([]);


    const [selectedUser, setSelectedUser] = useState(null);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setSnackbarOpen(true);
        setTimeout(() => {
            setSuccessMessage("");
            setSnackbarOpen(false);
        }, 2000);
    };

    const showErrorMessage = (message) => {
        setErrorMessage(message);
        setSnackbarOpen(true);
        setTimeout(() => {
            setErrorMessage("");
            setSnackbarOpen(false);
        }, 2000);
    };

    const handleOpenDeleteConfirmation = (userId) => {
        setDeleteUserId(userId);
        setOpenDeleteConfirmation(true);
    };

    const handleCloseDeleteConfirmation = () => {
        setOpenDeleteConfirmation(false);
        setDeleteUserId(null);
    };

    const handleConfirmDeleteUser = () => {
        handleDeleteUser(deleteUserId);
        handleCloseDeleteConfirmation();
    };

    const handleOpenUpdateForm = (user) => {
        setSelectedUser(user);
        setFormData({
            username: user.username,
            password: user.password,
            groups: user.groups,
            personal_details: {
                ...user.personal_details
            }
        });

        console.log({
            username: user.username,
            password: user.password,
            personal_details: {
                ...user.personal_details
            }
        })

        setOpenUpdateForm(true);
    };

    const handleCloseUpdateForm = () => {
        setOpenUpdateForm(false);
        setSelectedUser(null);
        resetFormData();
    };
    
    useEffect(() => {
      const fetchData = async () => {
          try {
              const rankResponse = await axios.get(apiPersonnelRank);
              const statusResponse = await axios.get(apiPersonnelStatus);
              const unitResponse = await axios.get(apiUnit);
              const officeResponse = await axios.get(apiOfficesData);
              const rolesResponse = await axios.get(apiRoles);

              setRankData(rankResponse.data.success)
              setStatusData(statusResponse.data.success)
              setUnitData(unitResponse.data.success)
              setOfficeData(officeResponse.data.success)
              setRolesData(rolesResponse.data.success)

              console.log('rank:', rankResponse.data.success)
              console.log('status:', statusResponse.data.success)
              console.log('unit:', unitResponse.data.success)
              console.log('office:', officeResponse.data.success)
              console.log('roles:', rolesResponse.data.success)

          } catch (error) {
              console.error(error);
          }
      };

        fetchData();
    }, []);

    useEffect(() => {
        const filteredResult = usersData.filter(item => {
            const username = item.username ? item.username.toLowerCase() : '';
            return username.includes(searchQuery.toLowerCase());
        });
        setFilteredData(filteredResult);
    }, [searchQuery, usersData]);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    
    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    // const handleFormChange = (e) => {
    //     const { name, value } = e.target;
    //     if (name.includes("personal_details")) {
    //         const [key, subKey] = name.split(".");
    //         setFormData(prevState => ({
    //             ...formData,
    //             [key]: {
    //                 ...prevState[key],
    //                 [subKey]: value
    //             }
    //         }));
    //     } else {
    //         setFormData({ ...formData, [name]: value });
    //     }
    // };

//     const handleFormChange = (e) => {
//       const { name, value } = e.target;
//       if (name.includes("personal_details")) {
//           const [key, subKey] = name.split(".");
//           setFormData(prevState => ({
//               ...formData,
//               [key]: {
//                   ...prevState[key],
//                   [subKey]: value
//               }
//           }));
//       } else if (name === "groups") {
//           setFormData({ ...formData, groups: [value] }); // Update roles as an array
//       } else {
//           setFormData({ ...formData, [name]: value });
//       }
//   };

    // const handleOpenAddForm = () => setOpenAddForm(true);
    // const handleCloseAddForm = () => {
    //     setOpenAddForm(false);
    //     resetFormData();
    // };

    const resetFormData = () => {
        setFormData({
            username: "",
            password: "",
            groups: [],
            personal_details: {
                first_name: "",
                last_name: "",
                email: "",
                mobile_number: "",
                image: "",
                rank:"",
                personnel_status:"",
                unit:"",
                office: "",
                middle_name: "",
                gender:"",
            }
        });
    };

    // const handleAddUser = async () => {
    //     try {
    //         const response = await axios.post(apiPersonnelData, formData, {
    //             headers: {
    //                 'X-CSRFToken': csrfToken
    //             }
    //         });
    //         const newUser = response.data.data;
    //         updateUsersData([...usersData, newUser]);
    //         setFilteredData([...filteredData, newUser]);
    //         // handleCloseAddForm();
    //         showSuccessMessage("User added successfully!");
    //     } catch (error) {
    //         console.error('Error adding user:', error);
    //         showErrorMessage("Failed to add user!");
    //     }
    // };

    // const handleUpdateUser = async () => {
    //     try {
    //         const updatedFormData = { ...formData, id: selectedUser.id };

    //         const response = await axios.put(apiPersonnelData, updatedFormData, {
    //             headers: {
    //                 'X-CSRFToken': csrfToken
    //             }
    //         });
    //         const updatedUser = response.data.data;
    //         const updatedUsers = usersData.map(user => {
    //             if (user.id === updatedUser.id) {
    //                 return updatedUser;
    //             }
    //             return user;
    //         });
    //         updateUsersData(updatedUsers);
    //         setFilteredData(updatedUsers);
    //         handleCloseUpdateForm();
    //         showSuccessMessage("User updated successfully!");
    //     } catch (error) {
    //         console.error('Error updating user:', error);
    //         showErrorMessage("Failed to update user!");
    //     }
    // };

    // const handleDeleteUser = async (id) => {
    //     try {
    //         await axios.delete(apiPersonnelData, {
    //             data: { id },
    //             headers: {
    //                 'X-CSRFToken': csrfToken
    //             }
    //         });
    //         const updatedUsers = usersData.filter(user => user.id !== id);
    //         updateUsersData(updatedUsers);
    //         setFilteredData(updatedUsers);
    //         showSuccessMessage("User deleted successfully!");
    //     } catch (error) {
    //         console.error('Error deleting user:', error.message);
    //         showErrorMessage("Failed to delete user!");
    //     }
    // };

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setFormData({ ...formData, personal_details: { ...formData.personal_details, image: reader.result } });
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    return (
        <div className="usersTableWrapper">
           <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={successMessage ? "success" : "error"}>
                    {successMessage || errorMessage}
                </Alert>
            </Snackbar>
            <div className="usersTableTopBox">
                <Search handleSearchChange={handleSearchChange} searchQuery={searchQuery} />
                {/* <ButtonAdd handleOpenAddForm={handleOpenAddForm} /> */}
            </div>

            <div className="usersTableContainer">
            <StyledTableContainer >
           <StyledTable stickyHeader aria-label="sticky table" > 
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Username</StyledTableCell>
                        <StyledTableCell>First Name</StyledTableCell>
                        <StyledTableCell>Last Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Mobile Number</StyledTableCell>
                        <StyledTableCell>Roles</StyledTableCell>
                        <StyledTableCell>Rank</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell>Unit</StyledTableCell>
                        <StyledTableCell sx={{ position: "sticky", right: 0 }}>Action</StyledTableCell>
                        {/* <StyledTableCell >Action</StyledTableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                        <TableRow key={index}>
                            <StyledTableCell>{item?.username || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.first_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.last_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.email || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.mobile_number || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item.roles && item.roles.length ? item.roles : "Users"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.rank_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.status_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.unit_name || "N/A"}</StyledTableCell>
                            {/* <StyledTableCell sx={{display:"flex", gap:1, alignItems:"center", position: "sticky", right: 0}} > */}
                            <StyledTableCell   sx={{display:"flex", gap:1, alignItems:"center", position: "sticky", right: 0}}>
                                <Link to={'/fleet/personnel/profile'} state={{ user: filteredData[page * rowsPerPage + index] }} >
                                    <ButtonProfile />
                                </Link>
                                {/* <ButtonUpdate item={item} handleOpenUpdateForm={handleOpenUpdateForm} /> */}
                                {/* <ButtonDelete itemId={item.id}  handleOpenDeleteConfirmation={handleOpenDeleteConfirmation}/> */}
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
            </StyledTableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </div>


            {/*============= Add FORM ============================*/}
            {/* <Dialog open={openAddForm} onClose={handleCloseAddForm}>
                <DialogTitle>Add Personnel</DialogTitle>
                <DialogContent>

                <div className="flex flex-col border p-5 mt-3 rounded-md">
                       <span className="text-lg">Profile Photo</span>
                     <input
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        onChange={handleImageChange}
                    />
                    {formData.personal_details.image && (
                          <img className="w-[300px]" src={formData.personal_details.image} alt="Uploaded" />
                      )}

                     </div>
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
                    <TextField
                        autoFocus
                        margin="dense"
                        name="personal_details.first_name"
                        label="First Name"
                        type="text"
                        fullWidth
                        value={formData.personal_details.first_name}
                        onChange={handleFormChange}
                    />
                     <TextField
                        autoFocus
                        margin="dense"
                        name="personal_details.middle_name"
                        label="Middle Name"
                        type="text"
                        fullWidth
                        value={formData.personal_details.middle_name}
                        onChange={handleFormChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="personal_details.last_name"
                        label="Last Name"
                        type="text"
                        fullWidth
                        value={formData.personal_details.last_name}
                        onChange={handleFormChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="personal_details.email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={formData.personal_details.email}
                        onChange={handleFormChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="personal_details.mobile_number"
                        label="Mobile Number"
                        type="tel"
                        fullWidth
                        value={formData.personal_details.mobile_number}
                        onChange={handleFormChange}
                    />

                  <FormControl fullWidth>
                      <InputLabel id="gender">Gender</InputLabel>
                      <Select 
                           labelId="gender"
                              name="personal_details.gender"
                              value={formData.personal_details.gender}
                              onChange={handleFormChange}
                              fullWidth
                           
                          >
                             <MenuItem  value={"male"}>Male</MenuItem>
                             <MenuItem  value={"female"}>Female</MenuItem>
                          </Select>
                      </FormControl>

                      <FormControl fullWidth>
                      <InputLabel id="rank">Rank</InputLabel>
                      <Select 
                           labelId="rank"
                              name="personal_details.rank"
                              value={formData.personal_details.rank}
                              onChange={handleFormChange}
                              fullWidth
                           
                          >
                              {rankData.map(rank => (
                                  <MenuItem key={rank.id} value={rank.id}>
                                      {rank.rank_name}
                                  </MenuItem>
                              ))}
                          </Select>
                      </FormControl>

                      <FormControl fullWidth>
                      <InputLabel id="status">Status</InputLabel>
                      <Select 
                           labelId="status"
                              name="personal_details.personnel_status"
                              value={formData.personal_details.personnel_status}
                              onChange={handleFormChange}
                              fullWidth
                           
                          >
                              {statusData.map(status => (
                                  <MenuItem key={status.id} value={status.id}>
                                      {status.status_name}
                                  </MenuItem>
                              ))}
                          </Select>
                      </FormControl>

                      <FormControl fullWidth>
                      <InputLabel id="unit">Unit</InputLabel>
                      <Select 
                           labelId="unit"
                              name="personal_details.unit"
                              value={formData.personal_details.unit}
                              onChange={handleFormChange}
                              fullWidth
                           
                          >
                              {unitData.map(unit => (
                                  <MenuItem key={unit.id} value={unit.id}>
                                      {unit.unit_name}
                                  </MenuItem>
                              ))}
                          </Select>
                      </FormControl>

                      <FormControl fullWidth>
                      <InputLabel id="office">Office</InputLabel>
                      <Select 
                           labelId="office"
                              name="personal_details.office"
                              value={formData.personal_details.office}
                              onChange={handleFormChange}
                              fullWidth
                           
                          >
                              {officeData.map(office => (
                                  <MenuItem key={office.id} value={office.id}>
                                      {office.office_name}
                                  </MenuItem>
                              ))}
                          </Select>
                      </FormControl>

                      <FormControl fullWidth>
                      <InputLabel id="roles">Roles</InputLabel>
                      <Select 
                           labelId="roles"
                              name="groups"
                              value={formData.groups}
                              onChange={handleFormChange}
                              fullWidth
                           
                          >
                            {rolesData.map((roles,index) => (
                             <MenuItem key={index}  value={roles.name}>
                              {roles.name}
                             </MenuItem>
                            ))}
                            
                          </Select>
                      </FormControl>

                    
                  
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCloseAddForm} color="secondary">Cancel</Button>
                    <Button  variant="contained" onClick={handleAddUser} color="primary">Add</Button>
                </DialogActions>
            </Dialog> */}


            {/*============= UPDATE FORM ============================*/}
            {/* <Dialog open={openUpdateForm} onClose={handleCloseUpdateForm}>
                    <DialogTitle>Update Personnel</DialogTitle>
                    <DialogContent>
                    <div className="flex flex-col border p-5 mt-3 rounded-md">
                            <span className="text-lg">Profile Photo</span>
                            <input
                                accept="image/*"
                                id="contained-button-file"
                                type="file"
                                onChange={handleImageChange}
                            />
                            {formData.personal_details.image &&
                            <img className="w-[300px]" src={`${baseUrl}${formData.personal_details.image}`} alt="Uploaded" />
                            }
                        </div>
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
                            name="personal_details.first_name"
                            label="First Name"
                            type="text"
                            fullWidth
                            value={formData.personal_details.first_name}
                            onChange={handleFormChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="personal_details.middle_name"
                            label="Middle Name"
                            type="text"
                            fullWidth
                            value={formData.personal_details.middle_name}
                            onChange={handleFormChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="personal_details.last_name"
                            label="Last Name"
                            type="text"
                            fullWidth
                            value={formData.personal_details.last_name}
                            onChange={handleFormChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="personal_details.email"
                            label="Email"
                            type="email"
                            fullWidth
                            value={formData.personal_details.email}
                            onChange={handleFormChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="personal_details.mobile_number"
                            label="Mobile Number"
                            type="tel"
                            fullWidth
                            value={formData.personal_details.mobile_number}
                            onChange={handleFormChange}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="gender">Gender</InputLabel>
                            <Select 
                                labelId="gender"
                                name="personal_details.gender"
                                value={formData.personal_details.gender}
                                onChange={handleFormChange}
                                fullWidth
                            >
                                <MenuItem  value={"male"}>Male</MenuItem>
                                <MenuItem  value={"female"}>Female</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="rank">Rank</InputLabel>
                            <Select 
                                labelId="rank"
                                name="personal_details.rank"
                                value={formData.personal_details.rank}
                                onChange={handleFormChange}
                                fullWidth
                            >
                                {rankData.map(rank => (
                                    <MenuItem key={rank.id} value={rank.id}>
                                        {rank.rank_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="status">Status</InputLabel>
                            <Select 
                                labelId="status"
                                name="personal_details.personnel_status"
                                value={formData.personal_details.personnel_status}
                                onChange={handleFormChange}
                                fullWidth
                            >
                                {statusData.map(status => (
                                    <MenuItem key={status.id} value={status.id}>
                                        {status.status_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="unit">Unit</InputLabel>
                            <Select 
                                labelId="unit"
                                name="personal_details.unit"
                                value={formData.personal_details.unit}
                                onChange={handleFormChange}
                                fullWidth
                            >
                                {unitData.map(unit => (
                                    <MenuItem key={unit.id} value={unit.id}>
                                        {unit.unit_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="office">Office</InputLabel>
                            <Select 
                                labelId="office"
                                name="personal_details.office"
                                value={formData.personal_details.office}
                                onChange={handleFormChange}
                                fullWidth
                            >
                                {officeData.map(office => (
                                    <MenuItem key={office.id} value={office.id}>
                                        {office.office_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>


                        <FormControl fullWidth>
                          <InputLabel id="roles">Roles</InputLabel>
                          <Select 
                              labelId="roles"
                              name="groups"
                              value={formData.groups}
                              onChange={handleFormChange}
                              fullWidth
                          >
                              {rolesData.map(roles => (
                                  <MenuItem key={roles.id} value={roles.name}>
                                      {roles.name}
                                  </MenuItem>
                              ))}
                          </Select>
                      </FormControl>
                       
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleCloseUpdateForm} color="secondary">Cancel</Button>
                        <Button variant="contained" onClick={handleUpdateUser} color="primary">Update</Button>
                    </DialogActions>
                </Dialog> */}


            {/* <Dialog open={openDeleteConfirmation} onClose={handleCloseDeleteConfirmation}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCloseDeleteConfirmation} color="secondary">Cancel</Button>
                    <Button variant="contained" onClick={handleConfirmDeleteUser} color="primary">Delete</Button>
                </DialogActions>
            </Dialog> */}
        </div>
    );
}
