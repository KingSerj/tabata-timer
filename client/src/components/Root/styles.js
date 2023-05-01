import styled from "styled-components";
import {NavLink} from "react-router-dom";
import "@fontsource/montserrat"

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
  color: #F8F7F9;

  &.active {
    font-weight: bold;
  }

  &:hover {
    text-decoration: underline;
    text-underline-offset: 5px;
  }

`