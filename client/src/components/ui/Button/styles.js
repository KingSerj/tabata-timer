import styled from "styled-components";

export const Button = styled.button`
  margin: 10px 10px 10px 0;
  font-family: "Montserrat", sans-serif;
  background-color: #8b00ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  width: 160px;

  &:hover {
    background-color: #6300a7;
  }

  &:active {
    background-color: #4a0080;
  }
  
  :disabled {
    background-color: grey;
  }
  
`