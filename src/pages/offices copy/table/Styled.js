import styled from "styled-components";

import {
  TableCell,
  Table,
  TableContainer,
  Dialog,
  Select,
  MenuItem,
  FormControl,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 12px;
  }
`;

export const StyledTableCell = styled(TableCell)`
  font-family: "Manrope", "sans-serif" !important;
  min-width: 350px;
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  border: 0 !important;
`;

export const StyledTable = styled(Table)`
  thead {
    /* Add sticky styles here */
    position: sticky !important;
    top: 0 !important;
    z-index: 1 !important;
  }
  th {
    background-color: #404958 !important;
    color: white;
  }

  tr {
    background-color: #ffffff !;
    display: flex !important;

    &:nth-child(even) {
      background-color: #f9f9f9; /* You can adjust the color as needed */
    }
  }
`;

export const StyledTableContainer = styled(TableContainer)`
  overflow: auto;
  max-height: 700px;

  /* Style scrollbar */
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #ffff;
  }

  &::-webkit-scrollbar-thumb {
    background: #404958;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

// Styled Select component
export const StyledSelect = styled(Select)`
  font-family: "Manrope", "sans-serif" !important;
  font-weight: 600 !important;
  .MuiOutlinedInput-notchedOutline {
    border-radius: 10px !important;
    border: 0 !important;
  }
`;

// Styled MenuItem component
export const StyledMenuItem = styled(MenuItem)`
  font-family: "Manrope", "sans-serif" !important;
  font-weight: 600 !important;
  color: #404958 !important;
  border-bottom: 1px solid #eaeaec !important;
`;

export const StyledFormControl = styled(FormControl)`
  font-family: "Manrope", "sans-serif" !important;
  .MuiOutlinedInput-notchedOutline {
    border-radius: 10px !important;
    font-family: "Manrope", "sans-serif" !important;
  }

  .MuiInputLabel-root {
    background-color: #fff !important;
    font-family: "Manrope", "sans-serif" !important;
  }
`;

export const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    border-radius: 10px !important;
    font-family: "Manrope", "sans-serif" !important;
  }
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  font-weight: bold !important;
  background-color: #fff !important;
  border-radius: 10px !important;
  padding: 0 10px !important;
  .MuiTypography-root {
    font-family: "Manrope", "sans-serif" !important;
  }
`;

export const StyledCheckbox = styled(Checkbox)`
  margin-right: 8px !important;
  font-family: "Manrope", "sans-serif" !important;
`;
