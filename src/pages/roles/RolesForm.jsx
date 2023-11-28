/* eslint-disable react/prop-types */
// RoleForm.js
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function RoleForm({ onSubmit, initialValues = {} }) {
  const [formData, setFormData] = useState({
    name: initialValues.name || "",
    id: initialValues.id || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Role Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <input type="hidden" name="id" value={formData.id} />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}
