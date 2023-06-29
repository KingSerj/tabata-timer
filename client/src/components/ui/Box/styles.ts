import styled from "styled-components";
import {theme} from "../../../theme/theme";

export const Box = styled.div`
  background-color: ${theme.boxMainColor};
  box-shadow: 0 0 10px ${theme.lightTransparentBlack},
  0 10px 15px -10px ${theme.darkTransparentBlack},
    0 -10px 15px -10px ${theme.transparentBlack},
  10px 0 15px -10px ${theme.transparentBlack},
  -10px 0 15px -10px ${theme.transparentBlack};
  padding: 30px;
  width: 500px;
  height: auto;
  min-height: 600px;
  margin: 0 auto;
  border-radius: 5px;
`