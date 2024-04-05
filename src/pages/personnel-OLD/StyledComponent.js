import {
  //   Table,
  //   TableBody,
  TableCell,
  TableContainer,
  //   TableHead,
  //   TableRow,
  //   Paper,
  //   TablePagination,
  //   CircularProgress,
  //   Collapse,
  //   Box,
  FormControl,
  Select,
  Button,
} from "@mui/material";

import styled from "styled-components";

export const CustomTableContainer = styled(TableContainer)`
  &::-webkit-scrollbar {
    width: 2px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Track color */
    border-radius: 5px; /* Border radius of the track */
  }

  &::-webkit-scrollbar-thumb {
    background: #404958; /* Thumb color */
    border-radius: 5px; /* Border radius of the thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* Thumb color on hover */
  }
`;

export const StyledFormControl = styled(FormControl)`
  border: 1px solid #2d4263;
`;

export const StyledSelect = styled(Select)`
  border: none;
  padding: 5px;
`;

export const StyledTableCell = styled(TableCell)`
  min-width: 160px;
  font-family: "Lato", "sans-serif";
`;

// STYLED BUTTON ADD
export const StyledButtonAdd = styled(Button)`
  background-color: #86705e;
  color: #eef5ff;
  height: 52px;
  width: 180px;
  font-size: 12px;
  border-radius: 10px;
  font-family: "Manrope", "sans-serif";

  &:hover {
    background-color: #000;
    color: #ffffff;
  }
`;

// STYLED BUTTON DELETE
export const StyledButtonDelete = styled(Button)`
  background-color: #be3144;
  color: #eef5ff;
  padding: 5px;
  width: 100px;
  font-size: 12px;
  font-family: "Lato", "san-serif";
  font-weight: 600;

  &:hover {
    background-color: #e94560; /* Change the background color on hover */
    color: #ffffff; /* Change the text color on hover */
  }
`;

// STYLED BUTTON EDIT
export const StyledButtonEdit = styled(Button)`
  background-color: #46466e;
  color: #eef5ff;
  padding: 5px;
  width: 100px;
  font-size: 12px;
  font-family: "Lato", "san-serif";
  font-weight: 600;

  &:hover {
    background-color: #5432d3; /* Change the background color on hover */
    color: #ffffff; /* Change the text color on hover */
  }
`;

// STYLED BUTTON PROFILE TO VIEW
export const StyledButtonProfile = styled(Button)`
  background-color: #fff;
  color: #000;
  padding: 1px;
  width: 70px;
  font-size: 10px;
  font-family: "Lato", "san-serif";
  font-weight: 600;
  border: 1px solid #000;

  &:hover {
    background-color: #000; /* Change the background color on hover */
    color: #ffffff; /* Change the text color on hover */
  }
`;
