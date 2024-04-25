import styled from "styled-components";

import {
  TableCell,
  Table,
  TableContainer,
  Dialog,
  Select,
  MenuItem,
} from "@mui/material";

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 12px;
  }
`;

export const StyledTableCell = styled(TableCell)`
  font-family: "Manrope", "sans-serif" !important;
  min-width: 300px;
  align-items: center;
  justify-content: space-between;
  border: 0 !important;
  font-size: 14px !important;
`;

export const StyledTable = styled(Table)`
  thead {
    position: sticky !important;
    top: 0 !important;
    z-index: 1 !important;
    background-color: #404958 !important;
    color: white;
    min-width: 300px !important;
    display: flex !important;
  }

  th {
    background-color: #404958 !important;
    color: white;
  }

  tr {
    background-color: #ffffff;
    display: flex !important;
    align-items: center !important;
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
  font-size: 14px !important;
  .MuiOutlinedInput-notchedOutline {
    border-radius: 10px !important;
    border: 0 !important;
  }
`;

// Styled MenuItem component
export const StyledMenuItem = styled(MenuItem)`
  font-family: "Manrope", "sans-serif" !important;
  color: #404958 !important;
  border-bottom: 1px solid #eaeaec !important;
`;
