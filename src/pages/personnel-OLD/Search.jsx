/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
export default function Search({ searchQuery, handleSearchChange }) {
  return (
    <TextField
      label="Search"
      variant="outlined"
      value={searchQuery}
      onChange={handleSearchChange}
      fullWidth
      margin="normal"
      InputProps={{
        style: {  borderRadius: "10px" },
        endAdornment: <SearchIcon sx={{ fontSize:30, color:"#949494"}} />,
    }}
  />
  )
}
