// Roles.js
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
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import RoleForm from "./RolesForm"; // Assuming RoleForm is in the same directory

const baseUrl = import.meta.env.VITE_URL;

const getCsrfTokenUrl = `${baseUrl}/api/csrf_cookie/`;
const getRolesData = `${baseUrl}/api/groups/`;
const createRoleEndpoint = `${baseUrl}/api/groups/`;
const deleteRoleEndpoint = `${baseUrl}/api/groups/`;

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
        const rolesResponse = await axios.get(getRolesData);
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
        const response = await axios.get(getCsrfTokenUrl);
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

      const createRoleResponse = await axios.post(createRoleEndpoint, data, { headers });
      console.log("create role response", createRoleResponse.data);

      // Fetch updated roles data after creating a role
      const updatedRolesResponse = await axios.get(getRolesData);
      setRolesData(updatedRolesResponse.data.success);

      setOpenDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateRole = async (data) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      };

      // Remove the id from the URL
      const updateRoleEndpoint = `${baseUrl}/api/groups/`;

      // Include the id in the request body
      const updateRoleData = {
        id: data.id,
        name: data.name,
        // Other fields if needed
      };

      const updateRoleResponse = await axios.put(updateRoleEndpoint, updateRoleData, { headers });
      console.log("update role response", updateRoleResponse.data);

      // Fetch updated roles data after updating a role
      const updatedRolesResponse = await axios.get(getRolesData);
      setRolesData(updatedRolesResponse.data.success);

      setUpdateDialog(false);
      setSelectedRole(null);
    } catch (error) {
      console.log(error);
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

        await axios.delete(deleteRoleEndpoint, {
          headers,
          data: { id: roleToDelete },
        });

        // Update the rolesData state to exclude the deleted role
        setRolesData((prevRolesData) => prevRolesData.filter((role) => role.id !== roleToDelete));
      } catch (error) {
        console.log(error);
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
    <div className="flex flex-col items-start gap-5 pr-20">
      <Button size="small" variant="contained" color="success" onClick={() => setOpenDialog(true)}>
        Create Role
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-800 ">
            <TableRow>
              <TableCell><b className="text-white">Role Name</b></TableCell>
              <TableCell><b className="text-white">Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rolesData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <span className="flex gap-4">
                    <div className="p-2 bg-red-400 text-white rounded-full hover:bg-slate-500 duration-200">
                      <FaTrash onClick={() => handleDeleteRole(item.id)} />
                    </div>
                    <div className="p-2 bg-green-400 text-white rounded-full hover:bg-slate-500 duration-200">
                    <FaEdit onClick={() => handleEditRole(item)} />
                    </div>
                   
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for creating a role */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create Role</DialogTitle>
        <DialogContent>
          <RoleForm onSubmit={handleCreateRole} />
        </DialogContent>
      </Dialog>

      {/* Dialog for updating a role */}
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

      {/* Dialog for confirming deletion */}
      <Dialog open={deleteDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
        <span className="flex flex-col gap-3">
        <p>Are you sure you want to delete this role?</p>
         <Button size="small" variant="contained" color="success" onClick={confirmDelete}>
            Confirm
          </Button>
          <Button size="small" variant="outlined" color="error" onClick={cancelDelete}>
            Cancel
          </Button>
        </span>
        </DialogContent>
      </Dialog>
    </div>
  );
}
