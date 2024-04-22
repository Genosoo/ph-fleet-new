/* eslint-disable react/prop-types */
import { Select, MenuItem } from '@mui/material';
import { IoIosArrowDown } from "react-icons/io";
import styled from 'styled-components';


// Styled Select component
const StyledSelect = styled(Select)`
font-family: "Manrope", "sans-serif" !important;
  font-weight: 600 !important;
  color: #404958 !important;
  font-size: 14px !important;
  padding-right: 20px !important;

  .MuiOutlinedInput-notchedOutline { 
    border: 1px solid #747474 !important;
    border-radius:6px !important;
   }

`;

// Styled MenuItem component
const StyledMenuItem = styled(MenuItem)`
font-family: "Manrope", "sans-serif" !important;
  font-weight: 600 !important;
  color: #404958 !important;
  border-bottom: 1px solid #EAEAEC !important;

`;

const StatusFilter = ({ selectedStatus, incidentStatus, setSelectedStatus }) => {
    return (
            <StyledSelect
                className="statusSelectFilter"
                value={selectedStatus}
                onChange={(e) => {
                    const value = e.target.value;
                    // Parse integer value if it's not "All", otherwise, set it as is
                    setSelectedStatus(value !== "All" ? parseInt(value) : value);
                }}

                IconComponent={IoIosArrowDown}
            >
                <StyledMenuItem value="All" >Status</StyledMenuItem>
                {incidentStatus.map((status, index) => (
                    <StyledMenuItem key={index} value={status.id}>
                        {status.type_status}
                    </StyledMenuItem>
                ))}
            </StyledSelect>
    );
};

export default StatusFilter;
