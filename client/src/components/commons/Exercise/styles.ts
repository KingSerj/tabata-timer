import styled from "styled-components";

export const InputContainer = styled.div`
  font-family: "Montserrat", sans-serif;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 15px 0;
`

export const ExerciseText = styled.div`
  font-size: 20px;
`

export const ExerciseInput = styled.input`
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  width: 400px;
  height: 29px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 3px 0 0 3px;

  &:focus {
    outline: none;
  }
`

export const DeleteButton = styled.button`
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  height: 33px;
  background-color: #ffcccc;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ff8080;
  }

  &:active {
    background-color: #ff4d4d;
  }
`