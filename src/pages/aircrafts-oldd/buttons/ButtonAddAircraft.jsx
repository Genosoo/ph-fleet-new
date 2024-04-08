/* eslint-disable react/prop-types */
import { StyledButtonAdd } from "../StyledComponent"
export default function ButtonAddAircraft({ handleOpenDialog }) {
  return (
    <StyledButtonAdd 
        variant="contained" 
        onClick={handleOpenDialog}
    >
      Add Aircraft
      </StyledButtonAdd>
  )
}
