// Roles.js
import { useEffect, useState } from "react";
import { FiDelete } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

import axios from "axios";
import { apiRoles, getCsrfToken } from "../../api/api_urls";
import {
  TableBody,
  TableHead,
  TableRow,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import RoleForm from "./RolesForm"; // Assuming RoleForm is in the same directory
import './Styles.css'
import { StyledTableContainer, StyledTable, StyledTableCell, StyledDialog } from "./Styled";
import { PiWarningLight } from "react-icons/pi";
import { message } from 'antd';


export default function Roles() {
  const [rolesData, setRolesData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [roleToDelete, setRoleToDelete] = useState(null);

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

  const handleCreateRole = async (data) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      };

      const createRoleResponse = await axios.post(apiRoles, data, { headers });
      console.log("create role response", createRoleResponse.data);

      // Fetch updated roles data after creating a role
      const updatedRolesResponse = await axios.get(apiRoles);
      setRolesData(updatedRolesResponse.data.success);
      message.success("Successfully created role")

      setOpenDialog(false);
    } catch (error) {
      console.log(error);
      message.error("Failed to create role")

    }
  };

  const handleUpdateRole = async (data) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      };
      // Include the id in the request body
      const updateRoleData = {
        id: data.id,
        name: data.name,
        // Other fields if needed
      };

      const updateRoleResponse = await axios.put(apiRoles, updateRoleData, { headers });
      console.log("update role response", updateRoleResponse.data);

      // Fetch updated roles data after updating a role
      const updatedRolesResponse = await axios.get(apiRoles);
      setRolesData(updatedRolesResponse.data.success);
      message.success("Successfully updated role")

      setUpdateDialog(false);
      setSelectedRole(null);
    } catch (error) {
      console.log(error);
      message.error("Failed to update role")

    }
  };

  const handleDeleteRole = async (id) => {
    setRoleToDelete(id);
    setDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (roleToDelete) {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        };

        await axios.delete(apiRoles, {
          headers,
          data: { id: roleToDelete },
        });

        // Update the rolesData state to exclude the deleted role
        setRolesData((prevRolesData) => prevRolesData.filter((role) => role.id !== roleToDelete));
      message.success("Successfully deleted role")
      } catch (error) {
        console.log(error);
      message.success("Failed to deleted role")

      } finally {
        setRoleToDelete(null);
        setDeleteDialog(false);
      }
    }
  };

  const cancelDelete = () => {
    setRoleToDelete(null);
    setDeleteDialog(false);
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setUpdateDialog(true);
  };

  return (
    <div className="rolesContainer">
      <div className="rolesTableTopBox">
        <button className="btnAdd"  onClick={() => setOpenDialog(true)}>
          <FaPlus/>  Add Role
        </button>
      </div>
     
      <div className="rolesTableContainer">
      <StyledTableContainer >
        <StyledTable stickyHeader aria-label="sticky table">
          <TableHead className="bg-gray-800">
            <TableRow>
              <StyledTableCell><b className="text-white">Role Name</b></StyledTableCell>
              <StyledTableCell><b className="text-white">Action</b></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rolesData.map((item, index) => (
              <TableRow key={index}>
                <StyledTableCell>{item.name}</StyledTableCell>
                <StyledTableCell>
                  <span className="rolesBtnBox">
                  
                    <button onClick={() => handleEditRole(item)} className="btnUpdate">
                    <CiEdit   />
                    </button>
                    <button onClick={() => handleDeleteRole(item.id)} className="btnDelete">
                      <FiDelete  />
                    </button>
                  </span>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
      </div>



{/*========================== ADD DIALOG ============================*/}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create Role</DialogTitle>
        <DialogContent>
          <RoleForm onSubmit={handleCreateRole} />
        </DialogContent>
      </Dialog>

{/*========================== UPDATE DIALOG ============================*/}
      <Dialog open={updateDialog} onClose={() => setUpdateDialog(false)}>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          {selectedRole && (
            <RoleForm
              onSubmit={handleUpdateRole}
              initialValues={{ name: selectedRole.name, id: selectedRole.id }}
            />
          )}
        </DialogContent>
      </Dialog>

{/*========================== DELETE DIALOG ============================*/}
      <StyledDialog open={deleteDialog} onClose={cancelDelete}>
      <div className="deleteDialogBox">
                    <span className="deleteIcon">
                        <PiWarningLight/>
                    </span>
                    <h3>Are you sure you want to <br /> delete this user?</h3>
                   <p>
                   This action cannot be undone. All values  <br /> associated within this field will be lost.
                   </p>
                  <div className="deleteDialogBtn">
                  <button className="delete"  onClick={confirmDelete} >Delete field</button>
                    <button className="cancel" onClick={cancelDelete} >Cancel</button>
                  </div>
                </div>
      </StyledDialog>
    </div>
  );
}
