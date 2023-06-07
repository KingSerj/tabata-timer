import styled from "styled-components";

export const TimerButton = styled.button`
  margin: 5px 0 5px 0;
  font-family: "Montserrat", sans-serif;
  width: 100px;
  height: 30px;
  padding: 7px 10px 7px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(125, 70, 190);
  color: #fff;
  border: none;
  cursor: pointer;
  outline: none;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

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