import styled from "styled-components";
import {theme} from "../../../../theme/theme";

export const ModalButton = styled.button`
  margin: 10px 10px 10px 0;
  font-family: "Montserrat", sans-serif;
  background-color: ${theme.buttonMainColor};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  width: 100px;
`

export const YesButton = styled(ModalButton)`
  background-color: ${theme.buttonConfirm};
  color: #fff;
  border: none;
  margin-right: 10px;

  &:hover {
    background-color: ${theme.buttonConfirmHover}
  }
`

export const NoButton = styled(ModalButton)`
  background-color: ${theme.buttonCancel};
  color: #fff;
  border: none;

  &:hover {
    background-color: ${theme.buttonCancelHover}
  }
`