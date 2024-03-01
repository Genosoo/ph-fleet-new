/* eslint-disable react/prop-types */
import { StyledButtonAdd } from "../StyledComponent"
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';

export default function ButtonAddVessel({ handleOpenDialog }) {
  return (
    <StyledButtonAdd 
        sx={{marginBottom:"10px"}} 
        variant="contained" 
        onClick={handleOpenDialog}
        startIcon={<DirectionsBoatIcon/>}
    >
      Add Vessel
      </StyledButtonAdd>
  )
}
