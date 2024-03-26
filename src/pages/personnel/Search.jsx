/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";

export default function Search({ searchQuery, handleSearchChange }) {
  return (
    <TextField
    label="Search"
    variant="outlined"
    value={searchQuery}
    onChange={handleSearchChange}
    fullWidth
    margin="normal"
  />
  )
}
