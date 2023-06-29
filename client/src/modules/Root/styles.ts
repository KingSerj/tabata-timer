import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {theme} from "../../theme/theme";

export const Menu = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;
  margin: 25px 0 25px 0;
  font-family: "Montserrat", sans-serif ;
`

export const MenuItem = styled(NavLink)`
  font-size: 18px;
  text-decoration: none;
  color: ${theme.whiteColor};

  &.active {
    font-weight: bold;
  }

  &:hover {
    text-decoration: underline;
    text-underline-offset: 5px;
  }

`