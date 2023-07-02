import styled from "styled-components";
import {theme} from "../../../theme/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  flex-wrap: wrap;
  font-family: "Montserrat", sans-serif
`;

export const Label = styled.label`
  font-size: 20px;
  width: 160px;
`

export const Input = styled.input`
  font-family: "Montserrat", sans-serif;
  text-align: center;
  border: none;
  border-bottom: 1.5px solid ${theme.inputBorderBottom};
  padding: 5px 0;
  margin: 0 10px;
  width: 120px;
  &:focus {
    outline: none;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    display: none;
  }
`