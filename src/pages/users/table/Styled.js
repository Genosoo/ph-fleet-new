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
} from "@mui/material";

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 12px;
  }
`;

export const StyledTableCell = styled(TableCell)`
  font-family: "Manrope", "sans-serif" !important;
  min-width: 220px;
  border: 0 !important;
  font-size: 12px !important;
  font-weight: 500 !important;
`;

export const StyledTable = styled(Table)`
  th {
    /* Add sticky styles here */
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #404958;
    color: white;
  }

  tr {
    background-color: #ffffff;

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
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #404958;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

// Styled Select component
export const StyledSelect = styled(Select)`
  font-family: "Manrope", "sans-serif" !important;
  font-size: 12px !important;
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
