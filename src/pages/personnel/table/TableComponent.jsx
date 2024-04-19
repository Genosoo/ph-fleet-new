/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../../context/DataProvider";
import {  TableBody, TextField,  Button, TableHead, TableRow, TablePagination, Dialog, DialogTitle,
    Snackbar, Alert,  Select, MenuItem, FormControl,InputLabel, DialogContent, DialogActions, } from "@mui/material";
import { StyledFormControl,StyledTableCell, StyledTable, StyledTableContainer, StyledTextField, StyledDialog,  StyledSelect, StyledMenuItem,} from "./Styled";
import ButtonUpdate from "./buttons/ButtonUpdate";
import ButtonDelete from "./buttons/ButtonDelete";
import ButtonProfile from "./buttons/ButtonProfile";
import Search from "./Search";
import ButtonAdd from "./buttons/buttonAdd";
import { apiUsers } from "../../../api/api_urls";
import axios from 'axios';
import { PiWarningLight } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import noImage from '../../../assets/no-user-image.png'
import { IoClose } from "react-icons/io5";
import { baseUrl } from "../../../api/api_urls";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExportFiles from "./export/ExportFiles";

export default function TableComponent({ csrfToken, rolesData, unitData, personnelStatus, personnelRank }) {
  const { usersData,  officesData, updateUsersData, accountData} = useContext(DataContext)
  console.log("personnel users:", usersData)
  console.log("personnel status:", personnelStatus)
  

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    groups:["Personnel"],
    first_name: "",
    last_name: "",
    email: "",
    personal_details: {
        middle_name: "",
        gender:"",
        mobile_number: "",
        image: "",
        rank:"",
        personnel_status:"",
        unit:"",
    }
});

console.log("Roles:", rolesData)

const [successMessage, setSuccessMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");
const [snackbarOpen, setSnackbarOpen] = useState(false);
const [openUpdateForm, setOpenUpdateForm] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);

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

  const handleCloseAddForm = () =>  setOpenAddForm(false);
  const handleOpenAddForm = () => setOpenAddForm(true);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("personal_details")) {
        const [key, subKey] = name.split(".");
        setFormData(prevState => ({
            ...formData,
            [key]: {
                ...prevState[key],
                [subKey]: value
            }
        }));
    } else {
        setFormData({ ...formData, [name]: value });
    }
};


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


    const handleAddUser = async () => {
        try {
            const response = await axios.post(apiUsers, formData, {
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });
            const newUser = response.data.data;
            updateUsersData([...usersData, newUser]);
            setFilteredData([...filteredData, newUser]);
            handleCloseAddForm();
            showSuccessMessage("User added successfully!");
        } catch (error) {
            console.error('Error adding user:', error);
            showErrorMessage(error.response.data.error.username);
        }
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, personal_details: { ...formData.personal_details, image: reader.result } });
            };
            reader.readAsDataURL(file);
        }
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

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(apiUsers, {
                data: { id },
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });
            const updatedUsers = usersData.filter(user => user.id !== id);
            updateUsersData(updatedUsers);
            setFilteredData(updatedUsers);
            showSuccessMessage("User deleted successfully!");
        } catch (error) {
            console.error('Error deleting user:', error.message);
            showErrorMessage("Failed to delete user!");
        }
    };


    const handleUserAssignedChange = async (userId, newRole) => {
        // Create a FormData object
        const formData = new FormData();
        
    
        try {
          // Perform the PUT request to update status
          await axios.put(apiUsers, {groups:[newRole], id:userId}, {
            headers: {
              'X-CSRFToken': csrfToken
            }
          });
        
          // Update the incident data in state
          const updatedUsers = usersData.map(user => {
            if (user.id === userId) {
              return { ...user, groups: [newRole] };
            }
            return user;
          });
          updateUsersData(updatedUsers);
        
          // Show success message
          showSuccessMessage("Successfully updated role!");
        } catch (error) {
          // Handle errors
          console.error('Error updating status:', error.message);
          showErrorMessage("Failed to update role");
        }
      };


      const handleOpenUpdateForm = (user) => {
        setSelectedUser(user);
        setFormData({
            username: user.username,
            password: user.password,
            groups: user.roles,
            first_name:user.first_name,
            last_name:user.last_name,
            email:user.email,
            personal_details: {
                ...user.personal_details
            }
        });

        setOpenUpdateForm(true);
    };

    const handleCloseUpdateForm = () => {
        setOpenUpdateForm(false);
        setSelectedUser(null);
    };


    const handleUpdateUser = async () => {
        try {
            const updatedFormData = { ...formData, id: selectedUser.id };
            const response = await axios.put(apiUsers, updatedFormData, {
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });
            const updatedUser = response.data.data;
            const updatedUsers = usersData.map(user => {
                if (user.id === updatedUser.id) {
                    return updatedUser;
                }
                return user;
            });
            updateUsersData(updatedUsers);
            setFilteredData(updatedUsers);
            handleCloseUpdateForm();
            showSuccessMessage("User updated successfully!");
        } catch (error) {
            console.error('Error updating user:', error);
            showErrorMessage("Failed to update user!");
        }
    };




    const statusColors = {
        "On-Duty": '#EBFAF1',
        "On-Leave": '#F9F5E2',
        "Rest and Recreation": '#E6F0F7', 
        "Non-Uniform": '#FADBD8', 
        "Official Business": '#EBDEF0', 
      };
      
      
      const statusTextColors = {
        "On-Duty": '#2ECC71', 
        "On-Leave": '#F1C40F', 
        "Rest and Recreation": '#3498DB', 
        "Non-Uniform": '#E74C3C', 
        "Official Business": '#9B59B6', 
      };
    

  return (
    <div>
           <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
                <Alert variant="filled" onClose={handleSnackbarClose} severity={successMessage ? "success" : "error"}>
                    {successMessage || errorMessage}
                </Alert>
            </Snackbar>
         <div className="usersTableTopBox">
                <Search handleSearchChange={handleSearchChange} searchQuery={searchQuery} />
                <ButtonAdd handleOpenAddForm={handleOpenAddForm}  />
            </div>
            <div className="usersTableContainer">
            <StyledTableContainer >
           <StyledTable stickyHeader aria-label="sticky table" > 
                <TableHead >
                    <TableRow>
                        <StyledTableCell>Username</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Mobile Number</StyledTableCell>
                        <StyledTableCell>Roles</StyledTableCell>
                        <StyledTableCell>Rank</StyledTableCell>
                        <StyledTableCell>Duty Status</StyledTableCell>
                        <StyledTableCell>Unit</StyledTableCell>
                        <StyledTableCell>Check-in Location</StyledTableCell>
                        <StyledTableCell sx={{ position: "sticky", right: 0 }}>Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData
                    .filter(item => item.roles && (item.roles.length === 0 || item.roles.includes("Personnel")))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                        <TableRow key={index}>
                            <StyledTableCell>{item?.username || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.first_name || "N/A"} {item?.personal_details?.last_name || ""}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.email || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.mobile_number || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.roles[0] || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.rank_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.status_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>{item?.personal_details?.unit_name || "N/A"}</StyledTableCell>
                            <StyledTableCell>
                              
                            </StyledTableCell>

                            <StyledTableCell sx={{display:"flex", gap:1, alignItems:"center", position: "sticky", right: 0}} >
                                <Link to={'/fleet/personnel/profile'} state={{ personnel: item}} >
                                    <ButtonProfile />
                                </Link>
                                <ButtonUpdate item={item} handleOpenUpdateForm={handleOpenUpdateForm}  />
                                <ButtonDelete  itemId={item.id}  handleOpenDeleteConfirmation={handleOpenDeleteConfirmation} />
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
            {accountData.roles && accountData.roles.length > 0 && accountData.roles[0] === "Administrator" && (
               <ExportFiles />
             )}
{/*======================= ADD DIALOG FORM===============================*/}
    <Dialog fullWidth open={openAddForm} onClose={handleCloseAddForm}>
               <div className="addFormContainer">
                <div className="addFormHeader">
                    <p>Add Personnel</p>
                    <IoClose onClick={handleCloseAddForm} />
                </div>
                 
                 <div className="addFormBoxDetails">
                 <div className="addFormImageBox">
                    <input
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                    {formData.personal_details.image ? (
                        <img className="" src={formData?.personal_details.image} alt="Uploaded" />
                    ) : (
                        <img className="" src={noImage} alt="Uploaded" />
                    )}
                     <label htmlFor="contained-button-file" className="uploadImageBtn">
                        Upload a photo
                    </label>
                </div>

                    <div className="addFormBoxDetail1">
                        <p>Personal Information</p>
                        <StyledTextField
                            autoFocus
                            margin="dense"
                            name="username"
                            label="Username"
                            type="text"
                            fullWidth
                            value={formData.username}
                            onChange={handleFormChange}
                        />
                    <StyledTextField
                        autoFocus
                        margin="dense"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        value={formData.password}
                        onChange={handleFormChange}
                    />
                    <StyledTextField
                        autoFocus
                        margin="dense"
                        name="first_name"
                        label="First Name"
                        type="text"
                        fullWidth
                        value={formData.first_name}
                        onChange={handleFormChange}
                    />
                   
                    <StyledTextField
                        autoFocus
                        margin="dense"
                        name="last_name"
                        label="Last Name"
                        type="text"
                        fullWidth
                        value={formData.last_name}
                        onChange={handleFormChange}
                    />
                    <StyledTextField
                        autoFocus
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleFormChange}
                    />
                    <StyledTextField
                        autoFocus
                        margin="dense"
                        name="personal_details.mobile_number"
                        label="Mobile Number"
                        type="tel"
                        fullWidth
                        value={formData.personal_details.mobile_number}
                        onChange={handleFormChange}
                    />

                  <StyledFormControl fullWidth>
                      <InputLabel id="gender">Gender</InputLabel>
                      <Select 
                      variant="outlined"
                           labelId="gender"
                              name="personal_details.gender"
                              value={formData.personal_details.gender}
                              onChange={handleFormChange}
                              fullWidth
                              IconComponent={ExpandMoreIcon}
                          >
                             <MenuItem  value={"male"}>Male</MenuItem>
                             <MenuItem  value={"female"}>Female</MenuItem>
                          </Select>
                      </StyledFormControl>
                    </div>

                    <div className="addFormBoxDetail2">
                        <p>Service Details</p>
                      <StyledFormControl fullWidth>
                      <InputLabel id="rank">Rank</InputLabel>
                      <Select 
                           labelId="rank"
                              name="personal_details.rank"
                              value={formData.personal_details.rank}
                              onChange={handleFormChange}
                              fullWidth
                              IconComponent={ExpandMoreIcon}
                           
                          >
                              {personnelRank.map(rank => (
                                  <MenuItem key={rank.id} value={rank.id}>
                                      {rank.rank_name}
                                  </MenuItem>
                              ))}
                          </Select>
                      </StyledFormControl>

                      <StyledFormControl fullWidth>
                      <InputLabel id="status">Status</InputLabel>
                      <Select 
                           labelId="status"
                              name="personal_details.personnel_status"
                              value={formData.personal_details.personnel_status}
                              onChange={handleFormChange}
                              fullWidth
                              IconComponent={ExpandMoreIcon}
                           
                          >
                              {personnelStatus.map(status => (
                                  <MenuItem key={status.id} value={status.id}>
                                      {status.status_name}
                                  </MenuItem>
                              ))}
                          </Select>
                      </StyledFormControl>

                      <StyledFormControl fullWidth>
                      <InputLabel id="unit">Unit</InputLabel>
                      <Select 
                           labelId="unit"
                              name="personal_details.unit"
                              value={formData.personal_details.unit}
                              onChange={handleFormChange}
                              fullWidth
                              IconComponent={ExpandMoreIcon}
                           
                          >
                              {unitData.map(unit => (
                                  <MenuItem key={unit.id} value={unit.id}>
                                      {unit.unit_name}
                                  </MenuItem>
                              ))}
                          </Select>
                      </StyledFormControl>

                      <StyledFormControl fullWidth>
                      <InputLabel id="office">Office</InputLabel>
                      <Select 
                           labelId="office"
                              name="personal_details.office"
                              value={formData.personal_details.office}
                              onChange={handleFormChange}
                              fullWidth
                              IconComponent={ExpandMoreIcon}
                           
                          >
                              {officesData.map(office => (
                                  <MenuItem key={office.id} value={office.id}>
                                      {office.office_name}
                                  </MenuItem>
                              ))}
                          </Select>
                      </StyledFormControl>
                    </div>

                 </div>
                  
                    <div className="addFormFooter">
                    <button className="addFormBtnCancel" onClick={handleCloseAddForm}>Cancel</button>
                    <button className="addFormBtnAdd" onClick={handleAddUser}>Add Personnel</button>
                    </div>
               </div>
            </Dialog>

  {/*========================== UPDATE DIALOG FORM ============================*/}
  <Dialog open={openUpdateForm} onClose={handleCloseUpdateForm}>
       <div className="addFormContainer">
          <div className="addFormHeader">
             <p>Update Personnel</p>
               <IoClose onClick={handleCloseUpdateForm} />
          </div>

              <div className="addFormBoxDetails">
       <div className="addFormImageBox">
                    <input
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                    {formData.personal_details.image ? (
                      <img className="" src={`${baseUrl}${formData.personal_details.image}`} alt="Uploaded" />
                    ) : (
                        <img className="" src={noImage} alt="Uploaded" />
                    )}
                     <label htmlFor="contained-button-file" className="uploadImageBtn">
                        Upload a photo
                    </label>
        </div>
                       
       <div className="addFormBoxDetail1">
                        <p>Personal Information</p>
                        <StyledTextField
                            autoFocus
                            margin="dense"
                            name="username"
                            label="Username"
                            type="text"
                            fullWidth
                            value={formData.username}
                            onChange={handleFormChange}
                        />
                   
                    <StyledTextField
                        autoFocus
                        margin="dense"
                        name="first_name"
                        label="First Name"
                        type="text"
                        fullWidth
                        value={formData.first_name}
                        onChange={handleFormChange}
                    />
                   
                    <StyledTextField
                        autoFocus
                        margin="dense"
                        name="last_name"
                        label="Last Name"
                        type="text"
                        fullWidth
                        value={formData.last_name}
                        onChange={handleFormChange}
                    />
                    <StyledTextField
                        autoFocus
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleFormChange}
                    />
                    <StyledTextField
                        autoFocus
                        margin="dense"
                        name="personal_details.mobile_number"
                        label="Mobile Number"
                        type="tel"
                        fullWidth
                        value={formData.personal_details.mobile_number}
                        onChange={handleFormChange}
                    />

                  <StyledFormControl fullWidth>
                      <InputLabel id="gender">Gender</InputLabel>
                      <Select 
                      variant="outlined"
                           labelId="gender"
                              name="personal_details.gender"
                              value={formData.personal_details.gender}
                              onChange={handleFormChange}
                              fullWidth
                              IconComponent={ExpandMoreIcon}
                          >
                             <MenuItem  value={"male"}>Male</MenuItem>
                             <MenuItem  value={"female"}>Female</MenuItem>
                          </Select>
                      </StyledFormControl>
                    </div>

                    <div className="addFormBoxDetail2">
                        <p>Service Details</p>
                      <StyledFormControl fullWidth>
                      <InputLabel id="rank">Rank</InputLabel>
                      <Select 
                           labelId="rank"
                              name="personal_details.rank"
                              value={formData.personal_details.rank}
                              onChange={handleFormChange}
                              fullWidth
                              IconComponent={ExpandMoreIcon}
                           
                          >
                              {personnelRank.map(rank => (
                                  <MenuItem key={rank.id} value={rank.id}>
                                      {rank.rank_name}
                                  </MenuItem>
                              ))}
                          </Select>
                      </StyledFormControl>

                      <StyledFormControl fullWidth>
                      <InputLabel id="status">Status</InputLabel>
                      <Select 
                           labelId="status"
                              name="personal_details.personnel_status"
                              value={formData.personal_details.personnel_status}
                              onChange={handleFormChange}
                              fullWidth
                              IconComponent={ExpandMoreIcon}
                           
                          >
                              {personnelStatus.map(status => (
                                  <MenuItem key={status.id} value={status.id}>
                                      {status.status_name}
                                  </MenuItem>
                              ))}
                          </Select>
                      </StyledFormControl>

                      <StyledFormControl fullWidth>
                      <InputLabel id="unit">Unit</InputLabel>
                      <Select 
                           labelId="unit"
                              name="personal_details.unit"
                              value={formData.personal_details.unit}
                              onChange={handleFormChange}
                              fullWidth
                              IconComponent={ExpandMoreIcon}
                           
                          >
                              {unitData.map(unit => (
                                  <MenuItem key={unit.id} value={unit.id}>
                                      {unit.unit_name}
                                  </MenuItem>
                              ))}
                          </Select>
                      </StyledFormControl>

                      <StyledFormControl fullWidth>
                      <InputLabel id="office">Office</InputLabel>
                      <Select 
                           labelId="office"
                              name="personal_details.office"
                              value={formData.personal_details.office}
                              onChange={handleFormChange}
                              fullWidth
                              IconComponent={ExpandMoreIcon}
                           
                          >
                              {officesData.map(office => (
                                  <MenuItem key={office.id} value={office.id}>
                                      {office.office_name}
                                  </MenuItem>
                              ))}
                          </Select>
                      </StyledFormControl>
                    </div>
       </div>
       </div>

   
    
                    <div className="addFormFooter">
                        <button className="addFormBtnCancel" onClick={handleCloseUpdateForm}>Cancel</button>
                        <button className="addFormBtnAdd" onClick={handleUpdateUser}>Add Personnel</button>
                    </div>
   </Dialog>

 
    {/*========================== DELETE DIALOG ============================*/}
    <StyledDialog open={openDeleteConfirmation} onClose={handleCloseDeleteConfirmation}>
                <div className="deleteDialogBox">
                    <span className="deleteIcon">
                        <PiWarningLight/>
                    </span>
                    <h3>Are you sure you want to <br /> delete this personnel?</h3>
                   <p>
                   This action cannot be undone. All values  <br /> associated within this field will be lost.
                   </p>
                  <div className="deleteDialogBtn">
                  <button className="delete"  onClick={handleConfirmDeleteUser} >Delete field</button>
                    <button className="cancel" onClick={handleCloseDeleteConfirmation} >Cancel</button>
                  </div>
                </div>
            </StyledDialog>           

    </div>
  )
}
