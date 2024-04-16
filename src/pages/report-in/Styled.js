import { Button, FormControlLabel, Checkbox } from "@mui/material";

import styled from "styled-components";

export const StyledButtonAdd = styled(Button)`
  background-color: #0db0e6 !important;
  color: #fff !important;
  padding: 10px !important;
  font-family: "Manrope", "sans-serif" !important;

  &:hover {
    background-color: #404958 !important; /* Change background color on hover */
  }
`;

export const StyledCheckbox = styled(Checkbox)`
  margin-right: 8px !important;
  font-family: "Manrope", "sans-serif" !important;
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
