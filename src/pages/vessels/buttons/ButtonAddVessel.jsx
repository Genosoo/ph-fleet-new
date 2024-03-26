/* eslint-disable react/prop-types */
import { StyledButtonAdd } from "../StyledComponent"

export default function ButtonAddVessel({ handleOpenDialog }) {
  return (
    <StyledButtonAdd 
        size="large"
        variant="contained" 
        onClick={handleOpenDialog}
    >
      Add Vessel
      </StyledButtonAdd>
  )
}
