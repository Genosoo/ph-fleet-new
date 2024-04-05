/* eslint-disable react/prop-types */
import { StyledButtonAdd } from "../StyledComponent"
import AddIcon from '@mui/icons-material/Add';

export default function ButtonAddOffice({ handleOpenDialog }) {
  return (
    <StyledButtonAdd 
        variant="contained" 
        onClick={handleOpenDialog}
        startIcon={<AddIcon />}
    >
      Add Personnel
      </StyledButtonAdd>
  )
}
