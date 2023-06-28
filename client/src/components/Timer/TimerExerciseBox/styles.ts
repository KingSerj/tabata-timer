import styled from "styled-components";
import {theme} from "../../../theme/theme";

export const ExerciseBox = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 17px;
  width: 480px;
  height: 25px;
  background-color: ${theme.exerciseBoxMainColor};
  border-radius: 3px;
  display: flex;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
`