/* eslint-disable react/prop-types */
import { StyledButtonAdd } from "../StyledComponent"
import { FaCarRear } from "react-icons/fa6";
export default function ButtonAddVehicle({ handleOpenDialog }) {
  return (
    <StyledButtonAdd 
        sx={{marginBottom:"10px"}} 
        variant="contained" 
        onClick={handleOpenDialog}
        startIcon={<FaCarRear />}
    >
      Add Vehicle
      </StyledButtonAdd>
  )
}
