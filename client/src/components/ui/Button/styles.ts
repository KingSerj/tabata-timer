import styled from "styled-components";
import {theme} from "../../../theme/theme";

export const Button = styled.button`
  margin: 10px 10px 10px 0;
  font-family: "Montserrat", sans-serif;
  background-color: ${theme.buttonMainColor};
  color: ${theme.whiteColor};
  border: none;
  border-radius: 4px;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 0 8px ${theme.transparentBlack};
  cursor: pointer;
  width: 180px;

  &:hover {
    background-color: ${theme.buttonHover};
  }

  &:active {
    background-color: ${theme.buttonActive};
  }
  
  :disabled {
    background-color: ${theme.buttonDisabled};
  }
  
`