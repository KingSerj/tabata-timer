import styled from "styled-components";
import {theme} from "../../../theme/theme";

export const TimerButton = styled.button`
  margin: 5px 0 5px 0;
  font-family: "Montserrat", sans-serif;
  width: 100px;
  height: 30px;
  padding: 7px 10px 7px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.buttonMainColor};
  color: ${theme.whiteColor};
  border: none;
  cursor: pointer;
  outline: none;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 2px 4px ${theme.darkTransparentBlack};

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