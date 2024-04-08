import styled from "styled-components";

import { TableCell, Table, TableContainer, Dialog } from "@mui/material";

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 12px;
  }
`;

export const StyledTableCell = styled(TableCell)`
  font-family: "Manrope", "sans-serif";
  min-width: 200px;
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
