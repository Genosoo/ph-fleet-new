/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { Select, MenuItem } from '@mui/material';
import { IoIosArrowDown } from "react-icons/io";

// Styled Select component
const StyledSelect = styled(Select)`
  font-family: "Manrope", "sans-serif" !important;
  font-weight: 600 !important;
  color: #404958 !important;
  padding-right: 30px !important;

  .MuiOutlinedInput-notchedOutline { 
    border: 1px solid #000 !important;
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

const SeverityFilter = ({ selectedSeverity, incidentSeverity, setSelectedSeverity }) => {
  return (
    <StyledSelect
      className="statusSelectFilter"
      value={selectedSeverity}
      onChange={(e) => {
        const value = e.target.value;
        // Parse integer value if it's not "All", otherwise, set it as is
        setSelectedSeverity(value !== "All" ? parseInt(value) : value);
      }}
      IconComponent={IoIosArrowDown}
    >
      <StyledMenuItem value="All">Severity</StyledMenuItem>
      {incidentSeverity.map((severity, index) => (
        <StyledMenuItem key={index} value={severity.id}>
          {severity.severity_name}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  );
};

export default SeverityFilter;
