/* eslint-disable react/prop-types */
import { StyledButtonAdd } from "../StyledComponent"
import { FaPerson } from "react-icons/fa6";

export default function ButtonAddOffice({ handleOpenDialog }) {
  return (
    <StyledButtonAdd 
        sx={{marginBottom:"10px"}} 
        variant="contained" 
        onClick={handleOpenDialog}
        startIcon={<FaPerson />}
    >
      Add Personnel
      </StyledButtonAdd>
  )
}
