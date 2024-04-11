/* eslint-disable react/prop-types */
import { StyledButtonAdd } from "../StyledComponent"
import { ImOffice } from "react-icons/im";

export default function ButtonAddOffice({ handleOpenDialog }) {
  return (
    <StyledButtonAdd 
        sx={{marginBottom:"10px"}} 
        variant="contained" 
        onClick={handleOpenDialog}
        startIcon={<ImOffice />}
    >
      Add Office
      </StyledButtonAdd>
  )
}
